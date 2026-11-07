import React, { useState } from 'react';
import { X, Heart, Sparkles, Check, DollarSign, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Initiative } from '../types/initiative';
import { INITIATIVES } from '../data/initiatives';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInitiative?: Initiative;
}

export const PledgeModal: React.FC<PledgeModalProps> = ({
  isOpen,
  onClose,
  selectedInitiative
}) => {
  const [pledgeType, setPledgeType] = useState<'donate' | 'volunteer'>('donate');
  const [targetId, setTargetId] = useState<number>(selectedInitiative?.id || 1);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [volunteerSkill, setVolunteerSkill] = useState<string>('Teaching & Mentorship');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback gracefully
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const activeObj = INITIATIVES.find((i) => i.id === targetId) || INITIATIVES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-sm no-print animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-teal-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
            Afzal Charitable Trust
          </div>
          <h2 className="font-cinzel text-2xl font-bold">
            {pledgeType === 'donate' ? 'Pledge Financial Support' : 'Volunteer Your Talents'}
          </h2>
          <p className="text-xs text-stone-200 font-sans mt-1">
            Every contribution is 100% transparently audited and directly deployed to frontline beneficiaries.
          </p>

          {/* Type Switcher */}
          <div className="mt-4 flex rounded-xl p-1 bg-black/30 backdrop-blur-md max-w-xs">
            <button
              type="button"
              onClick={() => setPledgeType('donate')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                pledgeType === 'donate'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Donate / Sponsor
            </button>
            <button
              type="button"
              onClick={() => setPledgeType('volunteer')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                pledgeType === 'volunteer'
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Volunteer Time
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-stone-900">
                Heartfelt Gratitude!
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto font-sans leading-relaxed">
                Thank you, <strong>{fullName || 'Generous Friend'}</strong>, for pledging support to{' '}
                <span className="font-bold text-emerald-800">
                  {activeObj.title}
                </span>. Our trust coordinator will reach out shortly with official confirmation and tax receipt details.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Return to Flyer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select target objective */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Designate Your Contribution
                </label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium"
                >
                  {INITIATIVES.map((item) => (
                    <option key={item.id} value={item.id}>
                      Pillar {item.number}: {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {pledgeType === 'donate' ? (
                <>
                  {/* Preset amounts */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                      Select Sponsorship Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 100, 250].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setAmount(preset);
                            setCustomAmount('');
                          }}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            amount === preset && !customAmount
                              ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-stone-500 font-medium">Or custom:</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">$</span>
                        <input
                          type="number"
                          placeholder="Other amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setAmount(Number(e.target.value) || 0);
                          }}
                          className="w-full pl-6 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Volunteer skill preference */
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Your Primary Area of Contribution
                  </label>
                  <select
                    value={volunteerSkill}
                    onChange={(e) => setVolunteerSkill(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 font-medium"
                  >
                    <option value="Teaching & Mentorship">Teaching & Tutoring Youth</option>
                    <option value="Medical & Healthcare Assistance">Medical / First Aid / Healthcare Support</option>
                    <option value="Frontline Food & Disaster Relief">Food Ration Distribution & Relief</option>
                    <option value="Elder & Orphan Care">Old Age Home & Orphanage Care</option>
                    <option value="Tree Plantation & Cleanups">Tree Plantation & Environmental Action</option>
                    <option value="Digital Labs & Media">Citizen Journalism & Digital Training</option>
                    <option value="Music & Arts Coaching">Cultural Activities & Music Coaching</option>
                  </select>
                </div>
              )}

              {/* User details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Ahmed"
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.org"
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {pledgeType === 'donate'
                      ? `Confirm Pledge ($${amount || 50})`
                      : 'Register as Volunteer'}
                  </span>
                </button>
              </div>

              <div className="text-center text-[10px] text-stone-400">
                100% Tax-Exempt Charitable Trust · Official Certificate Provided
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
