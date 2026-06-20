import React from 'react';
import { Calendar, Briefcase, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Stats = () => {
  const statsData = [
    {
      id: 1,
      number: '15+',
      label: 'Years Experience',
      icon: <Calendar className="w-7 h-7" />,
      desc: 'Delivering excellence since 2011',
      gradient: 'from-orange-400 to-amber-500',
      bg: 'from-orange-50 to-amber-50',
      border: 'border-orange-100',
      iconBg: 'bg-orange-100 text-orange-500',
    },
    {
      id: 2,
      number: '180+',
      label: 'Projects Completed',
      icon: <Briefcase className="w-7 h-7" />,
      desc: 'Residential, roads & PEB sheds',
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100 text-blue-500',
    },
    {
      id: 3,
      number: '350+',
      label: 'Skilled Workforce',
      icon: <Users className="w-7 h-7" />,
      desc: 'Engineers, supervisors & masons',
      gradient: 'from-violet-500 to-purple-600',
      bg: 'from-violet-50 to-purple-50',
      border: 'border-violet-100',
      iconBg: 'bg-violet-100 text-violet-500',
    },
    {
      id: 4,
      number: '100%',
      label: 'Quality Assurance',
      icon: <Award className="w-7 h-7" />,
      desc: 'Safety code & ISO compliant',
      gradient: 'from-emerald-500 to-teal-500',
      bg: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-500',
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} shadow-sm`}>
                {stat.icon}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {stat.number}
                </h4>
                <p className="text-sm font-bold text-slate-700 mt-0.5">{stat.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
