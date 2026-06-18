// utils/tokenExpired.js
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    return payload.exp < Date.now() / 1000; // exp is seconds, Date.now() is ms
  } catch {
    return true; // malformed token → treat as expired
  }
}
