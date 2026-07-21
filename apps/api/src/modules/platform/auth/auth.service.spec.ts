// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { TenantContext } from '../tenant/tenant-context';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: Record<string, jest.Mock>;
  let jwtService: Record<string, jest.Mock>;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    role: {
      findFirst: jest.fn(),
    },
  };

  const mockJwt = {
    signAsync: jest.fn(),
  };

  const mockRedis = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  };

  const ctx = new TenantContext({
    tenantId: 't1',
    domain: 'test.local',
    plan: 'enterprise',
    effectiveFlags: new Set(),
    theme: { themeBaseId: '', overrides: {} },
    locale: 'en-US',
    currency: 'USD',
    permissions: [],
    storagePrefix: 'tenant-t1/',
  });

  const mockUsersService = {
    findByEmail: jest.fn(),
    findRoleByName: jest.fn(),
    create: jest.fn(),
    findManyWithRole: jest.fn(),
    findUniqueWithRoleFull: jest.fn(),
    updateUser: jest.fn(),
    findUnique: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = mockPrisma as any;
    jwtService = mockJwt as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('returns tokens when credentials are valid', async () => {
      const hash = await argon2.hash('password123');
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        password_hash: hash,
        tenant_id: 't1',
        role: { name: 'Store Owner' },
      });
      mockJwt.signAsync.mockResolvedValue('token');
      mockRedis.set.mockResolvedValueOnce(undefined);

      const result = await service.login(ctx, 'test@test.com', 'password123');

      expect(result.access_token).toBe('token');
      expect(result.refresh_token).toBe('token');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'refresh:t1:u1',
        expect.any(String),
        604800,
      );
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockUsersService.findManyWithRole.mockResolvedValueOnce([]);
      mockUsersService.findByEmail.mockResolvedValueOnce(null);

      await expect(
        service.login(ctx, 'nonexistent@test.com', 'pass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when password is wrong', async () => {
      const hash = await argon2.hash('correct');
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        password_hash: hash,
        tenant_id: 't1',
        role: { name: 'Store Owner' },
      });

      await expect(
        service.login(ctx, 'test@test.com', 'wrong'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('creates user and returns tokens', async () => {
      mockUsersService.findManyWithRole.mockResolvedValueOnce([]);
      mockUsersService.findByEmail.mockResolvedValueOnce(null);
      mockUsersService.findRoleByName.mockResolvedValueOnce({
        id: 'r1',
        name: 'Customer',
      });
      mockUsersService.create.mockResolvedValueOnce({
        id: 'u1',
        email: 'new@test.com',
        tenant_id: 't1',
        role: { name: 'Customer' },
        password_hash: 'hash',
      });
      mockJwt.signAsync.mockResolvedValue('token');
      mockRedis.set.mockResolvedValueOnce(undefined);

      const result = await service.register(ctx, {
        email: 'new@test.com',
        password: 'password123',
      });

      expect(result.access_token).toBe('token');
      expect(result.refresh_token).toBe('token');
    });

    it('throws ConflictException when email exists', async () => {
      mockUsersService.findByEmail.mockResolvedValueOnce({ id: 'u1' });

      await expect(
        service.register(ctx, {
          email: 'existing@test.com',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('refresh', () => {
    it('returns tokens when refresh token is valid', async () => {
      const refreshToken = 'valid-refresh-token';
      const hashed = await argon2.hash(refreshToken);
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        tenant_id: 't1',
        role: { name: 'Store Owner' },
      });
      mockRedis.get.mockResolvedValueOnce(hashed);
      mockRedis.del.mockResolvedValueOnce(undefined);
      mockJwt.signAsync.mockResolvedValue('new-token');
      mockRedis.set.mockResolvedValueOnce(undefined);

      const result = await service.refresh(ctx, 'u1', refreshToken);

      expect(result.access_token).toBe('new-token');
      expect(result.refresh_token).toBe('new-token');
    });

    it('throws UnauthorizedException when user not in tenant', async () => {
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        tenant_id: 't2',
        role: { name: 'Store Owner' },
      });

      await expect(service.refresh(ctx, 'u1', 'token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('throws UnauthorizedException when stored hash does not match', async () => {
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        tenant_id: 't1',
        role: { name: 'Store Owner' },
      });
      mockRedis.get.mockResolvedValueOnce('different-hash');

      await expect(service.refresh(ctx, 'u1', 'wrong-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
