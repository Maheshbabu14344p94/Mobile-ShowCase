import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "db", "store.sqlite");

export const db = new DatabaseSync(DB_PATH);

export function initSchema() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS products (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      brand       TEXT NOT NULL,
      category    TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS variants (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id   INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      variant_name TEXT NOT NULL,
      storage      TEXT,
      color        TEXT,
      color_hex    TEXT,
      mrp          INTEGER NOT NULL,
      price        INTEGER NOT NULL,
      image_url    TEXT NOT NULL,
      front_image_url TEXT,
      back_image_url  TEXT,
      in_stock     INTEGER NOT NULL DEFAULT 1,
      UNIQUE(product_id, variant_name)
    );

    CREATE TABLE IF NOT EXISTS emi_plans (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      variant_id     INTEGER NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
      tenure_months  INTEGER NOT NULL,
      monthly_amount INTEGER NOT NULL,
      interest_rate  REAL NOT NULL DEFAULT 0,
      cashback       INTEGER NOT NULL DEFAULT 0,
      fund_backer    TEXT NOT NULL DEFAULT 'Liquid Mutual Fund'
    );

    CREATE INDEX IF NOT EXISTS idx_variants_product ON variants(product_id);
    CREATE INDEX IF NOT EXISTS idx_plans_variant ON emi_plans(variant_id);
  `);

  const columns = db.prepare(`PRAGMA table_info(variants)`).all().map((column) => column.name);
  if (!columns.includes("front_image_url")) db.exec(`ALTER TABLE variants ADD COLUMN front_image_url TEXT`);
  if (!columns.includes("back_image_url")) db.exec(`ALTER TABLE variants ADD COLUMN back_image_url TEXT`);
}
