import React, { useState } from 'react';
import { Copy, Check, Wifi, Shield, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';
import { NavigationTab } from '../types';

interface HeroProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_CONFIG.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EF007E]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[250px] bg-[#FFDF00]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12121A] border border-[#262638] text-xs font-medium text-gray-300 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#EF007E] animate-pulse" />
          <span className="text-[#FFDF00] font-semibold">SEASON 1 LIVE</span>
          <span className="text-gray-600">|</span>
          <span>Next-Generation Competitive Survival SMP</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tight leading-none text-white">
            FEEL THE <br className="hidden sm:block" />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#EF007E] via-[#ff4da8] to-[#FFDF00]">
              ADRENALINE
              {/* Subtle underline bar */}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#EF007E] to-[#FFDF00] rounded-full shadow-[0_0_12px_#EF007E]" />
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-normal leading-relaxed pt-2">
            The premier high-octane Minecraft SMP. Featuring custom enchants, 
            fair PvP seasons, robust economy, and unyielding competition.
          </p>
        </div>

        {/* Server IP Interactive Box & Hardcoded 60 ms Ping */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative group p-1.5 rounded-2xl bg-gradient-to-r from-[#EF007E]/50 via-[#26263B] to-[#FFDF00]/40 shadow-2xl shadow-[#EF007E]/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A0A10] px-5 py-4 rounded-xl border border-[#222234]">
              
              {/* Left side: Server IP and Click to copy */}
              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-lg bg-[#141422] border border-[#2C2C42] flex items-center justify-center shrink-0 text-[#EF007E]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 font-mono">
                    SERVER ADDRESS
                  </div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
                    {SERVER_CONFIG.ip}
                  </div>
                </div>
              </div>

              {/* Right side: Stylized Hardcoded Ping Indicator (60 ms) & Copy Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#1B1B26] pt-3 sm:pt-0">
                {/* Strictly Hardcoded Ping: 60 ms */}
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#11111B] border border-[#222235]"
                  title="Server network latency"
                >
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono leading-none">
                      PING
                    </span>
                    <span className="text-xs font-bold text-emerald-400 font-mono leading-tight">
                      {SERVER_CONFIG.ping}
                    </span>
                  </div>
                </div>

                {/* Clickable Copy Icon with Tooltip */}
                <div className="relative">
                  <button
                    onClick={handleCopyIp}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                      copied
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                        : 'bg-[#EF007E] hover:bg-[#d60070] text-white shadow-[0_0_20px_rgba(239,0,126,0.4)] active:scale-95'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY IP</span>
                      </>
                    )}
                  </button>

                  {/* Tooltip */}
                  {copied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 border border-emerald-400 text-emerald-300 text-xs font-bold rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95">
                      Copied IP to clipboard!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-3">
            <span>Java & Bedrock Compatible</span>
            <span>·</span>
            <span>Version 1.21.8</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Optimal Connection</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('STORE')}
            className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#EF007E] to-[#d60070] hover:brightness-110 text-white font-bold font-heading rounded-xl shadow-xl shadow-[#EF007E]/25 transition-all active:scale-95 cursor-pointer text-sm tracking-wide"
          >
            <span>EXPLORE STORE RANKS</span>
            <ChevronRight className="w-4 h-4 text-[#FFDF00]" />
          </button>

          <a
            href="#server-rules"
            className="flex items-center gap-2 px-6 py-3.5 bg-[#12121B] hover:bg-[#1A1A26] border border-[#2B2B3E] hover:border-[#EF007E]/60 text-gray-200 hover:text-white font-semibold font-heading rounded-xl transition-all cursor-pointer text-sm"
          >
            <Shield className="w-4 h-4 text-[#EF007E]" />
            <span>SERVER RULES</span>
          </a>

          <button
            onClick={() => onNavigate('INFO')}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#12121B] hover:bg-[#1A1A26] border border-[#2B2B3E] hover:border-[#FFDF00]/60 text-gray-200 hover:text-white font-semibold font-heading rounded-xl transition-all cursor-pointer text-sm"
          >
            <Zap className="w-4 h-4 text-[#FFDF00]" />
            <span>STATS & STAFF</span>
          </button>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left">
          <div className="p-5 rounded-2xl bg-[#0C0C12] border border-[#1E1E2C] hover:border-[#EF007E]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#EF007E]/10 border border-[#EF007E]/30 flex items-center justify-center text-[#EF007E] mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Lag-Free Netcode</h3>
            <p className="text-xs text-gray-400 mt-1">
              Custom Paper/Purpur configuration tuned for 20.0 TPS even during 100+ player war battles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0C0C12] border border-[#1E1E2C] hover:border-[#FFDF00]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#FFDF00]/10 border border-[#FFDF00]/30 flex items-center justify-center text-[#FFDF00] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Balanced Economy</h3>
            <p className="text-xs text-gray-400 mt-1">
              Zero pay-to-win items. Ranks provide quality-of-life perks, cosmetics, and fair survival kits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0C0C12] border border-[#1E1E2C] hover:border-[#EF007E]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#EF007E]/10 border border-[#EF007E]/30 flex items-center justify-center text-[#EF007E] mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Active Moderation</h3>
            <p className="text-xs text-gray-400 mt-1">
              24/7 staff ticket system, grim anti-cheat detection, and instant claim grief rollbacks.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
