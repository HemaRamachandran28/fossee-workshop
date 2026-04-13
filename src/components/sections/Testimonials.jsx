import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCountUp.js';
import { testimonials } from '../../data/index.js';
import { Star, Quote } from 'lucide-react';

const avatarColor = {
  violet: 'from-violet-600 to-violet-800',
  teal: 'from-teal-600 to-teal-800',
  rose: 'from-rose-600 to-rose-800',  
};

const borderColor = {
  violet: 'hover:border-violet-500/30',
  teal: 'hover:border-teal-500/30',
  rose: 'hover:border-rose-500/30',
};

const glowColor = {
  violet: 'group-hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]',
  teal: 'group-hover:shadow-[0_0_40px_rgba(20,184,166,0.12)]',
  rose: 'group-hover:shadow-[0_0_40px_rgba(244,63,94,0.12)]',
};

export default function Testimonials() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-rose-500/6 bottom-0 right-0" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto mb-4">Testimonials</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white mb-4">
            Loved by educators
            <br />
            <span className="text-gradient">across India</span>
          </h2>
          <p className="max-w-md mx-auto text-white/40">
            Hear from coordinators and professors who have transformed their institutions with FOSSEE.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`card-glass group flex flex-col ${borderColor[t.color]} ${glowColor[t.color]} transition-all duration-500`}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-white/10 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-white/60 leading-relaxed flex-1 mb-6">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor[t.color]} flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role} · {t.institution}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <p className="text-center text-xs text-white/30 font-mono uppercase tracking-widest mb-8">
            Trusted by institutions across India
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {['IIT Bombay', 'NIT Warangal', 'BITS Pilani', 'VIT Vellore', 'IITM', 'NSIT Delhi', 'COEP Pune'].map((inst) => (
              <span key={inst} className="text-sm font-medium text-white/25 hover:text-white/50 transition-colors cursor-default">
                {inst}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
