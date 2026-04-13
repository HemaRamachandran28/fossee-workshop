import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Input, Select, Button } from '../components/ui/index.jsx';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry',
];

const slideVariants = {
  enter: dir => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: dir => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function Register() {
  const { register, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', username: '',
    password: '', confirmPassword: '',
    college: '', department: '', phone: '', state: '',
  });

  const set = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.username.length < 3) e.username = 'Min 3 characters';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };
  const validateStep1 = () => {
    const e = {};
    if (!form.college.trim()) e.college = 'Required';
    if (!form.state) e.state = 'Please select a state';
    return e;
  };

  const next = () => {
    const e = validateStep0();
    if (Object.keys(e).length) { setErrors(e); return; }
    setDir(1); setStep(1);
  };
  const back = () => { setDir(-1); setStep(0); };

  const submit = async e => {
    e.preventDefault();
    const e2 = validateStep1();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    await register(form);
    toast.success('Account created! Welcome aboard.');
    navigate('/dashboard');
  };

  const steps = ['Account', 'Institution'];

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              FOSSEE <span className="text-violet-400">Workshops</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-2xl text-white mb-1">Create your account</h1>
          <p className="text-sm text-white/40 mb-8">Free forever · Powered by IIT Bombay</p>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      background: i < step ? '#10b981' : i === step ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                      borderColor: i === step ? '#7c3aed' : 'transparent',
                    }}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </motion.div>
                  <span className={`text-xs font-medium ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-white/10">
                    <motion.div
                      className="h-full bg-violet-500"
                      animate={{ width: step > i ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animated step content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              {step === 0 && (
                <motion.form
                  key="step0"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                  onSubmit={e => { e.preventDefault(); next(); }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" placeholder="Priya" value={form.firstName} onChange={set} error={errors.firstName} />
                    <Input label="Last Name" name="lastName" placeholder="Sharma" value={form.lastName} onChange={set} error={errors.lastName} />
                  </div>
                  <Input label="Email" name="email" type="email" placeholder="you@college.edu" value={form.email} onChange={set} error={errors.email} />
                  <Input label="Username" name="username" placeholder="priya_sharma" value={form.username} onChange={set} error={errors.username} hint="Min 3 characters, no spaces" />
                  <Input label="Password" name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={set} error={errors.password} />
                  <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set} error={errors.confirmPassword} />
                  <Button type="submit" size="lg" className="w-full mt-2">
                    Continue <ArrowRight size={16} />
                  </Button>
                </motion.form>
              )}

              {step === 1 && (
                <motion.form
                  key="step1"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                  onSubmit={submit}
                >
                  <Input label="College / Institution *" name="college" placeholder="IIT Bombay" value={form.college} onChange={set} error={errors.college} />
                  <Input label="Department" name="department" placeholder="Computer Science" value={form.department} onChange={set} />
                  <Input label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set} />
                  <Select label="State *" name="state" value={form.state} onChange={set} error={errors.state}>
                    <option value="">Select state…</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  <div className="flex gap-3 mt-2">
                    <Button type="button" variant="ghost" size="lg" onClick={back} className="flex-shrink-0">
                      <ArrowLeft size={16} /> Back
                    </Button>
                    <Button type="submit" loading={loading} size="lg" className="flex-1">
                      {!loading && <>Create Account <ArrowRight size={16} /></>}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-sm text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
