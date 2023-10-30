import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function postWishList(data) {
  return await authorizedHttpJson.post(`${api_url}/favorites`, data);
}

export async function getMyWishList() {
  return await authorizedHttpJson.get(`${api_url}/favorites/myFavorites`);
}

export async function deleteWishListItem(id) {
  return await authorizedHttpJson.delete(`${api_url}/favorites/${id}`);
}
