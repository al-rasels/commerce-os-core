import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'node:crypto';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const CSRF_COOKIE = 'csrf_token';
const CSRF_HEADER = 'x-csrf-token';

function mintToken(res: Response) {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie(CSRF_COOKIE, token, {
    // httpOnly: false so SPAs can read the token and echo it as x-csrf-token.
    // sameSite: strict ensures the cookie is only sent in a first-party
    // context, so the double-submit value cannot be set by an attacker.
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookieToken = req.cookies?.[CSRF_COOKIE];

    if (SAFE_METHODS.has(req.method)) {
      if (!cookieToken) mintToken(res);
      return next();
    }

    // First request from a fresh browser: no cookie exists yet. Mint one and
    // let the request through. Because sameSite=strict prevents the cookie
    // from being set cross-site, a freshly issued token is not
    // attacker-controlled, so this does not weaken CSRF protection.
    if (!cookieToken) {
      mintToken(res);
      return next();
    }

    const headerToken = req.headers[CSRF_HEADER] as string | undefined;
    if (!headerToken) {
      throw new ForbiddenException('CSRF token missing');
    }

    const cookieBuf = Buffer.from(cookieToken);
    const headerBuf = Buffer.from(headerToken);
    if (
      cookieBuf.length !== headerBuf.length ||
      !crypto.timingSafeEqual(cookieBuf, headerBuf)
    ) {
      throw new ForbiddenException('CSRF token mismatch');
    }

    next();
  }
}
