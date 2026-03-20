// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, order, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // =========================================================================
    // To make this live, you need an email provider like Resend or SendGrid.
    // Example using Resend (Run: npm install resend)
    // =========================================================================
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Your verified domain
      to: ['support@justtattoos.com'],             // Your actual inbox
      subject: `New Message from ${name} - Order: ${order || 'N/A'}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    */

    // Simulating network delay for testing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}