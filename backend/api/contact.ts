import { ContactMessage } from '../src/types/ContactMessage';
import nodemailer from 'nodemailer';


import { VercelRequest, VercelResponse } from '@vercel/node';


export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers for cross-origin requests from the frontend
    const allowedOrigin = 'https://gn-portfolio-frontend.vercel.app';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Preflight request
        return res.status(204).end();
    }

    if (req.method !== "POST") {
  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}

    const message: ContactMessage = req.body;

    if (!message.name || !message.email || !message.message) {
  return res.status(400).json({ success: false, message: "All fields are required." });
}

    const result = await sendMail(message);
    const parsed = JSON.parse(result);
    
    if (parsed.success) {
        res.status(201).json(parsed);
    } else {
        res.status(500).json(parsed);
    }
}

    const sendMail = async (message: ContactMessage) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: message.subject,
            text: `name:${message.name}, message:${message.message}`,
        });

        return JSON.stringify({ success: true, message: "email sent successfully!" })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            return JSON.stringify({ success: false, message: error.message })
        } else {
            console.error("Unexpected error", error);
            return JSON.stringify({ success: false, message: `unexpected error` })
        }

    }
    }
