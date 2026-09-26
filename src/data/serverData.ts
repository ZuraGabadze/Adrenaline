import { RankPerk, StaffMember, LeaderboardPlayer, PurchaseHistoryItem, UserAccount } from '../types';

export const SERVER_CONFIG = {
  ip: 'Adrenalinee.run',
  ping: '60 ms',
  discordUrl: 'https://discord.gg/h8nRhE3HyH',
  ticketUrl: 'https://discord.gg/FXnCWMNp37',
  season: 'SEASON 1',
  version: '1.21.8',
  currencyName: 'GEL',
  currencySymbol: '₾',
};

export const RANKS_DATA: RankPerk[] = [
  {
    id: 'vip',
    name: 'VIP',
    price: '6,99₾',
    period: '1 Month Access',
    icon: './assets/ranks/vip.png',
    themeColor: '#22c55e',
    tagline: 'Essential survival commands & starter supply crate kit.',
    buyUrl: 'https://tiny.keepz.me/45m6pfpe',
    commands: ['/hat', '/craft', '/disposal', '/helpop', '/feed'],
    kits: ['VIP'],
    exclusiveFeatures: [
      'VIP Green In-Game Chat Prefix',
      'Priority Help From the STAFF',
      '1x VIP Monthly Crate Key',
      '+1 Extra Home Location (/sethome)'
    ]
  },
  {
    id: 'vip_plus',
    name: 'VIP+',
    price: '14,99₾',
    period: '1 Month Access',
    icon: './assets/ranks/vip_plus.png',
    themeColor: '#10b981',
    tagline: 'Portable workbenches, portable enderchest & upgraded kit.',
    buyUrl: 'https://tiny.keepz.me/4wc72r7y',
    commands: [
      'All VIP Commands',
      '/ec',
      '/smithingtable',
      '/anvil',
      '/grindstone'
    ],
    kits: ['VIP', 'VIP+'],
    exclusiveFeatures: [
      'VIP+ Emerald In-Game Chat Prefix',
      'Instant Portable Crafting & Anvil',
      'Priority Help From the STAFF',
      '+2 Extra Home Locations (/sethome)',
      'Instant Auto-Smelt Toggle (/autosmelt)'
    ]
  },
  {
    id: 'mvp',
    name: 'MVP',
    price: '24,99₾',
    period: '1 Month Access',
    icon: './assets/ranks/mvp.png',
    themeColor: '#06b6d4',
    popular: true,
    tagline: 'Combat healing, item repair, flight in claims & MVP perks.',
    buyUrl: 'https://tiny.keepz.me/h4jtpcyb',
    commands: [
      'All VIP+ Commands',
      '/heal',
      '/repair',
      '/ie rename',
      '/fly'
    ],
    kits: ['VIP', 'VIP+', 'MVP'],
    exclusiveFeatures: [
      'MVP Cyan Bold In-Game Prefix',
      'Flying Permission (/fly)',
      'Free Item Repair Hand (/repair)',
      'Priority Help From the STAFF',
      '+4 Extra Home Locations'
    ]
  },
  {
    id: 'mvp_plus',
    name: 'MVP+',
    price: '36,99₾',
    period: '1 Month Access',
    icon: './assets/ranks/mvp_plus.png',
    themeColor: '#EF007E', // Primary Pink
    bestValue: true,
    tagline: 'Full inventory peek, all-item repair, custom lore & neon pink flair.',
    buyUrl: 'https://tiny.keepz.me/pduh48aa',
    commands: [
      'All MVP Commands',
      '/invsee',
      '/chatcolor',
      '/repair all',
      '/ie lore'
    ],
    kits: ['VIP', 'VIP+', 'MVP', 'MVP+'],
    exclusiveFeatures: [
      'MVP+ Neon Pink Glowing Prefix',
      'Full Inventory Peeking (/invsee)',
      'Complete Armor & Inventory Repair (/repair all)',
      'Custom Item Lore & Name Designer',
      'Priority Help From the STAFF',
      '+6 Extra Home Locations'
    ]
  },
  {
    id: 'sponsor',
    name: 'SPONSOR',
    price: '62,99₾',
    period: '1 Month Access',
    icon: './assets/ranks/sponsor.png',
    themeColor: '#FFDF00', // Gold
    tagline: 'Ultimate supreme privileges, weather & time mastery, pure gold status.',
    buyUrl: 'https://tiny.keepz.me/4b6hxk8s',
    commands: [
      'All MVP+ Commands',
      '/tpahere',
      '/weather',
      '/time set',
      '/socialspy'
    ],
    kits: ['VIP', 'VIP+', 'MVP', 'MVP+', 'SPONSOR'],
    exclusiveFeatures: [
      'SPONSOR Golden Supreme Crown Prefix',
      'Personal Weather & Time Control',
      'Teleport Here Request (/tpahere)',
      'Social Spy Inspection Mode (/socialspy)',
      'Priority Help From the STAFF',
      'Unlimited Home Locations',
      'Special Discord Supreme Sponsor Role'
    ]
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'chabskeyyy',
    name: 'CHABSKEYYY',
    role: 'Founder & Owner',
    discord: 'chabskeyyyy',
    avatarSeed: 'chabskeyyy',
    description: 'Visionary founder directing server vision, community events, and economic balance.'
  },
  {
    id: 'saito',
    name: 'Saito',
    role: 'Founder & Owner',
    discord: 'ryota52_',
    avatarSeed: 'saito',
    description: 'Co-founder managing technical infrastructure, partnerships, and high-stakes tournaments.'
  },
  {
    id: 'jajo_1121',
    name: 'Jajo_1121',
    role: 'SR.DEVELOPER',
    discord: 'Ankaadev',
    badge: 'Java Plugins/Backend',
    avatarSeed: 'jajo',
    description: 'Lead architect of custom Paper/Purpur plugins, anti-cheat tuning, and low-latency netcode.'
  },
  {
    id: 'kaulmc',
    name: 'KaulMc',
    role: 'DEVELOPER',
    discord: 'kaulavar',
    avatarSeed: 'kaulmc',
    description: 'Gameplay system engineer overseeing dungeons, custom enchants, and item progression.'
  },
  {
    id: 'doxxedelements',
    name: 'DoxxedElements',
    role: 'ADMIN',
    discord: 'ccxzfiled',
    avatarSeed: 'doxxed',
    description: 'Senior administrator leading in-game player moderation, ticket dispute review, and anti-griefing.'
  },
  {
    id: 'consol',
    name: 'CONSOL',
    role: 'ADMIN',
    discord: 'gukson0864',
    avatarSeed: 'consol',
    description: 'Operational administrator maintaining discord moderation, server rules compliance, and player onboarding.'
  }
];

export const SERVER_RULES = [
  {
    category: '1. General Conduct & Community',
    rules: [
      { id: '1.1', title: 'Respectful Communication', desc: 'No toxic harassment, discrimination, slurs, doxxing, or hate speech in global chat, private messages, or Discord.' },
      { id: '1.2', title: 'Spamming & Advertising', desc: 'Do not flood chat with repetitive messages, uppercase spam, or advertise other Minecraft servers, Discord guilds, or websites.' },
      { id: '1.3', title: 'Staff Impersonation', desc: 'Pretending to be staff, faking administrative authority, or lying to moderators will lead to an immediate ban.' }
    ]
  },
  {
    category: '2. Combat & Fair Play Integrity',
    rules: [
      { id: '2.1', title: 'No Hacked Clients or Modifications', desc: 'Strictly zero tolerance for Killaura, Speed, Fly, Auto-Totem, Baritone, or any unauthorized injection.' },
      { id: '2.2', title: 'X-Ray & ESP Prohibited', desc: 'Using X-ray texture packs, cave finders, or entity radars will result in complete inventory wipe and permanent ban.' },
      { id: '2.3', title: 'Combat Logging & Glitching', desc: 'Disconnecting while tagged in PvP combat triggers instant death and drops all items. Exploiting hitboxes is forbidden.' }
    ]
  },
  {
    category: '3. SMP Claiming & Raiding Ethics',
    rules: [
      { id: '3.1', title: 'Claim Griefing Limits', desc: 'Lava-casting, surrounding claims with unmineable obsidian walls, or lag machine creation is strictly banned.' },
      { id: '3.2', title: 'Fair Raiding Guidelines', desc: 'Unclaimed bases may be raided, but intentional server-wide map degradation, chunk breaking, or griefing wild spawns is prohibited.' },
      { id: '3.3', title: 'Land Claim Disputes', desc: 'Overlapping or claiming adjacent blocks solely to block another player’s expansion will be removed by staff.' }
    ]
  },
  {
    category: '4. Economy, Trading & Exploits',
    rules: [
      { id: '4.1', title: 'No Real-World Trading (RWT)', desc: 'Trading in-game items, currency, or claims for real money outside the official Adrenaline store is forbidden.' },
      { id: '4.2', title: 'Bug Reporting & Zero Duping', desc: 'Any item duplication glitch or economy exploit must be immediately reported to staff via a Discord ticket. Exploiting results in a hardware ban.' },
      { id: '4.3', title: 'Scamming in Protected Trades', desc: 'Scamming during staff-moderated auction transactions or designated trade post regions is punishable by forfeiture.' }
    ]
  }
];

export const LEADERBOARDS: Record<'killers' | 'playtime' | 'seasonsBest', LeaderboardPlayer[]> = {
  killers: [
    { rank: 1, username: 'VortexSlayer', score: '1,482 Kills', metricLabel: 'Player Kills', subValue: 'K/D: 6.84 · Netherite Axe', avatarSeed: 'vortex', tier: 'gold' },
    { rank: 2, username: 'NightBlade_MC', score: '1,295 Kills', metricLabel: 'Player Kills', subValue: 'K/D: 5.12 · Crystal PvP', avatarSeed: 'nightblade', tier: 'pink' },
    { rank: 3, username: 'CrimsonPhantom', score: '1,120 Kills', metricLabel: 'Player Kills', subValue: 'K/D: 4.75 · Sharpness VI', avatarSeed: 'crimson', tier: 'silver' },
    { rank: 4, username: 'FrostBite_99', score: '840 Kills', metricLabel: 'Player Kills', subValue: 'K/D: 3.91 · Bow Sniper', avatarSeed: 'frost', tier: 'standard' },
    { rank: 5, username: 'ShadowRift', score: '715 Kills', metricLabel: 'Player Kills', subValue: 'K/D: 3.20 · Sword Master', avatarSeed: 'shadow', tier: 'standard' }
  ],
  playtime: [
    { rank: 1, username: 'PixelArchitect', score: '428 hrs', metricLabel: 'Total Active Playtime', subValue: 'Streak: 64 Days · 1,120 Logins', avatarSeed: 'pixel', tier: 'gold' },
    { rank: 2, username: 'EnderNomad', score: '382 hrs', metricLabel: 'Total Active Playtime', subValue: 'Streak: 51 Days · 980 Logins', avatarSeed: 'ender', tier: 'pink' },
    { rank: 3, username: 'RedstoneMechanic', score: '344 hrs', metricLabel: 'Total Active Playtime', subValue: 'Streak: 43 Days · 850 Logins', avatarSeed: 'redstone', tier: 'silver' },
    { rank: 4, username: 'BlockCrafter_X', score: '290 hrs', metricLabel: 'Total Active Playtime', subValue: 'Streak: 32 Days · 620 Logins', avatarSeed: 'crafter', tier: 'standard' },
    { rank: 5, username: 'TitanGuard', score: '265 hrs', metricLabel: 'Total Active Playtime', subValue: 'Streak: 28 Days · 510 Logins', avatarSeed: 'titan', tier: 'standard' }
  ],
  seasonsBest: [
    { rank: 1, username: 'Aegis_Supreme', score: '98,400 pts', metricLabel: 'Season SMP Rating', subValue: 'Rank: SPONSOR · 12 Boss Trophies', avatarSeed: 'aegis', tier: 'gold' },
    { rank: 2, username: 'ZephyrRuler', score: '87,150 pts', metricLabel: 'Season SMP Rating', subValue: 'Rank: MVP+ · 9 Boss Trophies', avatarSeed: 'zephyr', tier: 'pink' },
    { rank: 3, username: 'ObsidianKnight', score: '76,900 pts', metricLabel: 'Season SMP Rating', subValue: 'Rank: MVP · 8 Boss Trophies', avatarSeed: 'obsidian', tier: 'silver' },
    { rank: 4, username: 'LuminSky', score: '62,400 pts', metricLabel: 'Season SMP Rating', subValue: 'Rank: VIP+ · 6 Boss Trophies', avatarSeed: 'lumin', tier: 'standard' },
    { rank: 5, username: 'DuskReaper', score: '54,200 pts', metricLabel: 'Season SMP Rating', subValue: 'Rank: VIP · 4 Boss Trophies', avatarSeed: 'dusk', tier: 'standard' }
  ]
};

export const INITIAL_USER: UserAccount = {
  inGameName: 'AdrenalineHero',
  email: 'player@adrenalinesmp.net',
  phone: '+995 599 123 456',
  discordId: 'adrenaline_hero#1337',
  serverRank: 'MVP+',
  avatarUrl: './assets/profile_skin.png',
  joinedDate: 'Season 1 (1.21.8)',
  age: 19
};

export const INITIAL_PURCHASES: PurchaseHistoryItem[] = [
  {
    id: 'ADR-89241',
    rankName: 'MVP+',
    price: '36,99₾',
    date: '2026-09-18',
    status: 'DELIVERED',
    invoiceName: 'receipt_invoice_adr892.pdf',
    minecraftName: 'AdrenalineHero',
    discordId: 'adrenaline_hero#1337'
  },
  {
    id: 'ADR-51104',
    rankName: 'VIP+',
    price: '14,99₾',
    date: '2026-08-04',
    status: 'DELIVERED',
    invoiceName: 'invoice_vip_upgrade.png',
    minecraftName: 'AdrenalineHero',
    discordId: 'adrenaline_hero#1337'
  }
];
