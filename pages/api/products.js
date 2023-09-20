import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function getProducts() {
  await httpJson.get(`${api_url}/products`);
}
