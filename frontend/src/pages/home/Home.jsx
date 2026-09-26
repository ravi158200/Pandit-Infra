import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../../components/hero/Hero';
import Stats from '../../components/stats/Stats';
import CompanyDescription from '../../components/home/CompanyDescription';
import ClientsSection from '../../components/home/ClientsSection';

// ── New Unique Interactive Components ──────────────────
import BlueprintVisualizer from '../../components/tools/BlueprintVisualizer';
import BeforeAfterSlider from '../../components/home/BeforeAfterSlider';
import FoundationShowcase from '../../components/home/FoundationShowcase';
import FleetShowcase from '../../components/home/FleetShowcase';
import PpeKitShowcase from '../../components/home/PpeKitShowcase';
import ProjectTracker from '../../components/home/ProjectTracker';

const Home = ({ onOpenQuote }) => {
  return (
    <div className="bg-slate-950 font-sans overflow-hidden">

      {/* 1. Hero */}
      <div id="home">
        <Hero onOpenQuote={onOpenQuote} />
      </div>

      {/* 2. Key Stats Bar */}
      <Stats />

      {/* 3. Company Vision & Core Capabilities */}
      <CompanyDescription onOpenQuote={onOpenQuote} />

      {/* 4. Heavy RCC Foundation, Concrete & Full Steel Rebar Engineering */}
      <FoundationShowcase onOpenQuote={onOpenQuote} />

      {/* 5. Interactive Civil Engineering Blueprint Explorer */}
      <BlueprintVisualizer />

      {/* 7. Raw Excavation to Finished Infrastructure Transformation Slider */}
      <BeforeAfterSlider />

      {/* 8. Heavy Machinery Infrastructure Fleet Showcase */}
      <FleetShowcase onOpenQuote={onOpenQuote} />

      {/* 9. Mandatory PPE Safety Kits for Civil Work */}
      <PpeKitShowcase />

      {/* 10. Real-Time Project Milestone Tracker */}
      <ProjectTracker onOpenQuote={onOpenQuote} />

      {/* 9. Trusted Industrial Partners & Clients */}
      <ClientsSection />

      {/* 10. Grand Sunrise Final Call-to-Action */}
      <section className="relative py-24 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-black tracking-widest text-white/90 uppercase bg-white/20 border border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            Start Your Infrastructure Project Today
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm"
          >
            Building High-Spec Civil Infrastructure <br className="hidden sm:block" />
            That Stands The Test of Time
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/85 max-w-xl mx-auto text-sm leading-relaxed"
          >
            From heavy road paving networks to structural RCC foundations and industrial PEB design layouts, we deliver turn-key engineering solutions across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenQuote}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-orange-600 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-orange-700/20 transition-all duration-300 text-sm cursor-pointer"
            >
              Get a Free Quote
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 text-sm cursor-pointer"
            >
              <PhoneCall size={15} />
              Speak with a Senior Civil Engineer
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
