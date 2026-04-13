import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCountUp.js';
import { features } from '../../data/index.js';

const colorMap = {
  0: 'from-violet-500/20 to-violet-600/5 border-violet-500/20',
  1: 'from-teal-500/20 to-teal-600/5 border-teal-500/20',
  2: 'from-rose-500/20 to-rose-600/5 border-rose-500/20',
  3: 'from-amber-500/20 to-amber-600/5 border-amber-500/20', 
  4: 'from-sky-500/20 to-sky-600/5 border-sky-500/20',
  5: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
};

export default function Features() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-teal-500/8 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label mx-auto mb-4">Why FOSSEE</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-5">
            Everything you need to
            <br />
            <span className="text-gradient">run world-class workshops</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-white/40">
            From booking to certification — FOSSEE handles it all, at zero cost.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-glass group cursor-default"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[i]} border flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
