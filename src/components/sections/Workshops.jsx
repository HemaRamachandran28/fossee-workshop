import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useCountUp.js';
import { workshopTypes } from '../../data/index.js';
import { Clock, ArrowRight, Users } from 'lucide-react';

const FILTERS = ['All', 'Programming', 'Engineering', 'Simulation', 'Tools', 'Data Science'];
  
const levelConfig = {
  Beginner: { color: 'text-teal-400', bg: 'bg-teal-400/10 border-teal-400/20' },
  Intermediate: { color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
  Advanced: { color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
};

const iconGradient = {
  violet: 'from-violet-500/25 to-violet-700/10 border-violet-500/20',
  teal: 'from-teal-500/25 to-teal-700/10 border-teal-500/20',
  rose: 'from-rose-500/25 to-rose-700/10 border-rose-500/20',
};

export default function Workshops() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView(0.1);

  const filtered = activeFilter === 'All'
    ? workshopTypes
    : workshopTypes.filter(w => w.category === activeFilter);

  return (
    <section id="workshops" className="relative py-32 overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600/10 -bottom-20 -left-32" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            <div className="section-label mb-4">Workshop Catalog</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white">
              Find your next
              <br />
              <span className="text-gradient-violet">skill upgrade</span>
            </h2>
          </div>
          <p className="max-w-xs text-white/40 text-sm leading-relaxed lg:text-right">
            {workshopTypes.length} workshop types across 5 categories. All free, all expert-led.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                  : 'glass text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((w, i) => {
              const lc = levelConfig[w.level];
              return (
                <motion.article
                  key={w.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="card-glass group flex flex-col"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconGradient[w.color]} border flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110`}>
                      {w.icon}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${lc.bg} ${lc.color}`}>
                      {w.level}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-widest mb-2">
                    {w.category}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white leading-snug mb-3">
                    {w.name}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">
                    {w.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4 text-xs text-white/35">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {w.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={12} />
                        {w.upcoming} upcoming
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors group/btn">
                      Details
                      <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link to="/workshops" className="btn-ghost">
            View all workshops
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
