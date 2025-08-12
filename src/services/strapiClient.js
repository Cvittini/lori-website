// src/services/strapiClient.js
const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.REACT_APP_STRAPI_TOKEN || "";

// Use this to call Strapi REST API
export async function fetchStrapi(path, { method = "GET", params = {}, body } = {}) {
  const url = new URL(`${STRAPI_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    // support both primitives and arrays
    Array.isArray(v) ? v.forEach(val => url.searchParams.append(k, val)) : url.searchParams.append(k, v);
  });

  const headers = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

// Helper to build absolute URLs for Strapi media (images/files)
export function mediaUrl(possiblyRelative) {
  if (!possiblyRelative) return "";
  if (possiblyRelative.startsWith("http")) return possiblyRelative;
  return `${STRAPI_URL}${possiblyRelative}`;
}
