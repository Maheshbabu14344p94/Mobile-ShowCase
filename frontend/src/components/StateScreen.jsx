export function LoadingScreen({ label = "Loading" }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-violet" />
      <p className="text-sm">{label}…</p>
    </div>
  );
}

export function ErrorScreen({ message }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-3 text-center">
      <p className="font-display text-lg text-ink">Something didn't load</p>
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
