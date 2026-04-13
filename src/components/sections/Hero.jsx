import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';
import { techBadges } from '../../data/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 pb-10">

      {/* Background */}
      <div className="absolute inset-0 bg-mesh-1 pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600/15 -top-40 -left-40 pointer-events-none" />
      <div className="glow-orb w-[400px] h-[400px] bg-teal-500/10 bottom-0 right-0 pointer-events-none" />

      {/* Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
              <div className="section-label mb-6">
                <Star size={10} className="fill-violet-400" />
                IIT Bombay · MHRD Initiative · Completely Free
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Learn. Build.</span><br />
              <span className="text-gradient">Get Certified.</span><br />
              <span className="text-white/60 text-4xl">For Free.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="text-white/50 mb-8 max-w-md"
            >
              Expert-led workshops in Python, SCILAB, OpenFOAM and more —
              delivered right to your college.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="flex gap-3 mb-8 flex-wrap"
            >
              <Link to="/workshops" className="btn-primary px-6 py-3 flex items-center gap-2">
                Explore
                <ArrowRight size={16} />
              </Link>

              <button className="btn-ghost px-6 py-3 flex items-center gap-2">
                <Play size={14} /> Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="flex gap-6 text-sm text-white/40"
            >
              <span>8,430+ students</span>
              <span>⭐ 4.9 rating</span>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate="show"
            className="flex justify-center lg:justify-end"
          >

            {/* Dashboard Card */}
            <div className="glass rounded-2xl p-4 max-w-[480px] w-full shadow-glow-violet">

              {/* Header */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {["142", "38", "7.2k"].map((val, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-lg">
                    <p className="text-xs text-white/40">Data</p>
                    <h3 className="text-lg font-bold">{val}</h3>
                  </div>
                ))}
              </div>

              {/* Workshop */}
              <div className="bg-white/5 p-3 rounded-lg mb-2">
                <p className="text-xs text-white/40">Python Workshop</p>
                <div className="h-1 bg-white/10 mt-2 rounded">
                  <div className="h-1 bg-gradient-to-r from-violet-500 to-teal-400 w-[80%] rounded"></div>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-xs text-white/40">Machine Learning</p>
                <div className="h-1 bg-white/10 mt-2 rounded">
                  <div className="h-1 bg-gradient-to-r from-violet-500 to-teal-400 w-[60%] rounded"></div>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>

      {/* Marquee */}
      <div className="mt-16 overflow-hidden border-t border-white/10 py-3">
        <div className="flex animate-marquee">
          {techBadges.map((badge, i) => (
            <span key={i} className="mx-6 text-white/30 text-sm">
              {badge}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}