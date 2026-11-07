import React, { useEffect, useState } from 'react';
import { X, Volume2, Sparkles, Heart, Check, Target, Award, ArrowRight } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { DynamicIcon } from './DynamicIcon';

interface InitiativeModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onOpenPledge: (initiative: Initiative) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const InitiativeModal: React.FC<InitiativeModalProps> = ({
  initiative,
  onClose,
  onOpenPledge,
  isFavorite,
  onToggleFavorite
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onClose]);

  if (!initiative) return null;

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(initiative.audioBlurb);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-sm no-print animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with vibrant gradient */}
        <div
          className="p-6 sm:p-8 text-white relative flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, ${initiative.accentColor}, ${initiative.accentColor}cc)`
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Subhead with cluster and pillar number */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              Pillar {initiative.number} of 18
            </span>
            <span className="text-xs text-white/80 font-medium">
              {initiative.categoryLabel}
            </span>
          </div>

          {/* Title and Icon */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <DynamicIcon name={initiative.iconName} className="w-8 h-8 text-white stroke-[2.2]" />
            </div>

            <div>
              <h2 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {initiative.title}
              </h2>
              <p className="mt-1 text-sm text-white/90 font-sans">
                {initiative.shortDescription}
              </p>
            </div>
          </div>

          {/* Audio speech tool */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
            <button
              onClick={playAudio}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-amber-300' : ''}`} />
              <span>{isPlaying ? 'Pause Audio Narration' : 'Listen to Audio Blurb'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(initiative.id)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{isFavorite ? 'Saved Cause' : 'Save to Favorites'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Detailed Narrative */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
              Mission Scope & Strategy
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              {initiative.longDescription}
            </p>
          </div>

          {/* Quantitative Impact Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">Historical Impact</span>
                <div className="text-xl font-extrabold text-stone-900 tabular-nums">
                  {initiative.impactMetric}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium">Primary Focus</span>
                <div className="text-xs font-semibold text-stone-800 mt-0.5 leading-snug">
                  {initiative.impactTarget}
                </div>
              </div>
            </div>
          </div>

          {/* SDG Goal Tags */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-700">UN SDG Alignment:</span>
            {initiative.sdgGoals.map((sdg) => (
              <span
                key={sdg}
                className="px-2 py-0.5 bg-stone-100 rounded-md font-mono text-[11px] font-bold text-stone-800 border border-stone-200"
              >
                SDG #{sdg}
              </span>
            ))}
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-stone-500 text-center sm:text-left">
              100% of designated contributions directly power this objective.
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenPledge(initiative);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{initiative.actionPrompt}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
