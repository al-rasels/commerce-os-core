import { ErrorCode, ERROR_CODES } from '@commerceos/shared-types';

export class ApplicationError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly validationErrors?: Record<string, string[]>;
  public readonly cause?: Error;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number,
    validationErrors?: Record<string, string[]>,
    cause?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, validationErrors?: Record<string, string[]>) {
    super(message, ERROR_CODES.VALIDATION_ERROR, 400, validationErrors);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, ERROR_CODES.NOT_FOUND, 404);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string = 'Unauthorized') {
    super(message, ERROR_CODES.UNAUTHORIZED, 401);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message: string = 'Forbidden') {
    super(message, ERROR_CODES.FORBIDDEN, 403);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message, ERROR_CODES.CONFLICT, 409);
  }
}

export class BusinessError extends ApplicationError {
  constructor(message: string) {
    super(message, ERROR_CODES.VALIDATION_ERROR, 422); // Or separate code
  }
}
