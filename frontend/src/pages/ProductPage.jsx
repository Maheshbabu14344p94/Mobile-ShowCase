import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client.js";
import EmiPlanCard from "../components/EmiPlanCard.jsx";
import { ErrorScreen, LoadingScreen } from "../components/StateScreen.jsx";

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setProduct(null);
    setOrder(null);
    api.getProduct(slug).then((data) => {
      setProduct(data);
      setVariantId(data.variants[0]?.id ?? null);
      setPlanId(data.variants[0]?.emiPlans[0]?.id ?? null);
    }).catch((requestError) => setError(requestError.message));
  }, [slug]);

  const variant = useMemo(() => product?.variants.find((item) => item.id === variantId), [product, variantId]);
  const plan = useMemo(() => variant?.emiPlans.find((item) => item.id === planId), [variant, planId]);
  const storages = useMemo(() => [...new Set(product?.variants.map((item) => item.storage) ?? [])], [product]);
  const finishes = useMemo(() => product?.variants.filter((item) => item.storage === variant?.storage) ?? [], [product, variant]);

  function chooseVariant(nextVariant) {
    setVariantId(nextVariant.id);
    const sameTenure = nextVariant.emiPlans.find((item) => item.tenureMonths === plan?.tenureMonths);
    setPlanId((sameTenure ?? nextVariant.emiPlans[0])?.id ?? null);
  }

  async function continuePurchase() {
    if (!variant || !plan) return;
    setSubmitting(true);
    try { setOrder(await api.createOrder(variant.id, plan.id)); } catch (requestError) { setError(requestError.message); } finally { setSubmitting(false); }
  }

  if (error) return <ErrorScreen message={error} />;
  if (!product || !variant) return <LoadingScreen label="Preparing product" />;

  return (
    <main className="product-page mx-auto max-w-7xl px-5 pb-24 pt-7 sm:px-8">
      <Link to="/" className="back-link">← Collection</Link>
      <header className="product-intro fade-up"><p className="eyebrow">{product.brand} / {variant.color}</p><h1 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-ink md:text-8xl">{product.name}</h1></header>
      <div className="product-layout">
        <section className="product-gallery product-tone-1 fade-up"><div className="gallery-label"><span>01</span><span>Product study</span></div><img src={variant.imageUrl} alt={`${product.name} in ${variant.color}`} /><div className="gallery-caption"><span>Designed for the everyday extraordinary.</span><span>{variant.color}</span></div></section>
        <aside className="purchase-panel fade-up" style={{ animationDelay: "100ms" }}>
          <div className="purchase-price"><span>{money(variant.price)}</span>{variant.mrp > variant.price && <del>{money(variant.mrp)}</del>}</div>
          <p className="purchase-note">Flexible monthly ownership, backed by mutual funds.</p>
          {storages.length > 1 && <div className="choice-block"><div className="choice-heading"><span>Storage</span><strong>{variant.storage}</strong></div><div className="choice-buttons">{storages.map((storage) => { const match = product.variants.find((item) => item.storage === storage && item.color === variant.color) ?? product.variants.find((item) => item.storage === storage); return <button key={storage} type="button" className={storage === variant.storage ? "selected" : ""} onClick={() => match && chooseVariant(match)}>{storage}</button>; })}</div></div>}
          <div className="choice-block"><div className="choice-heading"><span>Finish</span><strong>{variant.color}</strong></div><div className="swatch-row">{finishes.map((item) => <button key={item.id} type="button" title={item.color} aria-label={item.color} className={item.id === variant.id ? "selected" : ""} style={{ backgroundColor: item.colorHex }} onClick={() => chooseVariant(item)} />)}</div></div>
          <div className="emi-heading"><span>Choose your rhythm</span><span>EMI / month</span></div><div className="emi-list">{variant.emiPlans.map((item) => <EmiPlanCard key={item.id} plan={item} selected={item.id === planId} onSelect={() => setPlanId(item.id)} />)}</div>
          <button type="button" className="purchase-button" disabled={submitting} onClick={continuePurchase}>{submitting ? "Creating order..." : `Continue with ${money(plan?.monthlyAmount ?? 0)} / month`}</button>
          {order && <div className="order-success"><strong>Order {order.orderId}</strong><span>{order.message}</span></div>}<p className="legal-copy">No hidden interest on eligible plans. Your unused capital continues working while you repay.</p>
        </aside>
      </div>
    </main>
  );
}