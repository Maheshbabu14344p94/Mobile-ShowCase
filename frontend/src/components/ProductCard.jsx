import { Link } from "react-router-dom";
import TiltCard from "./TiltCard.jsx";

function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product, index }) {
  const { preview } = product;
  const lowestEmi = preview?.emiPlans?.reduce(
    (min, p) => (p.monthlyAmount < min ? p.monthlyAmount : min),
    Infinity
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      data-cursor="hover"
      className="fade-up group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <TiltCard maxTilt={7} className="rounded-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface2 to-surface p-6 shadow-card transition-colors group-hover:border-violet/40">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/10 blur-3xl transition-opacity group-hover:opacity-100" />

          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">{product.brand}</p>
              <h3 className="font-display text-xl font-semibold text-ink">{product.name}</h3>
            </div>
            <span className="rounded-full border border-line bg-void/60 px-2.5 py-1 text-[11px] text-muted">
              {product.variantCount} variants
            </span>
          </div>

          <div className="product-card-photo mx-auto flex h-56 w-full items-center justify-center">
            <img src={preview?.imageUrl} alt={`${product.name} ${preview?.color}`} loading="lazy" />
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
            <div>
              <p className="text-lg font-semibold text-ink">{formatINR(preview?.price ?? 0)}</p>
              {preview?.mrp > preview?.price && (
                <p className="text-xs text-muted line-through">{formatINR(preview.mrp)}</p>
              )}
            </div>
            {Number.isFinite(lowestEmi) && (
              <div className="text-right">
                <p className="text-xs text-muted">EMI from</p>
                <p className="text-sm font-medium text-mint">{formatINR(lowestEmi)}/mo</p>
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
