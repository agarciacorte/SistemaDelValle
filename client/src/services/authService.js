import axios from 'axios';

export const API_URL = 'http://localhost:3001/api';


export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.data.token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  const [, payload] = token.split('.');
  const { exp } = JSON.parse(atob(payload));
  return exp * 1000 > Date.now();
};
