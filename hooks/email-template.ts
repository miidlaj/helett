type EmailTemplateProps = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
};

export function generateEmailTemplate({
  name,
  email,
  phone,
  subject,
  message,
  date,
}: EmailTemplateProps): string {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .container {
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        background-color: #4a6fa5;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        background-color: #ffffff;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: bold;
        color: #555555;
      }
      .message-box {
        background-color: #f9f9f9;
        border-left: 4px solid #4a6fa5;
        padding: 15px;
        margin-top: 5px;
      }
      .footer {
        background-color: #f5f5f5;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">Name:</span> ${name}
        </div>
        <div class="field">
          <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
        </div>
        <div class="field">
          <span class="label">Phone:</span> ${phone}
        </div>
        <div class="field">
          <span class="label">Subject:</span> ${subject}
        </div>
        <div class="field">
          <span class="label">Date:</span> ${date}
        </div>
        <div class="field">
          <div class="label">Message:</div>
          <div class="message-box">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      </div>
      <div class="footer">
        This email was sent from your website's contact form.
      </div>
    </div>
  </body>
  </html>`;
}
