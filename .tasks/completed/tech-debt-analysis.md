# Technical Debt & Cut Corners Analysis

This document outlines all identified architectural shortcuts, missing implementations, and strict rule violations across the CommerceOS project based on the Phase 1 specifications.

## 1. Tenant Isolation & Security Violations (High Priority)
- **Raw ORM Usage on Tenant Tables:** `auth.service.ts` and `theme.service.ts` bypass `TenantScopedRepository` entirely and query `this.prisma.user` and `this.prisma.themeTenantOverride` directly. This breaks Rule 01 (Database Query Rule).
- **Missing Isolation Tests:** Only two repositories (`page-layout` and `catalog`) have the non-negotiable `describe('isolation: <table>')` test suites. Repositories like `users`, `audit-log`, `theme-override`, `order`, `customer`, `cart`, and `cart-item` are completely missing these tests.
- **Skipped Token Rejection Tests:** Cross-tenant token rejection tests are missing from the endpoints. E2E tests (e.g., `catalog.e2e-spec.ts`) mock this out rather than testing the real token minting rejection as required by Rule 01 §8.

## 2. TypeScript Integrity & Type Safety (Medium Priority)
- **Widespread `any` Abuse:** The codebase contains heavy usage of the `any` type, completely defeating TypeScript's safety mechanisms. 
  - *Frontend:* Components like `ProductCard` explicitly type `product: any`. Iterations in `page.tsx` and `checkout/page.tsx` use `categories.map((cat: any)` and `items.map((item: any)`.
  - *Backend:* Widespread use of `ctx: any` across almost all service files (`catalog.service.ts`, `theme.service.ts`, `builder.service.ts`) instead of the strictly typed `TenantContext`.

## 3. UI and Design Token Violations (Medium Priority)
- **Hardcoded Colors:** While most components use Tailwind design tokens, `apps/admin/src/lib/invoice.ts` contains numerous hardcoded hex colors (`#e2e8f0`, `#1a1a2e`, `#64748b`, `#94a3b8`, `#f8fafc`). This violates Rule 04 §3 which explicitly bans hardcoded color values.

## 4. Missing Infrastructure & Package Implementations (Low/Medium Priority)
- **Unimplemented Queue Workers:** Despite `bullmq` and `@nestjs/bullmq` being installed, there are zero `@Processor` or queue workers implemented. The background job architecture is effectively missing.
- **Missing S3/Storage Integration:** The docs mandate `@aws-sdk/client-s3` and `multer` for object storage and uploads, but neither is installed or implemented in the API.
- **Missing Image Optimization:** Next.js `sharp` is mandated for production image optimization in the storefront, but it is not installed.
- **Password Hashing Mismatch:** The docs strictly require `argon2` ("never hand-rolled, use argon2"), but `auth.service.ts` imports and uses `bcrypt`. 

## Recommendation
This file should be converted into actionable tickets to systematically pay down this debt before Phase 2 begins. The most critical items are refactoring `auth.service.ts` and `theme.service.ts` to strictly use the `TenantScopedRepository`.
