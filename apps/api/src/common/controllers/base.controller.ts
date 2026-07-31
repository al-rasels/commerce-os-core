import { Response } from 'express';
import { Logger } from '@nestjs/common';

export abstract class BaseController {
  protected readonly logger = new Logger(this.constructor.name);

  protected handleSuccess(res: Response, data: any, status = 200) {
    return res.status(status).json({
      success: true,
      data,
    });
  }

  protected handleError(error: unknown, res: Response, context?: string) {
    if (context) {
      this.logger.error(`Error in ${context}`, error instanceof Error ? error.stack : undefined);
    }
    // In a pure NestJS app, throwing the error lets the GlobalExceptionFilter handle it uniformly
    throw error;
  }
}

// Wrapper for express middlewares if needed (NestJS handles route controllers automatically)
export const asyncErrorWrapper = (fn: (...args: any[]) => any) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
