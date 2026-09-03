import express from "express";
import cors from "cors";
import { db, initSchema } from "./db.js";

initSchema();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

function getVariantsForProduct(productId) {
  const variants = db
    .prepare(`SELECT * FROM variants WHERE product_id = ? ORDER BY id`)
    .all(productId);

  const planStmt = db.prepare(
    `SELECT id, tenure_months, monthly_amount, interest_rate, cashback, fund_backer
     FROM emi_plans WHERE variant_id = ? ORDER BY tenure_months`
  );

  return variants.map((v) => ({
    id: v.id,
    variantName: v.variant_name,
    storage: v.storage,
    color: v.color,
    colorHex: v.color_hex,
    mrp: v.mrp,
    price: v.price,
    imageUrl: v.image_url,
    frontImageUrl: v.front_image_url || v.image_url,
    backImageUrl: v.back_image_url || v.image_url,
    inStock: !!v.in_stock,
    emiPlans: planStmt.all(v.id).map((p) => ({
      id: p.id,
      tenureMonths: p.tenure_months,
      monthlyAmount: p.monthly_amount,
      interestRate: p.interest_rate,
      cashback: p.cashback,
      fundBacker: p.fund_backer,
      isZeroInterest: p.interest_rate === 0,
    })),
  }));
}

// GET /api/products - list all products with their first variant as a preview
app.get("/api/products", (req, res) => {
  const products = db.prepare(`SELECT * FROM products ORDER BY id`).all();

  const result = products.map((p) => {
    const variants = getVariantsForProduct(p.id);
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      description: p.description,
      variantCount: variants.length,
      preview: variants[0] ?? null,
    };
  });

  res.json({ count: result.length, products: result });
});

// GET /api/products/:slug - full product detail with all variants + EMI plans
app.get("/api/products/:slug", (req, res) => {
  const product = db
    .prepare(`SELECT * FROM products WHERE slug = ?`)
    .get(req.params.slug);

  if (!product) {
    return res.status(404).json({ error: `No product found for slug "${req.params.slug}"` });
  }

  res.json({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    variants: getVariantsForProduct(product.id),
  });
});

// POST /api/orders - "proceed with plan" mock checkout
app.post("/api/orders", (req, res) => {
  const { variantId, emiPlanId } = req.body ?? {};

  if (!variantId || !emiPlanId) {
    return res.status(400).json({ error: "variantId and emiPlanId are required" });
  }

  const variant = db.prepare(`SELECT * FROM variants WHERE id = ?`).get(variantId);
  const plan = db
    .prepare(`SELECT * FROM emi_plans WHERE id = ? AND variant_id = ?`)
    .get(emiPlanId, variantId);

  if (!variant || !plan) {
    return res.status(404).json({ error: "variant or EMI plan not found" });
  }

  res.status(201).json({
    orderId: `ORD-${Date.now()}`,
    status: "created",
    variant: variant.variant_name,
    tenureMonths: plan.tenure_months,
    monthlyAmount: plan.monthly_amount,
    message: "Order created. This is a demo endpoint - no real payment is processed.",
  });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`EMI store API listening on http://localhost:${PORT}`);
});
