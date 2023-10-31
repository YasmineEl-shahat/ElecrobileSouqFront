import { api_url } from "../../config/config";
import { httpJson, refreshToken } from "../../config/http";

export async function userLogin(data) {
  return await httpJson.post(`${api_url}/auth/login`, data);
}

export async function userRegister(data) {
  return await httpJson.post(`${api_url}/auth/register`, data);
}

export async function userRefreshToken(
  data = JSON.stringify({ refreshToken })
) {
  return await httpJson.post(`${api_url}/auth/refreshToken`, data);
}
