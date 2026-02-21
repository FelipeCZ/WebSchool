/**
 * Sanitização defensiva contra XSS.
 * Remove qualquer HTML e retorna apenas texto seguro.
 */
export function sanitize(value) {
  if (value === null || value === undefined) return "";

  const str = String(value);

  const temp = document.createElement("div");
  temp.textContent = str;

  return temp.innerHTML;
}