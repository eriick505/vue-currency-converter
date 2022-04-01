import axios from "axios";
import type { AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;
const apiKey = import.meta.env.VITE_API_KEY;

export const api = axios.create({
  baseURL: `${apiUrl}/${apiKey}/latest`,
});

export type ResponseData<T> = AxiosResponse<T>;
