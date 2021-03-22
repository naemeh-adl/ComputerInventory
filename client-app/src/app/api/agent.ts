import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Computer } from "../models/computer";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(100);
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
      case 400:
        toast.error("Invalid Data!");
        break;
      case 401:
        toast.error("unAuthorized!");
        break;
      case 404:
        toast.error("not found!");
        break;
      case 500:
        toast.error("server error!");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Computers = {
  list: () => requests.get<Computer[]>("/Computers"),
  details: (id: string) => requests.get<Computer>(`/Computers/${id}`),
  create: (Computer: Computer) => axios.post<void>("/Computers", Computer),
  update: (Computer: Computer) =>
    axios.put<void>(`/Computers/${Computer.id}`, Computer),
  delete: (id: string) => axios.delete<void>(`/Computers/${id}`),
};

const agent = {
  Computers,
};

export default agent;
