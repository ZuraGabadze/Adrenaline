import React, { useState } from 'react';
import { STAFF_MEMBERS, LEADERBOARDS } from '../data/serverData';
import { StaffMember, LeaderboardPlayer } from '../types';
import { Users, Trophy, Shield, Copy, Check, Terminal, Crown, Sword, Clock, Award, Sparkles, Plus, Edit2 } from 'lucide-react';

export const InfoSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'STAFF' | 'PLAYERS'>('STAFF');
  const [activeLeaderboard, setActiveLeaderboard] = useState<'killers' | 'playtime' | 'seasonsBest'>('killers');
  const [copiedDiscord, setCopiedDiscord] = useState<string | null>(null);

  // Editable leaderboard state
  const [leaderboardsData, setLeaderboardsData] = useState(LEADERBOARDS);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newScore, setNewScore] = useState('');
  const [newSubValue, setNewSubValue] = useState('');

  const handleCopyDiscord = (discordTag: string) => {
    navigator.clipboard.writeText(discordTag);
    setCopiedDiscord(discordTag);
    setTimeout(() => setCopiedDiscord(null), 2500);
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newScore) return;

    const currentList = leaderboardsData[activeLeaderboard];
    const newEntry: LeaderboardPlayer = {
      rank: currentList.length + 1,
      username: newUsername.trim(),
      score: newScore.trim(),
      metricLabel: activeLeaderboard === 'killers' ? 'Player Kills' : activeLeaderboard === 'playtime' ? 'Total Active Playtime' : 'Season SMP Rating',
      subValue: newSubValue.trim() || 'Custom Added Entry',
      avatarSeed: newUsername.toLowerCase(),
      tier: 'standard'
    };

    setLeaderboardsData({
      ...leaderboardsData,
      [activeLeaderboard]: [...currentList, newEntry]
    });

    setNewUsername('');
    setNewScore('');
    setNewSubValue('');
    setShowAddPlayerModal(false);
  };

  // Group staff members by their roles
  const founderMembers = STAFF_MEMBERS.filter(s => s.role === 'Founder & Owner');
  const srDevMembers = STAFF_MEMBERS.filter(s => s.role === 'SR.DEVELOPER');
  const devMembers = STAFF_MEMBERS.filter(s => s.role === 'DEVELOPER');
  const adminMembers = STAFF_MEMBERS.filter(s => s.role === 'ADMIN');

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EF007E]/10 border border-[#EF007E]/30 text-xs font-semibold text-[#EF007E] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SERVER DIRECTORY & ARCHIVES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
          COMMUNITY <span className="text-[#FFDF00]">INFO</span> & ARCHIVES
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
          Meet the dedicated development and leadership staff behind Adrenaline SMP, 
          or check out this season's top ranked combatants and survivalists.
        </p>

        {/* Primary Sub-Tab Switcher: STAFF vs PLAYERS */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0E0E16] border border-[#222234] shadow-lg mt-2">
          <button
            onClick={() => setActiveSubTab('STAFF')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeSubTab === 'STAFF'
                ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>STAFF TEAM ({STAFF_MEMBERS.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('PLAYERS')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
              activeSubTab === 'PLAYERS'
                ? 'bg-[#FFDF00] text-black shadow-md shadow-[#FFDF00]/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>PLAYER LEADERBOARDS</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STAFF AREA */}
      {activeSubTab === 'STAFF' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {/* Group 1: Founder & Owner */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#252538] pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFDF00]/10 border border-[#FFDF00]/30 flex items-center justify-center text-[#FFDF00]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Founder & Owner</h3>
                <p className="text-xs text-gray-500">Executive leadership and strategic server oversight</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {founderMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-3xl bg-gradient-to-r from-[#171407] via-[#0D0D14] to-[#12121D] border-2 border-[#FFDF00]/40 hover:border-[#FFDF00] transition-all shadow-xl shadow-[#FFDF00]/5 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left"
                >
                  <div className="relative w-20 h-20 rounded-2xl bg-[#1A1A26] border-2 border-[#FFDF00] p-1.5 shrink-0 overflow-hidden shadow-lg">
                    {/* Local Minecraft Skin Avatar placeholder */}
                    <img
                      src="./assets/profile_skin.png"
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/logo.png';
                      }}
                    />
                    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" title="Online" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <h4 className="text-xl font-black font-heading text-white tracking-wide">
                        {member.name}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mc bg-[#FFDF00]/20 text-[#FFDF00] border border-[#FFDF00]/40">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {member.description}
                    </p>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                      <button
                        onClick={() => handleCopyDiscord(member.discord)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161624] hover:bg-[#202034] border border-[#2D2D44] text-xs font-mono text-gray-300 transition-colors"
                        title="Click to copy Discord tag"
                      >
                        {copiedDiscord === member.discord ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied: {member.discord}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#5865F2] font-bold">DC:</span>
                            <span>{member.discord}</span>
                            <Copy className="w-3 h-3 text-gray-500" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Senior Developer */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#252538] pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#EF007E]/10 border border-[#EF007E]/30 flex items-center justify-center text-[#EF007E]">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Senior Developer</h3>
                <p className="text-xs text-gray-500">Core system architects and high-performance server engineers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {srDevMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-3xl bg-gradient-to-r from-[#170812] via-[#0E0E15] to-[#12121E] border-2 border-[#EF007E]/40 hover:border-[#EF007E] transition-all shadow-xl shadow-[#EF007E]/5 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left"
                >
                  <div className="relative w-20 h-20 rounded-2xl bg-[#1A1A26] border-2 border-[#EF007E] p-1.5 shrink-0 overflow-hidden shadow-lg">
                    <img
                      src="./assets/profile_skin.png"
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/logo.png';
                      }}
                    />
                    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <h4 className="text-xl font-black font-heading text-white tracking-wide">
                        {member.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mc bg-[#EF007E]/20 text-[#EF007E] border border-[#EF007E]/40">
                          {member.role}
                        </span>
                        {/* Subtle "Java Plugins/Backend" badge */}
                        {member.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-semibold">
                            {member.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {member.description}
                    </p>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                      <button
                        onClick={() => handleCopyDiscord(member.discord)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161624] hover:bg-[#202034] border border-[#2D2D44] text-xs font-mono text-gray-300 transition-colors"
                        title="Click to copy Discord tag"
                      >
                        {copiedDiscord === member.discord ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied: {member.discord}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#5865F2] font-bold">DC:</span>
                            <span>{member.discord}</span>
                            <Copy className="w-3 h-3 text-gray-500" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Developers */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#252538] pb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Developer Team</h3>
                <p className="text-xs text-gray-500">Gameplay systems, custom mechanics, and web applications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {devMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-[#0D0D14] border border-[#222234] hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#141420] border border-[#2B2B3E] p-1 shrink-0 overflow-hidden">
                    <img
                      src="./assets/profile_skin.png"
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/logo.png';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <h4 className="text-lg font-bold font-heading text-white">
                        {member.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mc bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400">
                      {member.description}
                    </p>

                    <div className="pt-1.5">
                      <button
                        onClick={() => handleCopyDiscord(member.discord)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141420] hover:bg-[#1E1E2E] border border-[#27273C] text-xs font-mono text-gray-300 transition-colors"
                      >
                        {copiedDiscord === member.discord ? (
                          <span className="text-emerald-400">Copied!</span>
                        ) : (
                          <>
                            <span className="text-[#5865F2] font-bold">DC:</span>
                            <span>{member.discord}</span>
                            <Copy className="w-3 h-3 text-gray-500" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 4: Admins */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#252538] pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-white">Administrators</h3>
                <p className="text-xs text-gray-500">Player dispute resolution, fair play enforcement, and server operations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {adminMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-[#0D0D14] border border-[#222234] hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#141420] border border-[#2B2B3E] p-1 shrink-0 overflow-hidden">
                    <img
                      src="./assets/profile_skin.png"
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/logo.png';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <h4 className="text-lg font-bold font-heading text-white">
                        {member.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mc bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        {member.role}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400">
                      {member.description}
                    </p>

                    <div className="pt-1.5">
                      <button
                        onClick={() => handleCopyDiscord(member.discord)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141420] hover:bg-[#1E1E2E] border border-[#27273C] text-xs font-mono text-gray-300 transition-colors"
                      >
                        {copiedDiscord === member.discord ? (
                          <span className="text-emerald-400">Copied!</span>
                        ) : (
                          <>
                            <span className="text-[#5865F2] font-bold">DC:</span>
                            <span>{member.discord}</span>
                            <Copy className="w-3 h-3 text-gray-500" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: PLAYERS LEADERBOARDS */}
      {activeSubTab === 'PLAYERS' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Leaderboard Selectors & Add Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0B0B11] p-3 rounded-2xl border border-[#202030]">
            
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveLeaderboard('killers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeLeaderboard === 'killers'
                    ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                    : 'text-gray-400 hover:text-white bg-[#12121C]'
                }`}
              >
                <Sword className="w-4 h-4 text-[#FFDF00]" />
                <span>TOP KILLER</span>
              </button>

              <button
                onClick={() => setActiveLeaderboard('playtime')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeLeaderboard === 'playtime'
                    ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                    : 'text-gray-400 hover:text-white bg-[#12121C]'
                }`}
              >
                <Clock className="w-4 h-4 text-[#FFDF00]" />
                <span>MOST PLAYTIME</span>
              </button>

              <button
                onClick={() => setActiveLeaderboard('seasonsBest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeLeaderboard === 'seasonsBest'
                    ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                    : 'text-gray-400 hover:text-white bg-[#12121C]'
                }`}
              >
                <Award className="w-4 h-4 text-[#FFDF00]" />
                <span>SEASON'S BEST PLAYER</span>
              </button>
            </div>

            <button
              onClick={() => setShowAddPlayerModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161622] hover:bg-[#202032] border border-[#2B2B40] text-xs font-medium text-gray-300 hover:text-white transition-colors self-end sm:self-auto cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#FFDF00]" />
              <span>Add Player Entry</span>
            </button>
          </div>

          {/* Podium for Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {leaderboardsData[activeLeaderboard].slice(0, 3).map((player, idx) => {
              const isGold = idx === 0;
              const isPink = idx === 1;
              const isSilver = idx === 2;

              return (
                <div
                  key={player.username}
                  className={`p-6 rounded-3xl relative overflow-hidden flex flex-col items-center text-center transition-all ${
                    isGold
                      ? 'bg-gradient-to-b from-[#1C1705] via-[#0E0E14] to-[#08080C] border-2 border-[#FFDF00] shadow-[0_0_30px_rgba(255,223,0,0.25)] md:-translate-y-2'
                      : isPink
                      ? 'bg-gradient-to-b from-[#1E0814] via-[#0E0E14] to-[#08080C] border-2 border-[#EF007E] shadow-[0_0_30px_rgba(239,0,126,0.25)]'
                      : 'bg-gradient-to-b from-[#14141E] via-[#0E0E14] to-[#08080C] border border-gray-400/50'
                  }`}
                >
                  {/* Position Pill */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mc text-xs font-bold mb-3 shadow-lg ${
                      isGold
                        ? 'bg-[#FFDF00] text-black'
                        : isPink
                        ? 'bg-[#EF007E] text-white'
                        : 'bg-gray-300 text-black'
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-[#141420] border-2 border-white/20 p-1.5 mb-3 overflow-hidden shadow-lg">
                    <img
                      src="./assets/profile_skin.png"
                      alt={player.username}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/logo.png';
                      }}
                    />
                  </div>

                  <h4 className="text-xl font-black font-heading text-white">
                    {player.username}
                  </h4>

                  <div className="text-2xl font-black font-heading text-[#FFDF00] mt-1">
                    {player.score}
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {player.subValue}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full List Table */}
          <div className="bg-[#0B0B11] border border-[#1E1E2C] rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-[#1A1A26] flex items-center justify-between">
              <h4 className="font-heading font-bold text-white text-sm">
                Full Contender Standings
              </h4>
              <span className="text-xs text-gray-400 font-mono">
                {leaderboardsData[activeLeaderboard].length} Players Tracked
              </span>
            </div>

            <div className="divide-y divide-[#161622]">
              {leaderboardsData[activeLeaderboard].map((player) => (
                <div
                  key={player.username}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mc text-xs w-6 text-gray-400">
                      #{player.rank}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#141420] border border-[#242436] p-0.5 overflow-hidden shrink-0">
                      <img
                        src="./assets/profile_skin.png"
                        alt={player.username}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = './assets/logo.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white text-sm">
                        {player.username}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {player.subValue}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-heading font-bold text-[#FFDF00] text-base">
                      {player.score}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase font-mono">
                      {player.metricLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Add Player Modal (for testing / editing state) */}
      {showAddPlayerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setShowAddPlayerModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#0D0D14] border border-[#2A2A3D] rounded-2xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              Add Player to Leaderboard
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Directly appends into the active React state leaderboard ({activeLeaderboard}).
            </p>

            <form onSubmit={handleAddPlayer} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Player In-Game Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EnderGod_01"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Primary Score Metric
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 950 Kills or 320 hrs"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Sub-detail / Weapon / Streak
                </label>
                <input
                  type="text"
                  placeholder="e.g. K/D: 4.1 · Netherite Sword"
                  value={newSubValue}
                  onChange={(e) => setNewSubValue(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#141420] border border-[#27273C] rounded-xl text-white text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlayerModal(false)}
                  className="flex-1 py-2 px-4 rounded-xl border border-[#28283C] text-gray-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 rounded-xl bg-[#EF007E] hover:bg-[#d60070] text-white text-xs font-bold font-heading shadow-lg shadow-[#EF007E]/30"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
