import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, organizer, message } = await req.json();

  // Create the transporter using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Sending the email
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: 'recipient@example.com',  // Update this to the correct recipient
      subject: `New message from ${name}`,
      text: `User Email: ${email}\nOrganizer Email: ${organizer}\n\nMessage:\n${message}`,
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error and return a failure response
    console.error(error);
    return NextResponse.json({ success: false, error: 'Email sending failed' }, { status: 500 });
  }
}
