import jwtDecode from "jwt-decode";

export const checkToken = (token) => {
  if (!token) return false;
  // Decode the refreshToken to access its claims, including 'exp'
  const decodedToken = jwtDecode(token);

  // Get the current timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Check if the token has expired
  return decodedToken.exp > currentTimestamp;
};
