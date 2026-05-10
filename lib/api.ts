export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4003";
  
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}
