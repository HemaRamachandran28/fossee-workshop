import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/8 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
          className="font-display font-bold text-[10rem] leading-none text-gradient mb-4 select-none"
        >
          404
        </motion.div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">Page not found</h1>
        <p className="text-white/40 max-w-xs mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
