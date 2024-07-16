import nodemailer from 'nodemailer';
import { config } from '~/config';
import Mail from 'nodemailer/lib/mailer';
import { consoleLogger, BadRequestError } from '@quan0401/ecommerce-shared';
import { Logger } from 'winston';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const log: Logger = consoleLogger('MailTransport', 'debug');

class MailTransport {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD
      }
    });
  }

  public async sendMail(receiverEmail: string, subject: string, body: string): Promise<void> {
    await this.productionEmailSender(receiverEmail, subject, body);
  }

  private async productionEmailSender(receiverEmail: string, subject: string, body: string): Promise<void> {
    const mailOptions: IMailOptions = {
      from: `Banking app ${config.SENDER_EMAIL}`,
      to: receiverEmail,
      subject: subject,
      html: body
    };
    try {
      // await sendGridMail.send(mailOptions);
      await this.transporter.sendMail(mailOptions);
      log.info('Production email sent successfully');
    } catch (error) {
      log.error(error);
      throw new BadRequestError('Error sending email', 'productionEmailSender');
    }
  }
}

export const mailTransport: MailTransport = new MailTransport();
