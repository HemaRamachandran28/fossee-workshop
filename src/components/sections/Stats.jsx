import { motion } from 'framer-motion';
import { useCountUp, useInView } from '../../hooks/useCountUp.js';
import { stats } from '../../data/index.js';

function StatCard({ stat, index, inView }) {
  const count = useCountUp(stat.value, 2200, inView);  

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group text-center"
    >
      {/* Glow behind number */}
      <div className="absolute inset-0 bg-violet-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        <div className="text-4xl mb-3">{stat.icon}</div>
        <div className="font-display font-bold text-5xl sm:text-6xl tracking-tight mb-2">
          <span className="text-gradient">
            {count.toLocaleString()}{stat.suffix}
          </span>
        </div>
        <div className="text-sm text-white/40 font-medium">{stat.label}</div>
      </div>

      {/* Divider (not on last) */}
      {index < stats.length - 1 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/[0.06] hidden lg:block" />
      )}
    </motion.div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      {/* Full-width gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/60 to-transparent" />
      <div className="glow-orb w-[800px] h-[400px] bg-violet-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto mb-4">Impact at Scale</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white">
            Numbers that speak for themselves
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 glass rounded-3xl overflow-hidden" ref={ref}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            '🏛️ IIT Bombay', '🇮🇳 MHRD Funded', '✅ Govt. Recognised',
            '📜 Free Certificates', '🌐 Pan-India', '⭐ Since 2009',
          ].map((badge) => (
            <span key={badge} className="glass px-4 py-2 rounded-full text-xs font-medium text-white/50">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
