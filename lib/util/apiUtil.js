import axios from "axios";
import Cookies from "js-cookie";

export const httpClient = axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(function (config) {
  const token = Cookies.get("token") || "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const getRequest = (url) => {
  return httpClient.get(url);
};

const postRequest = (url, body) => {
  return httpClient.post(url, body);
};

export const API_HANDLER = {
  getRequest,
  postRequest,
};
