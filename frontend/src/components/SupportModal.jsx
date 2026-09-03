import { useState } from "react";
import Modal from "./Modal.jsx";

const FAQS = [
  {
    q: "What happens if I miss an EMI?",
    a: "The installment is retried from your linked account for a few days. Repeated misses can pause new interest-free offers on your account.",
  },
  {
    q: "Can I switch tenure after buying?",
    a: "Not on an active order. You can foreclose the remaining balance any time and it's recalculated with no extra fee.",
  },
  {
    q: "Where does the mutual fund investment go?",
    a: "Into a liquid fund folio held in your name, drawn down automatically as each EMI comes due.",
  },
  {
    q: "Is the cashback guaranteed?",
    a: "Yes — cashback shown on a plan is fixed at purchase and paid out once the tenure completes, regardless of fund performance.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-3 last:border-none">
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-medium text-ink">{q}</span>
        <span className={`text-muted transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>}
    </div>
  );
}

export default function SupportModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Support">
      <p className="mb-4 text-sm leading-relaxed text-muted">
        Common questions about orders and EMI plans. Can't find yours?
        Email{" "}
        <a href="mailto:support@nova.app" data-cursor="hover" className="text-violet-soft underline underline-offset-2">
          support@nova.app
        </a>
        .
      </p>

      <div>
        {FAQS.map((f) => (
          <FaqItem key={f.q} {...f} />
        ))}
      </div>
    </Modal>
  );
}
