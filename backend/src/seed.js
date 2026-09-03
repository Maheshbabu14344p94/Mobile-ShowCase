import { db, initSchema } from "./db.js";

// Tenure ladder mirroring the reference design: short tenures are
// interest-free, longer tenures carry interest. Every plan is backed
// by a liquid mutual fund that continues earning while you repay.
const TENURE_LADDER = [
  { months: 3, rate: 0 },
  { months: 6, rate: 0 },
  { months: 12, rate: 0 },
  { months: 24, rate: 0 },
  { months: 36, rate: 10.5 },
  { months: 48, rate: 10.5 },
  { months: 60, rate: 10.5 },
];

function buildEmiPlans(price) {
  return TENURE_LADDER.map(({ months, rate }) => {
    let monthly;
    if (rate === 0) {
      monthly = price / months;
    } else {
      const r = rate / 100 / 12;
      monthly = (price * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }
    const cashback = Math.round(price * 0.03 * 100) / 100; // flat ~3% cashback, rounded
    return {
      tenure_months: months,
      monthly_amount: Math.round(monthly),
      interest_rate: rate,
      cashback: Math.round(cashback / 10) * 10,
    };
  });
}

const PRODUCTS = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "Smartphones",
    description:
      "Titanium design, A19 Pro chip, and a pro camera system built for anyone who shoots first and asks questions later.",
    variants: [
      {
        variant_name: "256GB · Cosmic Orange",
        storage: "256GB",
        color: "Cosmic Orange",
        color_hex: "#C9622B",
        mrp: 134900,
        price: 127400,
        image_url: "/images/iphone-17-pro-orange.jpg",
        front_image_url: "/images/iphone-17-pro-orange.jpg",
        back_image_url: "/images/iphone-17-pro-orange.jpg",
      },
      {
        variant_name: "256GB · Silver",
        storage: "256GB",
        color: "Silver",
        color_hex: "#E4E4E7",
        mrp: 134900,
        price: 129900,
        image_url: "/images/iphone-17-pro-silver.jpg",
        front_image_url: "/images/iphone-17-pro-silver.jpg",
        back_image_url: "/images/iphone-17-pro-silver.jpg",
      },
      {
        variant_name: "512GB · Deep Blue",
        storage: "512GB",
        color: "Deep Blue",
        color_hex: "#25344D",
        mrp: 154900,
        price: 148900,
        image_url: "/images/iphone-17-pro-blue.jpg",
        front_image_url: "/images/iphone-17-pro-blue.jpg",
        back_image_url: "/images/iphone-17-pro-blue.jpg",
      },
    ],
  },
  {
    slug: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    description:
      "A 200MP sensor, built-in S Pen, and a titanium frame for people who treat their phone like a pocket studio.",
    variants: [
      {
        variant_name: "256GB · Black",
        storage: "256GB",
        color: "Black",
        color_hex: "#17181C",
        mrp: 129999,
        price: 119999,
        image_url: "/images/s26-ultra-black.png",
        front_image_url: "/images/s26-ultra-black.png",
        back_image_url: "/images/s26-ultra-black.png",
      },
      {
        variant_name: "256GB · Sky Blue",
        storage: "256GB",
        color: "Sky Blue",
        color_hex: "#AFC9DC",
        mrp: 129999,
        price: 121999,
        image_url: "/images/s26-ultra-skyblue.png",
        front_image_url: "/images/s26-ultra-skyblue.png",
        back_image_url: "/images/s26-ultra-skyblue.png",
      },
      {
        variant_name: "512GB · Cobalt Violet",
        storage: "512GB",
        color: "Cobalt Violet",
        color_hex: "#7A6FA6",
        mrp: 144999,
        price: 134999,
        image_url: "/images/s26-ultra-violet.png",
        front_image_url: "/images/s26-ultra-violet.png",
        back_image_url: "/images/s26-ultra-violet.png",
      },
    ],
  },
  {
    slug: "oneplus-15",
    name: "OnePlus 15",
    brand: "OnePlus",
    category: "Smartphones",
    description:
      "Snapdragon 8 Elite Gen 5, a 7300mAh battery and a 165Hz display, tuned for speed without the flagship price tag.",
    variants: [
      {
        variant_name: "512GB · Sand Storm",
        storage: "512GB",
        color: "Sand Storm",
        color_hex: "#D9CDBA",
        mrp: 79999,
        price: 73999,
        image_url: "/images/oneplus-15-sandstorm.png",
        front_image_url: "/images/oneplus-15-sandstorm.png",
        back_image_url: "/images/oneplus-15-sandstorm.png",
      },
      {
        variant_name: "256GB · Infinite Black",
        storage: "256GB",
        color: "Infinite Black",
        color_hex: "#1B1C20",
        mrp: 69999,
        price: 64999,
        image_url: "/images/oneplus-15-black.png",
        front_image_url: "/images/oneplus-15-black.png",
        back_image_url: "/images/oneplus-15-black.png",
      },
    ],
  },
];

function seed() {
  initSchema();

  db.exec("DELETE FROM emi_plans; DELETE FROM variants; DELETE FROM products;");

  const insertProduct = db.prepare(
    `INSERT INTO products (slug, name, brand, category, description) VALUES (?, ?, ?, ?, ?)`
  );
  const insertVariant = db.prepare(
    `INSERT INTO variants (product_id, variant_name, storage, color, color_hex, mrp, price, image_url, front_image_url, back_image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertPlan = db.prepare(
    `INSERT INTO emi_plans (variant_id, tenure_months, monthly_amount, interest_rate, cashback)
     VALUES (?, ?, ?, ?, ?)`
  );

  for (const product of PRODUCTS) {
    const { lastInsertRowid: productId } = insertProduct.run(
      product.slug,
      product.name,
      product.brand,
      product.category,
      product.description
    );

    for (const variant of product.variants) {
      const { lastInsertRowid: variantId } = insertVariant.run(
        productId,
        variant.variant_name,
        variant.storage,
        variant.color,
        variant.color_hex,
        variant.mrp,
        variant.price,
        variant.image_url,
        variant.front_image_url,
        variant.back_image_url
      );

      for (const plan of buildEmiPlans(variant.price)) {
        insertPlan.run(
          variantId,
          plan.tenure_months,
          plan.monthly_amount,
          plan.interest_rate,
          plan.cashback
        );
      }
    }
  }

  console.log(`Seeded ${PRODUCTS.length} products successfully.`);
}

seed();
