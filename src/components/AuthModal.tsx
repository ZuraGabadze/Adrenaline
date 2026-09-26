import React, { useState } from 'react';
import { X, Lock, Mail, Phone, ShieldCheck, UserCheck, Sparkles, MessageSquare } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+995 ');
  const [inGameName, setInGameName] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Keep +995 prefix always intact
    if (!val.startsWith('+995')) {
      val = '+995 ';
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'REGISTER') {
      if (!inGameName.trim()) {
        setError('Please provide your Minecraft in-game name (IGN).');
        return;
      }
      if (!discordId.trim()) {
        setError('Please provide your Discord ID (e.g. username or user#0000).');
        return;
      }
    }

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (phone.trim() === '+995' || phone.trim().length < 8) {
      setError('Please provide a complete phone number (+995 ...).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const updatedUser: UserAccount = {
        inGameName: inGameName.trim() || (currentUser?.inGameName ?? 'AdrenalineWarrior'),
        email: email.trim(),
        phone: phone.trim(),
        discordId: discordId.trim() || (currentUser?.discordId ?? ''),
        serverRank: currentUser?.serverRank ?? 'MEMBER',
        avatarUrl: currentUser?.avatarUrl ?? './assets/profile_skin.png',
        joinedDate: currentUser?.joinedDate ?? 'Season 1 (1.21.8)',
        age: 18
      };

      onLoginSuccess(updatedUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0D0D14] border border-[#252538] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#EF007E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#FFDF00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* Already Logged In View */
          <div className="space-y-6 text-center pt-2">
            <div className="mx-auto w-16 h-16 rounded-full border-2 border-[#EF007E] p-1 bg-[#141420] shadow-lg flex items-center justify-center">
              <img
                src={currentUser.avatarUrl || './assets/profile_skin.png'}
                alt={currentUser.inGameName}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/profile_skin.png';
                }}
              />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded bg-[#FFDF00]/20 text-[#FFDF00] border border-[#FFDF00]/30 font-mc mb-2">
                {currentUser.serverRank}
              </span>
              <h3 className="text-xl font-bold font-heading text-white">
                {currentUser.inGameName}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{currentUser.email}</p>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{currentUser.phone}</p>
            </div>

            <div className="p-3 bg-[#12121D] rounded-xl border border-[#232338] text-xs text-gray-300 flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-[#EF007E]" />
              <span>Authentication Token Active (Adrenaline SMP Guard)</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 px-4 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#EF007E] hover:bg-[#d60070] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#EF007E]/30"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFDF00] tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Adrenaline Gate
              </div>
              <h2 className="text-2xl font-bold font-heading text-white">
                {mode === 'LOGIN' ? 'Sign In to SMP' : 'Create SMP Account'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Connect your Minecraft character, claim orders & track perks
              </p>

              {/* Mode Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#141422] rounded-xl border border-[#232338] mt-4">
                <button
                  type="button"
                  onClick={() => { setMode('LOGIN'); setError(null); }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'LOGIN'
                      ? 'bg-[#EF007E] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('REGISTER'); setError(null); }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'REGISTER'
                      ? 'bg-[#EF007E] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'REGISTER' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Minecraft In-Game Name (IGN)
                    </label>
                    <div className="relative">
                      <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. PixelWarrior99"
                        value={inGameName}
                        onChange={(e) => setInGameName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#141420] border border-[#26263B] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] focus:ring-1 focus:ring-[#EF007E] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                      <span>Discord ID</span>
                      <span className="text-[10px] text-[#5865F2] font-mono font-semibold">Required</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5865F2]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. username or user#0000"
                        value={discordId}
                        onChange={(e) => setDiscordId(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#141420] border border-[#26263B] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] focus:ring-1 focus:ring-[#EF007E] transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="player@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#141420] border border-[#26263B] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] focus:ring-1 focus:ring-[#EF007E] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#141420] border border-[#26263B] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF007E] focus:ring-1 focus:ring-[#EF007E] transition-colors"
                  />
                </div>
              </div>

              {/* Phone with pre-filled +995 country code */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                  <span>Phone Number</span>
                  <span className="text-[11px] text-[#FFDF00] font-mono">Georgia (+995)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+995 599 000 000"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#141420] border border-[#26263B] rounded-xl text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-[#EF007E] focus:ring-1 focus:ring-[#EF007E] transition-colors"
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Used for instant SMS invoice verification & 2FA support
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-[#EF007E] hover:bg-[#d60070] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#EF007E]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'LOGIN' ? 'Sign In Now' : 'Complete Registration'}</span>
                    <span className="text-[#FFDF00]">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
