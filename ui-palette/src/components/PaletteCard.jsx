import { useState } from "react";
import ColorSwatch from "./ColorSwatch";

/**
 * Card representing a single palette in the grid.
 * Shows color swatches, title, description, edit & delete actions.
 */
export default function PaletteCard({ palette, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(palette.id);
    } else {
      setConfirmDelete(true);
      // Auto-cancel confirm state after 3s
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  // Generate a gradient preview from the palette's colors
  const gradientStyle = {
    background: `linear-gradient(135deg, ${palette.colors.join(", ")})`,
  };

  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/60 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1">
      {/* Gradient banner */}
      <div
        className="h-20 w-full rounded-t-2xl"
        style={gradientStyle}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Title & description */}
        <div>
          <h2 className="text-base font-semibold text-white leading-tight">
            {palette.title}
          </h2>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {palette.description}
          </p>
        </div>

        {/* Color swatches */}
        <div className="flex flex-wrap gap-2">
          {palette.colors.map((hex, i) => (
            <ColorSwatch key={i} hex={hex} size="md" />
          ))}
        </div>

        {/* HEX codes row */}
        <div className="flex flex-wrap gap-1.5">
          {palette.colors.map((hex, i) => (
            <span
              key={i}
              className="rounded-md bg-slate-900/70 px-2 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700/50"
            >
              {hex}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <button
            onClick={() => onEdit(palette)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-500 hover:text-violet-400"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
              <path
                d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Düzenle
          </button>

          <button
            onClick={handleDelete}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              confirmDelete
                ? "bg-red-600/20 border border-red-500 text-red-400"
                : "border border-slate-600 text-slate-400 hover:border-red-500/60 hover:text-red-400"
            }`}
          >
            {confirmDelete ? (
              <>
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Emin misin?
              </>
            ) : (
              <>
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M2 3h8M4.5 3V2h3v1M5 5.5v3m2-3v3M3 3l.5 7h5L9 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sil
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}