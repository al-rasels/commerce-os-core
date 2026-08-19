import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly apiKey: string | undefined;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.fromEmail =
      this.configService.get<string>('RESEND_FROM_EMAIL') ||
      'onboarding@resend.dev';
  }

  async sendEmail(options: SendEmailOptions): Promise<{ id: string; success: boolean }> {
    if (!this.apiKey) {
      this.logger.log(
        `[DEV EMAIL NO-OP] To: ${options.to} | Subject: ${options.subject}`,
      );
      this.logger.debug(`[EMAIL BODY]: ${options.html}`);
      return { id: `mock-${Date.now()}`, success: true };
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: [options.to],
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Resend API Error (${response.status}): ${errorText}`);
        return { id: '', success: false };
      }

      const data = (await response.json()) as { id: string };
      this.logger.log(`Email successfully sent to ${options.to} (ID: ${data.id})`);
      return { id: data.id, success: true };
    } catch (err) {
      this.logger.error(`Failed to send email: ${err}`);
      return { id: '', success: false };
    }
  }

  async sendPasswordReset(to: string, resetToken: string, storefrontUrl: string) {
    const resetUrl = `${storefrontUrl}/account/reset-password?token=${resetToken}`;
    return this.sendEmail({
      to,
      subject: 'Reset your CommerceOS password',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password for CommerceOS.</p>
          <p><a href="${resetUrl}" style="background: #2563eb; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a></p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });
  }

  async sendStaffInvite(to: string, inviteToken: string, tenantName: string, adminUrl?: string) {
    const inviteUrl = `${adminUrl || 'http://localhost:5173'}/invite?token=${inviteToken}`;
    return this.sendEmail({
      to,
      subject: `You've been invited to join ${tenantName} on CommerceOS`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Staff Invitation</h2>
          <p>You have been invited to join <strong>${tenantName}</strong> as a staff member on CommerceOS.</p>
          <p><a href="${inviteUrl}" style="background: #059669; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 6px; display: inline-block;">Accept Invitation</a></p>
        </div>
      `,
    });
  }
}
