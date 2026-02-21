let accessToken = null;

export function setSession(tokens) {
  accessToken = tokens.accessToken;
  sessionStorage.setItem("refreshToken", tokens.refreshToken);
}

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function clearSession() {
  accessToken = null;
  sessionStorage.clear();
}