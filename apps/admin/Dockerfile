FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (workspaces hoist to the repo root)
COPY package*.json ./
COPY apps/admin/package.json ./apps/admin/
COPY apps/api/package.json ./apps/api/
COPY packages ./packages
COPY tsconfig.json turbo.json ./

RUN npm ci

# Build the admin and its workspace dependencies (turbo runs ^build first)
COPY apps/admin ./apps/admin
COPY .gitignore ./
RUN npx turbo run build --filter=admin

FROM nginx:alpine AS runner

COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
