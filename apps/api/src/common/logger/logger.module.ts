import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          const existingId =
            req.id ??
            req.headers['x-request-id'] ??
            req.headers['x-correlation-id'];
          if (existingId) return existingId;
          const id = randomUUID();
          res.setHeader('X-Request-Id', id);
          return id;
        },
        customProps: (req, res) => {
          return {
            correlationId: req.id,
          };
        },
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.headers["x-api-key"]',
            'body.password',
            'body.passwordConfirm',
            'body.creditCard',
            'body.cvv',
          ],
          censor: '[REDACTED]',
        },
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  translateTime: 'SYS:standard',
                },
              }
            : undefined,
        autoLogging: {
          ignore: (req) => req.url === '/health',
        },
        serializers: {
          req: (req) => {
            if (!req) return req;
            // Only attach body if the raw request and its body exist
            if (req.raw && req.raw.body !== undefined) {
              req.body = req.raw.body;
            }
            return req;
          },
        },
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
