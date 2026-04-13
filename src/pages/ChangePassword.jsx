import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader, Button } from '../components/ui/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function PasswordField({ label, name, value, onChange, show, onToggle, error, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/70">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className={`w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-white/20
            bg-white/[0.04] border transition-all duration-200 outline-none
            ${error
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-white/10 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15'
            }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {hint && !error && <p className="text-xs text-white/30">{hint}</p>}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

/* Strength meter */
function StrengthMeter({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-rose-500', 'bg-amber-500', 'bg-teal-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs transition-colors ${score >= 3 ? 'text-teal-400' : score === 2 ? 'text-amber-400' : 'text-rose-400'}`}>
        Password strength: {labels[score] || 'Weak'}
      </p>
    </div>
  );
}

export default function ChangePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const toggle = field => setShow(s => ({ ...s, [field]: !s[field] }));
  const handle = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.current) e.current = 'Current password is required';
    if (form.next.length < 8) e.next = 'New password must be at least 8 characters';
    if (form.next !== form.confirm) e.confirm = 'Passwords do not match';
    if (form.next === form.current) e.next = 'New password must differ from current';
    return e;
  };

  const submit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.success('Password changed successfully!', 'Security updated');
    navigate('/profile');
  };

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-6 pb-24">
        <PageHeader
          label="Security"
          title="Change Password"
          subtitle="Choose a strong password to secure your account"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass"
        >
          {/* Security icon */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <ShieldCheck size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Account: @{user.username}</p>
              <p className="text-xs text-white/35">Changes take effect immediately</p>
            </div>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <PasswordField
              label="Current Password"
              name="current"
              value={form.current}
              onChange={handle}
              show={show.current}
              onToggle={() => toggle('current')}
              error={errors.current}
            />

            <div className="flex flex-col gap-1.5">
              <PasswordField
                label="New Password"
                name="next"
                value={form.next}
                onChange={handle}
                show={show.next}
                onToggle={() => toggle('next')}
                error={errors.next}
                hint="Min 8 chars · uppercase · number · symbol"
              />
              <StrengthMeter password={form.next} />
            </div>

            <PasswordField
              label="Confirm New Password"
              name="confirm"
              value={form.confirm}
              onChange={handle}
              show={show.confirm}
              onToggle={() => toggle('confirm')}
              error={errors.confirm}
            />

            {/* Tips */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/35 space-y-1">
              <p className="font-medium text-white/50 mb-2">Strong password tips:</p>
              {[
                '8+ characters long',
                'Mix of uppercase and lowercase',
                'At least one number',
                'At least one special character (!@#$...)',
              ].map(tip => (
                <p key={tip} className="flex items-center gap-2">
                  <span className={form.next && (
                    (tip.includes('8+') && form.next.length >= 8) ||
                    (tip.includes('uppercase') && /[A-Z]/.test(form.next) && /[a-z]/.test(form.next)) ||
                    (tip.includes('number') && /[0-9]/.test(form.next)) ||
                    (tip.includes('special') && /[^A-Za-z0-9]/.test(form.next))
                  ) ? '✓' : '·'}
                  className={`w-3 ${form.next && (
                    (tip.includes('8+') && form.next.length >= 8) ||
                    (tip.includes('uppercase') && /[A-Z]/.test(form.next)) ||
                    (tip.includes('number') && /[0-9]/.test(form.next)) ||
                    (tip.includes('special') && /[^A-Za-z0-9]/.test(form.next))
                  ) ? 'text-teal-400' : 'text-white/25'}`}>
                    {form.next && (
                      (tip.includes('8+') && form.next.length >= 8) ||
                      (tip.includes('uppercase') && /[A-Z]/.test(form.next)) ||
                      (tip.includes('number') && /[0-9]/.test(form.next)) ||
                      (tip.includes('special') && /[^A-Za-z0-9]/.test(form.next))
                    ) ? '✓' : '·'}
                  </span>
                  {tip}
                </p>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-ghost flex-shrink-0 py-3"
              >
                Cancel
              </button>
              <Button type="submit" loading={loading} size="lg" className="flex-1">
                {!loading && <>Update Password <ArrowRight size={16} /></>}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AppShell>
  );
}
