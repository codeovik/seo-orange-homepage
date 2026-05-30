import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, Laptop, Mail, Building2, Phone } from 'lucide-react';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUrl?: string;
}

export default function ConsultModal({ isOpen, onClose }: ConsultModalProps) {
  const [formData, setFormData] = useState({
    url: '',
    email: '',
    company: '',
    phone: '',
    scope: 'onpage'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API registration sequence
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ url: '', email: '', company: '', phone: '', scope: 'onpage' });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10"
          >
            {/* Header branding band */}
            <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-brand-orange-500 animate-pulse" size={18} />
                <span className="font-display font-semibold text-base">Claim Free Technical SEO Audit</span>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 text-slate-400 hover:text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                id="close-modal-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-sm text-slate-500 leading-normal">
                    Let seocompanyoc's Orange County specialist team assemble a high-intensity 40-point organic search diagnostic roadmap.
                  </div>

                  {/* Input Website */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 font-mono block">
                      Target Website Url
                    </label>
                    <div className="relative">
                      <Laptop className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://yourbrand.com"
                        className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-orange-500 font-sans"
                      />
                    </div>
                  </div>

                  {/* Input Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 font-mono block">
                      Corporate Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-orange-500 font-sans"
                      />
                    </div>
                  </div>

                  {/* Double Row: Company, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 font-mono block">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="My Business"
                          className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-orange-500 font-sans"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 font-mono block">
                        Direct Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(949) 555-0192"
                          className="w-full h-10 pl-9 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-orange-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Segment Options */}
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-semibold text-slate-600 font-mono block mb-1">
                      Priority Growth Segment
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { val: 'onpage', name: 'On-Page' },
                        { val: 'authority', name: 'Authority' },
                        { val: 'local', name: 'Local Rank' }
                      ].map((seg) => (
                        <button
                          key={seg.val}
                          type="button"
                          onClick={() => setFormData({ ...formData, scope: seg.val })}
                          className={`h-9 border text-xs font-semibold rounded-lg font-display transition-all ${
                            formData.scope === seg.val
                              ? 'border-brand-orange-500 bg-brand-orange-50 text-brand-orange-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                          }`}
                        >
                          {seg.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submission and assurances */}
                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-11 bg-brand-orange-600 hover:bg-brand-orange-700 disabled:bg-slate-300 text-white font-display text-sm font-semibold rounded-xl transition-all shadow-md active:translate-y-px flex items-center justify-center gap-2"
                    >
                      {submitting ? 'Assembling crawler indices...' : 'Confirm Audit Request'}
                      <ArrowRight size={14} />
                    </button>
                    <div className="text-[10px] text-slate-400 font-sans text-center leading-normal">
                      We protect your domains. Standard NDA applies. seocompanyoc will deliver the initial interactive deck to your inbox in 12 hours.
                    </div>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-inner">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="font-display text-lg font-bold text-slate-800">
                      Crawl Request Secured!
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Our Orange County organic engineers are already querying performance metrics for <span className="font-semibold text-slate-700">{formData.url}</span>. Keep an eye on <span className="font-semibold text-slate-700">{formData.email}</span>.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 h-9 bg-slate-900 hover:bg-slate-800 text-white font-display text-xs font-semibold rounded-lg transition-all"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
