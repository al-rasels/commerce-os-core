import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend | null = null;
  private readonly logger = new Logger(EmailService.name);
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn('RESEND_API_KEY is missing. Emails will only be logged.');
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (this.resend) {
      try {
        await this.resend.emails.send({
          from: this.fromEmail,
          to,
          subject,
          html,
        });
        this.logger.log(`Email sent to: ${to} | Subject: ${subject}`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${to}`, error);
      }
    } else {
      this.logger.log(`Mock Email to: ${to} | Subject: ${subject} | Body: ${html}`);
    }
  }

  async sendPasswordReset(to: string, token: string, domain: string) {
    // Assuming admin dashboard runs on port 5173 locally, adjust based on env or domain
    const isLocalhost = domain.includes('localhost') || domain.includes('127.0.0.1');
    const port = isLocalhost ? ':5173' : '';
    const protocol = isLocalhost ? 'http' : 'https';
    
    const resetUrl = `${protocol}://${domain}${port}/reset-password?token=${token}`;
    const html = `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `;
    await this.sendEmail(to, 'Password Reset Request', html);
  }

  async sendStaffInvite(to: string, tempPassword: string, domain: string) {
    const isLocalhost = domain.includes('localhost') || domain.includes('127.0.0.1');
    const port = isLocalhost ? ':5173' : '';
    const protocol = isLocalhost ? 'http' : 'https';

    const loginUrl = `${protocol}://${domain}${port}/login`;
    const html = `
      <p>Hello,</p>
      <p>You have been invited to join the staff on Commerce OS.</p>
      <p>Your temporary password is: <strong>${tempPassword}</strong></p>
      <p>Please <a href="${loginUrl}">login</a> and change your password immediately.</p>
    `;
    await this.sendEmail(to, 'Staff Invitation', html);
  }
}
