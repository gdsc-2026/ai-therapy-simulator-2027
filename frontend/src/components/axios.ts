import axios from "axios";

export const Axios = axios.create({
  baseURL: `http://127.0.0.1:8000`, // use env variable to determine url to retrieve from
  timeout: 30 * 1000,
});
