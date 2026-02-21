import { api } from "./api.js";
import { setSession, clearSession, getAccessToken } from "./session.js";

export async function login(email, password) {
  const data = await api("/api/account/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  setSession(data);
}

export function requireAuth() {
  if (!getAccessToken()) {
    window.location.href = "index.html";
  }
}

export function logout(button) {
  button.onclick = () => {
    clearSession();
    window.location.href = "index.html";
  };
}