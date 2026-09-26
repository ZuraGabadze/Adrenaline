import React, { useState, useRef } from 'react';
import { NavigationTab, UserAccount } from '../types';
import { User, Menu, X, Upload, Sparkles, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  logoSrc: string;
  onLogoChange: (newLogo: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  logoSrc,
  onLogoChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoTip, setShowLogoTip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems: { key: NavigationTab; label: string; tag?: string }[] = [
    { key: 'MAIN', label: 'MAIN' },
    { key: 'STORE', label: 'STORE', tag: 'RANKS' },
    { key: 'INFO', label: 'INFO' },
    { key: 'PROFILE', label: 'PROFILE' }
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onLogoChange(url);
      setShowLogoTip(true);
      setTimeout(() => setShowLogoTip(false), 3000);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#070709]/90 backdrop-blur-xl border-b border-[#1A1A24]">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Far Left: Local Logo Placeholder with <img> tag */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
                id="logo-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Click to preview/upload custom local logo"
                className="relative block w-12 h-12 rounded-xl p-1 bg-[#12121A] border-2 border-[#EF007E]/60 hover:border-[#EF007E] hover:shadow-[0_0_15px_rgba(239,0,126,0.6)] transition-all cursor-pointer overflow-hidden"
              >
                {/* <img> tag placeholder for uploaded local logo */}
                <img
                  id="server-local-logo"
                  src={logoSrc || './assets/logo.png'}
                  alt="Adrenaline SMP Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to local default if custom blob fails
                    (e.target as HTMLImageElement).src = './assets/logo.png';
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload className="w-4 h-4 text-[#FFDF00]" />
                </div>
              </button>
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => onTabChange('MAIN')}
                className="text-left group cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl tracking-wider text-white group-hover:text-[#EF007E] transition-colors">
                    ADRENALINE
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold font-mc bg-[#EF007E] text-white rounded">
                    SMP
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#FFDF00] font-mono tracking-tight font-medium">
                  <span>SEASON 1</span>
                  <span>·</span>
                  <span className="text-gray-400">1.21.8</span>
                </div>
              </button>
            </div>

            {showLogoTip && (
              <div className="hidden lg:flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/40 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Custom logo uploaded!</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links: MAIN, STORE, INFO, PROFILE */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onTabChange(item.key)}
                  className={`relative px-4 lg:px-5 py-2 text-sm font-semibold tracking-wider font-heading rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#151520] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.tag && (
                      <span className="text-[9px] font-mc px-1.5 py-0.5 rounded bg-[#FFDF00]/20 text-[#FFDF00] border border-[#FFDF00]/30">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Active highlight bar under link */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#EF007E] to-[#FFDF00] shadow-[0_0_10px_#EF007E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Far Right: Auth Access (Login / Register Modal) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentUser
                  ? 'bg-[#151522] border border-[#EF007E]/50 text-white hover:border-[#EF007E] hover:shadow-[0_0_15px_rgba(239,0,126,0.3)]'
                  : 'bg-[#EF007E] hover:bg-[#d60070] text-white shadow-[0_0_15px_rgba(239,0,126,0.4)]'
              }`}
            >
              {currentUser ? (
                <>
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-black border border-[#FFDF00]">
                    <img
                      src={currentUser.avatarUrl || './assets/profile_skin.png'}
                      alt={currentUser.inGameName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/profile_skin.png';
                      }}
                    />
                  </div>
                  <span className="max-w-[110px] truncate">{currentUser.inGameName}</span>
                  <span className="text-[10px] font-mc text-[#FFDF00] hidden sm:inline">
                    [{currentUser.serverRank}]
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>LOGIN / REGISTER</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* The Big Continuous Line across the full width */}
      <div className="continuous-nav-line w-full" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0E] border-b border-[#222233] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onTabChange(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-heading text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EF007E] text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.tag && (
                  <span className="text-[10px] font-mc text-[#FFDF00]">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#1C1C28]">
            <button
              onClick={() => {
                fileInputRef.current?.click();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <Upload className="w-4 h-4 text-[#FFDF00]" />
              <span>Upload Custom Local Logo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
