import { api_url } from "../../config/config";
import { authorizedHttpJson } from "../../config/http";

export async function postBidding(data) {
  return await authorizedHttpJson.post(`${api_url}/biddings`, data);
}
