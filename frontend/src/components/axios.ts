import axios from "axios";

export const Axios = axios.create({
  baseURL: `/api`, // use env variable to determine url to retrieve from
  timeout: 12 * 1000,
});
