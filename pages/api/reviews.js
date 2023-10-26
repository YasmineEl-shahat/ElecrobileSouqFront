import { api_url } from "../../config/config";
import { authorizedHttpJson, httpJson } from "../../config/http";

export async function getRatingReviews(product_id) {
  return await httpJson.get(`${api_url}/reviews/rating/${product_id}`);
}

export async function addReview(data) {
  return await authorizedHttpJson.post(`${api_url}/reviews/`, data);
}
