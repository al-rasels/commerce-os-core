# Security & Authentication

## 1. Auth Model

- **JWT access tokens** (short-lived, ~15min) + **refresh tokens** (rotating, stored hashed)
- **MFA/OTP** optional per plan, mandatory for platform-level (super admin) accounts
- Tokens carry `tenant_id` claim — a token minted for tenant A is rejected on tenant B's resolved context even if signature is valid (defense in depth against domain-confusion attacks)

## 2. Authentication Lifecycle

```
Login → credential check → (MFA if enabled) → issue access+refresh token
  ↓
Each request → verify access token → check tenant_id claim matches resolved TenantContext
  ↓
Expiry → refresh flow (rotate refresh token, invalidate old one)
  ↓
Logout / revoke → refresh token blacklisted (Redis, tenant-scoped)
```

## 3. RBAC

- Roles are tenant-scoped (a "Manager" role in tenant A is a distinct row from tenant B's "Manager") except platform-level roles (Super Admin, Support) which are global and carry no `tenant_id`.
- Permission checks always resolve through `TenantContext.permissions`, never a raw role-name string comparison.

## 4. Permission Matrix (representative — not exhaustive)

| Role | Scope | Example capability |
|---|---|---|
| Super Admin | Platform | Provision tenants, view billing, feature flags |
| Store Owner | Tenant | Full store config, billing (own store) |
| Store Staff | Tenant | Orders/catalog per assigned permission set |
| Customer | Tenant, self only | Own orders/profile |

## 5. Security Controls (baseline, all Phase 1)

- Rate limiting per tenant + per IP (prevents one noisy tenant from degrading shared infra)
- CSRF protection on session-based admin flows
- Input validation/sanitization at DTO layer (NestJS pipes) — no raw SQL string concatenation anywhere
- Encryption at rest for PII columns (customer email/phone) and secrets (API keys, payment credentials) via KMS-backed field encryption
- Secure headers (CSP, HSTS, X-Frame-Options) enforced at reverse proxy
- Audit log for all privilege-sensitive actions (see database doc §6)

## 6. Cross-Tenant Leak Prevention (the hard requirement from vision doc)

Three independent layers must all fail before a leak occurs:
1. Query-level: `TenantScopedRepository` auto-filters (multi-tenant doc §4)
2. Token-level: JWT tenant claim vs resolved context mismatch = reject
3. Cache/storage-level: key/path prefixing makes cross-tenant reads structurally impossible, not just filtered

Treat any one of these layers failing as a sev-1 incident even if the other two caught it.

## 7. Compliance Posture (Phase 1 baseline, not full certification)

GDPR-ready patterns: data export endpoint per tenant, right-to-erasure via the offboarding hard-delete path (multi-tenant doc §5), PII encryption. Full compliance certification (SOC2 etc.) is a Phase 3+ enterprise-tier item — flagged in roadmap, not blocking MVP.
