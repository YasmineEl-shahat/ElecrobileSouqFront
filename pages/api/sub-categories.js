import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function getSubCategoryForCategory(id) {
  return await httpJson.get(`${api_url}/categories/${id}/subCategories`);
}
