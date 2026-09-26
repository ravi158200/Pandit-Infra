import React from 'react';
import { Target, Eye, ShieldAlert, Award, Compass, HeartHandshake, UserCheck, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { title: 'Strict Safety First', desc: 'Zero accident policy. We comply strictly with regional safety protocols and reinforcement structural codes.', icon: <ShieldAlert className="text-orange-500 w-6 h-6" /> },
    { title: 'ISO 9001 Quality', desc: 'No compromises on concrete grades or reinforcement steel specifications. We design for absolute lifetime durability.', icon: <Award className="text-blue-500 w-6 h-6" /> },
    { title: 'Ethical Partnerships', desc: 'Transparent estimation sheets, honest materials procurement, and delivery schedules within client agreement boundaries.', icon: <HeartHandshake className="text-emerald-500 w-6 h-6" /> },
    { title: 'Architectural Innovation', desc: 'Applying modern CAD workflows, earthquake resilient RCC framings, and high performance green builds.', icon: <Compass className="text-amber-500 w-6 h-6" /> }
  ];

  const timeline = [
    { year: '2011', title: 'Company Inception', desc: 'Founded by Er. Ashok Kumar Singason Pandit as a premier civil engineering & infrastructure contracting firm.' },
    { year: '2015', title: 'Roads & Infrastructure Expansion', desc: 'Secured first major public highway contract for urban link roads, expanding our fleet to include heavy motor graders.' },
    { year: '2019', title: 'ISO 9001 Certification & RCC Focus', desc: 'Achieved ISO certification and specialized in large reinforced cement concrete (RCC) foundations & precast culverts.' },
    { year: '2023', title: 'Commercial Towers Handover', desc: 'Successfully handed over Pandit Commercial Complex, our 7-story commercial steel & glass landmark building.' },
    { year: '2026', title: 'Multi-State Civil Contractor', desc: 'Scaling operations across Gujarat, Maharashtra & Western India under the strategic leadership of Er. Ashok Kumar Singason Pandit.' }
  ];

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Learn Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            About Pandit Infra
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Engineering robust structures, highways, and industrial facilities with absolute technical precision and ISO standard quality.
          </p>
        </div>
      </section>

      {/* Owner & Corporate Leadership Spotlight */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
              {/* Owner Avatar / Crest Badge */}
              <div className="shrink-0 text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-brand-orange to-amber-400 p-1 shadow-2xl mx-auto">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                    <UserCheck size={48} className="text-brand-orange mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                      Owner & MD
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner Bio & Corporate Message */}
              <div className="space-y-4 text-center lg:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles size={12} /> Executive Leadership
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Er. Ashok Kumar Singason Pandit
                </h2>
                <p className="text-amber-400 font-bold text-sm tracking-wide">
                  Owner & Managing Director — Pandit Infra & Construction Pvt. Ltd.
                </p>

                <p className="text-slate-300 text-sm leading-relaxed font-medium italic border-l-2 border-brand-orange pl-4 my-4">
                  "Engineering civil infrastructure is not merely about pouring concrete — it is about constructing an enduring legacy of structural resilience, zero-compromise safety, and unyielding technical precision for generations to come."
                </p>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Under the visionary leadership of <strong>Er. Ashok Kumar Singason Pandit</strong>, Pandit Infra has scaled into a premier civil engineering and infrastructure powerhouse across Gujarat and Western India, completing landmark RCC commercial hubs, 6-lane highways, precast box culverts, and industrial PEB facilities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vision */}
            <div className="bg-white dark:bg-brand-cardDark p-8 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Our Corporate Vision
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To be recognized as a premier civil engineering force in India under Er. Ashok Kumar Singason Pandit's leadership, known for building sustainable, resilient infrastructure, adhering to timelines, and pioneering state-of-the-art construction processes.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white dark:bg-brand-cardDark p-8 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center shrink-0">
                <Target size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Our Corporate Mission
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To construct secure and highly durable structures by combining elite civil engineers, strict ISO compliance parameters, eco-friendly concrete mixtures, and top-tier transparent procurement services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values Grid */}
      <section className="py-16 bg-slate-100/50 dark:bg-brand-cardDark/20 border-y border-slate-150 dark:border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Operational Standards
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Our Founding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className="bg-white dark:bg-brand-cardDark p-6 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-brand-dark flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800">
                  {val.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Historical Timeline
            </h2>
          </div>

          {/* Timeline Tree */}
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-6 md:pl-8"
              >
                {/* Year Badge absolute to left on desktop */}
                <div className="hidden md:block absolute right-[100%] mr-8 top-0 text-right">
                  <span className="text-xl font-black text-brand-blue">{item.year}</span>
                </div>

                {/* Node Dot */}
                <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-orange ring-4 ring-slate-50 dark:ring-brand-dark" />

                {/* Mobile Year Badge */}
                <span className="md:hidden inline-block text-xs font-black text-brand-blue mb-1">
                  {item.year}
                </span>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
