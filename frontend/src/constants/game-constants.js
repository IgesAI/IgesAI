export const ELEMENTS = {
  FIRE: {
    name: 'Fire',
    color: 'text-red-400',
    icon: '🔥',
    bonus: 'Critical hits cause burn damage',
    weakness: 'ICE',
    description: 'Powerful attacks with burn effects'
  },
  ICE: {
    name: 'Ice',
    color: 'text-blue-300',
    icon: '❄️',
    bonus: 'Chance to freeze opponent',
    weakness: 'LIGHTNING',
    description: 'Defensive with crowd control'
  },
  LIGHTNING: {
    name: 'Lightning',
    color: 'text-yellow-400',
    icon: '⚡',
    bonus: 'Increased combo multiplier',
    weakness: 'FIRE',
    description: 'Fast attacks with chain potential'
  },
  COSMIC: {
    name: 'Cosmic',
    color: 'text-purple-400',
    icon: '🌌',
    bonus: 'Ignores armor',
    weakness: null,
    description: 'Rare element that pierces defenses'
  }
};

export const COMBO_MULTIPLIERS = {
  2: { multiplier: 1.2, text: 'Nice! 🎯', color: 'text-green-400' },
  3: { multiplier: 1.5, text: 'Awesome! 🔥', color: 'text-blue-400' },
  4: { multiplier: 2.0, text: 'Incredible! ⚡', color: 'text-purple-400' },
  5: { multiplier: 2.5, text: 'UNSTOPPABLE! 💫', color: 'text-yellow-400' }
};

export const SPECIAL_MOVES = {
  DIAMOND_HANDS: {
    name: 'Diamond Hands Slam',
    icon: '💎',
    color: 'text-blue-400',
    description: 'A powerful attack that scales with held assets',
    trigger: (stats) => stats.strength > 80,
    effect: (damage) => damage * 1.8
  },
  PAPER_HANDS: {
    name: 'Paper Cut Fury',
    icon: '📜',
    color: 'text-yellow-400',
    description: 'Quick successive attacks with increasing damage',
    trigger: (stats) => stats.agility > 80,
    effect: (damage, combo) => damage * (1 + (combo * 0.3))
  },
  WHALE_SPLASH: {
    name: 'Whale Splash',
    icon: '🐋',
    color: 'text-purple-400',
    description: 'Massive area damage with splash effect',
    trigger: (stats) => stats.vitality > 80,
    effect: (damage) => ({ primary: damage * 1.5, splash: damage * 0.5 })
  }
};

export const BATTLE_QUOTES = {
  CRITICAL: [
    { text: "Critical strike!", icon: "⚡" },
    { text: "Devastating hit!", icon: "💥" },
    { text: "Perfect execution!", icon: "✨" }
  ],
  COMBO: [
    { text: "Combo breaker!", icon: "🔥" },
    { text: "Unstoppable!", icon: "💫" },
    { text: "Dominating!", icon: "⚔️" }
  ],
  SPECIAL: [
    { text: "Special move activated!", icon: "✨" },
    { text: "Ultimate power!", icon: "💪" },
    { text: "Witness true strength!", icon: "🌟" }
  ]
}; 