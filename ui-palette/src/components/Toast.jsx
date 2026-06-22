/* eslint-disable react-refresh/only-export-components */
import { useState,createContext, useContext, useCallback } from "react";

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

/**
 * Wrap your app with ToastProvider to enable toast notifications.
 * Use const { toast } = useToast() to trigger them.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ message, type = "success", duration = 2000 }) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm animate-fade-in transition-all ${
              t.type === "success"
                ? "border-emerald-500/30 bg-emerald-950/80 text-emerald-300"
                : t.type === "error"
                ? "border-red-500/30 bg-red-950/80 text-red-300"
                : "border-slate-600 bg-slate-800/90 text-slate-200"
            }`}
          >
            {t.type === "success" && (
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" className="flex-shrink-0">
                <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}