import React from 'react';
import { ShieldCheck, Heart, Award, FileCheck, Users, Sparkles, Building, Globe } from 'lucide-react';
import { TRUST_DETAILS } from '../data/initiatives';

export const ImpactSection: React.FC = () => {
  return (
    <section id="impact-section" className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md mb-2 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audited Accountability</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Governance, Proof & Stewardship
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Every donation, property endowment, and voluntary effort is handled under international ISO-certified fiduciary standards with published annual reports.
          </p>
        </div>

        {/* 3 Pillar Governance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Fund Allocation */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Fiduciary Discipline
              </div>
              <h3 className="font-outfit text-lg font-bold text-stone-900">
                Where Every Dollar Goes
              </h3>
              <p className="text-xs text-stone-600 mt-2 font-sans leading-relaxed">
                Direct deployment to frontline food, medical, scholarship, and infrastructure needs with zero middleman overheads.
              </p>

              {/* Progress visual */}
              <div className="space-y-2 mt-4 text-xs font-semibold">
                <div>
                  <div className="flex justify-between text-stone-700 mb-1">
                    <span>Frontline Community Programs</span>
                    <span className="text-emerald-800 font-bold tabular-nums">88%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-700 mb-1">
                    <span>Field Logistics & Quality Control</span>
                    <span className="text-blue-800 font-bold tabular-nums">8%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-700 mb-1">
                    <span>Audits & Legal Compliance</span>
                    <span className="text-amber-800 font-bold tabular-nums">4%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
              Audited by Independent Chartered Fiduciaries
            </div>
          </div>

          {/* Card 2: Field Testimonial */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                Field Evidence
              </div>
              <h3 className="font-outfit text-lg font-bold text-stone-900">
                Lives Transformed
              </h3>
              <blockquote className="mt-3 text-xs sm:text-sm text-stone-700 italic font-serif leading-relaxed">
                "When my village was cut off during the monsoons, Afzal Charitable Trust not only brought emergency medical supplies but stayed for six months to build our clean solar water filtration plant and restore our damaged school."
              </blockquote>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs shrink-0">
                FA
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Dr. Farhana Anis</div>
                <div className="text-[10px] text-stone-500 font-sans">
                  Rural Community Clinic Director
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: International & Non-Monetary Alliances */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-1">
                Global Partnerships
              </div>
              <h3 className="font-outfit text-lg font-bold text-stone-900">
                Beyond Borders Solidarity
              </h3>
              <p className="text-xs text-stone-600 mt-2 font-sans leading-relaxed">
                Collaborating with accredited universities, regional hospitals, and global disaster response networks without commercial interest.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900">45+</div>
                  <div className="text-[10px] text-stone-500">Global Alliances</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900">14</div>
                  <div className="text-[10px] text-stone-500">Relief Corridors</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
              Member: Global Humanitarian Compact
            </div>
          </div>
        </div>

        {/* Board of Trustees Callout */}
        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-200/70 rounded-2xl text-amber-900 shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-base font-bold text-stone-900">
                Official Registration & Statutory Exemption
              </h4>
              <p className="text-xs text-stone-600 font-sans mt-0.5">
                Regd. Public Charitable Trust Act · 100% Tax Deductible Under Section 80G/12A · ISO 9001:2015
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-amber-900 bg-white/90 px-3 py-1.5 rounded-lg border border-amber-300 shrink-0">
            Certified Fiduciary
          </div>
        </div>
      </div>
    </section>
  );
};
