import nodemailer from "nodemailer";

import { generateEmailTemplate } from "./email-template";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, subject, message } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: `Contact Form: ${subject}`,
    html: generateEmailTemplate({
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toLocaleString(),
    }),
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
}
