import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApplicationError } from '../errors/base.error';
import { ERROR_CODES, ApiErrorResponse } from '@commerceos/shared-types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode: string = ERROR_CODES.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let validationErrors: Record<string, string[]> | undefined;
    let title = 'Internal Server Error';

    if (exception instanceof ApplicationError) {
      status = exception.statusCode;
      errorCode = exception.code;
      message = exception.message;
      validationErrors = exception.validationErrors;
      title = exception.name;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resp = exception.getResponse() as any;
      message = typeof resp === 'string' ? resp : resp.message || 'HTTP Error';
      title = exception.name;
      // Map basic HTTP codes
      if (status === HttpStatus.BAD_REQUEST)
        errorCode = ERROR_CODES.VALIDATION_ERROR;
      if (status === HttpStatus.UNAUTHORIZED)
        errorCode = ERROR_CODES.UNAUTHORIZED;
      if (status === HttpStatus.FORBIDDEN) errorCode = ERROR_CODES.FORBIDDEN;
      if (status === HttpStatus.NOT_FOUND) errorCode = ERROR_CODES.NOT_FOUND;
      if (status === HttpStatus.CONFLICT) errorCode = ERROR_CODES.CONFLICT;
      if (status === HttpStatus.TOO_MANY_REQUESTS)
        errorCode = ERROR_CODES.RATE_LIMIT_EXCEEDED;
    }

    // Always log full error details on the server side
    this.logger.error(
      {
        err: exception,
        req: {
          method: request.method,
          url: request.url,
          body: request.body,
        },
      },
      exception instanceof Error ? exception.stack : 'Unknown stack',
    );

    // Build the RFC7807 response
    const errorResponse: ApiErrorResponse = {
      type: `https://api.example.com/errors/${errorCode.toLowerCase()}`,
      title,
      status,
      detail: message,
      instance: request.url,
      timestamp: new Date().toISOString(),
      traceId: (request.id as string) || 'unknown',
      errorCode,
      validationErrors,
    };

    // Mask stack trace in production. The message itself might contain sensitive info if it's an unexpected error
    if (
      process.env.NODE_ENV === 'production' &&
      status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      errorResponse.detail =
        'An unexpected error occurred. Please contact support.';
    }

    response.status(status).json(errorResponse);
  }
}
