import { VercelRequest, VercelResponse } from '@vercel/node';

import {Project} from '../src/types/Project'


export default function handler(req: VercelRequest, res: VercelResponse) {
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
    img_url: "https://res.cloudinary.com/dbfitrtz5/image/upload/v1762859296/logo_i1puov.png",
    },
];
  res.status(200).json(projects);
}