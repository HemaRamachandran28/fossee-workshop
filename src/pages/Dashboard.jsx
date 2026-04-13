import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, Clock, MapPin, User } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader, Badge, Card, Empty } from '../components/ui/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const bookings = [  
  { id: 1, name: 'Python for Scientific Computing', date: '2025-05-15', venue: 'IIT Bombay, Mumbai', instructor: 'Dr. Prabhu Ramachandran', status: 'confirmed', duration: '3 Days', certificate: false },
  { id: 2, name: 'LaTeX for Academic Writing', date: '2025-06-03', venue: 'BITS Pilani', instructor: 'Pending assignment', status: 'pending', duration: '1 Day', certificate: false },
  { id: 3, name: 'Introduction to SCILAB', date: '2024-12-10', venue: 'VIT Vellore', instructor: 'Prof. Kannan Moudgalya', status: 'completed', duration: '2 Days', certificate: true },
];

const statusCfg = {
  confirmed: { label: 'Confirmed', color: 'teal', dot: 'bg-teal-400' },
  pending:   { label: 'Under Review', color: 'amber', dot: 'bg-amber-400 animate-pulse' },
  completed: { label: 'Completed', color: 'violet', dot: 'bg-violet-400' },
};

const TABS = ['All', 'Confirmed', 'Pending', 'Completed'];

const summaryCards = [
  { label: 'Total', val: bookings.length, color: 'text-white' },
  { label: 'Confirmed', val: bookings.filter(b => b.status === 'confirmed').length, color: 'text-teal-400' },
  { label: 'Pending', val: bookings.filter(b => b.status === 'pending').length, color: 'text-amber-400' },
  { label: 'Completed', val: bookings.filter(b => b.status === 'completed').length, color: 'text-violet-400' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('All');

  if (!user) return <Navigate to="/login" replace />;

  const filtered = tab === 'All' ? bookings : bookings.filter(b => b.status === tab.toLowerCase());

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <PageHeader
          label="My Account"
          title={`Welcome back, ${user.fullName}`}
          subtitle="Track and manage your proposed workshops"
        >
          <Link to="/propose" className="btn-primary text-sm py-2.5">
            <Plus size={15} /> Propose Workshop
          </Link>
        </PageHeader>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {summaryCards.map(({ label, val, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass text-center py-5"
            >
              <div className={`font-display font-bold text-3xl mb-1 ${color}`}>{val}</div>
              <div className="text-xs text-white/35 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                  : 'glass text-white/40 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Booking list */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <Empty
              icon="📭"
              title="No bookings here"
              description="You haven't proposed any workshops yet."
              action={<Link to="/propose" className="btn-primary text-sm">Propose a Workshop</Link>}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {filtered.map((b, i) => {
                const sc = statusCfg[b.status];
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="flex flex-col sm:flex-row gap-5 items-start sm:items-center" hover={false}>
                      {/* Status indicator */}
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${sc.dot}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display font-bold text-base text-white leading-snug">{b.name}</h3>
                          <Badge color={sc.color}>{sc.label}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35">
                          <span className="flex items-center gap-1.5"><Clock size={11} />{b.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={11} />{b.venue}</span>
                          <span className="flex items-center gap-1.5"><User size={11} />{b.instructor}</span>
                        </div>
                      </div>

                      {/* Action */}
                      {b.certificate && b.status === 'completed' && (
                        <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold
                          bg-teal-500/10 border border-teal-500/25 text-teal-400 hover:bg-teal-500/20 transition-all">
                          <Download size={13} /> Certificate
                        </button>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
