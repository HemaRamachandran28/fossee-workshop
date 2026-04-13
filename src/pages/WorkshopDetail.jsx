import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { Badge, Button, Card } from '../components/ui/index.jsx';
import { workshopTypes } from '../data/index.js';
import { useAuth } from '../context/AuthContext.jsx';

const levelColor = { Beginner: 'teal', Intermediate: 'violet', Advanced: 'rose' };
const iconBg = { violet: 'from-violet-500/20 to-violet-700/5 border-violet-500/20', teal: 'from-teal-500/20 to-teal-700/5 border-teal-500/20', rose: 'from-rose-500/20 to-rose-700/5 border-rose-500/20' };

const upcoming = [
  { date: '15 May 2025', venue: 'IIT Bombay, Mumbai', enrolled: 24, seats: 30, status: 'confirmed' },
  { date: '3 Jun 2025', venue: 'NIT Warangal', enrolled: 12, seats: 40, status: 'upcoming' },
];

export default function WorkshopDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const workshop = workshopTypes.find(w => w.id === parseInt(id));

  if (!workshop) return (
    <AppShell>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-display font-bold text-7xl text-white/10 mb-4">404</p>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Workshop not found</h2>
        <Link to="/workshops" className="btn-ghost text-sm mt-4">← Back to Workshops</Link>
      </div>
    </AppShell>
  );

  const lc = levelColor[workshop.level];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-white/30 mb-8"
        >
          <Link to="/workshops" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} /> Workshops
          </Link>
          <span>/</span>
          <span className="text-white/60">{workshop.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Header card */}
            <div className="card-glass">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br border flex items-center justify-center text-3xl ${iconBg[workshop.color]}`}>
                  {workshop.icon}
                </div>
                <Badge color={lc}>{workshop.level}</Badge>
              </div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">{workshop.category}</p>
              <h1 className="font-display font-bold text-3xl text-white mb-4 leading-tight">{workshop.name}</h1>

              {/* Key stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Clock size={14} />, label: 'Duration', val: workshop.duration },
                  { icon: <Star size={14} />, label: 'Level', val: workshop.level },
                  { icon: <Users size={14} />, label: 'Upcoming', val: `${workshop.upcoming} sessions` },
                  { icon: <BookOpen size={14} />, label: 'Category', val: workshop.category },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-white/30 text-xs mb-1">{icon} {label}</div>
                    <div className="text-sm font-semibold text-white">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="card-glass">
              <h2 className="font-display font-bold text-lg text-white mb-4 pb-4 border-b border-white/[0.06]">
                About This Workshop
              </h2>
              <p className="text-sm text-white/55 leading-relaxed">{workshop.description}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Hands-on coding sessions', 'Expert FOSSEE instructors', 'IIT Bombay certificate', 'Free for all participants'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                    <CheckCircle2 size={15} className="text-teal-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="card-glass border-amber-500/15">
              <h2 className="font-display font-bold text-lg text-white mb-4 pb-4 border-b border-white/[0.06]">
                Terms & Conditions
              </h2>
              <div className="flex gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">📋</span>
                <p className="text-sm text-white/50 leading-relaxed">{workshop.terms_and_conditions || 'Participants must bring their own laptops. Attendance for all days is mandatory to receive a certificate. Prior basic programming knowledge is recommended for intermediate and advanced workshops.'}</p>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Action card */}
            {user ? (
              <div className="card-glass border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent">
                <h3 className="font-display font-bold text-lg text-white mb-2">Ready to host?</h3>
                <p className="text-sm text-white/45 mb-5">Propose this workshop at your institution. Our team will confirm within 48 hours.</p>
                <Link to="/propose">
                  <Button className="w-full" size="lg">
                    Propose Workshop <ArrowRight size={16} />
                  </Button>
                </Link>
                <p className="text-xs text-white/25 text-center mt-3">Free · No credit card required</p>
              </div>
            ) : (
              <div className="card-glass text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <Lock size={20} className="text-white/30" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2">Sign in to propose</h3>
                <p className="text-sm text-white/40 mb-5">Create a free account to propose workshops at your institution.</p>
                <Link to="/login"><Button className="w-full mb-3">Log in</Button></Link>
                <Link to="/register" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">Create account →</Link>
              </div>
            )}

            {/* Upcoming sessions */}
            <div className="card-glass">
              <h3 className="font-display font-bold text-base text-white mb-4">Upcoming Sessions</h3>
              <div className="flex flex-col gap-3">
                {upcoming.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{s.date}</span>
                      <Badge color={s.status === 'confirmed' ? 'teal' : 'violet'}>
                        {s.status === 'confirmed' ? 'Confirmed' : 'Upcoming'}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/35 mb-2">📍 {s.venue}</p>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400"
                        style={{ width: `${(s.enrolled / s.seats) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/25 mt-1">{s.enrolled}/{s.seats} enrolled</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </AppShell>
  );
}
