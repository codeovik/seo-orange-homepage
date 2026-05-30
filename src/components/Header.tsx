import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenAudit: () => void;
}

export default function Header({ onOpenAudit }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="px-4 py-4 md:px-8 bg-white border-b border-slate-100 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Left: Brand Logo resembling the Rocket brand from the image */}
        <div className="flex items-center gap-3">
          <img 
            src="https://www.seocompanyoc.com/wp-content/uploads/2025/09/cropped-Logo-and-Slogan-sep-800x160.png" 
            alt="seocompanyoc" 
            className="h-7 md:h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Center: Desktop Navigation links identical to the image */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-slate-600/95">
          <a href="#" className="hover:text-slate-900 transition-colors py-1">
            Home
          </a>
          <a href="#about-section" className="hover:text-slate-900 transition-colors py-1">
            About
          </a>
          <a href="#services-section" className="hover:text-slate-900 transition-colors py-1">
            Services
          </a>
          <a href="#stats-section" className="hover:text-slate-900 transition-colors py-1">
            Portfolio
          </a>
          <a href="#contact-section" className="hover:text-slate-900 transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Right: Desktop Buttons - only "Book a Call" as requested */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all"
          >
            <span>Book a Call</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 h-10 px-4 bg-[#eb5a0c] text-white rounded-lg font-normal text-xs flex items-center"
          >
            <span>Book a Call</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 border border-slate-200/80 rounded-lg flex items-center justify-center text-slate-700 bg-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 px-6 py-6 flex flex-col gap-4 shadow-lg md:hidden"
          >
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-50 pb-2"
            >
              Home
            </a>
            <a
              href="#about-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-50 pb-2"
            >
              About
            </a>
            <a
              href="#services-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-50 pb-2"
            >
              Services
            </a>
            <a
              href="#stats-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-50 pb-2"
            >
              Portfolio
            </a>
            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-50 pb-2"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
