import React from 'react';
import { Phone, Mail, MapPin, Globe, Printer, Heart, Sparkles } from 'lucide-react';
import trustLogo from '../assets/images/trust_emblem_logo_1794065641831.jpg';
import { TRUST_DETAILS } from '../data/initiatives';

interface FooterProps {
  onOpenPrintable: () => void;
  onOpenPledge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrintable, onOpenPledge }) => {
  return (
    <footer className="bg-stone-900 text-white border-t border-stone-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-800">
          {/* Col 1: Brand & Registration */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={trustLogo}
                alt="Afzal Charitable Trust Seal"
                className="w-10 h-10 rounded-full border border-amber-400 object-cover"
              />
              <span className="font-cinzel text-lg font-bold text-amber-300">
                {TRUST_DETAILS.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              {TRUST_DETAILS.tagline}
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              {TRUST_DETAILS.registration}
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-2 text-xs">
            <div className="text-amber-400 uppercase tracking-widest font-bold text-[11px]">
              Explore Flyer
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  Top of Flyer
                </a>
              </li>
              <li>
                <a href="#objectives-grid" className="hover:text-white transition-colors">
                  18 Strategic Objectives
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPrintable}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 text-emerald-400 font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>A4 Printable Foldable Studio</span>
                </button>
              </li>
              <li>
                <a href="#impact-section" className="hover:text-white transition-colors">
                  Audits & Fiduciary Proof
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-2 text-xs">
            <div className="text-amber-400 uppercase tracking-widest font-bold text-[11px]">
              Headquarters & Care Line
            </div>
            <div className="space-y-2 text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{TRUST_DETAILS.headquarters}</span>
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
                <span className="text-emerald-400">{TRUST_DETAILS.website}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Action & Support */}
          <div className="space-y-3">
            <div className="text-amber-400 uppercase tracking-widest font-bold text-[11px]">
              Take Meaningful Action
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Help us print copies for local communities, or sponsor an initiative today.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenPledge}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Make a Pledge</span>
              </button>
              <button
                onClick={onOpenPrintable}
                className="w-full py-2 px-3 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Physical Flyer (A4)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <div>
            © {new Date().getFullYear()} Afzal Charitable Trust. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Non-Commercial Humanitarian Foundation</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1998</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
