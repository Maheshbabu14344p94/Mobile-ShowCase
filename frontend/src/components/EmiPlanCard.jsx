function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={onSelect}
      className={[
        "group relative flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all",
        selected
          ? "border-violet bg-violet/10 shadow-glow"
          : "border-line bg-surface hover:border-violet/40 hover:bg-surface2",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <span
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected ? "border-violet bg-violet" : "border-line group-hover:border-violet-soft",
          ].join(" ")}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
        </span>

        <div>
          <p className="font-display text-base font-semibold text-ink">
            {formatINR(plan.monthlyAmount)}{" "}
            <span className="font-body text-sm font-normal text-muted">× {plan.tenureMonths} months</span>
          </p>
          {plan.cashback > 0 && (
            <p className="mt-0.5 text-xs text-mint">Additional cashback of {formatINR(plan.cashback)}</p>
          )}
        </div>
      </div>

      <span
        className={[
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
          plan.isZeroInterest ? "bg-mint/15 text-mint" : "bg-amber/15 text-amber",
        ].join(" ")}
      >
        {plan.isZeroInterest ? "0% interest" : `${plan.interestRate}% interest`}
      </span>
    </button>
  );
}
