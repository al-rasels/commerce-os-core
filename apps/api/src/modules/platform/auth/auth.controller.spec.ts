// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Record<string, jest.Mock>;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refresh: jest.fn(),
  };

  const createMockRes = () => ({
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  });

  const mockReq = () => ({ cookies: {} });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = mockAuthService as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('delegates to authService.login', async () => {
      const ctx = { tenantId: 't1' } as any;
      const dto = { email: 'test@test.com', password: 'password123' };
      mockAuthService.login.mockResolvedValueOnce({ access_token: 'token' });
      const res = createMockRes();

      const result = await controller.login(ctx, dto, res);

      expect(authService.login).toHaveBeenCalledWith(ctx, dto);
      expect(result).toEqual({ access_token: 'token' });
      expect(res.cookie).toHaveBeenCalledWith(
        'access_token',
        'token',
        expect.any(Object),
      );
    });
  });

  describe('register', () => {
    it('delegates to authService.register', async () => {
      const ctx = { tenantId: 't1' } as any;
      const dto = { email: 'new@test.com', password: 'password123' };
      mockAuthService.register.mockResolvedValueOnce({ access_token: 'token' });
      const res = createMockRes();

      const result = await controller.register(ctx, dto, res);

      expect(authService.register).toHaveBeenCalledWith(ctx, dto);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('refresh', () => {
    it('delegates to authService.refresh', async () => {
      const ctx = { tenantId: 't1' } as any;
      mockAuthService.refresh.mockResolvedValueOnce({
        access_token: 'new-token',
      });
      const req = mockReq();
      const res = createMockRes();

      const result = await controller.refresh(
        ctx,
        req,
        'refresh-token-value',
        res,
      );

      expect(authService.refresh).toHaveBeenCalledWith(
        ctx,
        'refresh-token-value',
      );
      expect(result).toEqual({ access_token: 'new-token' });
    });
  });
});
