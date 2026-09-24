import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/dbConnect";
import ContactSubmission from "@/models/ContactSubmission";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendNotificationEmail({ name, email, contact, message }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL || user;

  if (!user || !pass) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Technaz Website" <${user}>`,
    to: notifyTo,
    replyTo: email,
    subject: `New contact enquiry from ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Contact number:</strong> ${escapeHtml(contact || "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, contact, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const submission = await ContactSubmission.create({
      name: name.trim(),
      email: email.trim(),
      contact: (contact || "").trim(),
      message: message.trim(),
    });

    try {
      await sendNotificationEmail({
        name: submission.name,
        email: submission.email,
        contact: submission.contact,
        message: submission.message,
      });
    } catch (mailError) {
      console.error("Contact email notification failed:", mailError);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
