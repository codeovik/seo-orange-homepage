import { motion } from 'motion/react';
import { Eye, TrendingUp, DollarSign, Target } from 'lucide-react';

export default function StatsStrip() {
  const stats = [
    {
      id: 'organic-clicks',
      label: 'Organic Click Delivery',
      value: '2.4M+',
      change: '+142%',
      desc: 'Annualized OC traffic growth',
      icon: <Eye className="text-brand-orange-500" size={16} />
    },
    {
      id: 'revenue-driven',
      label: 'Organic Revenue Traced',
      value: '$14.8M',
      change: '+310%',
      desc: 'Sourced pipeline value',
      icon: <DollarSign className="text-brand-orange-500" size={16} />
    },
    {
      id: 'top-ranks',
      label: 'Page #1 Ranks Created',
      value: '840+',
      change: 'Active',
      desc: 'High-intent intent clusters',
      icon: <Target className="text-brand-orange-500" size={16} />
    }
  ];

  return (
    <div className="border-t border-slate-200/80 bg-slate-50/60 py-6 px-4 md:px-8 mt-12 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.4 }}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors duration-200"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-100/60 flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-bold text-slate-800 tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="font-sans text-xs font-semibold text-slate-600 leading-none">
                {stat.label}
              </p>
              <p className="font-sans text-[11px] text-slate-400">
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
