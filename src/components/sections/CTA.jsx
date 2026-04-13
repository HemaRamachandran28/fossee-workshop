import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCountUp.js';
import { ArrowRight, Sparkles } from 'lucide-react'; 

export default function CTA() {
  const [ref, inView] = useInView(0.2);

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Ambient glows */}
      <div className="glow-orb w-[700px] h-[700px] bg-violet-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb w-[400px] h-[400px] bg-teal-500/10 top-0 left-1/4" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-3xl p-px">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/40 via-transparent to-teal-500/30" />
          </div>

          {/* Background */}
          <div
            className="relative rounded-3xl px-8 py-20 sm:px-20"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(12,12,20,0.95) 50%, rgba(13,148,136,0.08) 100%)',
            }}
          >
            {/* Grid dots */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="section-label mx-auto mb-6"
            >
              <Sparkles size={10} className="fill-violet-400" />
              Start Today · It's Free
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6 leading-tight"
            >
              Ready to bring
              <br />
              <span className="text-gradient">expert workshops</span>
              <br />
              to your campus?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-lg text-white/45 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Join 320+ institutions already running FOSSEE workshops.
              Register as a coordinator and propose your first workshop today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register" className="btn-primary px-10 py-4 text-base">
                Create Free Account
                <ArrowRight size={18} />
              </Link>
              <Link to="/workshops" className="btn-ghost px-10 py-4 text-base">
                Browse Workshops
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-xs text-white/25"
            >
              Free forever · Funded by MHRD, Govt. of India · No credit card needed
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
