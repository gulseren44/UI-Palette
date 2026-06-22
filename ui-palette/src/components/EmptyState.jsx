/**
 * Shown when there are no palettes to display.
 */
export default function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
          <circle cx="10" cy="10" r="6" fill="#6366f1" fillOpacity="0.7" />
          <circle cx="26" cy="10" r="6" fill="#38bdf8" fillOpacity="0.5" />
          <circle cx="10" cy="26" r="6" fill="#34d399" fillOpacity="0.4" />
          <circle cx="26" cy="26" r="6" fill="#f59e0b" fillOpacity="0.6" />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-white">Henüz palet yok</h3>
      <p className="mt-2 max-w-xs text-sm text-slate-400">
        İlk renk paletini oluşturmak için aşağıdaki butona tıkla.
      </p>
      <button
        onClick={onAdd}
        className="mt-6 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 active:scale-95"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        İlk Paletini Oluştur
      </button>
    </div>
  );
}