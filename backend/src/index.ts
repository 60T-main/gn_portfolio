import app from "./server.js";
import cors from 'cors';
import { Project } from './types/Project.js';
import { ContactMessage } from './types/ContactMessage.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


app.use(cors());


const projects: Project[] = [
{    title: "SHISHI | Official website",
    description: "I designed and developed the official website for SHISHI, an independent music label known for its clean groundbreaking underground discography. The project focused on creating a minimal, high‑impact digital presence that reflects the brand’s identity while ensuring a smooth user experience.",
    timeline: "Oct 2025 - Nov 2025",
    techStack: ["React","Next.js","Three.js", "PostgreSQL", "Javascript", "HTML5","TailwindCSS"],
    link: "https://www.shishi.ge/",
        status: "completed",
    img_url: "https://res.cloudinary.com/dbfitrtz5/image/upload/v1762530014/logo_v6ge32.svg",
    },
    {    title: "CEYO | Official website",
    description: "CEYO is a full-stack e-commerce web application, featuring a modern React frontend and a robust Django backend. The platform allows users to browse products, filter by categories and subcategories, manage orders, and interact with a modern, dynamic UI. The project demonstrates advanced REACT state management, seamless frontend-backend integration, and a scalable architecture suitable for real-world deployment.",
    timeline: "Sep 2025 - Nov 2025",
    techStack: ["React","Next.js","Three.js", "PostgreSQL", "Javascript", "HTML5","TailwindCSS"],
        link: "https://ceyo.netlify.app/",
        status: "developing",
    img_url: "https://res.cloudinary.com/dbfitrtz5/image/upload/v1762526473/Screenshot_2025-11-03_164327_cukyvb.png",
    },
];




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

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.post('/contact', async (req, res)=> {
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
})

app.listen(8000, () => {
    console.log("Server is running on: localhost:8000 ");
})



