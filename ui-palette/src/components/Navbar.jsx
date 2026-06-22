export default function Navbar({ onAddClick }) {
 
  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="4" cy="4" r="3" fill="white" fillOpacity="0.9" />
              <circle cx="12" cy="4" r="3" fill="white" fillOpacity="0.6" />
              <circle cx="4" cy="12" r="3" fill="white" fillOpacity="0.4" />
              <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.8" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            UI<span className="text-cyan-400">Palette</span>
          </span>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-xs text-slate-500">Renk paleti tasarımcısı</span>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 active:scale-95"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Yeni Palet
          </button>
        </div>

        {/* Mobile add button */}
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white sm:hidden"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Ekle
        </button>
      </div>
    </header>
  );
}