import React from 'react';
import {
  Star, Quote, Sparkles, Compass, ArrowRight, CheckCircle,
  PhoneCall, Eye, Target, ShieldAlert, Award, HeartHandshake
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/Hero';
import Stats from '../../components/stats/Stats';
import CompanyDescription from '../../components/home/CompanyDescription';
import ClientsSection from '../../components/home/ClientsSection';

/* ─────────────────────────────────────────────
   HOME PAGE  –  shows only:
   1. Hero
   2. Stats Bar
   3. Company Description (Vision & Mission)
   4. Trusted Partners (Clients)
   5. Final CTA
   ───────────────────────────────────────────── */





const Home = ({ onOpenQuote }) => {
  return (
    <div className="bg-white font-sans overflow-hidden">

      {/* 1. Hero */}
      <div id="home">
        <Hero onOpenQuote={onOpenQuote} />
      </div>

      {/* 2. Stats Bar */}
      <Stats />

      {/* ───────────────────────────────────────
          3. COMPANY DESCRIPTION
          ─────────────────────────────────────── */}
      <CompanyDescription onOpenQuote={onOpenQuote} />

      {/* ───────────────────────────────────────
          4. TRUSTED PARTNERS (CLIENTS)
          ─────────────────────────────────────── */}
      <ClientsSection />





      {/* ───────────────────────────────────────
          6. FINAL CTA – Sunrise Gradient
          ─────────────────────────────────────── */}
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
            Start Collaboration
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm"
          >
            Building Infrastructure That <br className="hidden sm:block" />
            Stands The Test of Time
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 max-w-lg mx-auto text-sm leading-relaxed"
          >
            From heavy road paving networks to structural RCC foundations and industrial PEB design layouts, we deliver turn-key engineering solutions.
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
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-orange-600 font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-orange-700/20 transition-all duration-300 text-sm"
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
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 text-sm"
            >
              <PhoneCall size={15} />
              Speak with an Engineer
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
