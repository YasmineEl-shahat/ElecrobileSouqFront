import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function postCart(data) {
  return await authorizedHttpJson.post(`${api_url}/cards`, data);
}

export async function getMyCart() {
  return await authorizedHttpJson.get(`${api_url}/cards/myCards`);
}

export async function updateCartItem(id, data) {
  return await authorizedHttpJson.patch(`${api_url}/cards/${id}`, data);
}
export async function deleteCartItem(id) {
  return await authorizedHttpJson.delete(`${api_url}/cards/${id}`);
}
