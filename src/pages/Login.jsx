import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Button, Input } from '../components/ui/index.jsx';

export default function Login() {
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError('');
    const res = await login(form.username, form.password);
    if (res.ok) { toast.success('Signed in successfully!'); navigate('/dashboard'); }
    else setError(res.error);
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/6 blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              FOSSEE <span className="text-violet-400">Workshops</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-2xl text-white mb-1">Welcome back</h1>
          <p className="text-sm text-white/40 mb-8">Sign in to your coordinator account</p>

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-sm flex items-center gap-2"
            >
              <span className="text-base">⚠</span> {error}
            </motion.div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-5">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="your_username"
              value={form.username}
              onChange={handle}
              autoComplete="username"
              autoFocus
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/70">Password</label>
                <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handle}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-white/20
                    bg-white/[0.04] border border-white/10
                    focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15
                    outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" loading={loading} size="lg" className="mt-1 w-full">
              {!loading && <>Sign in <ArrowRight size={16} /></>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-sm text-white/40">
              New here?{' '}
              <Link to="/register" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
                Create a free account
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center text-xs text-white/20 mt-4">
          Demo: any username + 6+ char password
        </p>
      </motion.div>
    </div>
  );
}
