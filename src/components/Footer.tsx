import React, { useState } from 'react';
import { SERVER_CONFIG } from '../data/serverData';
import { NavigationTab } from '../types';
import { Copy, Check, Shield, MessageSquare, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-20 border-t border-[#181826] bg-[#050507] text-gray-400 text-xs">
      
      {/* Continuous gradient line */}
      <div className="continuous-nav-line w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl p-0.5 bg-[#12121A] border border-[#EF007E]/60 overflow-hidden">
                <img
                  src="./assets/logo.png"
                  alt="Adrenaline Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/logo.png';
                  }}
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-wider text-white">
                  ADRENALINE SMP
                </span>
                <div className="text-[10px] text-[#FFDF00] font-mono">SEASON 1 (1.21.8)</div>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              The supreme competitive Minecraft SMP. Custom engineered netcode, fair rankings, and active community.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Sections
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('MAIN')}
                  className="hover:text-white hover:text-[#EF007E] transition-colors"
                >
                  MAIN (Home & Rules)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('STORE')}
                  className="hover:text-white hover:text-[#FFDF00] transition-colors"
                >
                  STORE (Rank Shop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('INFO')}
                  className="hover:text-white hover:text-[#EF007E] transition-colors"
                >
                  INFO (Staff & Leaderboards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('PROFILE')}
                  className="hover:text-white hover:text-[#FFDF00] transition-colors"
                >
                  PROFILE (Player Dashboard)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Server Connect */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Direct Connect
            </h4>
            <div className="p-3 rounded-xl bg-[#0D0D14] border border-[#202030] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{SERVER_CONFIG.ip}</span>
                <span className="text-emerald-400 font-bold">{SERVER_CONFIG.ping}</span>
              </div>
              <button
                onClick={handleCopyIp}
                className="w-full py-1.5 rounded-lg bg-[#EF007E]/20 hover:bg-[#EF007E]/30 text-[#EF007E] border border-[#EF007E]/40 font-heading font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED ADDRESS!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY SERVER IP</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Col 4: Community & Discord */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              Discord Community
            </h4>
            <p className="text-gray-400 text-xs">
              Join our active Discord for announcements, giveaways, ticket support, and invoice status checking.
            </p>
            <a
              href="https://discord.gg/h8nRhE3HyH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs transition-colors shadow-lg shadow-[#5865F2]/20 mt-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Join Adrenaline Discord</span>
            </a>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#151522] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>
            © {new Date().getFullYear()} Adrenaline SMP. All rights reserved. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Primary Pink #EF007E · Black · Gold #FFDF00</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
