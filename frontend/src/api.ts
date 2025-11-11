import axios from "axios";

const API_BASE = import.meta.env.VITE_SCOPE;

// Vercel serverless functions are served under /api
export const getProjects = () => axios.get(`${API_BASE}/api/projects`);

export const sendContact = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => axios.post(`${API_BASE}/api/contact`, data);