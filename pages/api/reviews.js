import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function getRatingReviews(product_id) {
  return await httpJson.get(`${api_url}/reviews/rating/${product_id}`);
}
