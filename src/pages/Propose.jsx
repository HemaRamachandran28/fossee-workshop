import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader, Button, Select } from '../components/ui/index.jsx';
import { workshopTypes } from '../data/index.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Propose() {
  const { user } = useAuth();
  const [form, setForm] = useState({ workshopType: '', date: '', tncAccepted: false });
  const [errors, setErrors] = useState({});
  const [tncOpen, setTncOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const toISO = d => d.toISOString().split('T')[0];

  const selected = workshopTypes.find(w => w.id === parseInt(form.workshopType));

  const set = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.workshopType) e.workshopType = 'Please select a workshop type';
    if (!form.date) e.date = 'Please select a date';
    if (!form.tncAccepted) e.tncAccepted = 'You must accept the terms and conditions';
    return e;
  };

  const submit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  if (success) return (
    <AppShell withFooter={false}>
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="w-20 h-20 rounded-full bg-teal-500/15 border-2 border-teal-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-teal-400" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-bold text-3xl text-white mb-3">Workshop Proposed!</h2>
          <p className="text-white/50 mb-2">
            Your proposal for <strong className="text-white">{selected?.name}</strong> on{' '}
            <strong className="text-white">{form.date}</strong> has been submitted.
          </p>
          <p className="text-sm text-white/35 mb-8">You'll receive an email confirmation once it's reviewed by the FOSSEE team (typically within 48 hours).</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard"><Button size="lg">View My Bookings</Button></Link>
            <Button variant="ghost" size="lg" onClick={() => { setSuccess(false); setForm({ workshopType: '', date: '', tncAccepted: false }); }}>
              Propose Another
            </Button>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <PageHeader
          label="Workshop Proposal"
          title="Propose a Workshop"
          subtitle="Request a FOSSEE workshop at your institution — reviewed within 48 hours"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <div className="card-glass">
              {/* Info banner */}
              <div className="flex gap-3 p-4 rounded-xl bg-violet-500/[0.07] border border-violet-500/15 mb-6 text-sm text-white/50">
                <span className="text-violet-400 flex-shrink-0">ℹ</span>
                Before proposing, check the{' '}
                <Link to="/workshops" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Workshop Types</Link>{' '}
                section to understand each workshop's coverage.
              </div>

              <form onSubmit={submit} className="flex flex-col gap-6">
                <Select
                  label="Workshop Type *"
                  name="workshopType"
                  value={form.workshopType}
                  onChange={set}
                  error={errors.workshopType}
                >
                  <option value="">Select a workshop…</option>
                  {workshopTypes.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.duration})</option>
                  ))}
                </Select>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/70">Proposed Start Date *</label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={set}
                    min={toISO(minDate)}
                    max={toISO(maxDate)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04] border border-white/10
                      focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 outline-none transition-all
                      [color-scheme:dark]"
                  />
                  <p className="text-xs text-white/30">Must be at least 3 days from today</p>
                  {errors.date && <p className="text-xs text-rose-400">{errors.date}</p>}
                </div>

                {/* T&C */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="tncAccepted"
                      checked={form.tncAccepted}
                      onChange={set}
                      className="mt-0.5 w-4 h-4 rounded accent-violet-500"
                    />
                    <span className="text-sm text-white/55">
                      I have read and accept the{' '}
                      <button
                        type="button"
                        onClick={() => form.workshopType ? setTncOpen(true) : setErrors(e => ({ ...e, workshopType: 'Select a workshop first to view T&C' }))}
                        className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
                      >
                        Terms & Conditions
                      </button>
                    </span>
                  </label>
                  {errors.tncAccepted && <p className="text-xs text-rose-400 mt-1.5">{errors.tncAccepted}</p>}
                </div>

                <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
                  {!loading && <>Submit Proposal <ArrowRight size={16} /></>}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Preview sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28">
              <div className="card-glass">
                {selected ? (
                  <>
                    <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-3">Selected Workshop</p>
                    <div className="text-2xl mb-3">{selected.icon}</div>
                    <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">{selected.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-lg bg-white/[0.05] text-white/50">📅 {selected.duration}</span>
                      <span className="text-xs px-2 py-1 rounded-lg bg-white/[0.05] text-white/50">⚡ {selected.level}</span>
                      <span className="text-xs px-2 py-1 rounded-lg bg-white/[0.05] text-white/50">🏛️ {selected.upcoming} upcoming</span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">{selected.description}</p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-3">📋</p>
                    <p className="text-sm text-white/35">Select a workshop type to see a preview here</p>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* T&C Modal */}
      <AnimatePresence>
        {tncOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setTncOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass-strong rounded-2xl w-full max-w-md shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
                <h3 className="font-display font-bold text-lg text-white">Terms & Conditions</h3>
                <button onClick={() => setTncOpen(false)} className="w-8 h-8 rounded-lg glass text-white/40 hover:text-white flex items-center justify-center transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 text-sm text-white/50 leading-relaxed max-h-64 overflow-y-auto">
                {selected?.terms_and_conditions || 'Participants must bring their own laptops. Attendance for all days is mandatory to receive a certificate. The institution must provide a suitable lab with internet access. FOSSEE reserves the right to reschedule or cancel workshops.'}
              </div>
              <div className="p-5 border-t border-white/[0.08]">
                <Button className="w-full" onClick={() => { setForm(f => ({ ...f, tncAccepted: true })); setTncOpen(false); }}>
                  Accept & Continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
