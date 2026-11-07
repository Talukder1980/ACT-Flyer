import React, { useState } from 'react';
import {
  Printer,
  Eye,
  Sliders,
  Scissors,
  Layers,
  Heart,
  QrCode,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2
} from 'lucide-react';
import { INITIATIVES, TRUST_DETAILS } from '../data/initiatives';
import { DynamicIcon } from './DynamicIcon';
import trustSeal from '../assets/images/trust_emblem_logo_1794065641831.jpg';
import heroPhoto from '../assets/images/humanitarian_community_hero_1794065642538.jpg';
import elderOrphanPhoto from '../assets/images/elder_care_orphan_warmth_1794067756957.jpg';
import cleanWaterPhoto from '../assets/images/clean_water_tree_plantation_1794067757888.jpg';
import culturalMusicPhoto from '../assets/images/cultural_arts_music_training_1794067758261.jpg';

interface PrintableA4FlyerProps {
  onOpenPledge: () => void;
}

export const PrintableA4Flyer: React.FC<PrintableA4FlyerProps> = ({ onOpenPledge }) => {
  const [activeSide, setActiveSide] = useState<'both' | 'side1' | 'side2'>('both');
  const [showFoldLines, setShowFoldLines] = useState<boolean>(true);
  const [is3dFolded, setIs3dFolded] = useState<boolean>(false);
  const [ecoMode, setEcoMode] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  // Divide initiatives into 3 columns for Side 2 (Inside Spread)
  const col1 = INITIATIVES.slice(0, 6);
  const col2 = INITIATIVES.slice(6, 12);
  const col3 = INITIATIVES.slice(12, 18);

  return (
    <section id="printable-studio" className="py-12 bg-stone-100 border-t border-stone-200">
      {/* Studio Header & Controls (Screen only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 no-print">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Printer className="w-4 h-4 text-emerald-600" />
              <span>A4 Both-Side Foldable Flyer Studio</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900">
              Printable Tri-Fold Brochure (297mm × 210mm)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
              Engineered to standard ISO A4 paper size. Prints 2 double-sided pages: Side 1 (Exterior: Cover, Back & Flap) and Side 2 (Interior: All 18 Objectives).
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            {/* Fold line toggle */}
            <button
              onClick={() => setShowFoldLines(!showFoldLines)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                showFoldLines
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>{showFoldLines ? 'Fold Guides: ON' : 'Fold Guides: OFF'}</span>
            </button>

            {/* 3D Fold Preview Simulator */}
            <button
              onClick={() => setIs3dFolded(!is3dFolded)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                is3dFolded
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{is3dFolded ? '3D Fold: CLOSED' : '3D Fold: OPEN'}</span>
            </button>

            {/* Print CTA */}
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>Print / Save A4 PDF</span>
            </button>
          </div>
        </div>

        {/* View Selector Tabs (Screen Only) */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setActiveSide('both')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSide === 'both' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Both Sides (Spread)
            </button>
            <button
              onClick={() => setActiveSide('side1')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSide === 'side1' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Side 1: Exterior (Cover & Back)
            </button>
            <button
              onClick={() => setActiveSide('side2')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeSide === 'side2' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Side 2: Interior (18 Objectives)
            </button>
          </div>

          <div className="text-stone-500 flex items-center gap-2">
            <span>Dimensions: 297mm × 210mm (A4 Landscape)</span>
            <span aria-hidden="true">·</span>
            <span>Tri-fold (3 panels × 99mm)</span>
          </div>
        </div>
      </div>

      {/* FLYER PRINT CONTAINER - Styled to exact A4 proportions */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-12 overflow-x-auto pb-8">

        {/* ========================================================
            SIDE 1: EXTERIOR SPREAD (Panel 1: Inside Flap | Panel 2: Back Cover | Panel 3: Front Cover)
           ======================================================== */}
        {(activeSide === 'both' || activeSide === 'side1') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-semibold text-stone-500 px-2">
              <span>SIDE 1: EXTERIOR SPREAD (Front Cover · Back Cover · Inside Flap)</span>
              <span>Prints on Page 1</span>
            </div>

            <div
              className={`a4-page mx-auto bg-white rounded-xl shadow-lg border border-stone-300 relative overflow-hidden transition-all duration-500 ${
                is3dFolded ? 'scale-90 opacity-95' : ''
              }`}
              style={{
                width: '100%',
                maxWidth: '1122px', // Approx 297mm at 96dpi screen, in print it scales via mm
                aspectRatio: '297 / 210',
              }}
            >
              {/* Outer Sheet Grid: 3 Panels */}
              <div className="w-full h-full grid grid-cols-3 relative">
                
                {/* ----------------------------------------------------
                    PANEL 1 (LEFT): INSIDE FLAP (About Us, Values, Vision)
                   ---------------------------------------------------- */}
                <div className="p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-stone-50 to-emerald-50/30 text-stone-900 border-r border-stone-200 relative">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2 pb-2 mb-3 border-b border-emerald-900/10">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        ACT
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                          About Our Trust
                        </div>
                        <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 leading-tight">
                          Dignity Through Service
                        </h3>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-stone-600 leading-relaxed font-sans mb-3">
                      Founded in 1998, Afzal Charitable Trust is an independent non-profit foundation dedicated to uplifting vulnerable communities through 18 systemic, sustainable pillars of social advancement.
                    </p>

                    {/* 4 Core Values */}
                    <div className="space-y-1.5 my-2">
                      <div className="text-[9.5px] font-bold uppercase tracking-wider text-stone-500">
                        Our Governing Pillars
                      </div>
                      {TRUST_DETAILS.coreValues.map((v, i) => (
                        <div key={i} className="bg-white p-1.5 rounded-lg border border-stone-200/80 shadow-2xs">
                          <div className="text-[10px] font-bold text-emerald-900 flex items-center gap-1">
                            <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{v.title}</span>
                          </div>
                          <div className="text-[8.5px] text-stone-600 leading-tight mt-0.5">
                            {v.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Founder Quote */}
                    <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[9px] text-amber-950 italic font-serif leading-snug">
                      "{TRUST_DETAILS.founderQuote}"
                    </div>

                    {/* Photo Spot: Elder & Orphan Sanctuary Care (Pillars 04 & 05) */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-emerald-900/15 shadow-2xs relative">
                      <img
                        src={elderOrphanPhoto}
                        alt="Elder and Orphan Sanctuary Care"
                        className="w-full h-16 sm:h-20 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-1.5">
                        <span className="text-[8px] font-semibold text-white tracking-wide">
                          Pillars 04 & 05 · Nurturing Sanctuaries & Elder Care
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Panel 1 Footer */}
                  <div className="pt-1.5 border-t border-stone-200 text-[8.5px] text-stone-500 flex justify-between items-center">
                    <span>Regd: ACT-8492/98</span>
                    <span className="font-semibold text-emerald-800">Inside Flap</span>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    PANEL 2 (CENTER): BACK COVER (Contact, Bank Info, QR, Volunteer)
                   ---------------------------------------------------- */}
                <div className="p-4 sm:p-6 flex flex-col justify-between bg-stone-900 text-white relative">
                  <div>
                    {/* Header */}
                    <div className="text-center pb-2 border-b border-stone-700/80 mb-2">
                      <div className="text-[9.5px] uppercase font-bold tracking-widest text-amber-400">
                        Connect & Contribute
                      </div>
                      <h3 className="font-cinzel text-sm sm:text-base font-bold text-white">
                        Join Our Humanitarian Movement
                      </h3>
                    </div>

                    {/* Photo Spot: Clean Water Plants & Afforestation */}
                    <div className="my-2 rounded-xl overflow-hidden border border-stone-700/80 shadow-md relative">
                      <img
                        src={cleanWaterPhoto}
                        alt="Community Clean Water & Afforestation Projects"
                        className="w-full h-18 sm:h-20 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-1.5">
                        <span className="text-[8px] font-semibold text-amber-300">
                          Pillars 07 & 10 · 180+ Water Plants & 350K+ Trees Planted
                        </span>
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1.5 text-[9.5px] sm:text-[10px] text-stone-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">Headquarters:</strong>
                          <span>{TRUST_DETAILS.headquarters}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{TRUST_DETAILS.contactPhone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{TRUST_DETAILS.contactEmail}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-amber-300 font-semibold">{TRUST_DETAILS.website}</span>
                      </div>
                    </div>

                    {/* Simulated High-Res QR Code Card */}
                    <div className="mt-4 p-3 rounded-xl bg-stone-800 border border-stone-700 flex items-center gap-3">
                      <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                        {/* High-fidelity SVG QR pattern */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-stone-950">
                          <rect width="100" height="100" fill="#ffffff" />
                          <rect x="10" y="10" width="30" height="30" fill="#000" />
                          <rect x="16" y="16" width="18" height="18" fill="#fff" />
                          <rect x="20" y="20" width="10" height="10" fill="#000" />
                          
                          <rect x="60" y="10" width="30" height="30" fill="#000" />
                          <rect x="66" y="16" width="18" height="18" fill="#fff" />
                          <rect x="70" y="20" width="10" height="10" fill="#000" />

                          <rect x="10" y="60" width="30" height="30" fill="#000" />
                          <rect x="16" y="66" width="18" height="18" fill="#fff" />
                          <rect x="20" y="70" width="10" height="10" fill="#000" />

                          {/* Pattern bits */}
                          <rect x="45" y="15" width="8" height="8" fill="#000" />
                          <rect x="45" y="30" width="8" height="8" fill="#000" />
                          <rect x="50" y="45" width="15" height="15" fill="#000" />
                          <rect x="70" y="55" width="8" height="15" fill="#000" />
                          <rect x="80" y="75" width="12" height="15" fill="#000" />
                          <rect x="45" y="75" width="15" height="10" fill="#000" />
                        </svg>
                      </div>
                      <div className="text-[9px] text-stone-300 leading-snug">
                        <strong className="text-amber-400 block text-[10px]">Scan to Donate & Volunteer</strong>
                        Access transparent audit reports, live fund counters & field updates directly from your smartphone.
                      </div>
                    </div>

                    {/* Tax Exemption badge */}
                    <div className="mt-3 text-[9px] text-stone-400 bg-stone-800/80 p-2 rounded-lg border border-stone-700/80">
                      All donations are eligible for maximum statutory tax exemption under registered charitable trust statutes.
                    </div>
                  </div>

                  {/* Panel 2 Footer */}
                  <div className="pt-2 border-t border-stone-800 text-[9px] text-stone-400 flex justify-between items-center">
                    <span>© {new Date().getFullYear()} Afzal Trust</span>
                    <span className="text-amber-400 font-semibold">Back Cover</span>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    PANEL 3 (RIGHT): FRONT COVER (Grand Title, Emblem, Hero Photo)
                   ---------------------------------------------------- */}
                <div className="p-4 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white relative">
                  <div>
                    {/* Top Seal & Subhead */}
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={trustSeal}
                          alt="Afzal Trust Gold Emblem"
                          className="w-10 h-10 rounded-full border border-amber-400 shadow-md"
                        />
                        <div>
                          <div className="text-[9px] font-bold tracking-widest text-amber-300 uppercase">
                            Official Mission Flyer
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-100">
                            Est. {TRUST_DETAILS.establishedYear}
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        18 Objectives
                      </span>
                    </div>

                    {/* Main Title */}
                    <div className="space-y-1 my-2">
                      <h1 className="font-cinzel text-xl sm:text-2xl font-black text-amber-300 tracking-wide leading-tight">
                        AFZAL CHARITABLE TRUST
                      </h1>
                      <p className="text-[11px] sm:text-xs text-emerald-200 font-sans font-medium">
                        {TRUST_DETAILS.tagline}
                      </p>
                    </div>

                    {/* Featured Photo Box */}
                    <div className="my-3 rounded-xl overflow-hidden border border-amber-400/40 shadow-md relative">
                      <img
                        src={heroPhoto}
                        alt="Afzal Charitable Trust Community Initiatives"
                        className="w-full h-24 sm:h-28 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[9px] font-semibold text-amber-200">
                          Education · Healthcare · Welfare · Peace
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-emerald-100/90 leading-relaxed font-sans">
                      A comprehensive roadmap of 18 life-changing humanitarian programs bringing sustainable dignity, relief, and empowerment to all.
                    </p>
                  </div>

                  {/* Panel 3 Footer */}
                  <div className="pt-2 border-t border-emerald-800/80 text-[9px] text-emerald-300 flex justify-between items-center">
                    <span>Turn Inside for 18 Pillars →</span>
                    <span className="text-amber-300 font-bold">Front Cover</span>
                  </div>
                </div>

                {/* FOLD GUIDES OVERLAY (Screen + Print) */}
                {showFoldLines && (
                  <>
                    {/* First fold line at 33.33% */}
                    <div className="absolute top-0 bottom-0 left-1/3 w-0 border-l border-dashed border-stone-400/70 pointer-events-none z-20 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs rotate-90 sm:rotate-0">
                        FOLD HERE (VALLEY)
                      </span>
                      <Scissors className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs rotate-90 sm:rotate-0">
                        99 mm
                      </span>
                    </div>

                    {/* Second fold line at 66.66% */}
                    <div className="absolute top-0 bottom-0 left-2/3 w-0 border-l border-dashed border-stone-400/70 pointer-events-none z-20 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs rotate-90 sm:rotate-0">
                        FOLD HERE (MOUNTAIN)
                      </span>
                      <Scissors className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs rotate-90 sm:rotate-0">
                        198 mm
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SIDE 2: INTERIOR SPREAD (All 18 Objectives Organized in 3 Vibrant Panels)
           ======================================================== */}
        {(activeSide === 'both' || activeSide === 'side2') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-semibold text-stone-500 px-2">
              <span>SIDE 2: INTERIOR SPREAD (Complete 18 Mission Pillars with Icons & Short Descriptions)</span>
              <span>Prints on Page 2</span>
            </div>

            <div
              className={`a4-page mx-auto bg-white rounded-xl shadow-lg border border-stone-300 relative overflow-hidden transition-all duration-500 ${
                is3dFolded ? 'scale-90 opacity-95' : ''
              }`}
              style={{
                width: '100%',
                maxWidth: '1122px',
                aspectRatio: '297 / 210',
              }}
            >
              {/* Inner Sheet Grid: 3 Panels for the 18 Objectives */}
              <div className="w-full h-full grid grid-cols-3 relative bg-stone-50/50">

                {/* ----------------------------------------------------
                    PANEL 1 (INTERIOR LEFT): Objectives 01 to 06
                   ---------------------------------------------------- */}
                <div className="p-3 sm:p-4 flex flex-col justify-between border-r border-stone-200 bg-white">
                  {/* Panel Mini-Header */}
                  <div className="pb-2 mb-2 border-b border-stone-200 flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold text-emerald-950">
                      I. Education, Care & Peace
                    </span>
                    <span className="text-[9px] font-bold text-stone-500">
                      Pillars 01 – 06
                    </span>
                  </div>

                  {/* 6 Objectives */}
                  <div className="space-y-1.5">
                    {col1.map((item) => (
                      <div
                        key={item.id}
                        className={`p-1.5 rounded-lg border transition-all ${item.colors.bgLight} ${item.colors.border}`}
                        style={{ borderLeftWidth: '3px', borderLeftColor: item.accentColor }}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                              style={{ backgroundColor: item.accentColor }}
                            >
                              <DynamicIcon name={item.iconName} className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="font-outfit font-bold text-[10.5px] sm:text-[11px] text-stone-900 truncate">
                              {item.number}. {item.title}
                            </span>
                          </div>
                        </div>
                        <p className="text-[9px] text-stone-700 leading-tight font-sans line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Photo Spotlight: Community Healthcare & Classrooms */}
                  <div className="mt-2 rounded-lg overflow-hidden border border-emerald-900/15 shadow-2xs relative">
                    <img
                      src={heroPhoto}
                      alt="Community Healthcare and Education Classrooms"
                      className="w-full h-12 sm:h-14 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-1">
                      <span className="text-[7.5px] font-semibold text-emerald-100">
                        Field Impact · Free Medical Consults & Education Labs
                      </span>
                    </div>
                  </div>

                  {/* Panel footer */}
                  <div className="pt-1.5 border-t border-stone-200 text-[8.5px] text-stone-400 flex justify-between">
                    <span>Afzal Charitable Trust</span>
                    <span>Interior Left Panel</span>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    PANEL 2 (INTERIOR CENTER): Objectives 07 to 12
                   ---------------------------------------------------- */}
                <div className="p-3 sm:p-4 flex flex-col justify-between border-r border-stone-200 bg-white">
                  {/* Panel Mini-Header */}
                  <div className="pb-2 mb-2 border-b border-stone-200 flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold text-emerald-950">
                      II. Civic, Media & Environment
                    </span>
                    <span className="text-[9px] font-bold text-stone-500">
                      Pillars 07 – 12
                    </span>
                  </div>

                  {/* 6 Objectives */}
                  <div className="space-y-1.5">
                    {col2.map((item) => (
                      <div
                        key={item.id}
                        className={`p-1.5 rounded-lg border transition-all ${item.colors.bgLight} ${item.colors.border}`}
                        style={{ borderLeftWidth: '3px', borderLeftColor: item.accentColor }}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                              style={{ backgroundColor: item.accentColor }}
                            >
                              <DynamicIcon name={item.iconName} className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="font-outfit font-bold text-[10.5px] sm:text-[11px] text-stone-900 truncate">
                              {item.number}. {item.title}
                            </span>
                          </div>
                        </div>
                        <p className="text-[9px] text-stone-700 leading-tight font-sans line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Photo Spotlight: Clean Water & Tree Afforestation */}
                  <div className="mt-2 rounded-lg overflow-hidden border border-emerald-900/15 shadow-2xs relative">
                    <img
                      src={cleanWaterPhoto}
                      alt="Clean Water Plants and Afforestation Drives"
                      className="w-full h-12 sm:h-14 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-1">
                      <span className="text-[7.5px] font-semibold text-amber-200">
                        Field Impact · 180+ Water Plants & 350K+ Trees Planted
                      </span>
                    </div>
                  </div>

                  {/* Panel footer */}
                  <div className="pt-1.5 border-t border-stone-200 text-[8.5px] text-stone-400 flex justify-between">
                    <span>100% Audited Transparency</span>
                    <span>Interior Center Panel</span>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    PANEL 3 (INTERIOR RIGHT): Objectives 13 to 18
                   ---------------------------------------------------- */}
                <div className="p-3 sm:p-4 flex flex-col justify-between bg-white">
                  {/* Panel Mini-Header */}
                  <div className="pb-2 mb-2 border-b border-stone-200 flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold text-emerald-950">
                      III. Global, Enterprise & Culture
                    </span>
                    <span className="text-[9px] font-bold text-stone-500">
                      Pillars 13 – 18
                    </span>
                  </div>

                  {/* 6 Objectives */}
                  <div className="space-y-1.5">
                    {col3.map((item) => (
                      <div
                        key={item.id}
                        className={`p-1.5 rounded-lg border transition-all ${item.colors.bgLight} ${item.colors.border}`}
                        style={{ borderLeftWidth: '3px', borderLeftColor: item.accentColor }}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                              style={{ backgroundColor: item.accentColor }}
                            >
                              <DynamicIcon name={item.iconName} className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="font-outfit font-bold text-[10.5px] sm:text-[11px] text-stone-900 truncate">
                              {item.number}. {item.title}
                            </span>
                          </div>
                        </div>
                        <p className="text-[9px] text-stone-700 leading-tight font-sans line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Photo Spotlight: Youth Music Academy & Cultural Arts */}
                  <div className="mt-2 rounded-lg overflow-hidden border border-purple-200 shadow-2xs relative">
                    <img
                      src={culturalMusicPhoto}
                      alt="Cultural Music Academy & Instrumental Training"
                      className="w-full h-12 sm:h-14 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-1">
                      <span className="text-[7.5px] font-semibold text-purple-100">
                        Field Impact · Traditional Folk Arts & Music Academies
                      </span>
                    </div>
                  </div>

                  {/* Panel footer */}
                  <div className="pt-1.5 border-t border-stone-200 text-[8.5px] text-stone-400 flex justify-between">
                    <span>www.afzalcharitabletrust.org</span>
                    <span>Interior Right Panel</span>
                  </div>
                </div>

                {/* FOLD GUIDES OVERLAY (Screen + Print) */}
                {showFoldLines && (
                  <>
                    <div className="absolute top-0 bottom-0 left-1/3 w-0 border-l border-dashed border-stone-400/70 pointer-events-none z-20 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs">
                        FOLD HERE
                      </span>
                      <Scissors className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs">
                        99 mm
                      </span>
                    </div>

                    <div className="absolute top-0 bottom-0 left-2/3 w-0 border-l border-dashed border-stone-400/70 pointer-events-none z-20 flex flex-col justify-between items-center py-2 -ml-[0.5px]">
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs">
                        FOLD HERE
                      </span>
                      <Scissors className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[8px] bg-white/90 text-stone-600 px-1 py-0.5 rounded shadow-2xs">
                        198 mm
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Screen Helper Tips on Printing */}
      <div className="max-w-4xl mx-auto px-4 mt-6 text-center text-xs text-stone-500 space-y-1 no-print font-sans">
        <p className="font-semibold text-stone-700">
          Printing Instructions for Duplex / Double-Sided A4 Paper:
        </p>
        <p>
          In your browser print dialog, select <strong>Paper Size: A4</strong>, <strong>Orientation: Landscape</strong>, <strong>Two-Sided: Flip on Short Edge</strong>, and check <strong>Background Graphics: ON</strong>.
        </p>
      </div>
    </section>
  );
};
