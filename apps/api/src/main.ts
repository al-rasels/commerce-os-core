import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { SensitiveFieldsInterceptor } from './common/interceptors/sensitive-fields.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

/**
 * Resolve the CORS origin allowlist.
 *
 * `credentials: true` is enabled below, so a wildcard `*` origin is invalid and
 * rejected by browsers. We therefore fail closed:
 *  - production requires an explicit `CORS_ORIGIN` allowlist at boot;
 *  - development falls back to the local origins from `.env.example`.
 */
function resolveCorsOrigins(): string[] {
  const configured = process.env.CORS_ORIGIN
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configured && configured.length > 0) {
    return configured;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'CORS_ORIGIN must be set to an explicit origin allowlist in production. ' +
        'Wildcard "*" is not allowed together with credentials:true.',
    );
  }

  // Local development defaults (mirror .env.example).
  return [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
  ];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new SensitiveFieldsInterceptor(),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: resolveCorsOrigins(),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new GlobalExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
