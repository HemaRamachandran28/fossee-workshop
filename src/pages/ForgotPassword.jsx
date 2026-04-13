import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Sparkles } from 'lucide-react';
import { Input, Button } from '../components/ui/index.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              FOSSEE <span className="text-violet-400">Workshops</span>
            </span>
          </Link>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                  <Mail size={20} className="text-violet-400" />
                </div>
                <h1 className="font-display font-bold text-2xl text-white mb-1">Reset password</h1>
                <p className="text-sm text-white/40 mb-8">
                  Enter your email and we'll send you a reset link.
                </p>

                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div>
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@college.edu"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      error={error}
                      autoFocus
                    />
                  </div>
                  <Button type="submit" loading={loading} size="lg" className="w-full">
                    {!loading && <>Send Reset Link <ArrowRight size={16} /></>}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center mx-auto mb-5"
                >
                  <Mail size={28} className="text-teal-400" />
                </motion.div>
                <h2 className="font-display font-bold text-xl text-white mb-2">Check your inbox</h2>
                <p className="text-sm text-white/45 mb-2">
                  We've sent a password reset link to:
                </p>
                <p className="text-sm font-semibold text-violet-400 mb-6">{email}</p>
                <p className="text-xs text-white/25 mb-6">
                  Didn't receive it? Check your spam folder, or{' '}
                  <button
                    className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                    onClick={() => setSent(false)}
                  >
                    try again
                  </button>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-white/[0.06] flex justify-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
