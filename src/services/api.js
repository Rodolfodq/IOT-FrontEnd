import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44373/api",
});

export default api;
