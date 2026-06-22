/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

const EMPTY_COLORS = ["#6366f1", "#38bdf8", "#34d399", "#f59e0b"];

/**
 * Modal form for creating or editing a palette.
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Object|null} props.palette - Palette to edit (null = create mode)
 * @param {Function} props.onSave - Called with { title, colors, description }
 * @param {Function} props.onClose - Called when modal should close
 */
export default function PaletteForm({ open, palette, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([...EMPTY_COLORS]);
  const [hexInputs, setHexInputs] = useState([...EMPTY_COLORS]);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

// Populate form when editing (React 19 optimized with async microtask)
  useEffect(() => {
    // State güncellemelerini asenkron kuyruğa alarak React 19 cascading render uyarısını engelliyoruz
    const timer = setTimeout(() => {
      if (palette) {
        setTitle(palette.title);
        setDescription(palette.description);
        const padded = [...palette.colors];
        while (padded.length < 4) padded.push("#ffffff");
        setColors(padded.slice(0, 8));
        setHexInputs(padded.slice(0, 8));
      } else {
        setTitle("");
        setDescription("");
        setColors([...EMPTY_COLORS]);
        setHexInputs([...EMPTY_COLORS]);
      }
      setErrors({});
    }, 0);

    return () => clearTimeout(timer);
  }, [palette, open]);

  // Focus title on open
  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 100);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Palet adı zorunludur.";
    if (!description.trim()) errs.description = "Açıklama zorunludur.";
    colors.forEach((c, i) => {
      if (!/^#[0-9A-Fa-f]{6}$/.test(c)) errs[`color${i}`] = "Geçersiz HEX";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleColorChange = (i, value) => {
    const next = [...colors];
    next[i] = value;
    setColors(next);
    const nextHex = [...hexInputs];
    nextHex[i] = value;
    setHexInputs(nextHex);
  };

  const handleHexInput = (i, value) => {
    const nextHex = [...hexInputs];
    nextHex[i] = value;
    setHexInputs(nextHex);
    // Only update color picker if valid HEX
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const next = [...colors];
      next[i] = value;
      setColors(next);
    }
  };

  const addColor = () => {
    if (colors.length < 8) {
      setColors([...colors, "#ffffff"]);
      setHexInputs([...hexInputs, "#ffffff"]);
    }
  };

  const removeColor = (i) => {
    if (colors.length > 4) {
      setColors(colors.filter((_, idx) => idx !== i));
      setHexInputs(hexInputs.filter((_, idx) => idx !== i));
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ title: title.trim(), colors, description: description.trim() });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 px-6 py-4">
          <h2 className="text-base font-semibold text-white">
            {palette ? "Paleti Düzenle" : "Yeni Palet Oluştur"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Palet Adı <span className="text-red-400">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="örn: Neon City"
              className={`w-full rounded-lg border bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-violet-500 ${
                errors.title ? "border-red-500" : "border-slate-600"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Açıklama <span className="text-red-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Bu paletin amacını kısaca anlat..."
              className={`w-full resize-none rounded-lg border bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-violet-500 ${
                errors.description ? "border-red-500" : "border-slate-600"
              }`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
          </div>

          {/* Colors */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">
                Renkler ({colors.length}/8) <span className="text-red-400">*</span>
              </label>
              {colors.length < 8 && (
                <button
                  onClick={addColor}
                  className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Renk Ekle
                </button>
              )}
            </div>

            <div className="space-y-3">
              {colors.map((color, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Color picker */}
                  <label className="relative flex-shrink-0 cursor-pointer">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(i, e.target.value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <div
                      className="h-10 w-10 rounded-lg border-2 border-slate-600 shadow-inner transition hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                  </label>

                  {/* HEX input */}
                  <input
                    type="text"
                    value={hexInputs[i]}
                    onChange={(e) => handleHexInput(i, e.target.value)}
                    placeholder="#000000"
                    maxLength={7}
                    className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-sm text-white placeholder-slate-600 outline-none transition focus:ring-2 focus:ring-violet-500 ${
                      errors[`color${i}`] ? "border-red-500" : "border-slate-600"
                    }`}
                  />

                  {/* Remove button (only if > 4 colors) */}
                  {colors.length > 4 ? (
                    <button
                      onClick={() => removeColor(i)}
                      className="flex-shrink-0 rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                        <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  ) : (
                    <div className="w-8 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <p className="mb-2 text-xs font-medium text-slate-300">Önizleme</p>
            <div
              className="h-12 w-full rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${colors.join(", ")})`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-700/60 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 active:scale-95"
          >
            {palette ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}