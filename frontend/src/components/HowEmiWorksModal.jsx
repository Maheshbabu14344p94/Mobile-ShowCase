import Modal from "./Modal.jsx";

const STEPS = [
  {
    title: "Pick a plan at checkout",
    body: "Choose a tenure from 3 to 60 months. Shorter tenures are interest-free; longer ones carry a fixed rate shown upfront.",
  },
  {
    title: "Your balance sits in a liquid fund",
    body: "The amount you haven't paid off yet — including your own down payment — stays invested in a liquid mutual fund instead of just sitting with a lender.",
  },
  {
    title: "You pay monthly, the fund keeps earning",
    body: "Each EMI installment is debited from the fund on schedule. Whatever's still parked there keeps accruing returns in the meantime.",
  },
  {
    title: "Cashback lands after the plan closes",
    body: "Finish the tenure and the plan's cashback is credited back to you — on top of whatever the fund itself earned along the way.",
  },
];

export default function HowEmiWorksModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="How EMI works">
      <p className="mb-6 text-sm leading-relaxed text-muted">
        A regular EMI is just a loan. Ours keeps your money working for you
        while you pay it off.
      </p>

      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet/40 bg-violet/10 font-display text-xs font-semibold text-violet-soft">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-line bg-void/50 p-4 text-xs leading-relaxed text-muted">
        Returns from mutual funds are market-linked and not guaranteed. This
        panel is illustrative for the assignment demo, not financial advice.
      </div>
    </Modal>
  );
}
