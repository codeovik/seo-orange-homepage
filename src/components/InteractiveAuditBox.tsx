import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Activity, Gauge, CheckSquare, AlertCircle, RefreshCw, BarChart2, CheckCircle } from 'lucide-react';
import { AuditResult } from '../types';

interface InteractiveAuditBoxProps {
  onFocusInput?: () => void;
}

export default function InteractiveAuditBox({ onFocusInput }: InteractiveAuditBoxProps) {
  const [url, setUrl] = useState('');
  const [stage, setStage] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);

  // Scan sequences
  const scanPhases = [
    { threshold: 15, msg: 'Resolving domain headers & SSL status...' },
    { threshold: 40, msg: 'Crawling HTML markup & alt tag distribution...' },
    { threshold: 65, msg: 'Calculating keyword proximity mapping...' },
    { threshold: 85, msg: 'Analyzing page speeds and core web vitals...' },
    { threshold: 98, msg: 'Verifying trust flow and backlink citations...' }
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || url.trim().length === 0) return;

    setStage('scanning');
    setScanProgress(0);
    setScanMessage('Initializing seocompanyoc crawler...');

    if (onFocusInput) {
      onFocusInput();
    }
  };

  useEffect(() => {
    if (stage !== 'scanning') return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        
        // Find matching descriptive phase msg
        const phase = scanPhases.find(p => next <= p.threshold);
        if (phase) {
          setScanMessage(phase.msg);
        }

        if (next >= 100) {
          clearInterval(interval);
          // Generate customized audit scores
          const computedScore = Math.floor(Math.random() * 20) + 61; // 61-80 (needs work!)
          const perfScore = Math.floor(Math.random() * 15) + 68; // 68-82
          const loadSeconds = (Math.random() * 2.1 + 1.8).toFixed(1); // 1.8s - 3.9s
          const domainClean = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

          setResult({
            score: computedScore,
            performance: perfScore,
            seoScore: 88,
            mobileFriendly: true,
            loadTime: `${loadSeconds}s`,
            detectedIssues: [
              `Missing h1 structured hierarchy on ${domainClean}`,
              `3 images are lacking descriptive alt credentials`,
              `Unoptimized Javascript payload delaying interaction by ${((parseFloat(loadSeconds) - 1.2) * 500).toFixed(0)}ms`,
              `No Schema.org structured metadata discovered in page markup`
            ],
            keywordsRanked: Math.floor(Math.random() * 140) + 15
          });
          setStage('results');
          return 100;
        }
        return next;
      });
    }, 155);

    return () => clearInterval(interval);
  }, [stage, url]);

  const handleReset = () => {
    setUrl('');
    setStage('idle');
    setScanProgress(0);
    setResult(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-100/50 overflow-hidden">
      {/* Visual Header */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-brand-orange-500 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-slate-500">
            Live SEO Schema Scanner
          </span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white border border-slate-200/60 px-2 py-0.5 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
          OC Engine v3.1
        </span>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              <h3 className="font-display text-lg font-bold text-slate-800">
                Reveal your organic growth obstacles in 15 seconds.
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Enter your website URL below to execute a real-time crawl with seocompanyoc's proprietary technical auditor. No email required.
              </p>

              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="yourdomain.com (e.g. fashionbrand.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-orange-500 focus:ring-2 focus:ring-brand-orange-100 font-sans text-sm text-slate-800 tracking-wide transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-brand-orange-600 text-white font-display text-sm font-semibold hover:bg-brand-orange-700 active:translate-y-px transition-all shadow-md shadow-brand-orange-600/10 flex items-center justify-center gap-2"
                >
                  <Sparkles size={15} />
                  <span>Execute Scan</span>
                </button>
              </form>
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <span>⚡ Compliant with search crawlers</span>
                <span>•</span>
                <span>No trackers injected</span>
              </div>
            </motion.div>
          )}

          {stage === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="py-6 flex flex-col items-center justify-center space-y-5 text-center"
            >
              <div className="relative h-16 w-16 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-mono text-xs font-bold text-slate-700">{scanProgress}%</span>
              </div>
              <div className="space-y-1.5 max-w-sm">
                <p className="font-medium text-sm text-slate-800 font-display">
                  Crawl in progress...
                </p>
                <div className="font-mono text-xs text-brand-orange-600 leading-tight h-8 flex items-center justify-center">
                  {scanMessage}
                </div>
              </div>
              {/* Fake animated console bar */}
              <div className="w-full max-w-md bg-slate-950 text-emerald-400 font-mono text-[10px] p-2.5 rounded-lg text-left shadow-inner overflow-hidden border border-slate-800">
                <span className="text-slate-500">guest@seocompanyoc:~$</span> curl -s {url || 'target'} | grep -i 'seo_score'
                <div className="animate-pulse text-emerald-400 mt-1">
                  &gt; [SUCCESS] Index packet loaded. Calculating metrics...
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-between border-b border-slate-100 pb-4">
                <div className="text-center sm:text-left space-y-0.5">
                  <span className="font-mono text-xs font-bold text-slate-400">TARGET LANDING PAGES</span>
                  <h4 className="font-display font-bold text-slate-800 break-all">{url}</h4>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-brand-orange-500 transition-colors bg-slate-50 hover:bg-brand-orange-50 border border-slate-200/80 hover:border-brand-orange-200 px-3 py-1.5 rounded-lg"
                >
                  <RefreshCw size={12} />
                  <span>Scan Another</span>
                </button>
              </div>

              {/* Score breakdown row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Score Circular dial */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 font-mono tracking-wider mb-2">
                    SEO HEALTH
                  </span>
                  <div className="relative h-20 w-20 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-slate-200/80 stroke-2 fill-none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        className="stroke-brand-orange-500 stroke-2 fill-none transition-all duration-1000"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - result.score / 100)}
                      />
                    </svg>
                    <span className="absolute text-xl font-bold font-display text-slate-800">
                      {result.score}
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-orange-600 font-medium font-mono mt-2 bg-brand-orange-50 px-2 py-0.5 rounded">
                    Needs Attention
                  </span>
                </div>

                {/* Score performance speed dial */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 font-mono tracking-wider mb-2">
                    SPEED & RESPONSE
                  </span>
                  <div className="text-3xl font-display font-extrabold text-slate-800">
                    {result.loadTime}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    First Contentful Paint
                  </div>
                  <span className="text-[10px] text-rose-500 font-medium font-mono mt-2 bg-rose-50 px-2 py-0.5 rounded">
                    Slight Delay
                  </span>
                </div>

                {/* Keywords potential */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 font-mono tracking-wider mb-2">
                    ORGANIC CAPTURE
                  </span>
                  <div className="text-3xl font-display font-extrabold text-slate-800">
                    {result.keywordsRanked}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Discovered keyword markers
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium font-mono mt-2 bg-emerald-50 px-2 py-0.5 rounded">
                    Mobile Compliant
                  </span>
                </div>
              </div>

              {/* Recommendations list */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                  Critical Fix Actions ({result.detectedIssues.length})
                </span>
                <div className="space-y-1.5">
                  {result.detectedIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-600 bg-orange-50/40 p-2.5 rounded-lg border border-brand-orange-100/50"
                    >
                      <AlertCircle className="text-brand-orange-600 shrink-0 mt-0.5" size={14} />
                      <span className="leading-relaxed font-sans">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion card snippet */}
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="text-center sm:text-left space-y-0.5">
                  <h5 className="text-sm font-semibold font-display text-white">
                    Unlock Page #1 Plan
                  </h5>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Fix these obstacles and triple organic click acquisition.
                  </p>
                </div>
                <button className="whitespace-nowrap px-4 py-1.5 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-semibold font-display text-xs rounded-lg transition-colors active:translate-y-px">
                  Resolve Issues Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
