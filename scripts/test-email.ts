
import dotenv from 'dotenv';
dotenv.config();

import { sendConsultationEmail } from '../lib/email';

async function main() {
    console.log('Sending test email...');
    const result = await sendConsultationEmail({
        parentName: 'Test Parent',
        parentEmail: 'test.parent@example.com',
        parentPhone: '0400 000 000',
        studentName: 'Test Student',
        yearLevel: 'Year 10',
        concerns: 'This is a test email sent from the script to verify Resend configuration.'
    });

    if (result.success) {
        console.log('✅ Email sent successfully!');
        if ((result as any).mocked) {
            console.log('⚠️  Note: Email was MOCKED (API Key missing or invalid in this context). Check console logs above.');
        }
    } else {
        console.error('❌ Failed to send email:', result.error);
    }
}

main().catch(console.error);
