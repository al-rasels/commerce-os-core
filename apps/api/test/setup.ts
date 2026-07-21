// Setup environment variables for test execution
// Note: Isolation tests hit Prisma immediately on instantiation, so a DATABASE_URL must be provided.
process.env.DATABASE_URL =
  'postgresql://postgres:dev@localhost:5432/commerceos?schema=public';
process.env.JWT_SECRET = 'test-secret';
process.env.REDIS_URL = 'redis://localhost:6379';
