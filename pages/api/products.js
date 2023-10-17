import { api_url } from "../../config/config";
import { authorizedHttpJson, httpJson } from "../../config/http";

export async function getProducts(limit = "") {
  return await httpJson.get(`${api_url}/products?limit=${limit}`);
}
export async function getProduct(id) {
  return await httpJson.get(`${api_url}/products/${id}`);
}

export async function getBrands() {
  return await httpJson.get(`${api_url}/brands`);
}

export async function getBiddings() {
  return await authorizedHttpJson.get(`${api_url}/biddings`);
}
