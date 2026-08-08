import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

/**
 * Outbound transactional email.
 *
 * Uses Resend when `RESEND_API_KEY` is configured; otherwise emails are
 * suppressed and logged at INFO so local development (and CI without a key)
 * never throws. All send methods are fire-and-forget from the caller's
 * perspective — failures are logged, never surfaced to request handlers.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly client: Resend | null;
  private readonly from: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.client = apiKey ? new Resend(apiKey) : null;
    this.from = process.env.EMAIL_FROM || 'CommerceOS <onboarding@resend.dev>';

    if (!this.client) {
      this.logger.warn(
        'RESEND_API_KEY is not configured — transactional emails will be suppressed (logged only).',
      );
    }
  }

  /** Reset-password email with a one-time, expiring link. */
  async sendPasswordReset(to: string, resetUrl: string): Promise<void> {
    await this.dispatch(
      to,
      'Reset your CommerceOS password',
      `<p>Hi,</p>
       <p>You requested a password reset for your CommerceOS account.</p>
       <p><a href="${resetUrl}">Reset your password</a></p>
       <p>This link expires in 15 minutes. If you didn't request this, you can safely ignore it.</p>`,
    );
  }

  /** Staff-invitation email with the temporary one-time password. */
  async sendInvite(to: string, tempPassword: string, loginUrl: string): Promise<void> {
    await this.dispatch(
      to,
      'You have been invited to CommerceOS',
      `<p>Hi,</p>
       <p>An administrator has invited you to a CommerceOS store.</p>
       <p>Sign in at <a href="${loginUrl}">${loginUrl}</a> using this one-time password:</p>
       <p><strong>${tempPassword}</strong></p>
       <p>You'll be asked to set a new password after your first sign-in.</p>`,
    );
  }

  private async dispatch(to: string, subject: string, html: string): Promise<void> {
    if (!this.client) {
      this.logger.log(
        `[email:muted] to=${to} subject="${subject}" html=${html.replace(/\s+/g, ' ').slice(0, 160)}…`,
      );
      return;
    }

    try {
      const { error } = await this.client.emails.send({
        from: this.from,
        to,
        subject,
        html,
      });
      if (error) {
        this.logger.error(`Email send to ${to} failed: ${error.message}`);
      }
    } catch (err) {
      this.logger.error(`Email send to ${to} threw: ${(err as Error).message}`);
    }
  }
}