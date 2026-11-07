import React from 'react';
import { Printer, Sparkles, BookOpen } from 'lucide-react';
import trustLogo from '../assets/images/trust_emblem_logo_1794065641831.jpg';

interface NavbarProps {
  activeView: 'web' | 'printable';
  setActiveView: (view: 'web' | 'printable') => void;
  onOpenPledge: () => void;
  favoriteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenPledge,
  favoriteCount
}) => {
  const handlePrint = () => {
    setActiveView('printable');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Trust Seal */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={trustLogo}
            alt="Afzal Charitable Trust Seal"
            className="w-12 h-12 rounded-full border border-amber-400 shadow-sm object-cover"
          />
          <div className="flex flex-col">
            <a
              href="#top"
              className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 whitespace-nowrap hover:text-emerald-800 transition-colors"
            >
              Afzal Charitable Trust
            </a>
            <span className="text-[11px] text-stone-500 font-sans tracking-wide hidden sm:inline">
              18 Humanitarian Pillars · Est. 1998
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveView('web')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeView === 'web'
                ? 'border-emerald-600 text-emerald-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Interactive Flyer
          </button>
          <button
            onClick={() => setActiveView('printable')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              activeView === 'printable'
                ? 'border-emerald-600 text-emerald-900 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>A4 Foldable Studio</span>
          </button>
          <a
            href="#objectives-grid"
            onClick={() => setActiveView('web')}
            className="whitespace-nowrap hover:text-stone-900 transition-colors"
          >
            18 Objectives
          </a>
          <a
            href="#impact-section"
            onClick={() => setActiveView('web')}
            className="whitespace-nowrap hover:text-stone-900 transition-colors"
          >
            Impact & Governance
          </a>
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap"
            title="Print or Save A4 Both-Side Foldable Flyer as PDF"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Print A4 Flyer</span>
            <span className="sm:hidden">Print</span>
          </button>

          <button
            onClick={onOpenPledge}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Pledge Support</span>
            {favoriteCount > 0 && (
              <span className="ml-1 bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
