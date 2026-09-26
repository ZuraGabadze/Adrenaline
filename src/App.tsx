/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, UserAccount, PurchaseHistoryItem } from './types';
import { INITIAL_USER, INITIAL_PURCHASES } from './data/serverData';
import { ThreeParticleCanvas } from './components/ThreeParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServerRules } from './components/ServerRules';
import { StoreSection } from './components/StoreSection';
import { InfoSection } from './components/InfoSection';
import { ProfileSection } from './components/ProfileSection';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('MAIN');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // User state: new visitors start logged out and must LOGIN / REGISTER
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('adrenaline_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Purchases state
  const [purchases, setPurchases] = useState<PurchaseHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('adrenaline_purchases');
      return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
    } catch {
      return INITIAL_PURCHASES;
    }
  });

  // Local Logo state (persisted or local path ./assets/logo.png)
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    return localStorage.getItem('adrenaline_logo') || './assets/logo.png';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('adrenaline_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('adrenaline_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('adrenaline_purchases', JSON.stringify(purchases));
  }, [purchases]);

  const handleLogoChange = (newLogo: string) => {
    setLogoSrc(newLogo);
    localStorage.setItem('adrenaline_logo', newLogo);
  };

  const handleAddPurchase = (item: PurchaseHistoryItem) => {
    setPurchases((prev) => [item, ...prev]);
  };

  const handleUpgradeUserRank = (rankName: string) => {
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, serverRank: rankName } : null));
    }
  };

  const handleUpdateUser = (updated: Partial<UserAccount>) => {
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 font-outfit relative selection:bg-[#EF007E] selection:text-white">
      
      {/* Global 3D Three.js particle system with floating ender pearls and ender eyes */}
      <ThreeParticleCanvas />

      {/* Fixed Top Navigation Bar with the continuous glowing line */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        logoSrc={logoSrc}
        onLogoChange={handleLogoChange}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        
        {/* TAB 1: MAIN (Home Section) */}
        {activeTab === 'MAIN' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Striking Hero with server IP "Adrenalinee.run" & hardcoded "60 ms" ping indicator */}
            <Hero onNavigate={setActiveTab} />

            {/* Beautifully formatted Server Rules Section */}
            <ServerRules />
          </div>
        )}

        {/* TAB 2: STORE (Rank Shop) */}
        {activeTab === 'STORE' && (
          <div className="animate-in fade-in duration-300">
            <StoreSection
              currentUser={currentUser}
              onAddPurchase={handleAddPurchase}
              onUpgradeUserRank={handleUpgradeUserRank}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>
        )}

        {/* TAB 3: INFO (Staff & Player Leaderboards) */}
        {activeTab === 'INFO' && (
          <div className="animate-in fade-in duration-300">
            <InfoSection />
          </div>
        )}

        {/* TAB 4: PROFILE (User Dashboard) */}
        {activeTab === 'PROFILE' && (
          <div className="animate-in fade-in duration-300">
            {currentUser ? (
              <ProfileSection
                currentUser={currentUser}
                purchases={purchases}
                onNavigate={setActiveTab}
                onUpdateUser={handleUpdateUser}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            ) : (
              <div className="py-24 text-center max-w-md mx-auto px-4">
                <div className="w-16 h-16 rounded-full bg-[#EF007E]/20 text-[#EF007E] border border-[#EF007E]/40 flex items-center justify-center mx-auto mb-4 text-2xl font-mc">
                  ?
                </div>
                <h2 className="text-2xl font-bold font-heading text-white mb-2">
                  Authentication Required
                </h2>
                <p className="text-xs text-gray-400 mb-6">
                  Please log in or register to access your personal Adrenaline SMP profile, order receipts, and rank status.
                </p>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-6 py-3 bg-[#EF007E] hover:bg-[#d60070] text-white font-bold font-heading rounded-xl shadow-lg shadow-[#EF007E]/30 text-xs transition-colors"
                >
                  Sign In / Register (+995)
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        onLogout={handleLogout}
      />

    </div>
  );
}
