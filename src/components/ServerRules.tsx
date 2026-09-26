import React, { useState } from 'react';
import { SERVER_RULES } from '../data/serverData';
import { ShieldAlert, BookOpen, Search, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ServerRules: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | 'ALL'>('ALL');

  const filteredCategories = SERVER_RULES.map((cat, idx) => {
    const matchingRules = cat.rules.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, index: idx, rules: matchingRules };
  }).filter((cat) => (activeCategory === 'ALL' || cat.index === activeCategory) && cat.rules.length > 0);

  return (
    <section id="server-rules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF007E]/10 border border-[#EF007E]/30 text-xs font-semibold text-[#EF007E] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>OFFICIAL SMP CODEX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
          SERVER <span className="text-[#EF007E]">RULES</span> & ETHICS
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
          Adrenaline SMP is built on high-skill competition and mutual respect. 
          Ignorance of the rules is not an excuse. Review our core regulations below.
        </p>

        {/* Filter bar & Search */}
        <div className="max-w-xl mx-auto pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search rules (e.g. X-ray, Griefing, Combat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F17] border border-[#232335] rounded-xl text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] transition-colors"
            />
          </div>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeCategory === 'ALL'
                ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                : 'bg-[#12121C] text-gray-400 hover:text-white border border-[#222234]'
            }`}
          >
            All Categories
          </button>
          {SERVER_RULES.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === idx
                  ? 'bg-[#EF007E] text-white shadow-md shadow-[#EF007E]/30'
                  : 'bg-[#12121C] text-gray-400 hover:text-white border border-[#222234]'
              }`}
            >
              {cat.category.split('. ')[1] || cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="space-y-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 bg-[#0C0C12] rounded-2xl border border-[#1E1E2C] text-gray-400">
            <AlertTriangle className="w-8 h-8 text-[#FFDF00] mx-auto mb-2" />
            <p className="font-heading font-semibold text-white">No rules matched your query</p>
            <p className="text-xs text-gray-500 mt-1">Try searching for keywords like "duping", "chat", or "pvp"</p>
          </div>
        ) : (
          filteredCategories.map((section) => (
            <div
              key={section.category}
              className="p-6 sm:p-8 rounded-3xl bg-[#0B0B11] border border-[#1F1F2F] hover:border-[#EF007E]/40 transition-all shadow-xl"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-[#1A1A28]">
                <div className="w-9 h-9 rounded-xl bg-[#EF007E]/10 border border-[#EF007E]/30 flex items-center justify-center text-[#EF007E] shrink-0 font-mc text-xs">
                  {section.index + 1}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                    {section.category}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Mandatory protocol enforced by automated detection and administrators
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                {section.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-5 rounded-2xl bg-[#101018] border border-[#202030] hover:border-[#FFDF00]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mc text-[#FFDF00]">
                          RULE §{rule.id}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400 opacity-80" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-sm mb-1.5">
                        {rule.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#181824] flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span>Violation Penalty:</span>
                      <span className="text-red-400 font-semibold">Ban / Rollback</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Staff Appeals Box */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#141420] via-[#0E0E16] to-[#141420] border border-[#26263B] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFDF00]/10 border border-[#FFDF00]/30 flex items-center justify-center text-[#FFDF00] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-sm">Need to dispute a punishment or report a player?</h4>
            <p className="text-xs text-gray-400">Open a ticket in the official Adrenaline Discord server for senior admin assistance.</p>
          </div>
        </div>
        <a
          href="https://discord.gg/FXnCWMNp37"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#26263B] hover:bg-[#32324C] text-white text-xs font-semibold font-heading transition-colors border border-[#3B3B54] shrink-0"
        >
          OPEN TICKET ON DISCORD
        </a>
      </div>

    </section>
  );
};
