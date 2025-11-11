import axios from "axios";

const API_BASE = import.meta.env.VITE_SCOPE;

export const getProjects = () => axios.get(`${API_BASE}/projects`);

export const sendContact = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => axios.post(`${API_BASE}/contact`, data);