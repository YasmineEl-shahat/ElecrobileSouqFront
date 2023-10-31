import { api_url } from "../../config/config";
import { httpJson } from "../../config/http";

export async function searchProduct(params) {
  let url = `${api_url}/products?`;
  const entries = Object.entries(params);
  entries.forEach(([key, value], index) => {
    url += key + "=" + value;
    if (index !== entries.length - 1) {
      url += "&";
    }
  });
  return await httpJson.get(url);
}
