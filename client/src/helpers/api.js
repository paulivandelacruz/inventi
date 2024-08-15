import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_LOCAL_API_URL;

export const registerUser = (formData) => {
  return axios.post(`${API_URL}/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};