import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ObjectivesGrid } from './components/ObjectivesGrid';
import { PrintableA4Flyer } from './components/PrintableA4Flyer';
import { InitiativeModal } from './components/InitiativeModal';
import { PledgeModal } from './components/PledgeModal';
import { ImpactSection } from './components/ImpactSection';
import { Footer } from './components/Footer';
import { Initiative } from './types/initiative';
import { Printer, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'web' | 'printable'>('web');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isPledgeOpen, setIsPledgeOpen] = useState<boolean>(false);
  const [pledgeTargetInitiative, setPledgeTargetInitiative] = useState<Initiative | undefined>(undefined);
  const [favorites, setFavorites] = useState<number[]>([1, 2]); // default couple favorites

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenPledge = (initiative?: Initiative) => {
    setPledgeTargetInitiative(initiative);
    setIsPledgeOpen(true);
  };

  const scrollToObjectives = () => {
    setActiveView('web');
    const elem = document.getElementById('objectives-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrintable = () => {
    setActiveView('printable');
    const elem = document.getElementById('printable-studio');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Primary Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenPledge={() => handleOpenPledge()}
        favoriteCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenPrintable={scrollToPrintable}
          onScrollToObjectives={scrollToObjectives}
          onOpenPledge={() => handleOpenPledge()}
        />

        {/* View Switcher Bar for Quick Toggle */}
        <div className="bg-emerald-950 text-white py-3 px-4 sm:px-6 no-print border-y border-emerald-900 sticky top-20 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200">
              <span className="hidden sm:inline">Active Flyer Mode:</span>
              <div className="flex rounded-lg p-0.5 bg-emerald-900/90 border border-emerald-800">
                <button
                  onClick={() => setActiveView('web')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeView === 'web'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Interactive Web Flyer
                </button>
                <button
                  onClick={() => setActiveView('printable')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                    activeView === 'printable'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>A4 Foldable Studio</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('printable');
                setTimeout(() => window.print(), 300);
              }}
              className="text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-900" />
              <span>Print A4 Flyer</span>
            </button>
          </div>
        </div>

        {/* Interactive 18 Objectives Explorer */}
        {activeView === 'web' && (
          <ObjectivesGrid
            onSelectInitiative={(initiative) => setSelectedInitiative(initiative)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenPledge={handleOpenPledge}
          />
        )}

        {/* Printable Foldable A4 Flyer Studio (always present in DOM for printing, also rendered on screen when active or scrolled to) */}
        <div className={activeView === 'printable' ? 'block' : 'block'}>
          <PrintableA4Flyer onOpenPledge={() => handleOpenPledge()} />
        </div>

        {/* Governance & Fiduciary Evidence Section */}
        {activeView === 'web' && <ImpactSection />}
      </main>

      {/* Global Modals */}
      <InitiativeModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onOpenPledge={handleOpenPledge}
        isFavorite={selectedInitiative ? favorites.includes(selectedInitiative.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <PledgeModal
        isOpen={isPledgeOpen}
        onClose={() => setIsPledgeOpen(false)}
        selectedInitiative={pledgeTargetInitiative}
      />

      {/* Footer */}
      <Footer
        onOpenPrintable={scrollToPrintable}
        onOpenPledge={() => handleOpenPledge()}
      />
    </div>
  );
}
