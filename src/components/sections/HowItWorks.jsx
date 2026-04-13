import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCountUp.js';
import { steps } from '../../data/index.js';  
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="how" className="relative py-32 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-teal-500/8 top-0 right-0 opacity-60" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="section-label mx-auto mb-4">Process</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-5">
            From idea to certified
            <br />
            <span className="text-gradient">in four steps</span>
          </h2>
          <p className="max-w-md mx-auto text-lg text-white/40">
            Getting a world-class workshop at your campus has never been simpler.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Connector line (desktop) */}
          <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0 hidden xl:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Step number + icon */}
              <div className="relative flex items-center justify-center w-16 h-16 mb-6 mx-auto xl:mx-0">
                {/* Ring */}
                <div className="absolute inset-0 rounded-2xl border border-violet-500/30 group-hover:border-violet-500/60 transition-colors duration-300" />
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-violet-600/10 group-hover:bg-violet-600/20 transition-colors duration-300" />
                {/* Step label */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink-950 border border-white/10 flex items-center justify-center">
                  <span className="font-mono text-[9px] font-bold text-violet-400">{step.step}</span>
                </div>
                <span className="text-2xl relative z-10">{step.icon}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-3 text-center xl:text-left">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed text-center xl:text-left">{step.description}</p>

              {/* Arrow connector (between cards on xl) */}
              {i < steps.length - 1 && (
                <div className="hidden xl:flex absolute top-8 -right-4 z-10 items-center justify-center w-8 h-8">
                  <ArrowRight size={14} className="text-violet-500/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-20 text-center"
        >
          <Link to="/register" className="btn-primary px-10 py-4 text-base mx-auto">
            Start Your First Workshop
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-white/30">Free forever · No credit card required</p>
        </motion.div>
      </div>
    </section>
  );
}
