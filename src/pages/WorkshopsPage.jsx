import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, ArrowRight, SlidersHorizontal } from 'lucide-react';
import AppShell from '../components/layout/AppShell.jsx';
import { PageHeader, Badge, Card } from '../components/ui/index.jsx';
import { workshopTypes } from '../data/index.js';

const CATEGORIES = ['All', 'Programming', 'Engineering', 'Simulation', 'Tools', 'Data Science'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['All', '1 Day', '2 Days', '3 Days', '4+ Days'];

const levelColor = { Beginner: 'teal', Intermediate: 'violet', Advanced: 'rose' };
const iconBg = { violet: 'bg-violet-500/15 border-violet-500/20', teal: 'bg-teal-500/15 border-teal-500/20', rose: 'bg-rose-500/15 border-rose-500/20' };

export default function WorkshopsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [duration, setDuration] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = workshopTypes.filter(w => {
    const q = query.toLowerCase();
    const matchQ = !q || w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q);
    const matchC = category === 'All' || w.category === category;
    const matchL = level === 'All' || w.level === level;
    const matchD = duration === 'All'
      || (duration === '1 Day' && w.duration === '1 Day')
      || (duration === '2 Days' && w.duration === '2 Days')
      || (duration === '3 Days' && w.duration === '3 Days')
      || (duration === '4+ Days' && parseInt(w.duration) >= 4);
    return matchQ && matchC && matchL && matchD;
  });

  const activeFilters = [category, level, duration].filter(f => f !== 'All').length;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <PageHeader
          label="Workshop Catalog"
          title="Find your skill upgrade"
          subtitle={`${workshopTypes.length} workshops available · all free · all expert-led`}
        />

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search workshops…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25
                bg-white/[0.04] border border-white/10
                focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(s => !s)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border
              ${showFilters || activeFilters > 0
                ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                : 'glass text-white/50 hover:text-white border-white/10'}`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
                {[
                  { label: 'Category', opts: CATEGORIES, val: category, set: setCategory },
                  { label: 'Level', opts: LEVELS, val: level, set: setLevel },
                  { label: 'Duration', opts: DURATIONS, val: duration, set: setDuration },
                ].map(({ label, opts, val, set }) => (
                  <div key={label} className="flex-1">
                    <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {opts.map(opt => (
                        <button
                          key={opt}
                          onClick={() => set(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            val === opt
                              ? 'bg-violet-600 text-white'
                              : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        <p className="text-sm text-white/30 mb-6">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {query && <span> for "<span className="text-white/50">{query}</span>"</span>}
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="font-display font-bold text-lg text-white mb-2">No results found</h3>
              <p className="text-sm text-white/40 mb-6">Try adjusting your search or filters.</p>
              <button onClick={() => { setQuery(''); setCategory('All'); setLevel('All'); setDuration('All'); }}
                className="btn-ghost text-sm">Clear all filters</button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((w, i) => (
                <motion.div key={w.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={`/workshops/${w.id}`}>
                    <Card className="h-full flex flex-col group cursor-pointer">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${iconBg[w.color]}`}>
                          {w.icon}
                        </div>
                        <Badge color={levelColor[w.level]}>{w.level}</Badge>
                      </div>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">{w.category}</p>
                      <h3 className="font-display font-bold text-lg text-white leading-snug mb-3">{w.name}</h3>
                      <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">{w.description}</p>
                      <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                        <div className="flex gap-4 text-xs text-white/30">
                          <span className="flex items-center gap-1.5"><Clock size={11} />{w.duration}</span>
                          <span className="flex items-center gap-1.5"><Users size={11} />{w.upcoming} upcoming</span>
                        </div>
                        <span className="text-xs font-semibold text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Details <ArrowRight size={11} />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
