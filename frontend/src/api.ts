import axios from "axios";

const API_BASE = "http://localhost:8000";

export const getProjects = () => axios.get(`${API_BASE}/projects`);

export const sendContact = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => axios.post(`${API_BASE}/contact`, data);