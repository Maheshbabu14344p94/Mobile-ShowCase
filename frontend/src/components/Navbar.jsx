import { Link } from "react-router-dom";

export default function Navbar({ onOpenEmi, onOpenSupport }) {
  return (
    <header className="nova-nav sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" data-cursor="hover" className="flex items-center gap-2.5">
          <span className="nova-logo flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-bold text-white">
            N
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">Nova</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link to="/" data-cursor="hover" className="nav-active transition-colors">
            Smartphones
          </Link>
          <button
            type="button"
            data-cursor="hover"
            onClick={onOpenEmi}
            className="text-muted transition-colors hover:text-ink"
          >
            How EMI works
          </button>
          <button
            type="button"
            data-cursor="hover"
            onClick={onOpenSupport}
            className="text-muted transition-colors hover:text-ink"
          >
            Support
          </button>
        </nav>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Plans backed by mutual funds
        </div>
      </div>
    </header>
  );
}
