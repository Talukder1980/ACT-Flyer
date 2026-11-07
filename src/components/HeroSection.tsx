import React from 'react';
import { Printer, Heart, Sparkles, Volume2, ArrowDown, CheckCircle2 } from 'lucide-react';
import heroPhoto from '../assets/images/humanitarian_community_hero_1794065642538.jpg';
import trustSeal from '../assets/images/trust_emblem_logo_1794065641831.jpg';
import { TRUST_DETAILS } from '../data/initiatives';

interface HeroSectionProps {
  onOpenPrintable: () => void;
  onScrollToObjectives: () => void;
  onOpenPledge: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPrintable,
  onScrollToObjectives,
  onOpenPledge
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  const playMissionSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }
      const text = `Welcome to Afzal Charitable Trust. Established in 1998, we are dedicated to 18 humanitarian pillars spanning education and research, medical care, poverty relief, vulnerable assistance, peace, environmental awareness, and cultural preservation. Our motto is: True charity creates conditions where humanity flourishes in justice, harmony, and unshakeable dignity.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 border-b border-stone-200">
      {/* Subtle background ambient pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Operational Pill-Free Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 mb-6 pb-3 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-800 tracking-wide uppercase">
              {TRUST_DETAILS.registration}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Est. {TRUST_DETAILS.establishedYear}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Global & Grassroots Reach</span>
          </div>

          <button
            onClick={playMissionSpeech}
            className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-medium px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 transition-colors"
            title="Listen to audio overview (Friendly for all ages)"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-pulse text-emerald-600' : ''}`} />
            <span>{isPlayingAudio ? 'Pause Audio Overview' : 'Listen Mission Audio'}</span>
          </button>
        </div>

        {/* Hero Grid: Left Content, Right Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Trust Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={trustSeal}
                alt="Afzal Charitable Trust Gold Seal"
                className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md shrink-0"
              />
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800">
                  Official Humanitarian Brochure
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  Afzal Charitable Trust
                </h2>
              </div>
            </div>

            <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] text-balance">
              18 Pillars of Hope, Dignity & Lasting Transformation
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-2xl">
              From academic scholarships and free healthcare to digital literacy, peace councils, environmental stewardship, and transgender empowerment—discover how every initiative creates resilient, self-sustaining communities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToObjectives}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Explore 18 Objectives</span>
                <ArrowDown className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={onOpenPrintable}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-emerald-950 bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4 text-amber-800" />
                <span>View A4 Foldable Printable Flyer</span>
              </button>

              <button
                onClick={onOpenPledge}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Pledge Support</span>
              </button>
            </div>

            {/* Trust Motto Quote Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <p className="italic text-stone-700 text-sm font-serif leading-relaxed">
                "{TRUST_DETAILS.founderQuote}"
              </p>
              <div className="mt-2 text-xs font-semibold text-amber-900 tracking-wide">
                — Afzal Charitable Trust Board of Trustees
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photo & Visual Showcase with Feature Overlay */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-900 group">
              <img
                src={heroPhoto}
                alt="Humanitarian community programs of Afzal Charitable Trust"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                  Community In Action
                </span>
                <h3 className="font-outfit text-xl font-bold text-white mb-2">
                  Serving Every Soul with Compassion & Respect
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed font-sans line-clamp-2">
                  Frontline health clinics, rural classrooms, elder care sanctuaries, and youth tech hubs working hand-in-hand every day.
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified NGO
                  </span>
                  <span>A4 Dual-Side Ready</span>
                  <span className="text-amber-300 font-semibold">18 Vibrant Colors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Quantitative Proof Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="font-outfit text-2xl sm:text-3xl font-extrabold text-blue-900 tabular-nums">
              18 Pillars
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Unified comprehensive scope
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="font-outfit text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular-nums">
              240,000+
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Direct beneficiaries touched
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="font-outfit text-2xl sm:text-3xl font-extrabold text-amber-900 tabular-nums">
              100% Audited
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Zero-leakage governance
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="font-outfit text-2xl sm:text-3xl font-extrabold text-purple-900 tabular-nums">
              28+ Years
            </div>
            <div className="text-xs text-stone-500 mt-1 font-medium">
              Sustained humanitarian legacy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
