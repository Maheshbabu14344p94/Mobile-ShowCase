const BASE = "/api";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  listProducts: () => request("/products"),
  getProduct: (slug) => request(`/products/${slug}`),
  createOrder: (variantId, emiPlanId) =>
    request("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId, emiPlanId }),
    }),
};
