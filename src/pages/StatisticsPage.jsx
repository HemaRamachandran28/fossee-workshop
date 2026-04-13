import { motion } from 'framer-motion';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader } from '../components/ui/index.jsx';
import { useCountUp, useInView } from '../hooks/useCountUp.js';
import { stats, workshopTypes } from '../data/index.js';

const monthly = [
  { month: 'Nov', workshops: 8,  participants: 420 },
  { month: 'Dec', workshops: 5,  participants: 260 },
  { month: 'Jan', workshops: 12, participants: 680 },
  { month: 'Feb', workshops: 15, participants: 810 },
  { month: 'Mar', workshops: 18, participants: 970 },
  { month: 'Apr', workshops: 14, participants: 730 },
];

const categories = [
  { name: 'Programming', count: 52, color: '#8b5cf6' },
  { name: 'Data Science', count: 34, color: '#2dd4bf' },
  { name: 'Engineering', count: 28, color: '#10b981' },
  { name: 'Tools',       count: 18, color: '#f59e0b' },
  { name: 'Simulation',  count: 10, color: '#fb7185' },
];
const catTotal = categories.reduce((a, c) => a + c.count, 0);

const topStates = [
  { state: 'Maharashtra', count: 48 },
  { state: 'Karnataka',   count: 41 },
  { state: 'Tamil Nadu',  count: 37 },
  { state: 'Telangana',   count: 29 },
  { state: 'Gujarat',     count: 24 },
  { state: 'West Bengal', count: 21 },
];
const maxState = topStates[0].count;

const levelBadge = {
  Beginner:     'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  Intermediate: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  Advanced:     'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

function AnimStat({ stat, inView, delay }) {
  const n = useCountUp(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-glass text-center py-8 cursor-default hover:border-violet-500/20 transition-colors"
    >
      <div className="text-3xl mb-3">{stat.icon}</div>
      <div className="font-display font-bold text-5xl tracking-tight mb-2 text-gradient">
        {n.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm text-white/40">{stat.label}</div>
    </motion.div>
  );
}

export default function StatisticsPage() {
  const [ref, inView] = useInView(0.05);
  const maxWS = Math.max(...monthly.map(m => m.workshops));
  const maxPart = Math.max(...monthly.map(m => m.participants));

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-6 pb-24" ref={ref}>
        <PageHeader
          label="Platform Impact"
          title="FOSSEE by the numbers"
          subtitle="Cumulative statistics across all workshops — updated monthly"
        />

        {/* Animated stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <AnimStat key={i} stat={s} inView={inView} delay={i * 0.08} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-glass lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Monthly Workshops</h3>
                <p className="text-xs text-white/30 mt-0.5">Bars = workshops · dots = participants</p>
              </div>
              <span className="section-label text-[10px]">2024–25</span>
            </div>
            <div className="flex items-end gap-3 h-44 px-2">
              {monthly.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <span className="text-[10px] font-bold text-violet-400">{m.workshops}</span>
                  <div className="flex-1 w-full flex items-end relative">
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 z-10"
                      style={{ bottom: `${(m.participants / maxPart) * 80}%` }}
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(m.workshops / maxWS) * 100}%` } : { height: 0 }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-t-lg"
                      style={{ background: 'linear-gradient(to top, #7c3aed, rgba(139,92,246,0.35))' }}
                    />
                  </div>
                  <span className="text-[10px] text-white/30 font-mono">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-5 mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-3 h-3 rounded bg-violet-500/70" /> Workshops
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-2 h-2 rounded-full bg-teal-400" /> Participants
              </div>
            </div>
          </motion.div>

          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-glass lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-white">By Category</h3>
              <span className="text-xs text-white/30 font-mono">All time</span>
            </div>
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 160 160" className="w-32 h-32">
                {(() => {
                  let offset = 0;
                  const circ = 2 * Math.PI * 52;
                  return categories.map((cat, i) => {
                    const pct = cat.count / catTotal;
                    const dash = pct * circ;
                    const el = (
                      <circle key={cat.name} cx="80" cy="80" r="52"
                        fill="none" stroke={cat.color} strokeWidth="20"
                        strokeDasharray={`${Math.max(0, dash - 2)} ${circ}`}
                        strokeDashoffset={-offset}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
                      />
                    );
                    offset += dash;
                    return el;
                  });
                })()}
                <text x="80" y="74" textAnchor="middle" fill="white" fontSize="16" fontWeight="700">{catTotal}</text>
                <text x="80" y="90" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">workshops</text>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs text-white/50 flex-1">{cat.name}</span>
                  <span className="text-xs font-semibold text-white">{cat.count}</span>
                  <span className="text-xs text-white/30 w-8 text-right">{Math.round(cat.count / catTotal * 100)}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* State distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="card-glass mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg text-white">Top States by Workshops</h3>
            <span className="text-xs text-white/30 font-mono">Institutions reached</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {topStates.map((s, i) => (
              <div key={s.state} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-white/70">{s.state}</span>
                  <span className="text-sm font-bold text-white">{s.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(s.count / maxState) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7c3aed, #2dd4bf)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Full workshop table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-glass overflow-hidden"
        >
          <h3 className="font-display font-bold text-lg text-white mb-5">All Workshop Types</h3>
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-y border-white/[0.05]">
                  {['#', 'Workshop', 'Category', 'Duration', 'Level', 'Upcoming'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-mono text-white/25 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workshopTypes.map((w, i) => (
                  <motion.tr
                    key={w.id}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.45 + i * 0.04 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4 text-white/20 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{w.icon}</span>
                        <span className="font-medium text-white group-hover:text-violet-300 transition-colors">{w.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs">{w.category}</td>
                    <td className="px-6 py-4 text-white/40 text-xs font-mono">{w.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${levelBadge[w.level]}`}>
                        {w.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold">
                        {w.upcoming}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td colSpan="4" className="px-6 py-3 text-xs text-white/25">
                    {workshopTypes.length} workshop types total
                  </td>
                  <td />
                  <td className="px-6 py-3 text-xs font-bold text-violet-400">
                    {workshopTypes.reduce((a, w) => a + w.upcoming, 0)} upcoming
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {['🏛️ IIT Bombay','🇮🇳 MHRD Funded','✅ Govt. Recognised','📜 Free Certificates','🌐 Pan-India','⭐ Since 2009'].map(badge => (
            <span key={badge} className="glass px-4 py-2 rounded-full text-xs font-medium text-white/40 hover:text-white/60 transition-colors cursor-default">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </AppShell>
  );
}
