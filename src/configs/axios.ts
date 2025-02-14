import axios from "axios";

const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
