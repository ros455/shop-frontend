import axios from "axios";

const inctance = axios.create({
  baseURL: 'https://new-backend-book-shop-1.onrender.com',
});

inctance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default inctance;