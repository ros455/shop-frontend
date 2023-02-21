import axios from "axios";

const inctance = axios.create({
  baseURL: 'http://localhost:3333',
});

inctance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default inctance;