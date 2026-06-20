import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldAlert, Target, Award, Eye, CheckCircle, Activity, Box, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyDescription = ({ onOpenQuote }) => {
  return (
    <section id="about" className="scroll-mt-20 py-24 relative overflow-hidden bg-white font-sans">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={11} />
            Company Description
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Civil Foundation & RCC Works
          </h2>
          <div className="space-y-4 text-slate-500 text-[15px] leading-relaxed max-w-3xl mx-auto font-medium">
            <p>
              At Pandit Infra, we believe that every iconic structure starts from the ground up. The longevity, safety, and stability of a building depend entirely on the strength of its structural skeleton. We specialize in high-performance Civil Foundation and RCC (Reinforced Cement Concrete) Works, delivering engineering excellence for residential, commercial, industrial, and infrastructure projects.
            </p>
            <p>
              By combining advanced construction methodologies, rigorous quality control, and premium materials, we ensure your structures stand resilient against time and natural forces.
            </p>
          </div>
        </motion.div>

        {/* 1. Our Core Expertise (Grid) */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Core Expertise</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Expertise 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-slate-150 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Box size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">1. Robust Foundation Engineering</h4>
              <p className="text-sm text-slate-500 mb-6">A building is only as strong as its foundation. We analyze soil reports and structural designs to execute the perfect foundation type tailored to your project’s load requirements.</p>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Open / Shallow Foundations:</strong> Precision execution of isolated, combined, and strip footings for low-to-medium-rise structures.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Raft / Mat Foundations:</strong> Ideal for heavy structural loads or weak soil conditions, ensuring uniform load distribution.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Deep Foundations (Pile Foundations):</strong> Expertly engineered cast-in-situ bored piles or driven piles for high-rise buildings and complex industrial structures.</span></li>
              </ul>
            </motion.div>

            {/* Expertise 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-150 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">2. High-Grade RCC Structural Works</h4>
              <p className="text-sm text-slate-500 mb-6">From column grids to expansive slabs, our RCC works form the unyielding backbone of modern architecture.</p>
              <ul className="space-y-3 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Columns & Beams:</strong> Perfect alignment and casting of high-strength vertical and horizontal load-bearing members.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Slabs & Roofs:</strong> Flawless execution of flat slabs, grid slabs, and conventional beams-and-slab systems with superior surface finishes.</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-brand-orange shrink-0 mt-0.5" /> <span><strong>Shear Walls & Retaining Structures:</strong> Engineered to resist lateral forces, earth pressure, and seismic activities.</span></li>
              </ul>
            </motion.div>

            {/* Expertise 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 border border-slate-150 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Settings size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">3. Precision Formwork & Shuttering</h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                The accuracy of RCC depends heavily on its mold. We utilize modern, high-quality steel, plywood, and modular formwork systems to achieve sharp lines, accurate dimensions, and honey-comb-free concrete surfaces.
              </p>
            </motion.div>

            {/* Expertise 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-slate-150 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">4. Advanced Reinforcement Steel Binding</h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Our skilled bar-benders strictly adhere to structural drawings and Indian Standards (IS Codes). From accurate cutting and bending schedules (BBS) to maintaining precise clear cover and lap lengths, we ensure the steel cage handles tensile stresses perfectly.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Double Column: Quality & Why Choose Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* Quality Standard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl" />
            <h3 className="text-2xl font-extrabold mb-6 relative z-10 flex items-center gap-3">
              <Award className="text-brand-orange" />
              The Pandit Infra Quality Standard
            </h3>
            <p className="text-sm text-slate-400 mb-8 relative z-10">We don’t just pour concrete; we engineer durability. Our process integrates strict quality checkpoints at every stage:</p>
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-slate-800 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <h5 className="font-bold text-white text-sm">Grade Control</h5>
                  <p className="text-xs text-slate-400 mt-1">Precision mix designs (from M20, M25 up to high-performance concrete mixes) matching exact structural specifications.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-slate-800 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <h5 className="font-bold text-white text-sm">Slump & Workability Tests</h5>
                  <p className="text-xs text-slate-400 mt-1">Conducted on-site prior to pouring to ensure optimal water-cement ratios.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-slate-800 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <h5 className="font-bold text-white text-sm">Compaction Excellence</h5>
                  <p className="text-xs text-slate-400 mt-1">Strategic use of mechanical needle and surface vibrators to eliminate air voids and segregation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-slate-800 text-brand-orange flex items-center justify-center font-bold text-sm shrink-0">4</div>
                <div>
                  <h5 className="font-bold text-white text-sm">Scientific Curing</h5>
                  <p className="text-xs text-slate-400 mt-1">Rigorous, supervised curing schedules to help the concrete attain its maximum characteristic compressive strength.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8">Why Choose Pandit Infra?</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Eye className="text-blue-500 w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-base">Engineering First Approach</h5>
                  <p className="text-sm text-slate-500 mt-1">Work executed by experienced civil engineers and project managers who understand structural drawings perfectly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <ShieldAlert className="text-red-500 w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-base">Uncompromising Safety</h5>
                  <p className="text-sm text-slate-500 mt-1">Strict adherence to site safety protocols, PPE usage, and secure scaffolding systems.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Activity className="text-emerald-500 w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-base">Timely Project Delivery</h5>
                  <p className="text-sm text-slate-500 mt-1">Optimized scheduling of shuttering cycles and concrete pours to keep your project moving forward without delays.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Target className="text-amber-500 w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-base">Material Integrity</h5>
                  <p className="text-sm text-slate-500 mt-1">We partner with trusted brands for TMT steel, premium cement, and graded aggregates.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-brand-orange/5 border border-brand-orange/20 rounded-3xl p-10 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Let’s Build a Strong Foundation Together</h3>
          <p className="text-slate-600 font-medium mb-8">Whether you are planning a residential township, a commercial complex, or an industrial facility, partner with Pandit Infra for structural work you can trust for generations.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md"
            >
              Contact Our Engineering Team
            </Link>
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md shadow-brand-orange/20"
            >
              Request a Quote
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CompanyDescription;
