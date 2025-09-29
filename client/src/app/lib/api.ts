import axios from "axios";

const API_URL = "http://localhost:8000";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("phone", data.phone);
  formData.append("role", data.role);

  return axios.post("http://localhost:8000/register/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const loginUser = (data: { email: string; password: string }) => {
  return axios.post(`${API_URL}/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
};
