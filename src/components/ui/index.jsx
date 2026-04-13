import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/* ── Button ── */
export function Button({ children, variant = 'primary', size = 'md', loading, disabled, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20',
  };  
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

/* ── Badge ── */
export function Badge({ children, color = 'violet' }) {
  const colors = {
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    teal: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

/* ── Input ── */
export function Input({ label, error, hint, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20
          bg-white/[0.04] border transition-all duration-200 outline-none
          ${error
            ? 'border-rose-500/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-white/10 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15'
          } ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-white/30">{hint}</p>}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

/* ── Select ── */
export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <select
        className={`w-full px-4 py-3 rounded-xl text-sm text-white
          bg-white/[0.04] border border-white/10
          focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15
          outline-none transition-all duration-200 appearance-none ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

/* ── Card ── */
export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      className={`card-glass ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Page Header ── */
export function PageHeader({ label, title, subtitle, children }) {
  return (
    <div className="mb-10">
      {label && <div className="section-label mb-3">{label}</div>}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-1">{title}</h1>
          {subtitle && <p className="text-white/40 text-sm">{subtitle}</p>}
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  );
}

/* ── Empty State ── */
export function Empty({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40 max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}
