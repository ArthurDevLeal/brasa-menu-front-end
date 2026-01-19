import axios from "axios";

const apiPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublic;
