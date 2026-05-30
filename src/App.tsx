/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Header from './components/Header';
import ConsultModal from './components/ConsultModal';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({
  target,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated && active) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      active = false;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = target;
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = start + (end - start) * easeProgress;

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, target, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function App() {
  const [isAuditModalOpen, setAuditModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[]
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }, 1200);
  };

  const testimonials = [
    {
      id: 1,
      name: "James Stump",
      role: "Business Owner",
      avatar: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/ai-image-chinese-man.jpg",
      text: "I am a business owner who needed help with online marketing, specifically how to get more traffic to my website. I found SEO Company OC and I didn't regret it for a moment. SEO Company OC is an online marketing firm that provides an amazing service. I was amazed by the process because they made it so easy for me to get what I wanted. They have helped me get more traffic and build my brand. They showed me a web design plan and set up an email campaign for me in just a couple of days!"
    },
    {
      id: 2,
      name: "Cheryl Philip",
      role: "Real Estate Investor",
      avatar: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/ai-image-usa-man.jpg",
      text: "We are a real estate investment company that was trying to reach more customers around Los Angeles. We started looking for SEO agencies to help us out, and thanks to a friend we discovered SEO Company OC. We called them, and they answered quickly, listening to our needs and making a good proposal for us. We have been working with them since then, and have seen many results!"
    },
    {
      id: 3,
      name: "Kim Eason",
      role: "Corporate Manager",
      avatar: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/ai-image-russian-man.jpg",
      text: "Our company already had a website. However, it wasn’t good enough, and it was still hard for our clients to find us on google. That’s why we decided to go looking for a way to reinvent our website to attract more traffic and potential customers. We found SEO Company OC on Google, and after taking a look at their services, customers reviews, and extensive portfolio, we knew they were the best solution for us. And we were right! We contacted Max (the owner) and explained to him what our company was looking for, and he immediately mapped out our success checklist."
    }
  ];

  const toggleReview = (id: number) => {
    setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Track scroll activity specifically over the timeline element layout
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"]
  });

  // Apply a responsive spring curve to keep scroll revealing strictly synchronized with actual user scrolling
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col antialiased">
      {/* Outer Border/Frame Containment (stunning native app design resembling screenshot container) */}
      <div className="flex-1 flex flex-col bg-white border-x border-slate-200/60 max-w-7xl w-full mx-auto my-0 rounded-none overflow-hidden self-center">
        
        {/* Navigation Header */}
        <Header onOpenAudit={() => setAuditModalOpen(true)} />

        {/* Hero Section Container with Wide Studio Ghibli Anime background */}
        <div className="relative w-full min-h-[580px] md:min-h-[640px] flex flex-col justify-center bg-sky-200 overflow-hidden">
          
          {/* Background Illustration */}
          <img 
            src="https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/studio_ghibli-style_anime_illustration_wide_202605290158.jpeg" 
            alt="Studio Ghibli style Anime Rocket Launch background" 
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          />

          {/* Symmetrical Left fade and subtle blur gradients to ensure text stands out with premium contrast */}
          <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-linear-to-r from-white/90 via-white/65 to-transparent pointer-events-none z-1 opacity-85"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white via-white/90 to-transparent pointer-events-none z-1"></div>
          <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/20 to-transparent pointer-events-none z-1"></div>

          {/* Interactive Content Overlay Container */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 py-16 md:py-28 flex flex-col items-start text-left space-y-6">
            
            {/* Top custom pill info banner matching the original screenshot style */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange-500 animate-pulse"></span>
              <span className="font-mono text-[10px] md:text-xs font-bold text-slate-700 tracking-wide">
                Trusted by Orange County Businesses Since 2008
              </span>
            </motion.div>

            {/* Bold Display Headline with Orange Color highlight with improved spacing */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.12] max-w-2xl"
              id="main-bold-headline"
            >
              Marketing That <br />
              Actually Drives <span className="text-brand-orange-600 font-extrabold">Results</span>
            </motion.h1>

            {/* Exact responsive paragraph layout */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-sans text-sm sm:text-base text-slate-600/90 leading-relaxed max-w-lg"
            >
              We craft high-performance rankings for rapid-growth companies. Beautiful typeset grids, structural authority frames, and zero unnecessary media weight.
            </motion.p>

            {/* Core Action Call buttons - primary "Book a Call" and secondary "See how work" */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-0"
            >
              <button
                onClick={() => setAuditModalOpen(true)}
                className="flex items-center gap-2 h-11 px-6 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all shadow-xs"
                id="primary-cta-btn"
              >
                <span>Book a Call</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('trust-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 h-11 px-6 font-sans text-sm font-normal bg-white/75 border border-[#e6e6e6] text-slate-800 rounded-lg hover:bg-white/90 transition-all shadow-xs"
                id="secondary-cta-btn"
              >
                <span>See how work</span>
              </button>
            </motion.div>

          </div>

        </div>

        {/* Brand/Partner Logos Bar below the Hero view */}
        <div className="bg-white border-t border-b border-slate-100 py-6 px-6 md:px-12 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Elegant compact heading */}
            <div className="text-center">
              <span className="text-[11px] font-mono leading-none font-bold uppercase tracking-widest text-black/55">
                Trusted by Growth-Focused Businesses
              </span>
            </div>

            {/* Logo grid with decreased logo height */}
            <div className="flex flex-wrap items-center justify-between w-full gap-6 md:gap-8">
              {[
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-426.png", alt: "Brand logo 1" },
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-416.png", alt: "Brand logo 2" },
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-404.png", alt: "Brand logo 3" },
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-358.png", alt: "Brand logo 4" },
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-356.png", alt: "Brand logo 5" },
                { src: "https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/logoipsum-332.png", alt: "Brand logo 6" }
              ].map((logo, index) => (
                <div key={index} className="flex-1 min-w-[110px] max-w-[140px] flex items-center justify-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-5 md:h-6 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Premium High-End Trust Bar / Cards Section (Formulated for beautiful white light mode, matching the hero's sleek nature) */}
        <section className="bg-white text-slate-800 py-24 px-6 md:px-12 border-t border-slate-100 relative overflow-hidden" id="trust-section">
          {/* Subtle light-mode orange ambient glow */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-orange-100/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-6">
            
            {/* Section Header with customized hybrid font title matching the request */}
            <div className="text-center md:text-left space-y-3 max-w-2xl">
              <p className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
                Orange County Built
              </p>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Your Business <span className="font-serif italic font-black text-black/55">Comes First</span>
              </h2>
            </div>

            {/* Symmetrical Grid of four Trust Cards with clean custom solid background ring design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
               {/* Card 1: Direct Communication */}
              <div 
                className="group rounded-2xl bg-white ring-1 ring-black/10 p-5 transition-colors"
                id="trust-card-direct-comm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 transition-colors group-hover:text-[#eb5a0c]">{"{ 01 }"}</span>
                </div>
                <div className="mt-6">
                  <div className="h-10 w-10 rounded-lg bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <p className="mt-4 text-neutral-900 font-medium tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                    Direct Communication
                  </p>
                  <p className="text-neutral-600 text-sm transition-colors group-hover:text-[#eb5a0c]/80">
                    No endless sales layers. Real people, real answers.
                  </p>
                </div>
              </div>

              {/* Card 2: Measurable Progress */}
              <div 
                className="group rounded-2xl bg-white ring-1 ring-black/10 p-5 transition-colors"
                id="trust-card-measurable-prog"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 transition-colors group-hover:text-[#eb5a0c]">{"{ 02 }"}</span>
                </div>
                <div className="mt-6">
                  <div className="h-10 w-10 rounded-lg bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-5 w-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  </div>
                  <p className="mt-4 text-neutral-900 font-medium tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                    Measurable Progress
                  </p>
                  <p className="text-neutral-600 text-sm transition-colors group-hover:text-[#eb5a0c]/80">
                    We don’t just say work is happening. We show what’s improving.
                  </p>
                </div>
              </div>

              {/* Card 3: Business-Focused Strategy */}
              <div 
                className="group rounded-2xl bg-white ring-1 ring-black/10 p-5 transition-colors"
                id="trust-card-business-strat"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 transition-colors group-hover:text-[#eb5a0c]">{"{ 03 }"}</span>
                </div>
                <div className="mt-6">
                  <div className="h-10 w-10 rounded-lg bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target h-5 w-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <p className="mt-4 text-neutral-900 font-medium tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                    Business-Focused Strategy
                  </p>
                  <p className="text-neutral-600 text-sm transition-colors group-hover:text-[#eb5a0c]/80">
                    Every decision is made to increase leads, calls, and growth.
                  </p>
                </div>
              </div>

              {/* Card 4: Long-Term Partnership */}
              <div 
                className="group rounded-2xl bg-white ring-1 ring-black/10 p-5 transition-colors"
                id="trust-card-longterm-part"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 transition-colors group-hover:text-[#eb5a0c]">{"{ 04 }"}</span>
                </div>
                <div className="mt-6">
                  <div className="h-10 w-10 rounded-lg bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-5 w-5"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <p className="mt-4 text-neutral-900 font-medium tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                    Long-Term Partnership
                  </p>
                  <p className="text-neutral-600 text-sm transition-colors group-hover:text-[#eb5a0c]/80">
                    Not short-term tricks. Sustainable business growth.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setAuditModalOpen(true)}
                className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
              >
                <span>Book Your Free Growth Call</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
              </button>
            </div>

          </div>
        </section>

        {/* Proactive Problems Section representing the attached layout design inspiration */}
        <section className="bg-slate-50/50 py-24 px-6 md:px-12 border-t border-b border-slate-100 relative" id="problems-section">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content - Badge, Header, Custom connected list and CTA button */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              <div className="space-y-3">
                <p className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
                  Common Growth Problems
                </p>
                <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                  Is Your Marketing <span className="font-serif italic font-black text-black/55">Actually Working?</span>
                </h2>
                <p className="text-base text-slate-600 font-medium">
                  Many businesses get traffic. Very few get qualified leads.
                </p>
              </div>

              {/* Vertical connected step-like list with deep color customization */}
              <div className="relative pl-2.5 space-y-6">
                
                {/* Visual Timeline connector line */}
                <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-slate-200"></div>

                {/* List Item 1: Low Conversions */}
                <div className="relative flex gap-4 items-start group">
                  <div className="z-10 h-10 w-10 shrink-0 rounded-lg bg-red-50 border border-red-200/80 flex items-center justify-center text-red-700 transition-all group-hover:bg-red-700 group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-red-800 tracking-tight transition-colors group-hover:text-red-700">
                      Low Conversions
                    </h3>
                    <p className="text-[13px] text-slate-800 leading-relaxed font-sans font-normal mt-0.5">
                      Traffic grows, but inquiries and qualified leads stay disappointingly low.
                    </p>
                  </div>
                </div>

                {/* List Item 2: Empty Reports */}
                <div className="relative flex gap-4 items-start group">
                  <div className="z-10 h-10 w-10 shrink-0 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 transition-all group-hover:bg-blue-700 group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-blue-800 tracking-tight transition-colors group-hover:text-blue-700">
                      Empty Reports
                    </h3>
                    <p className="text-[13px] text-slate-800 leading-relaxed font-sans font-normal mt-0.5">
                      Endless spreadsheets arrive while business growth barely moves forward.
                    </p>
                  </div>
                </div>

                {/* List Item 3: Weak Returns */}
                <div className="relative flex gap-4 items-start group">
                  <div className="z-10 h-10 w-10 shrink-0 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 transition-all group-hover:bg-purple-700 group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-purple-800 tracking-tight transition-colors group-hover:text-purple-700">
                      Weak Returns
                    </h3>
                    <p className="text-[13px] text-slate-800 leading-relaxed font-sans font-normal mt-0.5">
                      Marketing spend rises, but confidence and measurable outcomes stay low.
                    </p>
                  </div>
                </div>

                {/* List Item 4: Poor Performance */}
                <div className="relative flex gap-4 items-start group">
                  <div className="z-10 h-10 w-10 shrink-0 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 transition-all group-hover:bg-amber-700 group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-amber-800 tracking-tight transition-colors group-hover:text-amber-750">
                      Poor Performance
                    </h3>
                    <p className="text-[13px] text-slate-800 leading-relaxed font-sans font-normal mt-0.5">
                      Looks modern, but fails to convince visitors to take action.
                    </p>
                  </div>
                </div>

              </div>

              {/* Call to action "See all problems" button */}
              <div className="pt-2 pl-2.5">
                <button
                  onClick={() => setAuditModalOpen(true)}
                  className="flex items-center gap-2 h-11 px-6 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all shadow-xs"
                >
                  <span>See all problems</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                </button>
              </div>

            </div>

            {/* Right Column - Beautiful premium square image with rounded corners */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative aspect-square w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/40 bg-white">
                <img 
                  src="https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/check-live-link-on-description.png" 
                  alt="Common Growth Problems Visual Representation" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Real Growth Solutions Section with premium designer cards */}
        <section className="bg-white py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="solutions-section">
          {/* Symmetrical glowing ambient accents behind the bento grid cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange-50/30 rounded-full blur-[160px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            
            {/* Centered Typography: Headline and 2-line Subtitle */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-mono font-bold tracking-widest text-[#eb5a0c] uppercase">
                Our Capabilities
              </p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                How We Create <span className="font-serif italic font-black text-black/55">Real Growth</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-normal leading-relaxed">
                We align high-performance development, surgical SEO strategy, and continuous optimization 
                to transform random clicks into reliable, high-intent phone calls and business revenue.
              </p>
            </div>

            {/* Symmetrical 3-Card Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
              
              {/* Card 1: Conversion-Focused Websites (Subtly highlighted/Few highlighted card style) */}
              <div 
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-[#eb5a0c]/20 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.02), 0 2px 6px -1px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div className="space-y-6">
                  {/* Icon container */}
                  <div className="h-12 w-12 rounded-xl bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><rect width="20" height="15" x="2" y="3" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M12 12V3"/></svg>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                      Conversion-Focused Websites
                    </h3>
                    <p className="text-[14px] text-slate-650 leading-relaxed font-sans font-normal">
                      Websites designed not only to look great, but to perform.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100/80 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 group-hover:text-[#eb5a0c] transition-colors">
                  <span>OPTIMIZED FOR LEADS</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
                </div>
              </div>

              {/* Card 2: SEO Strategy (Deep Highlight with Sunset-style gradient and long inner shadow inspired by Dribbble designs) */}
              <div 
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-[#eb5a0c] via-[#ff7315] to-[#f7481B] text-white transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1.5 select-none"
                style={{
                  boxShadow: 'inset 0 12px 30px rgba(255,255,255,0.32), inset 0 -12px 35px rgba(0,0,0,0.35), 0 30px 60px -15px rgba(235,90,12,0.45)',
                }}
              >
                {/* Decorative absolute subtle glow ring inside the card */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="space-y-6 relative z-10">
                  {/* Highlighted Icon container */}
                  <div 
                    className="h-12 w-12 rounded-xl bg-white/20 border border-white/20 text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{ boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.2)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white tracking-tight drop-shadow-xs">
                        SEO Strategy
                      </h3>
                      <span className="text-[9px] font-mono leading-none font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/15">
                        Core Focus
                      </span>
                    </div>
                    <p className="text-[14px] text-white/95 leading-relaxed font-sans font-medium drop-shadow-2xs">
                      The right keywords, structure, and priorities to improve visibility.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/15 flex items-center gap-1.5 text-xs font-mono font-bold text-white/80 group-hover:text-white transition-colors relative z-10">
                  <span>MAXIMUM TRAFFIC GROWTH</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
                </div>
              </div>

              {/* Card 3: Local Visibility Growth (Subtly highlighted/Few highlighted card style) */}
              <div 
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-[#eb5a0c]/20 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.02), 0 2px 6px -1px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div className="space-y-6">
                  {/* Icon container */}
                  <div className="h-12 w-12 rounded-xl bg-[#eb5a0c]/10 text-[#eb5a0c] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c]">
                      Local Visibility Growth
                    </h3>
                    <p className="text-[14px] text-slate-650 leading-relaxed font-sans font-normal">
                      Get discovered when customers search in your market.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100/80 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 group-hover:text-[#eb5a0c] transition-colors">
                  <span>HYPERLOCAL DOMINANCE</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" /></svg>
                </div>
              </div>

            </div>

            {/* Bottom Centered Button CTA - "Book for grow" */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setAuditModalOpen(true)}
                className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
              >
                <span>Book for grow</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
              </button>
            </div>

          </div>
        </section>

        {/* Dynamic Timeline Scroll-Reveal Work Process Section */}
        <section className="bg-slate-50/60 py-28 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="process-section">
          {/* Ambient lighting effects behind the responsive timeline */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-brand-orange-50/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Centered Headers: Playful display font with 55% opacity */}
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-20 md:mb-28">
              <p className="text-xs font-mono font-bold tracking-widest text-[#eb5a0c] uppercase">
                Work Process
              </p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                A Clear Process With <br />
                <span className="font-serif italic font-black text-black/55 tracking-wide antialiased">Clear Direction</span>
              </h2>
            </div>

            {/* Timeline Wrapper Container */}
            <div ref={timelineRef} className="relative max-w-5xl mx-auto px-4 sm:px-6">
              
              {/* Vertical Baseline - Center on Desktop, Left aligned on Mobile */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-200/80 -translate-x-1/2"></div>
              
              {/* Interactive Scroll-Reveal Center Line */}
              <motion.div 
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] bg-[#eb5a0c] -translate-x-1/2 origin-top"
                style={{ scaleY }}
              />

              <div className="space-y-4 md:space-y-3">
                
                {/* Step 1: Left Aligned Card in view (Analyze) */}
                <div className="relative flex flex-col md:flex-row items-stretch justify-between group">

                  {/* Left Side (Card Panel + Pill Badge above) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 flex flex-col justify-start items-start md:items-end">
                    {/* Pill Above Card */}
                    <div className="mb-2.5 select-none md:self-end">
                      <span className="inline-flex py-2.5 px-6 h-auto bg-white border border-slate-200/85 text-xs font-bold text-slate-700 tracking-wide uppercase rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        Step 1
                      </span>
                    </div>

                    <motion.div 
                      className="w-full max-w-md bg-[#f9f9f9] border border-[#e6e6e6] py-8 px-7 rounded-2xl transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0.4, x: -35, scale: 0.96 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1.02
                      }}
                      whileHover={{ scale: 1.04 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="space-y-5">
                        {/* Icon on Left */}
                        <div className="flex justify-start">
                          <div className="p-4 bg-[#eb5a0c]/10 text-[#eb5a0c] rounded-2xl flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <h3 className="text-2xl md:text-[26px] font-sans font-semibold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c] leading-tight">
                            Comprehensive Audit
                          </h3>
                          <blockquote className="text-[14px] md:text-[14px] font-normal text-slate-500/90 border-l border-slate-200/80 pl-4 py-0.5 leading-relaxed font-sans">
                            We review your current performance, identify key opportunities, and map technical improvements across the search footprint.
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty grid spacer on Desktop */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                </div>

                {/* Step 2: Right Aligned Card in view (Strategize) */}
                <div className="relative flex flex-col md:flex-row-reverse items-stretch justify-between group">

                  {/* Right Side (Card Panel + Pill Badge above) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 flex flex-col justify-start items-start">
                    {/* Pill Above Card */}
                    <div className="mb-2.5 select-none">
                      <span className="inline-flex py-2.5 px-6 h-auto bg-white border border-slate-200/85 text-xs font-bold text-slate-700 tracking-wide uppercase rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        Step 2
                      </span>
                    </div>

                    <motion.div 
                      className="w-full max-w-md bg-[#f9f9f9] border border-[#e6e6e6] py-8 px-7 rounded-2xl transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0.4, x: 35, scale: 0.96 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1.02
                      }}
                      whileHover={{ scale: 1.04 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="space-y-5">
                        {/* Icon on Left */}
                        <div className="flex justify-start">
                          <div className="p-4 bg-[#eb5a0c]/10 text-[#eb5a0c] rounded-2xl flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <h3 className="text-2xl md:text-[26px] font-sans font-semibold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c] leading-tight">
                            Strategic Roadmap
                          </h3>
                          <blockquote className="text-[14px] md:text-[14px] font-normal text-slate-500/90 border-l border-slate-200/80 pl-4 py-0.5 leading-relaxed font-sans">
                            We construct a tailored, surgical strategy focused on the specific directories that drive actual merchant revenue.
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty grid spacer on Desktop */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                </div>

                {/* Step 3: Left Aligned Card in view (Execute) */}
                <div className="relative flex flex-col md:flex-row items-stretch justify-between group">

                  {/* Left Side (Card Panel + Pill Badge above) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 flex flex-col justify-start items-start md:items-end">
                    {/* Pill Above Card */}
                    <div className="mb-2.5 select-none md:self-end">
                      <span className="inline-flex py-2.5 px-6 h-auto bg-white border border-slate-200/85 text-xs font-bold text-slate-700 tracking-wide uppercase rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        Step 3
                      </span>
                    </div>

                    <motion.div 
                      className="w-full max-w-md bg-[#f9f9f9] border border-[#e6e6e6] py-8 px-7 rounded-2xl transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0.4, x: -35, scale: 0.96 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1.02
                      }}
                      whileHover={{ scale: 1.04 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="space-y-5">
                        {/* Icon on Left */}
                        <div className="flex justify-start">
                          <div className="p-4 bg-[#eb5a0c]/10 text-[#eb5a0c] rounded-2xl flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <h3 className="text-2xl md:text-[26px] font-sans font-semibold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c] leading-tight">
                            Surgical Launch
                          </h3>
                          <blockquote className="text-[14px] md:text-[14px] font-normal text-slate-500/90 border-l border-slate-200/80 pl-4 py-0.5 leading-relaxed font-sans">
                            We build custom landing pages, repair index errors, write optimized copy, and configure targeted keyword maps.
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty grid spacer on Desktop */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                </div>

                {/* Step 4: Right Aligned Card in view (Optimize) */}
                <div className="relative flex flex-col md:flex-row-reverse items-stretch justify-between group">

                  {/* Right Side (Card Panel + Pill Badge above) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 flex flex-col justify-start items-start">
                    {/* Pill Above Card */}
                    <div className="mb-2.5 select-none">
                      <span className="inline-flex py-2.5 px-6 h-auto bg-white border border-slate-200/85 text-xs font-bold text-slate-700 tracking-wide uppercase rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        Step 4
                      </span>
                    </div>

                    <motion.div 
                      className="w-full max-w-md bg-[#f9f9f9] border border-[#e6e6e6] py-8 px-7 rounded-2xl transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0.4, x: 35, scale: 0.96 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1.02
                      }}
                      whileHover={{ scale: 1.04 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="space-y-5">
                        {/* Icon on Left */}
                        <div className="flex justify-start">
                          <div className="p-4 bg-[#eb5a0c]/10 text-[#eb5a0c] rounded-2xl flex items-center justify-center w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16V12"/><path d="M12 8h.01"/></svg>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-left">
                          <h3 className="text-2xl md:text-[26px] font-sans font-semibold text-slate-900 tracking-tight transition-colors group-hover:text-[#eb5a0c] leading-tight">
                            Continuous Optimization
                          </h3>
                          <blockquote className="text-[14px] md:text-[14px] font-normal text-slate-500/90 border-l border-slate-200/80 pl-4 py-0.5 leading-relaxed font-sans">
                            We systematically analyze keyword ranking velocity and refine page factors to guarantee absolute long term search supremacy.
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty grid spacer on Desktop */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>
                </div>

              </div>
            </div>

            <div className="pt-14 flex justify-center">
              <button
                onClick={() => setAuditModalOpen(true)}
                className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
              >
                <span>Book Your Discovery Call</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
              </button>
            </div>

          </div>
        </section>

        {/* Real-world results stats segment matching hand-drawn feedback perfectly */}
        <section className="bg-slate-50/40 py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="stats-section">
          {/* Subtle warm orange lighting effect */}
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-orange-50/25 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            
            {/* Box on the Left: Sleek Heading Card with Low Opacity Bg Image */}
            <div className="relative overflow-hidden rounded-xl min-h-[280px] lg:min-h-[340px] flex flex-col justify-end p-8 md:p-10 border border-slate-200/55 group select-none bg-white">
              
              {/* Underneath image with custom opacity */}
              <div className="absolute inset-0 z-0 opacity-50">
                <img 
                  src="https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/a_laptop_mockup_where_showing_202605300212.jpg" 
                  alt="Real-world Business Metrics Graphic Background" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Background gradient overlay to keep text hyper-legible and premium */}
              <div className="absolute inset-0 z-5 bg-gradient-to-t from-white/60 via-white/50 to-white/50"></div>

              {/* Title Copy with elegant typography stack */}
              <div className="relative z-10 m-0 p-0 text-left">
                <h2 className="text-2xl md:text-[32px] font-sans font-medium tracking-tight text-slate-900 leading-snug m-0 p-0">
                  The Results After Switching to <br />
                  <span className="font-serif italic font-black text-black/75 tracking-wide text-2xl md:text-[34px] antialiased">SEO Company OC</span>
                </h2>
              </div>

            </div>

            {/* Right Column: High-Value Metrics Grid */}
            <div className="flex flex-col justify-center space-y-12 lg:pl-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                
                {/* Stat 1 */}
                <div className="space-y-3 pl-6 border-l-2 border-slate-200 hover:border-brand-orange-500 transition-colors duration-300">
                  <div className="text-3xl md:text-3.5xl font-sans font-semibold text-slate-800 tracking-tight">
                    <AnimatedCounter target={62} prefix="+" suffix="%" />
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans font-normal">
                    More qualified from customers actively searching for services.
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="space-y-3 pl-6 border-l-2 border-slate-200 hover:border-brand-orange-500 transition-colors duration-300">
                  <div className="text-3xl md:text-3.5xl font-sans font-semibold text-slate-800 tracking-tight">
                    <AnimatedCounter target={3.1} decimals={1} suffix="x" />
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans font-normal">
                    Stronger search presence where potential already look.
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="space-y-3 pl-6 border-l-2 border-slate-200 hover:border-brand-orange-500 transition-colors duration-300">
                  <div className="text-3xl md:text-3.5xl font-sans font-semibold text-slate-800 tracking-tight">
                    <AnimatedCounter target={48} prefix="+" suffix="%" />
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans font-normal">
                    More visitors turning into valuable leads & business opportunities.
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="space-y-3 pl-6 border-l-2 border-slate-200 hover:border-brand-orange-500 transition-colors duration-300">
                  <div className="text-3xl md:text-3.5xl font-sans font-semibold text-slate-800 tracking-tight">
                    <AnimatedCounter target={71} prefix="+" suffix="%" />
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans font-normal">
                    Attract customers interested in your services and solutions.
                  </p>
                </div>

              </div>

            </div>

          </div>

          <div className="pt-12 flex justify-center relative z-10">
            <button
              onClick={() => setAuditModalOpen(true)}
              className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
            >
              <span>Get Your Free SEO Audit</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
            </button>
          </div>
        </section>

        {/* Experience Creates Confidence (Founder Bio Section Matching Mockup Style) */}
        <section className="bg-slate-50/25 py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="about-section">
          {/* Accent lighting to add depth to the block */}
          <div className="absolute top-1/2 left-2/3 w-[500px] h-[500px] bg-indigo-50/35 rounded-full blur-[140px] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto space-y-12 relative z-10">
            {/* Header portion resembling mockup */}
            <div className="text-left space-y-2">
              <p className="text-xs font-mono font-bold tracking-widest text-[#eb5a0c] uppercase">
                ABOUT
              </p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Experience Creates <span className="font-serif italic font-black text-black/55">Confidence</span>
              </h2>
              <p className="text-sm md:text-base font-normal text-slate-500 max-w-2xl">
                Meet our founding search business expert.
              </p>
            </div>

            {/* Premium Interactive Bento Card styled like the mockup */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.015)] overflow-hidden hover:shadow-[0_12px_45px_rgba(0,0,0,0.035)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left side content (7 columns) */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl font-semibold text-slate-800">Hello</span>
                      <span className="text-xl md:text-2xl animate-bounce">👋</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-sans font-bold text-slate-800 tracking-tight leading-snug">
                      I'm the strategist behind <span className="text-[#eb5a0c]">SEO Company OC</span>
                    </h3>

                    <div className="space-y-5 text-left">
                      <p className="text-[14px] md:text-[15px] font-normal text-slate-500 leading-relaxed font-sans">
                        Our agency was founded in 2008 by our principal expert, who remains at the helm offering personalized, high-touch consultations. We assist local and national clients in implementing whatever is strategically necessary to reach the first page of Google. Over more than 14 years, our leadership has engineered advanced search techniques targeting the latest algorithms across all industry sectors, defining the standard for client success.
                      </p>
                      <p className="text-[14px] md:text-[15px] font-normal text-slate-500 leading-relaxed font-sans">
                        Through years of tireless research and continuous testing, we have unlocked highly effective strategies to solidify our reputation as Orange County's leading SEO authority. By confronting complex search challenges daily, our team has learned advanced search techniques that can only be mastered through real-life, hands-on situations. This deep, battle-tested knowledge is shared directly with all our clients to drive sustainable business growth.
                      </p>
                    </div>
                  </div>

                  {/* Signature and Interactive CTA Footer of left side */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                    {/* Founder Name & Handwritten Signature */}
                    <div className="flex flex-col select-none text-left">
                      {/* Signature graphic SVG outline */}
                      <svg className="h-10 w-auto opacity-75 mb-2 max-w-[130px] text-slate-800" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M15,45 C35,15 45,10 50,25 C55,40 60,45 65,30 C70,15 75,20 80,35 C85,50 90,40 95,25 C100,10 110,42 120,40 C130,38 145,20 160,30 C175,40 185,38 190,35" />
                        <path d="M30,35 L180,28" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                      </svg>
                      <span className="text-sm font-bold text-slate-800 tracking-tight leading-none uppercase">Max Sanchez</span>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider leading-none">CEO, SEOorangeOC</span>
                    </div>

                    {/* Social connection & CTA Button flex row */}
                    <div className="flex items-center gap-5 shrink-0 select-none">
                      {/* Social connections wrapper */}
                      <div className="hidden sm:flex flex-col items-start gap-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">LET'S CONNECT</span>
                        <div className="flex items-center gap-2 mt-1.5 text-slate-400">
                          {/* LinkedIn */}
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-[#eb5a0c] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                          </a>
                          {/* Twitter / X */}
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-[#eb5a0c] transition-colors">
                            <span className="text-[10px] font-bold leading-none py-0.5">X</span>
                          </a>
                          {/* Web / Globe */}
                          <a href="#" className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-[#eb5a0c] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          </a>
                        </div>
                      </div>

                      {/* Let's talk capsule button */}
                      <button 
                        onClick={() => setAuditModalOpen(true)}
                        className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#e6e6e6] text-slate-800 hover:bg-[#d9d9d9] hover:text-slate-900 rounded-lg transition-all cursor-pointer"
                      >
                        <span>Let's Talk</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right side portrait crop (5 columns) */}
                <div className="lg:col-span-5 bg-slate-50 relative min-h-[350px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-slate-100 flex items-stretch">
                  <div className="absolute inset-0 w-full h-full p-4 overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xs">
                      <img 
                        src="https://www.seocompanyoc.com/wp-content/uploads/2022/07/orange-county-seo-expert-max-sanchez-1-480x357.jpg" 
                        alt="Max Sanchez - Expert & Founder" 
                        className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 hover:scale-[1.04]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Clean bottom gradient fading the image elegantly */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 via-transparent to-transparent z-1"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* What Clients Say (Interactive Premium Light Mode Testimonials Section) */}
        <section className="bg-slate-50/25 py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="testimonials-section">
          {/* Subtle light technical grid overlay matching other premium panels */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>
          
          {/* Soft warm and cool background light flares designed for light background canvases */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-50/30 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute -bottom-10 right-10 w-[450px] h-[450px] bg-[#eb5a0c]/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#eb5a0c]/15 to-transparent"></div>

          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            
            {/* Centered Heading with exact highlight structure requested */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <p className="text-xs font-mono font-bold tracking-widest text-[#eb5a0c] uppercase">
                TESTIMONIALS
              </p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                What <span className="font-serif italic font-black text-black/55">Clients</span> Say
              </h2>
              <p className="text-sm md:text-base font-normal text-slate-500 max-w-xl mx-auto leading-relaxed">
                Discover what our satisfied customers have to say about their experiences with our team.
              </p>
            </div>

            {/* Testimonials 3-Column Glassmorphic-Inspired Light Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {testimonials.map((t) => {
                const isExpanded = !!expandedReviews[t.id];
                const cleanReviewText = isExpanded 
                  ? t.text 
                  : `${t.text.slice(0, 160)}${t.text.length > 160 ? "..." : ""}`;

                return (
                  <div 
                    key={t.id}
                    className="bg-white border border-slate-200/60 rounded-3xl p-8 hover:border-[#eb5a0c]/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between items-start text-left relative group overflow-hidden"
                  >
                    {/* Subtle internal warm lighting feedback card overlay */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-[#eb5a0c]/0 group-hover:bg-[#eb5a0c]/60 transition-all duration-300 pointer-events-none"></div>

                    <div className="space-y-6 w-full flex flex-col items-start text-left">
                      {/* Testimonial image with full rounded corner - slightly bigger */}
                      <img 
                        src={t.avatar} 
                        alt={`${t.name} Portrait`} 
                        className="w-24 h-24 rounded-full object-cover select-none border border-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />

                      {/* Author credentials with decreased font weight */}
                      <div className="space-y-1 text-left">
                        <h4 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-[#eb5a0c]">
                          {t.name}
                        </h4>
                        <p className="text-[14px] font-sans font-normal text-black/60">
                          {t.role}
                        </p>
                      </div>

                      {/* Description body text suited for comfortable reading with increased size & weight */}
                      <div className="text-[14.5px] leading-relaxed text-slate-700 font-sans font-medium select-text">
                        {cleanReviewText}
                      </div>
                    </div>

                    {/* Interactive read-more button that toggles expansion cleanly */}
                    {t.text.length > 160 && (
                      <div className="pt-6 w-full flex justify-start">
                        <button 
                          onClick={() => toggleReview(t.id)}
                          className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#eb5a0c] hover:text-[#d64f0a] transition-colors flex items-center gap-1.5 cursor-pointer py-1.5 px-4 rounded-full border border-slate-200 hover:border-[#eb5a0c]/20 hover:bg-slate-50 group/btn"
                        >
                          <span>{isExpanded ? "Show Less" : "Read Full Review"}</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="10" 
                            height="10" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3.5" 
                            className={`lucide transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"}`}
                          >
                            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setAuditModalOpen(true)}
                className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
              >
                <span>Read More Success Stories</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
              </button>
            </div>

          </div>
        </section>

        {/* Services That Actually Support Growth (Premium Bento Grid Section) */}
        <section className="bg-slate-50/40 py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="services-section">
          {/* Subtle warm orange and ambient lighting accents behind the cards */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#eb5a0c]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-50/40 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            
            {/* Centered Headline with custom typeset pill banner */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <p className="text-xs font-mono font-bold tracking-widest text-[#eb5a0c] uppercase">
                Our Services
              </p>
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Services That Actually <span className="font-serif italic font-black text-black/55">Support Growth</span>
              </h2>
            </div>

            {/* Elegant Horizontal Full-width Card List (No Bento Grid) */}
            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
              
              {/* CARD 1: SEO - Full Width */}
              <div 
                className="col-span-1 bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8 lg:p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-[#eb5a0c]/20 transition-all duration-300 flex flex-col md:flex-row items-stretch justify-between gap-8 md:min-h-[340px] overflow-hidden group" 
                id="service-card-seo"
              >
                {/* Left column of Card 1 */}
                <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-mono font-black text-slate-900/10 tracking-wider select-none leading-none">01.</span>
                      <span className="text-[11px] font-mono leading-none font-bold uppercase tracking-wider text-[#eb5a0c] bg-[#eb5a0c]/10 px-2.5 py-1 rounded-full">Organic Supremacy</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-[26px] font-sans font-bold text-slate-900 tracking-tight leading-tight">SEO</h3>
                    
                    <p className="text-[14px] text-slate-500 leading-relaxed font-sans font-normal max-w-xl">
                      We engineer absolute search dominance. By targeting high-intent buyer keywords, optimizing crawl layouts, and repairing silent ranking errors, we turn search queries into reliable phone calls and merchant revenue.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setAuditModalOpen(true)}
                      className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
                    >
                      <span>Start Project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Right column of Card 1: Beautiful placeholder image */}
                <div className="hidden md:flex flex-1 items-stretch justify-center relative min-h-[220px] max-w-md w-full ml-auto overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img 
                    src="https://cdn.dribbble.com/userupload/15726322/file/original-2340bdb9eb68dd15fb69f1bc9f2f17cd.jpg" 
                    alt="SEO Marketing Analytics and organic growth monitoring dashboard illustration placeholder" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* CARD 2: Website Design - Full Width */}
              <div 
                className="col-span-1 bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8 lg:p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-[#eb5a0c]/20 transition-all duration-300 flex flex-col md:flex-row items-stretch justify-between gap-8 md:min-h-[340px] overflow-hidden group" 
                id="service-card-website-design"
              >
                {/* Left column of Card 2 */}
                <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-mono font-black text-slate-900/10 tracking-wider select-none leading-none">02.</span>
                      <span className="text-[11px] font-mono leading-none font-bold uppercase tracking-wider text-[#eb5a0c] bg-[#eb5a0c]/10 px-2.5 py-1 rounded-full">Frictionless Experience</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-[26px] font-sans font-bold text-slate-900 tracking-tight leading-tight">Website Design</h3>
                    
                    <p className="text-[14px] text-slate-500 leading-relaxed font-sans font-normal max-w-xl">
                      We craft responsive storefronts that load instantly and convert visitors. By combining high-impact typography with frictionless user paths, we ensure your business leaves a lasting, elite digital impression.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setAuditModalOpen(true)}
                      className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
                    >
                      <span>Start Project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Right column of Card 2: Beautiful placeholder image */}
                <div className="hidden md:flex flex-1 items-stretch justify-center relative min-h-[220px] max-w-md w-full ml-auto overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img 
                    src="https://cdn.dribbble.com/userupload/17770327/file/original-ed64bed1600b4d7221b1cdcb550c1fda.jpg" 
                    alt="Creative website design process UI UX sketch web storefront design placeholder" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* CARD 3: Google Maps Optimization - Full Width */}
              <div 
                className="col-span-1 bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8 lg:p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-[#eb5a0c]/20 transition-all duration-300 flex flex-col md:flex-row items-stretch justify-between gap-8 md:min-h-[340px] overflow-hidden group" 
                id="service-card-google-maps"
              >
                {/* Left column of Card 3 */}
                <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-mono font-black text-slate-900/10 tracking-wider select-none leading-none">03.</span>
                      <span className="text-[11px] font-mono leading-none font-bold uppercase tracking-wider text-[#eb5a0c] bg-[#eb5a0c]/10 px-2.5 py-1 rounded-full">Hyper-Local Footprint</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-[26px] font-sans font-bold text-slate-900 tracking-tight leading-tight">Google Maps Optimization</h3>
                    
                    <p className="text-[14px] text-slate-500 leading-relaxed font-sans font-normal max-w-xl">
                      Settle for nothing less than the local 3-pack. We optimize your business profile, build authentic citation frameworks, and target localized keywords to put you directly on the customer's route.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setAuditModalOpen(true)}
                      className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
                    >
                      <span>Start Project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Right column of Card 3: Beautiful placeholder image */}
                <div className="hidden md:flex flex-1 items-stretch justify-center relative min-h-[220px] max-w-md w-full ml-auto overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img 
                    src="https://as1.ftcdn.net/jpg/20/26/80/06/1000_F_2026800655_vHmCSTmyJ7MpQfscDlugnJR5htSfpjFE.jpg" 
                    alt="Map local citation review optimization local seo footprint placeholder" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Stay ahead By Reading Our Blog (Premium Grid Section matching the design exactly) */}
        <section className="bg-slate-50/25 py-24 px-6 md:px-12 border-b border-slate-100 relative overflow-hidden" id="blog-section">
          {/* Accent lighting or technical mesh matching the rest */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-50/30 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute -bottom-10 right-10 w-[450px] h-[450px] bg-[#eb5a0c]/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            {/* Centered Heading with playful Display font and 55 opacity, as requested */}
            {/* No subheading */}
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Stay ahead By Reading <span className="font-serif italic font-black text-black/55">Our Blog</span>
              </h2>
            </div>

            {/* 3-Column Premium Cards matching the attached inspirational image with reduced gap-4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              
              {/* Blog Post 1 */}
              <div className="bg-transparent transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  {/* Rounded Premium Image */}
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src="https://www.seocompanyoc.com/wp-content/uploads/2026/05/1.png" 
                      alt="How to Set Up and Optimize Your Yelp Business Page" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Writer and duration line above the title */}
                  <div className="flex items-center text-xs text-slate-400 font-mono font-medium">
                    <span>Cheryl Philip</span>
                    <span className="mx-2 text-slate-300 select-none">•</span>
                    <span>4 min read</span>
                  </div>

                  {/* Title and arrow link line */}
                  <div className="flex items-start justify-between gap-3 group">
                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight font-sans group-hover:text-[#eb5a0c] transition-colors duration-300 line-clamp-2">
                      How to Set Up and Optimize Your Yelp Business Page: Step-by-Step Guide
                    </h3>
                    <div className="text-slate-400 group-hover:text-[#eb5a0c] transition-colors duration-300 shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-[13.5px] leading-relaxed text-slate-500 font-sans font-light line-clamp-3">
                    If you’ve ever searched for a service and instantly trusted the business with the best reviews, photos, and a complete profile, you already understand the power of Yelp. But here’s the thing: just having a profile isn’t enough. You need to build it right from the start. That’s why learning how to set up
                  </p>
                </div>

                {/* Pill Category & Date in a premium separated border row */}
                <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#eb5a0c] bg-[#eb5a0c]/5 hover:bg-[#eb5a0c]/10 transition-colors uppercase tracking-widest px-3 py-1 rounded-full font-mono">
                    Yelp Guide
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    May 12, 2026
                  </span>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-transparent transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  {/* Rounded Premium Image */}
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src="https://www.seocompanyoc.com/wp-content/uploads/2026/05/Picture3.png" 
                      alt="7 Website Changes That Instantly Increase Conversions" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Writer and duration line above the title */}
                  <div className="flex items-center text-xs text-slate-400 font-mono font-medium">
                    <span>Max Sanchez</span>
                    <span className="mx-2 text-slate-300 select-none">•</span>
                    <span>6 min read</span>
                  </div>

                  {/* Title and arrow link line */}
                  <div className="flex items-start justify-between gap-3 group">
                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight font-sans group-hover:text-[#eb5a0c] transition-colors duration-300 line-clamp-2">
                      7 Website Changes That Instantly Increase Conversions
                    </h3>
                    <div className="text-slate-400 group-hover:text-[#eb5a0c] transition-colors duration-300 shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-[13.5px] leading-relaxed text-slate-500 font-sans font-light line-clamp-3">
                    Let’s be honest—getting traffic to your website feels good. You check your analytics, see the numbers going up, and think, okay, this is working. But then nothing happens. No clicks, no sign-ups, or sales. That’s the part most people don’t talk about. Because traffic without action is just noise. What really matters is what people
                  </p>
                </div>

                {/* Pill Category & Date in a premium separated border row */}
                <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 transition-colors uppercase tracking-widest px-3 py-1 rounded-full font-mono">
                    Conversion
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    May 14, 2026
                  </span>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-transparent transition-all duration-300 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  {/* Rounded Premium Image */}
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src="https://www.seocompanyoc.com/wp-content/uploads/2026/03/Local-SEO-Services-in-2026-How-AI-Assistants-Choose-Which-Businesses-to-Recommend.png" 
                      alt="Local SEO Services in 2026: How AI Assistants Choose Which Businesses to Recommend" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Writer and duration line above the title */}
                  <div className="flex items-center text-xs text-slate-400 font-mono font-medium">
                    <span>Zoe Martinez</span>
                    <span className="mx-2 text-slate-300 select-none">•</span>
                    <span>5 min read</span>
                  </div>

                  {/* Title and arrow link line */}
                  <div className="flex items-start justify-between gap-3 group">
                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight font-sans group-hover:text-[#eb5a0c] transition-colors duration-300 line-clamp-2">
                      Local SEO Services in 2026: How AI Assistants Choose Which Businesses to Recommend
                    </h3>
                    <div className="text-slate-400 group-hover:text-[#eb5a0c] transition-colors duration-300 shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-[13.5px] leading-relaxed text-slate-500 font-sans font-light line-clamp-3">
                    Local search in 2026 doesn’t look anything like the “10 blue links” era most people still picture. Today, when someone wants a coffee, a dentist, an emergency plumber, or an SEO agency, they don’t scroll—they ask an AI assistant. That’s the reason why chat-based searches have quietly become the new gatekeepers of local visibility.
                  </p>
                </div>

                {/* Pill Category & Date in a premium separated border row */}
                <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 transition-colors uppercase tracking-widest px-3 py-1 rounded-full font-mono">
                    Local SEO
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    Mar 09, 2026
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Contact Us Section matching the attached design */}
        <section className="bg-white py-24 px-6 md:px-16 lg:px-24 border-b border-slate-100 relative overflow-hidden" id="contact-section">
          {/* Subtle grid background matching the mockup */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-0 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Center Heading with playful display font and 55 opacity for "business" */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Let us grow your <span className="font-serif italic font-black text-black/55">business</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* Left Column: Form (7 of 12 columns) */}
              <div className="lg:col-span-7 bg-white">
                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {/* First & Last name Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-sm font-semibold text-slate-800 block">First name</label>
                        <input
                          type="text"
                          required
                          placeholder="First name"
                          value={contactForm.firstName}
                          onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                          className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-slate-900 placeholder:text-slate-400 font-sans shadow-xs transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-sm font-semibold text-slate-800 block">Last name</label>
                        <input
                          type="text"
                          required
                          placeholder="Last name"
                          value={contactForm.lastName}
                          onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                          className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-slate-900 placeholder:text-slate-400 font-sans shadow-xs transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-sm font-semibold text-slate-800 block">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-slate-900 placeholder:text-slate-400 font-sans shadow-xs transition-colors"
                      />
                    </div>

                    {/* Phone Number with custom flag-prefix */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-sm font-semibold text-slate-800 block">Phone number</label>
                      <div className="relative flex items-stretch border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800 transition-colors">
                        <div className="flex items-center gap-1.5 px-3 border-r border-slate-200 bg-slate-50/50 text-slate-600 text-sm select-none">
                          <span className="font-semibold text-xs tracking-wide text-slate-700">US</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400"><path d="m6 9 6 6 6-6"/></svg>
                          <span className="text-slate-400 pl-0.5 text-xs font-mono font-medium">+1</span>
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full h-11 px-4 text-sm bg-transparent outline-none border-none text-slate-900 placeholder:text-slate-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-sm font-semibold text-slate-800 block">Message</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Leave us a message..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full p-4 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-slate-900 placeholder:text-slate-400 font-sans shadow-xs resize-none transition-colors"
                      />
                    </div>

                    {/* Services checkboxes */}
                    <div className="space-y-3 text-left">
                      <label className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Services</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                        {[
                          { id: 'website-design', label: 'Website design' },
                          { id: 'content-creation', label: 'Content creation' },
                          { id: 'ux-design', label: 'UX design' },
                          { id: 'strategy-consulting', label: 'Strategy & consulting' },
                          { id: 'user-research', label: 'User research' },
                          { id: 'other', label: 'Other' },
                        ].map((srv) => (
                          <label key={srv.id} className="flex items-center gap-3 text-slate-600 text-sm font-medium cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={contactForm.services.includes(srv.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setContactForm((prev) => ({
                                  ...prev,
                                  services: checked 
                                    ? [...prev.services, srv.id] 
                                    : prev.services.filter((id) => id !== srv.id)
                                }));
                              }}
                              className="w-[18px] h-[18px] rounded border-slate-300 text-slate-900 focus:ring-slate-900 accent-slate-900 cursor-pointer"
                            />
                            <span className="group-hover:text-slate-900 transition-colors font-sans font-normal">{srv.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={contactSubmitting}
                        className="w-full h-12 bg-[#eb5a0c] hover:bg-[#d64f0a] text-white font-sans text-sm font-semibold rounded-lg shadow-sm transition-all active:translate-y-px duration-150 disabled:bg-slate-300 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {contactSubmitting ? 'Sending message...' : 'Send message'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lucide"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans text-lg font-bold text-slate-800">
                        Thank you for your message!
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-sm">
                        Our expert team will look over your details and connect back with you within the hour.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '', services: [] });
                      }}
                      className="px-5 h-9 bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold rounded-lg transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Contact info details (5 of 12 columns) */}
              <div className="lg:col-span-5 space-y-8 text-left pt-6 lg:pt-0">
                
                {/* Custom-styled contact image matching user request */}
                <div className="relative overflow-hidden rounded-xl border border-slate-150 shadow-xs aspect-video sm:aspect-5/3 lg:aspect-4/3 bg-slate-50">
                  <img 
                    src="https://ovikbiswas.wordpress.com/wp-content/uploads/2026/05/the-girl-is-working-on-the-laptop-on-the-office-swiss-cheese-plant.jpg" 
                    alt="SEO team working in friendly modern office environment" 
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-6 pt-2">
                  {/* Call us info block */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-orange-50/70 border border-orange-100 flex items-center justify-center text-[#eb5a0c] shrink-0 font-sans shadow-[0_2px_8px_-3px_rgba(235,90,12,0.15)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="lucide"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-sans">Call us</h3>
                      <p className="text-sm text-slate-500 leading-normal font-sans font-normal">
                        Call our friendly team from Mon-Fri, 8am to 5pm.
                      </p>
                      <div className="pt-0.5">
                        <a href="tel:+17142438571" className="text-sm font-semibold text-slate-900 hover:text-[#eb5a0c] transition-colors underline decoration-slate-350 hover:decoration-[#eb5a0c] underline-offset-4 decoration-2">
                          (714) 243-8571
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email us info block */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-orange-50/70 border border-orange-100 flex items-center justify-center text-[#eb5a0c] shrink-0 font-sans shadow-[0_2px_8px_-3px_rgba(235,90,12,0.15)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="lucide"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-sans">Email us</h3>
                      <p className="text-sm text-slate-500 leading-normal font-sans font-normal">
                        We reply to your message within 1 business hour.
                      </p>
                      <div className="pt-0.5">
                        <a href="mailto:info@seocompanyoc.com" className="text-sm font-semibold text-slate-900 hover:text-[#eb5a0c] transition-colors underline decoration-slate-350 hover:decoration-[#eb5a0c] underline-offset-4 decoration-2">
                          info@seocompanyoc.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Visit us/Location info block */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-orange-50/70 border border-orange-100 flex items-center justify-center text-[#eb5a0c] shrink-0 font-sans shadow-[0_2px_8px_-3px_rgba(235,90,12,0.15)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="lucide"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-sans">Visit us / Location</h3>
                      <p className="text-sm text-slate-500 leading-normal font-sans font-normal">
                        Visit our Orange County office in California.
                      </p>
                      <div className="pt-0.5">
                        <span className="text-sm font-semibold text-slate-900 hover:text-[#eb5a0c] transition-colors underline decoration-slate-350 hover:decoration-[#eb5a0c] underline-offset-4 cursor-pointer decoration-2">
                          1407 N. Batavia St. #204, Orange, CA 92867
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Playful & Cosmic CTA Section modeled on the attached high-end design in light mode */}
        <section className="bg-transparent text-slate-900 py-32 px-6 md:px-12 relative overflow-visible border-b border-slate-100 z-10" id="cta-section">
          {/* Fading concentric rings colored in main accent color */}
          <div className="absolute inset-0 z-0 overflow-visible pointer-events-none flex items-center justify-center">
            {/* Concentric orange paths drawing from mockup */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-[#eb5a0c]/15 pointer-events-none z-0"></div>
            <div className="absolute w-[480px] h-[480px] rounded-full border border-[#eb5a0c]/30 pointer-events-none z-0"></div>
            <div className="absolute w-[720px] h-[720px] rounded-full border border-[#eb5a0c]/50 pointer-events-none z-0"></div>
            
            {/* Ambient warm orange lighting glow in the middle */}
            <div className="absolute w-[450px] h-[450px] bg-[#eb5a0c]/4 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[520px] lg:min-h-[580px]">
            
            {"/* Inner Content Stack centered exactly like design mockup */"}
            <div className="max-w-5xl mx-auto text-center space-y-8 relative z-20">
              
              {/* Target Capsule Pill Badge in Light Mode */}
              <div className="inline-flex justify-center select-none">
                <div className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_8px_rgba(0,0,0,0.02)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eb5a0c] shadow-[0_0_8px_4px_rgba(235,90,12,0.3)] animate-pulse"></span>
                  <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase font-mono">
                    Get started
                  </span>
                </div>
              </div>

              {/* Title with Playful serif & Opacity customized pairing */}
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
                Let’s Help to Attract <br />
                Better <span className="font-serif italic font-black text-[#eb5a0c]/55 tracking-wide antialiased">Customers.</span>
              </h2>

              {/* Precise Description */}
              <p className="text-base md:text-xl text-slate-600 font-sans font-medium max-w-2xl mx-auto leading-relaxed">
                No vague promises. Just strategy, <br /> transparency, and measurable growth.
              </p>

              {/* High impact direct interactive call action button with mockup feel */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setAuditModalOpen(true)}
                  className="flex items-center gap-2 h-11 px-5 font-sans text-sm font-normal bg-[#eb5a0c] text-white rounded-lg hover:bg-[#d64f0a] transition-all cursor-pointer"
                >
                  <span>Book a call</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff" className="shrink-0"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/></svg>
                </button>
              </div>

            </div>

            {/* Premium Floating orbit cards positioned elegantly around desktop space or grid layered on mobile */}
            <div className="w-full mt-20 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:block gap-6 max-w-6xl lg:max-w-none lg:absolute lg:inset-0 lg:pointer-events-none z-25">
              
              {/* Badge 1: Low Cost */}
              <motion.div 
                className="backdrop-blur-[2px] bg-[#f9f9f999] border border-[#e6e6e6] rounded-2xl p-6 flex flex-col justify-between text-left group hover:border-[#eb5a0c]/40 hover:bg-[#f9f9f9bb] transition-all duration-300 cursor-pointer lg:absolute lg:top-[12%] lg:left-[5%] lg:w-64 lg:pointer-events-auto"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="space-y-4">
                  {/* Glowing Accent Icon Area */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100/50 flex items-center justify-center text-[#eb5a0c] group-hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-[#eb5a0c] transition-colors font-sans">Low Cost</h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed font-sans">
                      Maximized budget efficiency with zero wasted search spend.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: More Leads */}
              <motion.div 
                className="backdrop-blur-[2px] bg-[#f9f9f999] border border-[#e6e6e6] rounded-2xl p-6 flex flex-col justify-between text-left group hover:border-[#eb5a0c]/40 hover:bg-[#f9f9f9bb] transition-all duration-300 cursor-pointer lg:absolute lg:top-[12%] lg:right-[5%] lg:w-64 lg:pointer-events-auto"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="space-y-4">
                  {/* Glowing Accent Icon Area */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100/50 flex items-center justify-center text-[#eb5a0c] group-hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-[#eb5a0c] transition-colors font-sans">More Leads</h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed font-sans">
                      High-intent local clients directly requesting quotes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 3: Better ROI */}
              <motion.div 
                className="backdrop-blur-[2px] bg-[#f9f9f999] border border-[#e6e6e6] rounded-2xl p-6 flex flex-col justify-between text-left group hover:border-[#eb5a0c]/40 hover:bg-[#f9f9f9bb] transition-all duration-300 cursor-pointer lg:absolute lg:bottom-[12%] lg:left-[5%] lg:w-64 lg:pointer-events-auto"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="space-y-4">
                  {/* Glowing Accent Icon Area */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100/50 flex items-center justify-center text-[#eb5a0c] group-hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><polyline points="15 7 22 7 22 14"/></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-[#eb5a0c] transition-colors font-sans">Better ROI</h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed font-sans">
                      Transparent direct-to-revenue math and performance charts.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 4: Local Reach */}
              <motion.div 
                className="backdrop-blur-[2px] bg-[#f9f9f999] border border-[#e6e6e6] rounded-2xl p-6 flex flex-col justify-between text-left group hover:border-[#eb5a0c]/40 hover:bg-[#f9f9f9bb] transition-all duration-300 cursor-pointer lg:absolute lg:bottom-[12%] lg:right-[5%] lg:w-64 lg:pointer-events-auto"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="space-y-4">
                  {/* Glowing Accent Icon Area */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100/50 flex items-center justify-center text-[#eb5a0c] group-hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-[#eb5a0c] transition-colors font-sans">Local Reach</h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed font-sans">
                      Dominate searches within your exact target postal codes.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Footer in the style of Graphy (with transparent background) */}
        <footer className="bg-transparent py-0 px-6 md:px-6 lg:px-12 relative overflow-hidden">

          <div className="max-w-7xl mx-auto bg-transparent p-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-16 md:pt-20">
              
              {/* BRAND COLUMN: Logo & Description (Occupies 4 of 12 columns) */}
              <div className="lg:col-span-4 space-y-6 flex flex-col items-start text-left">
                {/* Logo with clean responsive sizing */}
                <img 
                  src="https://www.seocompanyoc.com/wp-content/uploads/2025/09/cropped-Logo-and-Slogan-sep-800x160.png" 
                  alt="SEO Company OC Logo" 
                  className="max-h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Brand description from screenshot */}
                <p className="text-slate-500 font-sans text-sm leading-relaxed max-w-sm font-normal">
                  Orange County is an online SEO marketing agency where our aim is to keep you on top of your competitors when it comes to searches online.
                </p>

                {/* Expertise Award Stamp Logo - displayed beautifully here to convey top credibility */}
                <div className="flex items-center gap-4 pt-1">
                  <img 
                    src="https://rogersadvertising.com/wp-content/uploads/2020/06/Expertise-2022-Advertising-Black.png" 
                    alt="Expertise Best Advertising Agencies Award Logo" 
                    className="h-20 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#eb5a0c]/80 block">Award Winner</span>
                    <span className="text-xs font-sans font-bold text-slate-800 leading-tight block">Best Advertising Agencies 2022</span>
                  </div>
                </div>

                {/* Social media connections row styled elegantly in standard slate-400 like inspirational screen */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mr-1">Social</span>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#eb5a0c] bg-slate-50/50 hover:bg-white transition-all duration-200" aria-label="Follow us on X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h6l6 16h4M20 4H4"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#eb5a0c] bg-slate-50/50 hover:bg-white transition-all duration-200" aria-label="Follow us on Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#eb5a0c] bg-slate-50/50 hover:bg-white transition-all duration-200" aria-label="Connect on LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>

              {/* NAVIGATION COLUMN: (Occupies 2 of 12 columns) */}
              <div className="lg:col-span-2 text-left space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "Pricing", href: "#pricing" },
                    { name: "SEO Proof", href: "#proof" },
                    { name: "SEO Company Reviews", href: "#reviews" },
                    { name: "Marketing Blog", href: "#blog" },
                    { name: "SEO Marketing Orange County", href: "#services" },
                    { name: "Site Policy", href: "#" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href} 
                        className="text-slate-600 hover:text-[#eb5a0c] font-sans text-sm font-medium transition-colors duration-150 inline-flex items-center gap-1 group"
                      >
                        <span>{link.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150 text-xs">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ABOUT US COLUMN: (Occupies 3 of 12 columns) */}
              <div className="lg:col-span-3 text-left space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  About Us
                </h4>
                <ul className="space-y-3">
                  {[
                    "SEO Company California",
                    "SEO Company OC",
                    "Local SEO Company",
                    "SEO Marketing Firm",
                    "Orange County SEO Expert",
                    "Website SEO Companies",
                    "Orange County Marketing Agency"
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a 
                        href="#" 
                        className="text-slate-600 hover:text-[#eb5a0c] font-sans text-sm font-medium transition-colors duration-150 block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CONTACT & TRUST LOGOS COLUMN: (Occupies 3 of 12 columns) */}
              <div className="lg:col-span-3 text-left space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Contact Our Team
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <a href="tel:+17142438571" className="text-slate-600 hover:text-[#eb5a0c] font-sans text-sm font-semibold transition-colors duration-150">
                        (714) 243-8571
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0 mt-0.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <a href="mailto:info@seocompanyoc.com" className="text-slate-600 hover:text-[#eb5a0c] font-sans text-sm font-semibold transition-colors duration-150 break-all">
                        info@seocompanyoc.com
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="text-slate-500 font-sans text-xs leading-relaxed font-normal">
                        Orange County Office<br />
                        1407 N. Batavia St. #204<br />
                        Orange, CA 92867
                      </span>
                    </li>
                  </ul>
                </div>

                {/* TRUST & VERIFIED REVIEWS LOGOS: Yelp, Google, Bark */}
                <div className="pt-2 border-t border-slate-100 space-y-3.5">
                  <h5 className="text-[10px] font-mono font-black tracking-wider text-slate-400 uppercase">
                    Verified Reviews & Trust
                  </h5>
                  <div className="flex flex-col gap-2.5">
                    {/* Yelp Waitlist Logo */}
                    <a href="https://www.yelp.com" target="_blank" rel="noopener noreferrer" className="block max-w-[130px] opacity-85 hover:opacity-100 transition-opacity">
                      <img 
                        src="https://www.seocompanyoc.com/wp-content/uploads/2026/05/yelp_waitlist_logo-300x151.png" 
                        alt="Yelp Verified Agency Status" 
                        className="h-8 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                    {/* Google Reviews Logo */}
                    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="block max-w-[130px] opacity-85 hover:opacity-100 transition-opacity">
                      <img 
                        src="https://www.seocompanyoc.com/wp-content/uploads/2026/05/google-customer-review-logo-300x125.png" 
                        alt="Google Customer Reviews 5 Star Rating" 
                        className="h-7 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                    {/* Bark Verified Badge */}
                    <a href="https://www.bark.com" target="_blank" rel="noopener noreferrer" className="block max-w-[120px] opacity-85 hover:opacity-100 transition-opacity">
                      <img 
                        src="https://www.seocompanyoc.com/wp-content/uploads/2026/05/bark-logoo-300x88.png" 
                        alt="Bark Certified Professional" 
                        className="h-6 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* DIVIDER LINE */}
            <div className="border-t border-slate-100/85 my-10 w-full"></div>

            {/* BOTTOM BAR: Patent Copyright & Site Policies */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left copyrighted text */}
              <p className="text-xs text-slate-400 font-sans font-normal text-center sm:text-left leading-relaxed">
                © 2026 SEO Company OC. All Rights Reserved.
              </p>

              {/* Right Policy terms */}
              <div className="flex items-center gap-6 text-xs text-slate-400 font-sans font-normal">
                <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-slate-600 transition-colors">Cookies Settings</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Modal Sheet for audit forms */}
        <ConsultModal isOpen={isAuditModalOpen} onClose={() => setAuditModalOpen(false)} />

      </div>
    </div>
  );
}
