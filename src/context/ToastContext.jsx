import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0" />,
  error:   <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />,
  info:    <Info size={16} className="text-violet-400 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />,
};

const borders = {
  success: 'border-teal-500/20',
  error:   'border-rose-500/20',
  info:    'border-violet-500/20',
  warning: 'border-amber-500/20',
};

function ToastItem({ toast, onDismiss }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 px-4 py-3 rounded-2xl glass-strong border ${borders[toast.type]} shadow-[0_16px_48px_rgba(0,0,0,0.5)] max-w-sm w-full`}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-white mb-0.5">{toast.title}</p>
        )}
        <p className="text-sm text-white/60 leading-snug">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-white/30 hover:text-white/70 transition-colors mt-0.5"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const toast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t.slice(-3), { id, type, title, message }]); // max 4 at once
    if (duration > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  // Convenience methods
  toast.success = (message, title) => toast({ type: 'success', message, title });
  toast.error   = (message, title) => toast({ type: 'error',   message, title });
  toast.info    = (message, title) => toast({ type: 'info',    message, title });
  toast.warning = (message, title) => toast({ type: 'warning', message, title });

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
