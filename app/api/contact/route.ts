import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSiteContent } from '@/lib/content';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required fields' }, { status: 400 });
    }

    // Get the destination email from the back-office settings
    const content = await getSiteContent();
    const notificationEmail = content.contact_notification_email || 'davianrevano2020@gmail.com';

    if (!notificationEmail) {
      return NextResponse.json(
        { error: 'Notification email is not configured in the Back-Office settings' }, 
        { status: 500 }
      );
    }
    
    // Safety check for API key
    const resendApiKey = process.env.RESEND_API_KEY || content.resend_api_key;
    
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API Key is missing. Please add it to the Back-Office Settings > API Keys section, or as an Environment Variable.' },
        { status: 500 }
      );
    }

    // Initialize Resend lazily inside the handler to prevent build crashes
    const resend = new Resend(resendApiKey);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Shaz Aesthetic Clinic <onboarding@resend.dev>', // resend.dev is allowed for testing. Later they can verify their domain.
      to: [notificationEmail],
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <br />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
