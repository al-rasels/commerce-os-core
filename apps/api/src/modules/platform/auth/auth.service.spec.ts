// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { TenantContext } from '../tenant/tenant-context';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Record<string, jest.Mock>;
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
    verifyAsync: jest.fn(),
  };

  const mockRedis = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  };

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findManyWithRole: jest.fn(),
    findRoleByName: jest.fn(),
    findUniqueWithRoleFull: jest.fn(),
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
        { provide: RedisService, useValue: mockRedis },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = mockUsersService as any;
    jwtService = mockJwt as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('returns tokens when credentials are valid', async () => {
      const hash = await argon2.hash('password123');
      mockUsersService.findManyWithRole.mockResolvedValueOnce([{
        id: 'u1',
        email: 'test@test.com',
        password_hash: hash,
        tenant_id: 't1',
        role: { name: 'Store Owner', permissions: ['catalog.read', 'catalog.write'] },
      }]);
      mockJwt.signAsync.mockResolvedValue('token');
      mockRedis.set.mockResolvedValueOnce(undefined);

      const result = await service.login(ctx, { email: 'test@test.com', password: 'password123' });

      expect(result.access_token).toBe('token');
      expect(result.refresh_token).toBe('token');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'refresh:u1',
        expect.any(String),
        604800,
      );
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockUsersService.findManyWithRole.mockResolvedValueOnce([]);

      await expect(
        service.login(ctx, { email: 'nonexistent@test.com', password: 'pass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when password is wrong', async () => {
      const hash = await argon2.hash('correct');
      mockUsersService.findManyWithRole.mockResolvedValueOnce([{
        id: 'u1',
        email: 'test@test.com',
        password_hash: hash,
        tenant_id: 't1',
        role: { name: 'Store Owner', permissions: ['catalog.read', 'catalog.write'] },
      }]);

      await expect(
        service.login(ctx, { email: 'test@test.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('creates user and returns tokens', async () => {
      mockUsersService.findByEmail.mockResolvedValueOnce(null);
      mockUsersService.findRoleByName.mockResolvedValueOnce({
        id: 'r1',
        name: 'Customer',
        permissions: ['catalog.read', 'cart.read', 'checkout.write', 'order.read'],
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
      mockJwt.verifyAsync.mockResolvedValueOnce({ sub: 'u1' });
      mockRedis.get.mockResolvedValueOnce('valid-refresh-token');
      mockUsersService.findUniqueWithRoleFull.mockResolvedValueOnce({
        id: 'u1',
        email: 'test@test.com',
        tenant_id: 't1',
        role: { name: 'Store Owner', permissions: ['catalog.read', 'catalog.write'] },
      });
      mockJwt.signAsync.mockResolvedValue('new-token');
      mockRedis.set.mockResolvedValueOnce(undefined);

      const result = await service.refresh(ctx, 'valid-refresh-token');

      expect(result.access_token).toBe('new-token');
      expect(result.refresh_token).toBe('new-token');
    });

    it('throws UnauthorizedException when token cannot be verified', async () => {
      mockJwt.verifyAsync.mockRejectedValueOnce(new Error('jwt expired'));

      await expect(service.refresh(ctx, 'bad-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('throws UnauthorizedException when stored token does not match', async () => {
      mockJwt.verifyAsync.mockResolvedValueOnce({ sub: 'u1' });
      mockRedis.get.mockResolvedValueOnce('different-token');

      await expect(service.refresh(ctx, 'sent-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
