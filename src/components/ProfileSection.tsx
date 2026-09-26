import React, { useState, useRef } from 'react';
import { UserAccount, PurchaseHistoryItem, NavigationTab } from '../types';
import { Crown, Mail, User, Shield, Calendar, Clock, FileText, CheckCircle2, AlertCircle, Upload, Edit3, ArrowRight, ExternalLink } from 'lucide-react';

interface ProfileSectionProps {
  currentUser: UserAccount;
  purchases: PurchaseHistoryItem[];
  onNavigate: (tab: NavigationTab) => void;
  onUpdateUser: (updated: Partial<UserAccount>) => void;
  onOpenAuth: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  currentUser,
  purchases,
  onNavigate,
  onUpdateUser,
  onOpenAuth
}) => {
  const [isEditingIgn, setIsEditingIgn] = useState(false);
  const [ignInput, setIgnInput] = useState(currentUser.inGameName);
  const [skinPreview, setSkinPreview] = useState(currentUser.avatarUrl || './assets/profile_skin.png');
  const skinInputRef = useRef<HTMLInputElement>(null);

  const handleSkinUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSkinPreview(url);
      onUpdateUser({ avatarUrl: url });
    }
  };

  const handleSaveIgn = () => {
    if (ignInput.trim()) {
      onUpdateUser({ inGameName: ignInput.trim() });
      setIsEditingIgn(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Profile Card Container */}
      <div className="relative rounded-3xl bg-[#0B0B12] border-2 border-[#1E1E2C] shadow-2xl p-6 sm:p-10 overflow-hidden">
        
        {/* Glow ambient backgrounds */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#EF007E]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-[#FFDF00]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Center-Top: Circular 800x800 profile picture/skin logo placeholder */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            ref={skinInputRef}
            onChange={handleSkinUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="relative group cursor-pointer" onClick={() => skinInputRef.current?.click()} title="Click to upload custom Minecraft skin/avatar">
            {/* Outer Glowing Rings */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#EF007E] via-[#FFDF00] to-[#EF007E] opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            
            {/* Circular 800x800 placeholder image container */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#070709] bg-[#12121D] shadow-2xl flex items-center justify-center">
              <img
                src={skinPreview || './assets/profile_skin.png'}
                alt="Minecraft Skin Avatar (800x800)"
                width={800}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/profile_skin.png';
                }}
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity">
                <Upload className="w-5 h-5 text-[#FFDF00]" />
                <span className="text-[11px] font-semibold text-white">Change Skin</span>
              </div>
            </div>

            {/* Rank Crown Icon Pin */}
            <div className="absolute bottom-1 right-2 w-9 h-9 rounded-full bg-[#FFDF00] text-black border-2 border-[#070709] flex items-center justify-center shadow-lg font-bold">
              <Crown className="w-5 h-5 text-black" />
            </div>
          </div>

          {/* Neatly Displayed: Server Rank, In-Game Name, Email Address */}
          <div className="mt-6 space-y-2">
            
            {/* Server Rank */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold font-mc bg-[#FFDF00]/15 text-[#FFDF00] border border-[#FFDF00]/40 shadow-[0_0_12px_rgba(255,223,0,0.3)]">
                <Crown className="w-3.5 h-3.5" />
                <span>SERVER RANK: {currentUser.serverRank}</span>
              </span>
            </div>

            {/* In-game Name (Editable) */}
            <div className="flex items-center justify-center gap-2">
              {isEditingIgn ? (
                <div className="flex items-center gap-2 max-w-xs mx-auto">
                  <input
                    type="text"
                    value={ignInput}
                    onChange={(e) => setIgnInput(e.target.value)}
                    className="px-3 py-1.5 bg-[#161624] border border-[#EF007E] rounded-lg text-white font-heading font-bold text-lg text-center focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveIgn}
                    className="px-3 py-1.5 bg-[#EF007E] text-white rounded-lg text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
                    {currentUser.inGameName}
                  </h2>
                  <button
                    onClick={() => setIsEditingIgn(true)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    title="Edit In-Game Name"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-mono">
              <Mail className="w-4 h-4 text-[#EF007E]" />
              <span>{currentUser.email}</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-400">{currentUser.phone}</span>
            </div>

            {/* Verification stats row */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5 bg-[#12121C] px-3 py-1.5 rounded-lg border border-[#202030]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Whitelist Status: <strong className="text-emerald-400">ACTIVE</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#12121C] px-3 py-1.5 rounded-lg border border-[#202030]">
                <Calendar className="w-3.5 h-3.5 text-[#FFDF00]" />
                <span>Member Since: <strong className="text-white">{currentUser.joinedDate}</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-[#1C1C2A] flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('STORE')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#EF007E] hover:bg-[#d60070] text-white font-bold text-xs font-heading rounded-xl shadow-lg shadow-[#EF007E]/30 transition-all cursor-pointer"
          >
            <span>UPGRADE RANK</span>
            <ArrowRight className="w-4 h-4 text-[#FFDF00]" />
          </button>
          
          <button
            onClick={onOpenAuth}
            className="px-4 py-2.5 bg-[#141420] hover:bg-[#1E1E2C] border border-[#26263B] text-gray-300 hover:text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            Account Security & Settings
          </button>
        </div>

        {/* Purchase History Table or Timeline */}
        <div className="mt-12 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E1E2C] pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FFDF00]" />
              <h3 className="font-heading font-bold text-lg text-white">
                Purchase History & Order Receipts
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {purchases.length} Records Found
            </span>
          </div>

          {purchases.length === 0 ? (
            <div className="text-center py-10 bg-[#0E0E16] rounded-2xl border border-[#1A1A26] text-gray-400 space-y-2">
              <Clock className="w-6 h-6 mx-auto text-gray-500" />
              <p className="text-sm font-semibold text-white">No prior store purchases yet</p>
              <p className="text-xs text-gray-500">Orders placed through the Rank Shop will appear here with verification tracking.</p>
              <button
                onClick={() => onNavigate('STORE')}
                className="mt-2 text-xs font-bold text-[#EF007E] hover:underline"
              >
                Browse Rank Shop →
              </button>
            </div>
          ) : (
            <div className="bg-[#0D0D14] border border-[#1F1F2E] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#12121D] border-b border-[#1F1F2E] text-gray-400 uppercase font-mono text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Rank Acquired</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Invoice Attachment</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#181826]">
                    {purchases.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                          {item.id}
                        </td>
                        <td className="py-3.5 px-4 font-heading font-bold text-[#EF007E]">
                          {item.rankName} (1 Month)
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#FFDF00] font-semibold">
                          {item.price}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 font-mono">
                          {item.date}
                        </td>
                        <td className="py-3.5 px-4 text-gray-300 font-mono truncate max-w-[140px]" title={item.invoiceName}>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            <span className="truncate">{item.invoiceName}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {item.status === 'DELIVERED' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mc bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3" />
                              DELIVERED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mc bg-[#FFDF00]/15 text-[#FFDF00] border border-[#FFDF00]/30 animate-pulse">
                              <Clock className="w-3 h-3" />
                              IN REVIEW
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="p-3.5 bg-[#0A0A10] rounded-xl border border-[#1A1A26] flex items-center justify-between text-xs text-gray-400">
            <span>Orders are verified manually within 1–3 business days.</span>
            <a
              href="https://discord.gg/FXnCWMNp37"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5865F2] hover:underline font-medium"
            >
              Contact Support on Discord ↗
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
