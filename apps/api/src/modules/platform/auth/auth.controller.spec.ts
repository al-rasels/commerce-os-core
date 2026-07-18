// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Record<string, jest.Mock>;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = mockAuthService as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('delegates to authService.login', async () => {
      const req = { tenantContext: { tenantId: 't1' } };
      const dto = { email: 'test@test.com', password: 'password123' };
      mockAuthService.login.mockResolvedValueOnce({ access_token: 'token' });

      const result = await controller.login(req, dto);

      expect(authService.login).toHaveBeenCalledWith(req.tenantContext, dto.email, dto.password);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('register', () => {
    it('delegates to authService.register', async () => {
      const req = { tenantContext: { tenantId: 't1' } };
      const dto = { email: 'new@test.com', password: 'password123' };
      mockAuthService.register.mockResolvedValueOnce({ access_token: 'token' });

      const result = await controller.register(req, dto);

      expect(authService.register).toHaveBeenCalledWith(req.tenantContext, dto);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('refresh', () => {
    it('delegates to authService.refresh', async () => {
      const req = { tenantContext: { tenantId: 't1' } };
      mockAuthService.refresh.mockResolvedValueOnce({ access_token: 'new-token' });

      const result = await controller.refresh(req, 'u1', 'refresh-token-value');

      expect(authService.refresh).toHaveBeenCalledWith(req.tenantContext, 'u1', 'refresh-token-value');
      expect(result).toEqual({ access_token: 'new-token' });
    });
  });
});
