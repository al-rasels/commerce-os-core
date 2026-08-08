FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/storefront/package.json ./apps/storefront/
COPY apps/api/package.json ./apps/api/
COPY packages ./packages
COPY tsconfig.json turbo.json ./

RUN npm ci

COPY apps/storefront ./apps/storefront
COPY .gitignore ./

# next build with output:standalone produces .next/standalone under the workspace.
RUN npx turbo run build --filter=storefront

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/apps/storefront/.next/standalone ./
COPY --from=builder /app/apps/storefront/.next/static ./apps/storefront/.next/static
COPY --from=builder /app/apps/storefront/public ./apps/storefront/public

USER nextjs
EXPOSE 3001
CMD ["node", "apps/storefront/server.js"]
