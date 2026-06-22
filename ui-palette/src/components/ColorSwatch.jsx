import { useState } from "react";

/**
 * A single color swatch that copies HEX to clipboard on click.
 */
export default function ColorSwatch({ hex, size = "md" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = hex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const sizeClasses = {
    sm: "h-7 w-7 rounded-md",
    md: "h-10 w-10 rounded-lg",
    lg: "h-14 flex-1 rounded-xl",
  };

  return (
    <button
      onClick={handleCopy}
      title={`Kopyala: ${hex}`}
      className={`relative group ${sizeClasses[size]} transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/30`}
      style={{ backgroundColor: hex }}
    >
      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-[10px] font-mono text-slate-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap border border-slate-700">
        {hex}
      </span>

      {/* "Kopyalandı!" overlay */}
      {copied && (
        <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 text-[9px] font-bold text-white">
          ✓
        </span>
      )}
    </button>
  );
}