import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Heart,
  ExternalLink,
  Sparkles,
  Filter,
  Check,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Eye,
  ListChecks,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Initiative } from '../types/initiative';
import { INITIATIVES, CATEGORY_CLUSTERS } from '../data/initiatives';
import { DynamicIcon } from './DynamicIcon';

interface ObjectivesGridProps {
  onSelectInitiative: (initiative: Initiative) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  exploredIds: number[];
  onMarkExplored: (id: number) => void;
  onOpenPledge: (initiative?: Initiative) => void;
}

export const ObjectivesGrid: React.FC<ObjectivesGridProps> = ({
  onSelectInitiative,
  favorites,
  onToggleFavorite,
  exploredIds,
  onMarkExplored,
  onOpenPledge
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'explored' | 'unexplored' | 'favorites'>('all');
  const [showChecklistDrawer, setShowChecklistDrawer] = useState<boolean>(true);

  const totalObjectives = INITIATIVES.length; // 18
  const exploredCount = Math.min(exploredIds.length, totalObjectives);
  const exploredPercent = Math.round((exploredCount / totalObjectives) * 100);
  const favoritesCount = favorites.length;
  const isAllExplored = exploredCount === totalObjectives;

  // Filter initiatives by Category, Status, and Search Query
  const filteredInitiatives = useMemo(() => {
    return INITIATIVES.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Status filter
      let matchesStatus = true;
      if (statusFilter === 'explored') {
        matchesStatus = exploredIds.includes(item.id);
      } else if (statusFilter === 'unexplored') {
        matchesStatus = !exploredIds.includes(item.id);
      } else if (statusFilter === 'favorites') {
        matchesStatus = favorites.includes(item.id);
      }

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.includes(searchQuery);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, statusFilter, searchQuery, exploredIds, favorites]);

  // Find next unexplored initiative
  const nextUnexplored = useMemo(() => {
    return INITIATIVES.find((item) => !exploredIds.includes(item.id));
  }, [exploredIds]);

  const handleGoToNextUnexplored = () => {
    if (nextUnexplored) {
      onMarkExplored(nextUnexplored.id);
      onSelectInitiative(nextUnexplored);
      const cardElem = document.getElementById(`objective-card-${nextUnexplored.id}`);
      if (cardElem) {
        cardElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {
        // silent
      }
    }
  };

  const handleCardClick = (item: Initiative) => {
    onMarkExplored(item.id);
    onSelectInitiative(item);
  };

  const speakObjective = (e: React.MouseEvent, initiative: Initiative) => {
    e.stopPropagation();
    onMarkExplored(initiative.id);

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
          Each objective is powered by a dedicated team, transparent metrics, and vibrant community participation. Explore all 18 pillars to discover how we build sustainable dignity for all.
        </p>
      </div>

      {/* ========================================================
          VISUAL PROGRESS BAR & CHECKLIST INDICATOR (NEW)
         ======================================================== */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-stone-200 mb-8 space-y-5">
        {/* Progress Bar Header: Stats & Quick CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
              isAllExplored ? 'bg-amber-500 animate-bounce' : 'bg-emerald-800'
            }`}>
              {isAllExplored ? <Trophy className="w-6 h-6 text-white" /> : <ListChecks className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-outfit text-lg font-bold text-stone-900">
                  Exploration Checklist & Progress
                </h3>
                {isAllExplored && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Complete!
                  </span>
                )}
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-3 font-medium mt-0.5">
                <span>
                  <strong className="text-emerald-800 font-bold tabular-nums">{exploredCount}</strong> of 18 Explored ({exploredPercent}%)
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <strong className="text-stone-800 font-bold tabular-nums">{favoritesCount}</strong> Favorited
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {nextUnexplored ? (
              <button
                onClick={handleGoToNextUnexplored}
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Next (#{nextUnexplored.number})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  try {
                    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
                  } catch {}
                }}
                className="px-3.5 py-2 text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Celebrate 18/18!</span>
              </button>
            )}

            <button
              onClick={() => setShowChecklistDrawer(!showChecklistDrawer)}
              className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              {showChecklistDrawer ? 'Hide Checklist' : 'Show Checklist'}
            </button>
          </div>
        </div>

        {/* The Animated Visual Progress Bar */}
        <div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 p-[1px] relative">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500"
              style={{ width: `${Math.max(exploredPercent, 5)}%` }}
            />
          </div>

          {/* 18 Milestone Tick Indicators */}
          <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1.5 px-0.5 font-mono">
            <span>0</span>
            <span>03</span>
            <span>06 (I. Health & Care)</span>
            <span>09</span>
            <span>12 (II. Civic)</span>
            <span>15</span>
            <span className="font-bold text-emerald-800">18 (All Pillars)</span>
          </div>
        </div>

        {/* 18 Interactive Checklist Badges */}
        {showChecklistDrawer && (
          <div className="pt-2 border-t border-stone-100">
            <div className="text-[11px] font-semibold text-stone-500 mb-2.5 flex items-center justify-between">
              <span>Interactive Checklist (Click any item to view):</span>
              <span className="text-[10px] text-stone-400">
                ✓ = Explored · ♥ = Favorited
              </span>
            </div>

            {/* Checklist items strip */}
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-1.5">
              {INITIATIVES.map((item) => {
                const isExplored = exploredIds.includes(item.id);
                const isFav = favorites.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleCardClick(item);
                      const elem = document.getElementById(`objective-card-${item.id}`);
                      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    title={`${item.number}. ${item.title} (${isExplored ? 'Explored' : 'Unexplored'})`}
                    className={`h-9 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer relative group ${
                      isExplored
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                    style={{
                      borderBottomWidth: '2.5px',
                      borderBottomColor: item.accentColor
                    }}
                  >
                    {isFav ? (
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    ) : isExplored ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[2.8]" />
                    ) : (
                      <span className="text-[11px] font-mono">{item.number}</span>
                    )}

                    {/* Hover micro-tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-30 pointer-events-none">
                      <div className="bg-stone-900 text-white text-[10px] font-medium py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                        #{item.number} {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Filter Tabs (All / Explored / Unexplored / Favorites) */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All 18
            </button>
            <button
              onClick={() => setStatusFilter('explored')}
              className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                statusFilter === 'explored'
                  ? 'bg-white text-emerald-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Explored ({exploredCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('unexplored')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'unexplored'
                  ? 'bg-white text-stone-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Unexplored ({totalObjectives - exploredCount})
            </button>
            <button
              onClick={() => setStatusFilter('favorites')}
              className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                statusFilter === 'favorites'
                  ? 'bg-white text-rose-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Favorited ({favoritesCount})</span>
            </button>
          </div>

          {statusFilter !== 'all' && (
            <button
              onClick={() => setStatusFilter('all')}
              className="text-[11px] font-semibold text-emerald-700 hover:underline"
            >
              Clear Status Filter
            </button>
          )}
        </div>
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
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
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
            No matching objectives found for the active search or status filter.
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setStatusFilter('all');
            }}
            className="text-xs font-semibold text-emerald-700 underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((item) => {
            const isFav = favorites.includes(item.id);
            const isExplored = exploredIds.includes(item.id);
            const isSpeaking = playingId === item.id;

            return (
              <div
                id={`objective-card-${item.id}`}
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xs hover:shadow-lg hover:-translate-y-1 ${item.colors.bgLight} ${item.colors.border}`}
                style={{
                  borderTopWidth: '4px',
                  borderTopColor: item.accentColor,
                }}
              >
                {/* Card Top Row: Number Badge, Category, Checklist Mark & Interactive Tools */}
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

                      {/* Visual Checklist badge on card */}
                      {isExplored && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-200/80">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Explored</span>
                        </span>
                      )}
                    </div>

                    {/* Interactive Audio and Bookmark Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => speakObjective(e, item)}
                        className={`p-1.5 rounded-lg transition-colors ${
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
                        className={`p-1.5 rounded-lg transition-colors ${
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
                        onMarkExplored(item.id);
                        onOpenPledge(item);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-colors shadow-2xs"
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

      {/* Quick Summary Pill Banner for Print Awareness */}
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
