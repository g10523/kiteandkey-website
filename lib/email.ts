import { Resend } from 'resend';

// Initialize Resend safely (prevents build crash if key is missing)
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : new Resend('re_123456789'); // Dummy key for build time

export async function sendConsultationEmail(data: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    studentName: string;
    yearLevel: string;
    concerns: string;
}) {
    // If no API key, log to console (Development mode)
    if (!process.env.RESEND_API_KEY) {
        console.log('================================================');
        console.log('📧 MOCK EMAIL SEND (Missing RESEND_API_KEY)');
        console.log('To: hello@kiteandkey.com.au');
        console.log('Subject: New Consultation Booking');
        console.log('Data:', data);
        console.log('================================================');
        return { success: true, mocked: true };
    }

    try {
        await resend.emails.send({
            from: 'Kite & Key Website <system@kiteandkey.com.au>', // Ensure this domain is verified in Resend
            to: ['hello@kiteandkey.com.au', 'giovannitc88@gmail.com', 'kkewalram777@gmail.com'],
            subject: `New Consultation: ${data.studentName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #3F3A52;">New Consultation Request</h1>
                    <p>A new consultation has been booked via the website.</p>
                    
                    <div style="background-color: #F7F5FB; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #5E5574;">Parent Details</h3>
                        <p><strong>Name:</strong> ${data.parentName}</p>
                        <p><strong>Email:</strong> ${data.parentEmail}</p>
                        <p><strong>Phone:</strong> <a href="tel:${data.parentPhone}">${data.parentPhone}</a></p>
                        
                        <h3 style="color: #5E5574;">Student Details</h3>
                        <p><strong>Name:</strong> ${data.studentName}</p>
                        <p><strong>Year Level:</strong> ${data.yearLevel}</p>
                        
                        <h3 style="color: #5E5574;">Concerns / Goals</h3>
                        <p>${data.concerns}</p>
                    </div>

                    <p style="color: #888; font-size: 12px;">This email was sent automatically from the Kite & Key website.</p>
                </div>
            `
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}
