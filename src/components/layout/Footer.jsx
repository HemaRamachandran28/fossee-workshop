import { motion } from 'framer-motion';
import { Sparkles, Globe, ExternalLink, Mail } from 'lucide-react';

const footerLinks = {
  Workshops: ['Python', 'SCILAB', 'OpenFOAM', 'LaTeX', 'Django', 'Machine Learning'],
  Platform: ['Browse Workshops', 'Propose Workshop', 'Statistics', 'Certificates'],
  Organisation: ['About FOSSEE', 'IIT Bombay', 'MHRD Initiative', 'Contact Us'],
};
   
export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-32">
      {/* Top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="https://fossee.in" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">FOSSEE Workshops</span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Free, hands-on technical workshops powered by IIT Bombay and funded by the Ministry of Education, Govt. of India.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, ExternalLink, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="https://fossee.in"
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="https://fossee.in" className="text-sm text-white/40 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>Developed by the FOSSEE Group</span>
            <span className="mx-1">·</span>
            <span>Funded by MHRD, Govt. of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
