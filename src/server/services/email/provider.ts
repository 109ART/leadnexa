import nodemailer from "nodemailer";

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}

class SmtpProvider implements EmailProvider {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });

  async send(message: EmailMessage) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM ?? process.env.SMTP_USER,
      ...message,
    });
  }
}

// Used when SMTP is not configured: prints the email in the terminal instead.
class ConsoleProvider implements EmailProvider {
  async send(message: EmailMessage) {
    console.log(`\n[email] To: ${message.to}\n[email] ${message.subject}\n${message.text}\n`);
  }
}

export const emailProvider: EmailProvider =
  process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD
    ? new SmtpProvider()
    : new ConsoleProvider();