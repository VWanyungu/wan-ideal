import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
  }
})

export const sendPasswordResetMail = async (mail) => {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    html: `<h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.BACKEND_URL}/reset-password/${mail.resetToken}">Reset Password</a>
      `
  })

  if (info.accepted.length === 0) {
     return {
        status: "error",
        data: null,
        message: "Failed to send email"
      }
  }
  
  return {
    status: "success",
    data: info,
    message: "Email sent successfully"
  }
}

