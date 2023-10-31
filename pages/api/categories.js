import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function getCategories() {
  return await httpJson.get(`${api_url}/categories`);
}
export async function getCategory(id) {
  return await httpJson.get(`${api_url}/categories/${id}`);
}
