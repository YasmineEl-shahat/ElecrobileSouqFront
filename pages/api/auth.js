import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function userLogin(data) {
  return await httpJson.post(`${api_url}/auth/login`, data);
}

export async function userRegister(data) {
  return await httpJson.post(`${api_url}/auth/register`, data);
}

export async function refreshToken() {
  return await authorizedHttpJson.post(`${api_url}/auth/refreshToken`);
}
