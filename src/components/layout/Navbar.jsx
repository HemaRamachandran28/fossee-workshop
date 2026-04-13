import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
  
const navLinks = [
  { label: 'Workshops', href: '/workshops' },
  { label: 'Statistics', href: '/statistics' },
  { label: 'How it Works', href: '/#how' },
  { label: 'Testimonials', href: '/#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className={`mx-auto max-w-7xl px-6 ${scrolled ? 'glass rounded-2xl mx-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''}`}>
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-violet-600 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg tracking-tight">FOSSEE</span>
                <span className="font-display font-bold text-violet-400 text-lg tracking-tight"> Workshops</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${pathname === link.href
                      ? 'text-violet-400 bg-violet-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(d => !d)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl glass border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xs font-bold text-white">
                      {user.username?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm text-white/70 font-medium max-w-24 truncate">{user.username}</span>
                    <span className="text-white/30 text-xs">▾</span>
                  </button>
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                      >
                        {[
                          { to: '/dashboard', icon: <LayoutDashboard size={14} />, label: 'Dashboard' },
                          { to: '/propose', icon: <Sparkles size={14} />, label: 'Propose Workshop' },
                          { to: '/profile', icon: <User size={14} />, label: 'Profile' },
                        ].map(item => (
                          <Link key={item.to} to={item.to}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                            <span className="text-violet-400">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-white/[0.06]" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
                          <LogOut size={14} /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-sm py-2">Log in</Link>
                  <Link to="/register" className="btn-primary text-sm py-2">
                    Get Started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-strong p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-white">Navigation</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl text-white/60 hover:text-white"><X size={18} /></button>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map(link => (
                  <Link key={link.label} to={link.href} onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <div className="border-t border-white/[0.06] my-2" />
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">Dashboard</Link>
                    <Link to="/propose" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">Propose Workshop</Link>
                    <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">Profile</Link>
                  </>
                )}
              </nav>
              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                {user ? (
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-all">
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-ghost text-sm text-center">Log in</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm justify-center">Get Started</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Close dropdown on outside click */}
      {dropOpen && <div className="fixed inset-0 z-30" onClick={() => setDropOpen(false)} />}
    </>
  );
}
