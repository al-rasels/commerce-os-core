import { ForbiddenException } from '@nestjs/common';
import { CsrfMiddleware } from './csrf.middleware';

describe('CsrfMiddleware', () => {
  let middleware: CsrfMiddleware;

  const makeRes = () => ({ cookie: jest.fn() });
  const makeReq = (method: string, overrides: Record<string, unknown> = {}): any => ({
    method,
    cookies: undefined,
    headers: {},
    ...overrides,
  });

  beforeEach(() => {
    middleware = new CsrfMiddleware();
  });

  it('mints a cookie and proceeds on safe method with no existing cookie', () => {
    const res = makeRes();
    const next = jest.fn();

    middleware.use(makeReq('GET'), res as any, next);

    expect(res.cookie).toHaveBeenCalledTimes(1);
    const [name, token, opts] = res.cookie.mock.calls[0];
    expect(name).toBe('csrf_token');
    expect(token).toEqual(expect.any(String));
    expect(token.length).toBe(64);
    expect(opts.httpOnly).toBe(false);
    expect(opts.sameSite).toBe('strict');
    expect(opts.path).toBe('/');
    expect(next).toHaveBeenCalled();
  });

  it('does not re-mint a cookie on a safe method when one already exists', () => {
    const res = makeRes();
    const next = jest.fn();

    middleware.use(
      makeReq('HEAD', { cookies: { csrf_token: 'existing-token' } }),
      res as any,
      next,
    );

    expect(res.cookie).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('mints a cookie and proceeds on an unsafe method from a fresh browser (no cookie)', () => {
    const res = makeRes();
    const next = jest.fn();

    middleware.use(makeReq('POST'), res as any, next);

    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalled();
  });

  it('throws ForbiddenException when a cookie exists but x-csrf-token header is missing', () => {
    const req = makeReq('POST', { cookies: { csrf_token: 'abc123' } });

    expect(() => middleware.use(req, makeRes() as any, jest.fn())).toThrow(
      ForbiddenException,
    );
  });

  it('throws ForbiddenException when cookie and header tokens do not match', () => {
    const req = makeReq('POST', {
      cookies: { csrf_token: 'aaaa' },
      headers: { 'x-csrf-token': 'bbbb' },
    });

    expect(() => middleware.use(req, makeRes() as any, jest.fn())).toThrow(
      ForbiddenException,
    );
  });

  it('throws ForbiddenException when token lengths differ (guards timingSafeEqual)', () => {
    const req = makeReq('POST', {
      cookies: { csrf_token: 'short' },
      headers: { 'x-csrf-token': 'a-much-longer-header-token-value' },
    });

    expect(() => middleware.use(req, makeRes() as any, jest.fn())).toThrow(
      ForbiddenException,
    );
  });

  it('proceeds when cookie and header tokens match', () => {
    const req = makeReq('POST', {
      cookies: { csrf_token: 'matching-token' },
      headers: { 'x-csrf-token': 'matching-token' },
    });
    const next = jest.fn();

    middleware.use(req, makeRes() as any, next);

    expect(next).toHaveBeenCalled();
  });
});