import axios from "axios";

const ISSERVER = typeof window === "undefined";
export let savedToken;
export let refreshToken;

if (
  !ISSERVER &&
  localStorage.getItem("persist:root") &&
  JSON.parse(localStorage.getItem("persist:root"))?.token
) {
  savedToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.token
  );
}

if (
  !ISSERVER &&
  localStorage.getItem("persist:root") &&
  JSON.parse(localStorage.getItem("persist:root"))?.refreshToken
) {
  refreshToken = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.refreshToken
  );
}

export function setSavedToken(value) {
  savedToken = value;
}

export function setRefreshToken(value) {
  refreshToken = value;
}

// Initialize the token variable with the initial savedToken
let token = `Bearer ` + savedToken;

export let httpJson = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export let httpForm = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  },
});

export let authorizedHttpJson = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: token,
  },
});

export let authorizedHttpForm = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: token,
  },
});
