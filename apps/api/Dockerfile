FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma

RUN npm ci

COPY apps/api ./apps/api
COPY tsconfig.json ./

RUN npm run build --workspace=apps/api

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

# Add non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

USER nestjs

EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]
