import React, { useState } from 'react';
import { RANKS_DATA, SERVER_CONFIG } from '../data/serverData';
import { RankPerk, PurchaseHistoryItem, UserAccount } from '../types';
import { Sparkles, Check, Crown, Terminal, Shield, Upload, FileText, ArrowRight, X, AlertCircle, ExternalLink, Lock, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoreSectionProps {
  currentUser: UserAccount | null;
  onAddPurchase: (purchase: PurchaseHistoryItem) => void;
  onUpgradeUserRank: (rankName: string) => void;
  onOpenAuth: () => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  currentUser,
  onAddPurchase,
  onUpgradeUserRank,
  onOpenAuth
}) => {
  const [selectedRank, setSelectedRank] = useState<RankPerk | null>(null);
  const [checkoutRank, setCheckoutRank] = useState<RankPerk | null>(null);

  // Checkout Form State
  const [minecraftName, setMinecraftName] = useState(currentUser?.inGameName || '');
  const [discordId, setDiscordId] = useState(currentUser?.discordId || '');
  const [age, setAge] = useState(currentUser?.age ? String(currentUser.age) : '18');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<PurchaseHistoryItem | null>(null);

  // Sync with currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      if (!minecraftName) setMinecraftName(currentUser.inGameName);
      if (!discordId && currentUser.discordId) setDiscordId(currentUser.discordId);
      if (currentUser.age) setAge(String(currentUser.age));
    }
  }, [currentUser]);

  const handleOpenPerks = (rank: RankPerk) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setSelectedRank(rank);
  };

  const handleStartPurchase = (rank: RankPerk, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setSelectedRank(null);
    setCheckoutRank(rank);
    setFormError(null);
    setOrderSuccess(null);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setFormError(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setFormError(null);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!checkoutRank) return;

    if (!minecraftName.trim()) {
      setFormError('Please enter your Minecraft In-Game Name.');
      return;
    }

    if (!discordId.trim()) {
      setFormError('Please enter your Discord ID (e.g. user#0000 or username).');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 99) {
      setFormError('Please enter a valid age (10-99).');
      return;
    }

    if (!uploadedFile) {
      setFormError('Please upload a screenshot/photo of your invoice or PDF file.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newOrder: PurchaseHistoryItem = {
        id: `ADR-${Math.floor(10000 + Math.random() * 90000)}`,
        rankName: checkoutRank.name,
        price: checkoutRank.price,
        date: new Date().toISOString().split('T')[0],
        status: 'IN_REVIEW',
        invoiceName: uploadedFile.name,
        minecraftName: minecraftName.trim(),
        discordId: discordId.trim()
      };

      onAddPurchase(newOrder);
      onUpgradeUserRank(checkoutRank.name);
      setOrderSuccess(newOrder);

      // Confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EF007E', '#FFDF00', '#ffffff']
        });
      } catch {
        // Safe fallback
      }
    }, 800);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFDF00]/10 border border-[#FFDF00]/30 text-xs font-semibold text-[#FFDF00] uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5" />
          <span>OFFICIAL SERVER STORE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
          SURVIVAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF007E] to-[#FFDF00]">RANK SHOP</span>
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
          Unlock game-changing survival utility, kits, priority queuing, and exclusive cosmetic status. 
          Ranks stack cumulatively with higher tiers.
        </p>

        <div className="inline-flex items-center gap-3 text-xs text-gray-400 bg-[#0E0E16] px-4 py-2 rounded-xl border border-[#1E1E2C]">
          <span className="text-[#FFDF00] font-bold">ოფიციალური Adrenaline SMP ფასები</span>
          <span>·</span>
          <span>Manual Admin Verification</span>
          <span>·</span>
          <span className="text-[#EF007E] font-medium">Instant Ticket Support</span>
        </div>
      </div>

      {/* 5 Creative Rank Cards with 90% Blur & Auth Protection */}
      <div className="relative">
        {/* If user is NOT logged in, show 90% blur shield overlay */}
        {!currentUser && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 text-center animate-in fade-in duration-300">
            {/* 90% blur glass shield */}
            <div 
              onClick={onOpenAuth}
              className="absolute inset-0 bg-[#070709]/85 backdrop-blur-[20px] rounded-3xl cursor-pointer"
            />

            {/* Central Locked Message Box */}
            <div className="relative z-10 max-w-lg w-full p-7 sm:p-9 rounded-3xl bg-[#0D0D14]/95 border-2 border-[#EF007E] shadow-[0_0_60px_rgba(239,0,126,0.5)] flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EF007E]/20 border-2 border-[#FFDF00] flex items-center justify-center text-[#FFDF00] shadow-[0_0_25px_rgba(255,223,0,0.5)] animate-pulse">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFDF00]/15 text-[#FFDF00] border border-[#FFDF00]/30 font-mc text-[10px]">
                  AUTH REQUIRED
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide">
                  ფასების სანახავად გაიარეთ ავტორიზაცია
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                  რანკების ფასების, ბონუსების და BUY ბმულების სანახავად გთხოვთ გაიაროთ <strong className="text-white">LOGIN</strong> ან <strong className="text-white">REGISTER</strong> (ტელეფონის კოდით +995).
                </p>
              </div>

              <div className="w-full pt-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#EF007E] via-[#ff4da8] to-[#FFDF00] text-black font-black font-heading text-sm rounded-xl shadow-[0_0_25px_rgba(239,0,126,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>LOGIN / REGISTER (+995)</span>
                </button>
              </div>

              <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
                <span>სწრაფი ავტორიზაცია</span>
                <span>·</span>
                <span className="text-[#FFDF00]">Adrenaline SMP Season 1 (1.21.8)</span>
              </div>
            </div>
          </div>
        )}

        {/* 5 Creative Rank Cards Grid (Blurred 90% if not logged in) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 transition-all duration-500 ${
          !currentUser ? 'filter blur-[16px] select-none pointer-events-none opacity-20' : ''
        }`}>
        {RANKS_DATA.map((rank) => {
          const isHighest = rank.id === 'sponsor';
          const isPinkHighlight = rank.id === 'mvp_plus';

          return (
            <div
              key={rank.id}
              onClick={() => handleOpenPerks(rank)}
              className={`group relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border ${
                isHighest
                  ? 'bg-gradient-to-b from-[#181507] via-[#0E0E14] to-[#0A0A0F] border-[#FFDF00]/50 hover:border-[#FFDF00] hover:shadow-[0_0_35px_rgba(255,223,0,0.35)]'
                  : isPinkHighlight
                  ? 'bg-gradient-to-b from-[#1A0A14] via-[#0E0E14] to-[#0A0A0F] border-[#EF007E]/50 hover:border-[#EF007E] hover:shadow-[0_0_35px_rgba(239,0,126,0.35)]'
                  : 'bg-[#0C0C12] border-[#202030] hover:border-[#EF007E]/50 hover:shadow-[0_0_25px_rgba(239,0,126,0.2)]'
              } hover:-translate-y-2`}
            >
              {/* Badge if Popular or Supreme */}
              {rank.popular && (
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-[#06b6d4]/20 border border-[#06b6d4]/40 text-[#06b6d4] text-[10px] font-bold font-mc">
                  POPULAR
                </div>
              )}
              {rank.bestValue && (
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-[#EF007E]/20 border border-[#EF007E]/40 text-[#EF007E] text-[10px] font-bold font-mc">
                  BEST TIER
                </div>
              )}
              {isHighest && (
                <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-[#FFDF00]/20 border border-[#FFDF00]/40 text-[#FFDF00] text-[10px] font-bold font-mc">
                  SUPREME
                </div>
              )}

              {/* Card Body */}
              <div className="space-y-4 text-center pt-2">
                
                {/* Local Minecraft Icon Placeholder */}
                <div className="mx-auto w-20 h-20 rounded-2xl p-2 bg-[#141420] border-2 border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                  <img
                    src={rank.icon}
                    alt={`${rank.name} Icon`}
                    className="w-16 h-16 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    onError={(e) => {
                      // Styled pixel fallback if path issues
                      (e.target as HTMLImageElement).src = './assets/logo.png';
                    }}
                  />
                </div>

                {/* Rank Name Below It */}
                <div>
                  <h3 
                    className="text-2xl font-black font-heading tracking-wide transition-colors"
                    style={{ color: rank.themeColor }}
                  >
                    {rank.name}
                  </h3>
                  {/* Short Description */}
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    {rank.period}
                  </p>
                </div>

                <div className="text-[11px] text-gray-400 line-clamp-2 min-h-[32px] px-1">
                  {rank.tagline}
                </div>

                {/* Price in Gold color (#FFDF00) */}
                <div className="pt-2 pb-1 border-y border-[#181824]">
                  <div className={`text-2xl sm:text-3xl font-extrabold font-heading text-[#FFDF00] tracking-tight drop-shadow-[0_0_10px_rgba(255,223,0,0.3)] ${!currentUser ? 'filter blur-[8px]' : ''}`}>
                    {currentUser ? rank.price : '🔒 0,00₾'}
                  </div>
                </div>

                {/* Quick Perk Highlights */}
                <div className="space-y-1.5 text-left text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#FFDF00]">
                    <Terminal className="w-3 h-3 shrink-0" />
                    <span className="truncate">{rank.commands.slice(0, 2).join(', ')}...</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                    <Shield className="w-3 h-3 shrink-0" />
                    <span>Kit: {rank.kits.join(', ')}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-5 space-y-2 mt-4">
                <button
                  type="button"
                  onClick={(e) => handleStartPurchase(rank, e)}
                  className="w-full py-2.5 px-4 bg-[#EF007E] hover:bg-[#d60070] text-white font-bold text-xs font-heading rounded-xl shadow-lg shadow-[#EF007E]/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>PURCHASE</span>
                  <span className="text-[#FFDF00] font-bold font-mono">({rank.price})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenPerks(rank)}
                  className="w-full py-1.5 text-[11px] font-medium text-gray-400 hover:text-white transition-colors"
                >
                  View All Perks & Commands →
                </button>
              </div>

            </div>
          );
        })}
        </div>
      </div>

      {/* Floating Modal / Window: Rank Perks Details */}
      {selectedRank && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedRank(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0D0D14] border border-[#2B2B3E] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedRank(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-[#202030] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#141422] border-2 border-white/10 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={selectedRank.icon}
                    alt={selectedRank.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './assets/logo.png';
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-3xl font-black font-heading"
                      style={{ color: selectedRank.themeColor }}
                    >
                      {selectedRank.name} PERKS
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mc bg-white/10 text-white">
                      {selectedRank.period}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{selectedRank.tagline}</p>
                  <div className="text-lg font-bold font-heading text-[#FFDF00] mt-1">
                    {selectedRank.price}
                  </div>
                </div>
              </div>

              {/* Top Center / Right BUY button */}
              <a
                href={selectedRank.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EF007E] via-[#ff4da8] to-[#FFDF00] text-black font-black text-xs font-heading tracking-wider shadow-[0_0_15px_rgba(239,0,126,0.6)] hover:shadow-[0_0_25px_rgba(255,223,0,0.9)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                title={`BUY ${selectedRank.name}`}
              >
                <span>BUY</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>

            {/* Perks Content */}
            <div className="py-6 space-y-6">
              
              {/* Commands Section */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  <Terminal className="w-4 h-4 text-[#EF007E]" />
                  <span>In-Game Commands</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedRank.commands.map((cmd) => (
                    <div
                      key={cmd}
                      className="px-3 py-2 rounded-xl bg-[#141422] border border-[#232338] text-xs font-mono text-emerald-400 flex items-center gap-1.5"
                    >
                      <span className="text-gray-500">$</span>
                      <span className="truncate">{cmd}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kits Section */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  <Shield className="w-4 h-4 text-[#FFDF00]" />
                  <span>Accessible Kit Tiers</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRank.kits.map((kit) => (
                    <div
                      key={kit}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FFDF00]/10 border border-[#FFDF00]/30 text-xs font-bold font-mc text-[#FFDF00] flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Kit {kit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusive Perks */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#EF007E]" />
                  <span>Privileges & Bonuses</span>
                </div>
                <ul className="space-y-2">
                  {selectedRank.exclusiveFeatures.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-xs text-gray-300 bg-[#11111A] p-2.5 rounded-xl border border-[#1E1E2C]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF007E] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#202030] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-400 text-center sm:text-left">
                Cumulative perks include all lower tier benefits.
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedRank(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#2B2B3E] text-gray-400 hover:text-white text-xs font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleStartPurchase(selectedRank)}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#EF007E] hover:bg-[#d60070] text-white font-bold font-heading text-xs rounded-xl shadow-lg shadow-[#EF007E]/30"
                >
                  Proceed to Purchase ({selectedRank.price})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Checkout View / Modal (Appears when "Purchase" is clicked) */}
      {checkoutRank && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => {
            if (!isSubmitting) setCheckoutRank(null);
          }}
        >
          <div
            className="relative w-full max-w-xl bg-[#0D0D14] border border-[#2E2E42] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            {!isSubmitting && (
              <button
                onClick={() => setCheckoutRank(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {orderSuccess ? (
              /* Success Screen */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[11px] font-mc text-[#FFDF00] uppercase tracking-wider">
                    ORDER #{orderSuccess.id}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mt-1">
                    Invoice Submitted Successfully!
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto mt-2">
                    Your request for <strong className="text-white">{orderSuccess.rankName}</strong> has been logged. 
                    Our staff team is reviewing your invoice.
                  </p>
                </div>

                <div className="p-4 bg-[#12121E] rounded-2xl border border-[#222238] text-xs text-left space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minecraft Player:</span>
                    <span className="text-white font-semibold">{orderSuccess.minecraftName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discord ID:</span>
                    <span className="text-white font-semibold">{orderSuccess.discordId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Invoice File:</span>
                    <span className="text-[#FFDF00]">{orderSuccess.invoiceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Status:</span>
                    <span className="text-[#FFDF00] font-bold">IN REVIEW (1-3 Days)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutRank(null)}
                  className="w-full py-3 bg-[#EF007E] hover:bg-[#d60070] text-white font-bold font-heading rounded-xl text-xs transition-colors shadow-lg shadow-[#EF007E]/30"
                >
                  View in My Profile Dashboard
                </button>
              </div>
            ) : (
              /* Checkout Form View */
              <div>
                <div className="border-b border-[#202030] pb-5 mb-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#141422] border border-[#2C2C42] p-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={checkoutRank.icon}
                          alt={checkoutRank.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = './assets/logo.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-[#FFDF00] uppercase tracking-wider font-mono">
                          CHECKOUT ORDER
                        </div>
                        <h3 className="text-2xl font-black font-heading text-white">
                          Acquiring <span style={{ color: checkoutRank.themeColor }}>{checkoutRank.name}</span> Rank
                        </h3>
                        <div className="text-xs text-gray-400 font-mono">
                          Total: <span className="text-[#FFDF00] font-bold text-sm">{checkoutRank.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Top BUY Button */}
                    <a
                      href={checkoutRank.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EF007E] via-[#ff4da8] to-[#FFDF00] text-black font-black text-xs font-heading tracking-wider shadow-[0_0_15px_rgba(239,0,126,0.6)] hover:shadow-[0_0_25px_rgba(255,223,0,0.9)] hover:scale-105 active:scale-95 transition-all self-stretch sm:self-auto text-center cursor-pointer"
                      title={`BUY ${checkoutRank.name}`}
                    >
                      <span>BUY</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>

                {/* Top Center: BUY Payment Link Instruction Box */}
                <div className="flex flex-col items-center justify-center p-3.5 mb-5 rounded-2xl bg-gradient-to-r from-[#EF007E]/15 via-[#FFDF00]/15 to-[#EF007E]/15 border border-[#FFDF00]/40 text-center shadow-lg">
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-200 font-semibold">გადახდისთვის დააჭირეთ:</span>
                    <a
                      href={checkoutRank.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#EF007E] to-[#FFDF00] text-black font-black text-xs font-heading shadow-[0_0_12px_rgba(239,0,126,0.5)] hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>BUY {checkoutRank.name} ({checkoutRank.price})</span>
                      <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    გადახდის შემდეგ გადმოწერეთ ინვოისი / ჩეკი და ატვირთეთ ქვემოთ
                  </span>
                </div>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  {/* Form Field 1: Minecraft Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Minecraft Name <span className="text-[#EF007E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your exact in-game IGN"
                      value={minecraftName}
                      onChange={(e) => setMinecraftName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] transition-colors"
                    />
                  </div>

                  {/* Form Field 2: Discord ID */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Discord ID <span className="text-[#EF007E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. your_discord_tag or discord username"
                      value={discordId}
                      onChange={(e) => setDiscordId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] transition-colors"
                    />
                  </div>

                  {/* Form Field 3: Age */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Age <span className="text-[#EF007E]">*</span>
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="99"
                      required
                      placeholder="Your age (e.g. 18)"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] transition-colors"
                    />
                  </div>

                  {/* File Upload Drag-and-Drop Zone for Invoice/PDF */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Proof of Payment (Invoice / PDF File) <span className="text-[#EF007E]">*</span>
                    </label>

                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                        isDragging
                          ? 'border-[#EF007E] bg-[#EF007E]/10'
                          : uploadedFile
                          ? 'border-emerald-500/60 bg-emerald-950/20'
                          : 'border-[#2D2D42] hover:border-[#EF007E]/50 bg-[#12121E]'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />

                      {uploadedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white truncate max-w-xs">{uploadedFile.name}</p>
                            <p className="text-[11px] text-gray-400 font-mono">
                              {(uploadedFile.size / 1024).toFixed(1)} KB · Ready for submission
                            </p>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-semibold underline">
                            Click to replace file
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-[#1B1B2C] text-[#FFDF00] flex items-center justify-center">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-semibold text-white">
                            Drag & drop invoice picture or PDF file here
                          </p>
                          <p className="text-[11px] text-gray-400">
                            or click to browse local files (PNG, JPG, PDF up to 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Underneath Checkout Form Rules (Strictly Exact Text formatted beautifully) */}
                  <div className="p-4 rounded-2xl bg-[#09090F] border border-[#1E1E2C] space-y-1.5 text-xs text-gray-300">
                    <div className="text-[11px] font-bold text-[#FFDF00] uppercase tracking-wider mb-1">
                      ORDER PROCESSING RULES:
                    </div>
                    <p className="text-gray-400 font-sans">
                      <span className="text-[#EF007E] font-bold font-mono">1•</span> Upload picture of Invoice or PDF File
                    </p>
                    <p className="text-gray-400 font-sans">
                      <span className="text-[#EF007E] font-bold font-mono">2•</span> Rank/Item will be delivered after checking
                    </p>
                    <p className="text-gray-400 font-sans">
                      <span className="text-[#EF007E] font-bold font-mono">3•</span> Delivery Time: 1-3 Days
                    </p>
                    <p className="text-gray-400 font-sans">
                      <span className="text-[#EF007E] font-bold font-mono">4•</span> For more information Contact us on{' '}
                      <a
                        href={SERVER_CONFIG.discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5865F2] hover:underline font-semibold"
                      >
                        Discord
                      </a>.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#EF007E] hover:bg-[#d60070] disabled:opacity-60 text-white font-bold font-heading rounded-xl text-sm transition-all shadow-xl shadow-[#EF007E]/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>SUBMIT ORDER FOR VERIFICATION</span>
                          <ArrowRight className="w-4 h-4 text-[#FFDF00]" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
