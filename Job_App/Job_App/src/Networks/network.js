import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const NetWorkCalls = async ({
  baseBackendUrl=backend_url || "http://127.0.0.1:8000",
  endpoint,
  method,
  data = null,
  ignoreCookie = false,
}) => {
  try {
    const url = `${baseBackendUrl}/${endpoint}`;
    method = method.toUpperCase();

    let accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    let headers = {};

    if (!ignoreCookie) {
      if (!accessToken) {
        console.warn("No access token found");
        return;
      }

      headers.Authorization = `Bearer ${accessToken}`;

      const decodedAccess = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedAccess.exp < currentTime) {
        if (!refreshToken) {
          console.warn("Refresh token missing. Login required.");
          return;
        }

        const decodedRefresh = jwtDecode(refreshToken);

        if (decodedRefresh.exp < currentTime) {
          console.warn("Refresh token expired. Login required.");
          return;
        }

        // Get new access token
        const refreshRes = await axios.get(
          `${backend_url}/auth/token/new`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        accessToken = refreshRes.data.access_token;
        Cookies.set("access_token", accessToken);
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    let response;

    if (method === "GET") response = await axios.get(url, { headers });
    if (method === "POST") response = await axios.post(url, data, { headers });
    if (method === "PUT") response = await axios.put(url, data, { headers });
    if (method === "DELETE") response = await axios.delete(url, { headers });
    if (method === "PATCH") response = await axios.patch(url, data, { headers });

    return response.data;
  } catch (err) {
    console.error("Network Error:", err);
    throw err;
  }
};
