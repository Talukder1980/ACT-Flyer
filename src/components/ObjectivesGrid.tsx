import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Heart,
  ExternalLink,
  Sparkles,
  Filter
} from 'lucide-react';
import { Initiative } from '../types/initiative';
import { INITIATIVES, CATEGORY_CLUSTERS } from '../data/initiatives';
import { DynamicIcon } from './DynamicIcon';

interface ObjectivesGridProps {
  onSelectInitiative: (initiative: Initiative) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onOpenPledge: (initiative?: Initiative) => void;
}

export const ObjectivesGrid: React.FC<ObjectivesGridProps> = ({
  onSelectInitiative,
  favorites,
  onToggleFavorite,
  onOpenPledge
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Filter initiatives by Category and Search Query
  const filteredInitiatives = useMemo(() => {
    return INITIATIVES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const speakObjective = (e: React.MouseEvent, initiative: Initiative) => {
    e.stopPropagation();

    if ('speechSynthesis' in window) {
      if (playingId === initiative.id) {
        window.speechSynthesis.cancel();
        setPlayingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const text = `${initiative.title}. ${initiative.shortDescription}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      setPlayingId(initiative.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="objectives-grid" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md mb-3 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Core Humanitarian Scope</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
          Our 18 Strategic Objectives
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600 font-sans leading-relaxed text-balance">
          Each objective is powered by a dedicated team, transparent metrics, and vibrant community participation. Click any card to explore impact stories, listen to audio, or pledge support.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200 mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any objective (e.g., scholarships, healthcare, trees, digital learning, peace, drugs, art)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <span className="text-stone-400 flex items-center gap-1 font-medium mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Theme:</span>
          </span>
          {CATEGORY_CLUSTERS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-emerald-900/60 text-emerald-100' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 18 Vibrant Cards */}
      {filteredInitiatives.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <div className="text-stone-400 mb-2">
            No matching objectives found for "{searchQuery}".
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs font-semibold text-emerald-700 underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((item) => {
            const isFav = favorites.includes(item.id);
            const isSpeaking = playingId === item.id;

            return (
              <div
                id={`objective-card-${item.id}`}
                key={item.id}
                onClick={() => onSelectInitiative(item)}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-1 ${item.colors.bgLight} ${item.colors.border}`}
                style={{
                  borderTopWidth: '4px',
                  borderTopColor: item.accentColor,
                }}
              >
                {/* Card Top Row: Number Badge, Category & Interactive Tools */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs ${item.colors.badgeBg}`}
                      >
                        Pillar {item.number}
                      </span>
                      <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Interactive Audio and Bookmark Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => speakObjective(e, item)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSpeaking
                            ? 'bg-amber-400 text-stone-900 animate-pulse'
                            : 'text-stone-400 hover:text-stone-700 hover:bg-white/80'
                        }`}
                        title={isSpeaking ? 'Stop narration' : 'Listen aloud (Interactive Audio)'}
                        aria-label={`Listen to ${item.title}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFav
                            ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
                            : 'text-stone-400 hover:text-stone-700 hover:bg-white/80'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Favorite this objective'}
                        aria-label={`Favorite ${item.title}`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Icon & Title Cluster */}
                  <div className="flex items-start gap-3.5 mt-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}, ${item.accentColor}dd)`
                      }}
                    >
                      <DynamicIcon name={item.iconName} className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div>
                      <h3 className={`font-outfit text-lg font-bold leading-snug ${item.colors.text}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Short Description - High Legibility & Clarity */}
                  <p className="mt-3 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Card Bottom Strip: Impact & CTA */}
                <div className="px-5 py-3.5 bg-white/70 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                      Direct Impact
                    </span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {item.impactMetric}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPledge(item);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-colors shadow-2xs cursor-pointer"
                    >
                      Pledge
                    </button>
                    <span className="flex items-center gap-1 font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      <span>Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Summary Banner for Print Awareness */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-amber-400 text-xs uppercase tracking-widest font-bold">
            Printable A4 Ready
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold">
            Need a Physical Handout for Events or Donors?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-sans">
            Our A4 dual-sided foldable flyer is designed with exact ISO 210mm × 297mm dimensions, fold guides, and high-resolution print graphics.
          </p>
        </div>

        <a
          href="#printable-studio"
          className="px-5 py-3 text-xs sm:text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap cursor-pointer"
        >
          Open Printable Flyer Studio
        </a>
      </div>
    </section>
  );
};
