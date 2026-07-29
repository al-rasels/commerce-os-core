# Session 09c — Auth Gaps: Password Reset, MFA, Staff Invitations

## Status: BACKLOG

## Dependencies

- [x] Session 3 — Auth & RBAC (completed)

## Objective

Fill the remaining authentication features needed for production readiness — password reset flow, change password, MFA/OTP, and staff invitation flow.

## Deliverables

- [x] Forgot password endpoint (email with reset token)
- [x] Reset password endpoint (validate token, set new password)
- [x] Change password endpoint (current password verification)
- [x] MFA/OTP setup + verification (TOTP)
- [x] Staff invitation flow (create user with temp password + invite email)

## Acceptance Criteria

- [x] Password reset email contains a one-time token
- [x] Token expires after 15 minutes or first use
- [x] Change password rejects if current password is wrong
- [x] MFA can be enabled/disabled per user
- [x] Invitation creates user in PENDING status, activated on first login

## Files to Touch

- `apps/api/src/modules/platform/auth/` — new endpoints + service methods
- `apps/api/prisma/seed.ts` — update seeds if needed

## Notes

- For Phase 1, email sending can be a stub (console.log) if no email service is configured
- Store reset tokens hashed in Redis with TTL
- MFA secret stored encrypted per user
