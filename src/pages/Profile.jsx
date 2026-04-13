import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, LogOut } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader, Button, Input } from '../components/ui/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Profile() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Priya', lastName: 'Sharma',
    email: 'priya@bits.edu',
    college: 'BITS Pilani', department: 'CS',
    phone: '+91 98765 43210', state: 'Rajasthan',
  });

  if (!user) return <Navigate to="/login" replace />;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const save = () => { setEditing(false); setSaved(true); toast.success('Profile updated!'); setTimeout(() => setSaved(false), 3000); };

  const fields = [
    { name: 'firstName', label: 'First Name' }, { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'college', label: 'College' }, { name: 'department', label: 'Department' },
    { name: 'phone', label: 'Phone', type: 'tel' }, { name: 'state', label: 'State' },
  ];

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <PageHeader title="Profile" subtitle="Manage your coordinator account" />

        <div className="flex flex-col gap-5">
          {/* Avatar card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center font-display font-bold text-2xl text-white shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                  {user.username?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 border-2 border-ink-950 flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-white">{form.firstName} {form.lastName}</h2>
                <p className="text-sm text-white/40">@{user.username} · Coordinator</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                  IIT Bombay Network
                </span>
              </div>
              <div className="flex items-center gap-2">
                {saved && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="text-xs text-teal-400 flex items-center gap-1">
                    <Check size={12} /> Saved
                  </motion.span>
                )}
                <button
                  onClick={editing ? save : () => setEditing(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border
                    ${editing
                      ? 'bg-teal-500/15 border-teal-500/30 text-teal-400 hover:bg-teal-500/25'
                      : 'glass text-white/50 hover:text-white border-white/10'}`}
                >
                  {editing ? '✓ Save' : '✎ Edit'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Fields */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="card-glass">
            <h3 className="font-display font-bold text-base text-white mb-5 pb-5 border-b border-white/[0.06]">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ name, label, type = 'text' }) => (
                <div key={name}>
                  {editing ? (
                    <Input label={label} name={name} type={type} value={form[name]} onChange={handleChange} />
                  ) : (
                    <div>
                      <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-sm font-medium text-white">{form[name] || '—'}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card-glass border-white/[0.06]">
            <h3 className="text-xs font-mono text-white/25 uppercase tracking-widest mb-4">Account</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/change-password" className="btn-ghost text-sm py-2.5">🔑 Change Password</Link>
              <Button variant="danger" size="sm" onClick={logout} className="sm:ml-auto">
                <LogOut size={14} /> Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
