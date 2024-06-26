import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function getCheckout(data) {
  return await authorizedHttpJson.post(`${api_url}/checkOut`, data);
}
