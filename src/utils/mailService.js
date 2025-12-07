import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g. youraccount@gmail.com
    pass: process.env.EMAIL_PASS, // app password (not your real gmail password!)
  },
});

export async function sendMail(to, subject, text, html) {
  const info = await transport.sendMail({
    from: `"VEDANT System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
  console.log("Message sent: %s", info.messageId);
}
