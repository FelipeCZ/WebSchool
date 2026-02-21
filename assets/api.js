import { getAccessToken, getRefreshToken, setSession, clearSession } from "./session.js";

const API = "https://school-api.v2core.com.br";

async function refreshToken() {
  const res = await fetch(`${API}/api/account/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: getRefreshToken() })
  });

  if (!res.ok) throw new Error();
  const data = await res.json();
  setSession(data);
  return data.accessToken;
}

export async function api(path, options = {}) {
  let token = getAccessToken();

  const doFetch = (t) => fetch(API + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(t && { Authorization: `Bearer ${t}` })
    }
  });

  let res = await doFetch(token);

  if (res.status === 401) {
    try {
      const newToken = await refreshToken();
      res = await doFetch(newToken);
    } catch {
      clearSession();
      window.location.href = "index.html";
    }
  }

  if (!res.ok) throw new Error();
  return res.json();
}