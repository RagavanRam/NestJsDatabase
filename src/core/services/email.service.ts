import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { User } from 'src/users/entities';

@Injectable()
export class EmailService {
  private static async setupTransporter() {
    return createTransport({
      host: '',
      port: 0,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  async sendResetPasswordMail(
    user: User,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = {
      from: '',
      to: user.email,
      subject: '[LB4] Reset Password Request',
      html: `
          <div>
              <p>Hi there,</p>
              <p style="color: red;">We received a request to reset the password for your account</p>
              <p>To reset your password click on the link provided below</p>
              <a href="http://localhost:4200/reset-password-finish.html?resetKey=${user.resetKey}">Reset your password link</a>
              <p>If you didn’t request to reset your password, please ignore this email or reset your password to protect your account.</p>
              <p>Thanks</p>
              <p>LB4 team</p>
          </div>
          `,
    };
    return transporter.sendMail(emailTemplate);
  }

  // private static async setupTransporter() {
  //   return createTransport({
  //     service: 'gmail',
  //     auth: {
  //       type: 'OAuth2',
  //       user: '',
  //       clientId: '',
  //       clientSecret: '',
  //       refreshToken: '',
  //       accessToken: '',
  //     },
  //   });
  // }
}
