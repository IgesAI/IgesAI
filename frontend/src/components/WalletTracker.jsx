import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import swordIcon from '../assets/icons/sword.svg';
import trophyIcon from '../assets/icons/trophy.svg';
import vsIcon from '../assets/icons/vs.svg';
import sparkleIcon from '../assets/icons/sparkle.svg';
import { Sword, Shield, Zap, Target, Crown, Skull } from 'lucide-react';
import { VictoryScreen } from './battle/VictoryScreen';
import { ErrorBoundary } from './ErrorBoundary';

const HELIUS_API_KEY = '04e64d89-dd3e-406d-b416-d9328e030d65';

const ELEMENTS = {
  FIRE: {
    name: 'Fire',
    color: 'text-red-400',
    icon: '🔥',
    bonus: 'Critical hits cause burn damage',
    weakness: 'ICE'
  },
  ICE: {
    name: 'Ice',
    color: 'text-blue-300',
    icon: '❄️',
    bonus: 'Chance to freeze opponent',
    weakness: 'LIGHTNING'
  },
  LIGHTNING: {
    name: 'Lightning',
    color: 'text-yellow-400',
    icon: '⚡',
    bonus: 'Increased combo multiplier',
    weakness: 'FIRE'
  },
  COSMIC: {
    name: 'Cosmic',
    color: 'text-purple-400',
    icon: '🌌',
    bonus: 'Ignores armor',
    weakness: null
  }
};

const COMBO_MULTIPLIERS = {
  2: { multiplier: 1.2, text: 'Nice! 🎯' },
  3: { multiplier: 1.5, text: 'Awesome! 🔥' },
  4: { multiplier: 2.0, text: 'Incredible! ⚡' },
  5: { multiplier: 2.5, text: 'UNSTOPPABLE! 💫' }
};

const WEAPONS = [
  { name: 'Diamond Sword', power: 25, rarity: 'Legendary', color: 'text-yellow-400', icon: '⚔️', element: ELEMENTS.FIRE },
  { name: 'Plasma Cannon', power: 20, rarity: 'Epic', color: 'text-purple-400', icon: '🔫', element: ELEMENTS.LIGHTNING },
  { name: 'Quantum Blade', power: 15, rarity: 'Rare', color: 'text-blue-400', icon: '🗡️', element: ELEMENTS.ICE },
  { name: 'Laser Pistol', power: 10, rarity: 'Common', color: 'text-green-400', icon: '🔫', element: ELEMENTS.LIGHTNING },
  { name: 'NFT Hammer', power: 30, rarity: 'Mythic', color: 'text-red-400', icon: '🔨', element: ELEMENTS.FIRE },
  { name: 'Meme Cannon', power: 22, rarity: 'Epic', color: 'text-purple-400', icon: '💫', element: ELEMENTS.COSMIC }
];

const ARMOR = [
  { name: 'Nano-Shield Matrix', defense: 20, rarity: 'Legendary', color: 'text-yellow-400', icon: '🛡️', element: ELEMENTS.FIRE },
  { name: 'Quantum Plate', defense: 15, rarity: 'Epic', color: 'text-purple-400', icon: '🔮', element: ELEMENTS.LIGHTNING },
  { name: 'Energy Shield', defense: 10, rarity: 'Rare', color: 'text-blue-400', icon: '✨', element: ELEMENTS.ICE },
  { name: 'Metal Armor', defense: 5, rarity: 'Common', color: 'text-green-400', icon: '🛡️', element: ELEMENTS.FIRE },
  { name: 'DeFi Forcefield', defense: 25, rarity: 'Mythic', color: 'text-red-400', icon: '⚡', element: ELEMENTS.COSMIC },
  { name: 'Blockchain Barrier', defense: 18, rarity: 'Epic', color: 'text-purple-400', icon: '🔲', element: ELEMENTS.LIGHTNING }
];

const TITLES = [
  'the Diamond Hand',
  'the Degen',
  'the Moon Shooter',
  'the Whale Hunter',
  'the Paper Hand',
  'the Rug Puller',
  'the Based',
  'the Unstoppable',
  'the Liquidator',
  'the Alpha Seeker'
];

const NAMES = [
  'Satoshi',
  'Vitalik',
  'Diamond Dave',
  'Paper Pete',
  'Moon Mary',
  'Degen Dan',
  'Whale Wanda',
  'Trader Tim',
  'Crypto Chad',
  'Blockchain Bob',
  'Hodler Helen',
  'NFT Nancy',
  'Miner Mike',
  'Staker Steve',
  'DeFi Diana',
  'Yield Yvette',
  'Liquidator Larry',
  'Rug-Pull Randy',
  'Gas-Fee Gary',
  'Airdrop Alice'
];

const BATTLE_QUOTES = {
  entrance: [
    "Ready to battle on-chain! 🔗",
    "May the best wallet win! 💼",
    "Battle of the blocks! 🟦",
    "Time for some blockchain combat! ⚔️",
    "Let's see who's the crypto champion! 👑",
    "Prepare for a digital duel! 🎮",
    "Show me what your wallet can do! 💫",
    "It's battle time! ⚡"
  ],
  critical: [
    "Devastating hit! 💥",
    "That's gonna leave a mark! 🎯",
    "Critical strike! ⚡",
    "Perfect execution! 🎪",
    "Massive damage! 💫",
    "What a move! 🌟",
    "Incredible strike! ✨",
    "Epic hit! 🔥"
  ],
  victory: [
    "A legendary victory! 👑",
    "The blockchain has spoken! ⚡",
    "Victory secured! 🏆",
    "An epic conclusion! 🌟",
    "The winner is crowned! 👑",
    "A battle for the ages! 💫",
    "Glory achieved! ✨",
    "Champion of the chain! 🔥"
  ]
};

const SPECIAL_MOVES = {
  DIAMOND_COMBO: {
    name: 'Diamond Hands Slam',
    trigger: (equipment) => equipment.weapon.name.includes('Diamond') && equipment.armor.name.includes('DeFi'),
    effect: (damage) => damage * 1.5,
    animation: '💎💥',
    quote: "HODL THIS!"
  },
  MEME_POWER: {
    name: 'Meme Magic',
    trigger: (equipment) => equipment.weapon.name.includes('Meme'),
    effect: (damage) => Math.random() > 0.5 ? damage * 2 : damage * 0.5,
    animation: '🚀💫',
    quote: "To the moon!"
  },
  WHALE_SPLASH: {
    name: 'Whale Splash',
    trigger: (equipment) => equipment.weapon.power > 25,
    effect: (damage) => damage * 1.3,
    animation: '🐋💦',
    quote: "Making waves!"
  },
  DEGEN_YOLO: {
    name: 'Degen YOLO',
    trigger: (equipment) => equipment.title.includes('Degen'),
    effect: (damage) => Math.random() > 0.7 ? damage * 3 : damage * 0.3,
    animation: '🎲💫',
    quote: "Sir, this is a casino!"
  }
};

const calculateLevel = (stats) => {
  const xp = stats.strength + stats.agility + stats.vitality + stats.intelligence;
  return {
    level: Math.floor(xp / 50) + 1,
    xp,
    nextLevel: (Math.floor(xp / 50) + 1) * 50
  };
};

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }

      if (response.status === 429) {
        // Rate limit hit - wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      throw new Error(`API Error: ${response.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

const fetchTransactions = async (address) => {
  try {
    console.log('Fetching transactions for:', address);
    
    const data = await fetchWithRetry(
      `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from API');
    }

    return data;
  } catch (err) {
    console.error('Error fetching transactions:', err);
    // Add more specific error messages
    if (err.message.includes('500')) {
      throw new Error('Unable to fetch wallet data. The wallet might be invalid or have too many transactions.');
    }
    throw err;
  }
};

const isValidTransaction = (tx) => {
  return tx && 
    typeof tx === 'object' && 
    typeof tx.signature === 'string' &&
    typeof tx.timestamp === 'number' &&
    Array.isArray(tx.nativeTransfers);
};

const processTransactionAnalytics = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    console.warn('No transactions to process');
    return null;
  }

  const validTransactions = transactions.filter(isValidTransaction);
  if (validTransactions.length === 0) {
    console.warn('No valid transactions found');
    return null;
  }

  try {
    // Process volume data with proper date formatting and validation
    const volumeData = transactions.reduce((acc, tx) => {
      if (!tx?.timestamp) return acc;

      try {
        const timestamp = tx.timestamp * 1000; // Convert to milliseconds
        if (isNaN(timestamp)) {
          console.warn('Invalid timestamp:', tx.timestamp);
          return acc;
        }

        const date = new Date(timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        const amount = tx.nativeTransfers?.[0]?.amount || 0;
        acc[date] = (acc[date] || 0) + amount;
        return acc;
      } catch (err) {
        console.warn('Error processing transaction:', err);
        return acc;
      }
    }, {});

    // Add timeRanges calculation
    const now = Date.now();
    const timeRanges = {
      day: now - 24 * 60 * 60 * 1000,
      week: now - 7 * 24 * 60 * 60 * 1000,
      month: now - 30 * 24 * 60 * 60 * 1000
    };

    // Calculate metrics with proper validation
    const metrics = {
      totalTransactions: transactions.length,
      recentActivity: {
        last24h: transactions.filter(tx => (tx.timestamp * 1000) >= timeRanges.day).length,
        lastWeek: transactions.filter(tx => (tx.timestamp * 1000) >= timeRanges.week).length,
        lastMonth: transactions.filter(tx => (tx.timestamp * 1000) >= timeRanges.month).length
      },
      volume: {
        total: transactions.reduce((sum, tx) => sum + (tx.nativeTransfers?.[0]?.amount || 0), 0) / 1e9,
        average: (transactions.reduce((sum, tx) => sum + (tx.nativeTransfers?.[0]?.amount || 0), 0) / transactions.length) / 1e9
      },
      successRate: (transactions.filter(tx => tx.successful).length / transactions.length) * 100
    };

    return {
      metrics,
      chartData: Object.entries(volumeData)
        .map(([date, volume]) => ({
          date,
          volume: volume / 1e9
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  } catch (error) {
    console.error('Error processing analytics:', error);
    return null;
  }
};

const TransactionAnalytics = React.memo(({ analytics }) => {
  // Add better null checks and error handling
  if (!analytics?.metrics || !analytics?.chartData) {
    console.warn('Invalid analytics data:', analytics);
    return (
      <div className="text-center text-blue-400/60 p-4">
        Loading wallet data...
      </div>
    );
  }

  const { metrics, chartData } = analytics;

  try {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-navy-900/50 p-6 rounded-xl border border-blue-500/20">
            <div className="text-blue-400/60 text-sm">Total Transactions</div>
            <div className="text-2xl font-bold text-blue-100">{metrics.totalTransactions}</div>
          </div>
          <div className="bg-navy-900/50 p-6 rounded-xl border border-blue-500/20">
            <div className="text-blue-400/60 text-sm">24h Activity</div>
            <div className="text-2xl font-bold text-blue-100">{metrics.recentActivity.last24h}</div>
          </div>
          <div className="bg-navy-900/50 p-6 rounded-xl border border-blue-500/20">
            <div className="text-blue-400/60 text-sm">Total Volume</div>
            <div className="text-2xl font-bold text-blue-100">{metrics.volume.total.toFixed(2)} SOL</div>
          </div>
          <div className="bg-navy-900/50 p-6 rounded-xl border border-blue-500/20">
            <div className="text-blue-400/60 text-sm">Success Rate</div>
            <div className="text-2xl font-bold text-blue-100">{metrics.successRate.toFixed(1)}%</div>
          </div>
        </div>

        {/* Volume Chart */}
        {chartData?.length > 1 && (
          <div className="bg-navy-900/50 p-6 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#60a5fa" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#60a5fa" 
                    fontSize={12}
                    label={{ value: 'Volume (SOL)', angle: -90, position: 'insideLeft', fill: '#60a5fa' }}
                  />
                  <Tooltip 
                    contentStyle={{ background: '#0f172a', border: '1px solid #1d4ed8' }}
                    labelStyle={{ color: '#60a5fa' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#60a5fa' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </motion.div>
    );
  } catch (error) {
    console.error('Error rendering analytics:', error);
    return (
      <div className="text-center text-red-400 p-4">
        Error displaying wallet data. Please try again.
      </div>
    );
  }
});

// Add RPG-style wallet class determination
const determineWalletClass = (analytics) => {
  const { metrics } = analytics;
  const totalVolume = metrics.volume.total;
  const txCount = metrics.totalTransactions;
  
  if (totalVolume > 100 && txCount > 50) {
    return {
      class: 'Whale Lord',
      icon: Crown,
      color: 'text-yellow-400',
      description: 'A powerful entity wielding massive market influence'
    };
  } else if (totalVolume > 50) {
    return {
      class: 'Market Knight',
      icon: Sword,
      color: 'text-blue-400',
      description: 'Skilled trader with significant market presence'
    };
  } else if (txCount > 30) {
    return {
      class: 'Swift Merchant',
      icon: Zap,
      color: 'text-purple-400',
      description: 'Quick and agile trader focused on frequent transactions'
    };
  } else {
    return {
      class: 'Crypto Scout',
      icon: Target,
      color: 'text-green-400',
      description: 'An emerging player in the crypto realm'
    };
  }
};

// First, let's improve the RPG stats calculation to better reflect wallet performance
const calculateRPGStats = (wallet, equipment) => {
  const { metrics } = wallet.analytics;
  
  // More dynamic base stats calculation
  const baseStats = {
    // Strength based on total volume
    strength: Math.min(Math.floor(metrics.volume.total * 0.4), 100),
    
    // Agility based on transaction count and recent activity
    agility: Math.min(Math.floor((metrics.totalTransactions + metrics.recentActivity.last24h) * 0.5), 100),
    
    // Vitality based on success rate and transaction consistency
    vitality: Math.min(Math.floor(
      (metrics.successRate * 0.5) + 
      (metrics.recentActivity.lastWeek / metrics.totalTransactions * 50)
    ), 100),
    
    // Intelligence based on transaction complexity and recent activity
    intelligence: Math.min(Math.floor(
      (metrics.recentActivity.last24h * 2) + 
      (metrics.successRate * 0.3)
    ), 100),
    
    // Luck based on average transaction size and success streaks
    luck: Math.min(Math.floor(
      (metrics.volume.average * 3) + 
      (metrics.successRate * 0.5) +
      (metrics.recentActivity.lastMonth > 0 ? 20 : 0)
    ), 100)
  };

  // Calculate equipment bonuses
  const weaponBonus = equipment.weapon.rarity === 'Legendary' ? 1.5 :
                     equipment.weapon.rarity === 'Epic' ? 1.3 :
                     equipment.weapon.rarity === 'Rare' ? 1.2 : 1;

  const armorBonus = equipment.armor.rarity === 'Legendary' ? 1.5 :
                    equipment.armor.rarity === 'Epic' ? 1.3 :
                    equipment.armor.rarity === 'Rare' ? 1.2 : 1;

  // Add some randomness to make each battle unique
  const randomFactor = 0.8 + (Math.random() * 0.4); // Random factor between 0.8 and 1.2

  // Enhanced stats with equipment and randomness
  return {
    ...baseStats,
    attack: Math.floor((baseStats.strength * weaponBonus + equipment.weapon.power) * randomFactor),
    defense: Math.floor((baseStats.vitality * armorBonus + equipment.armor.defense) * randomFactor),
    criticalChance: (baseStats.intelligence * 0.01 + baseStats.luck * 0.005) * randomFactor,
    dodgeChance: baseStats.agility * 0.01 * randomFactor,
    equipment
  };
};

// Update the simulateBattle function to have more rounds
const simulateBattle = (wallet1Stats, wallet2Stats) => {
  let health1 = 150 + (wallet1Stats.vitality * 0.8);
  let health2 = 150 + (wallet2Stats.vitality * 0.8);
  const maxHealth1 = health1;
  const maxHealth2 = health2;
  const battleLog = [];
  let wallet1Combo = 0;
  let wallet2Combo = 0;

  // Add healing chance based on intelligence
  const tryHeal = (attacker, currentHealth, maxHealth) => {
    const healChance = attacker.intelligence * 0.01;
    if (Math.random() < healChance && currentHealth < maxHealth) {
      const healAmount = Math.floor(attacker.intelligence * 0.5);
      return Math.min(maxHealth, currentHealth + healAmount);
    }
    return currentHealth;
  };

  // Attack function
  const attack = (attacker, defender, combo) => {
    // Dodge check
    if (Math.random() < defender.dodgeChance) {
      return {
        damage: 0,
        isDodge: true,
        isCritical: false,
        combo: 0
      };
    }

    let damage = Math.max(
      5,
      Math.floor((attacker.attack * (1 + attacker.agility/100)) - 
      (defender.defense * (1 + defender.vitality/100)))
    );

    // Elemental damage
    if (attacker.equipment.weapon.element?.weakness === defender.equipment.weapon.element?.name) {
      damage *= 1.5;
      battleLog.push({
        type: 'element',
        text: `${attacker.equipment.weapon.element.icon} Elemental Advantage!`
      });
    }

    // Critical hit check
    const criticalRoll = Math.random();
    const isCritical = criticalRoll < attacker.criticalChance + (combo * 0.05);
    
    // Apply combo multiplier
    const comboMultiplier = COMBO_MULTIPLIERS[combo] || { multiplier: 1 };
    damage *= comboMultiplier.multiplier;

    // Special move check
    const specialMove = Object.values(SPECIAL_MOVES).find(move => 
      move.trigger(attacker.equipment)
    );

    if (specialMove) {
      damage = specialMove.effect(damage);
    }

    let finalDamage = isCritical ? damage * (1.5 + (combo * 0.2)) : damage;
    const luckVariance = 1 + ((attacker.luck - 50) / 100);
    finalDamage *= luckVariance;

    return {
      damage: Math.floor(finalDamage),
      isCritical,
      isDodge: false,
      combo: isCritical ? combo + 1 : 0,
      specialMove,
      comboText: comboMultiplier.text
    };
  };

  // Battle simulation
  for (let round = 1; round <= 8; round++) {
    battleLog.push({ 
      type: 'round', 
      text: `Round ${round}!`,
      health1,
      health2
    });

    // Initiative check based on agility
    const wallet1First = Math.random() < wallet1Stats.agility / (wallet1Stats.agility + wallet2Stats.agility);
    
    // Process both turns with initiative order
    const turns = wallet1First ? 
      [[wallet1Stats, wallet2Stats, 1, 2], [wallet2Stats, wallet1Stats, 2, 1]] :
      [[wallet2Stats, wallet1Stats, 2, 1], [wallet1Stats, wallet2Stats, 1, 2]];

    for (const [attacker, defender, attackerNum, defenderNum] of turns) {
      // Healing phase
      const beforeHealth = attackerNum === 1 ? health1 : health2;
      const maxHealth = attackerNum === 1 ? maxHealth1 : maxHealth2;
      const afterHealth = tryHeal(attacker, beforeHealth, maxHealth);
      
      if (afterHealth > beforeHealth) {
        if (attackerNum === 1) health1 = afterHealth;
        else health2 = afterHealth;
        
        battleLog.push({
          type: 'heal',
          attacker: `Wallet ${attackerNum}`,
          amount: afterHealth - beforeHealth,
          text: `${attacker.equipment.name} recovers ${Math.floor(afterHealth - beforeHealth)} HP!`,
          health1,
          health2
        });
      }

      // Attack phase
      const attackResult = attack(attacker, defender, attackerNum === 1 ? wallet1Combo : wallet2Combo);
      
      if (attackerNum === 1) wallet1Combo = attackResult.combo;
      else wallet2Combo = attackResult.combo;

      if (attackResult.isDodge) {
        battleLog.push({
          type: 'dodge',
          attacker: `Wallet ${attackerNum}`,
          defender: `Wallet ${defenderNum}`,
          text: `${defender.equipment.name} dodges ${attacker.equipment.name}'s attack! 💨`,
          health1,
          health2
        });
      } else {
        if (defenderNum === 1) health1 -= attackResult.damage;
        else health2 -= attackResult.damage;

        battleLog.push({
          type: 'attack',
          attacker: `Wallet ${attackerNum}`,
          defender: `Wallet ${defenderNum}`,
          damage: attackResult.damage,
          isCritical: attackResult.isCritical,
          specialMove: attackResult.specialMove,
          comboText: attackResult.comboText,
          attackerName: attacker.equipment.name,
          defenderName: defender.equipment.name,
          health1,
          health2
        });
      }

      // Check for defeat
      if (health1 <= 0 || health2 <= 0) break;
    }

    // Add dramatic pause between rounds
    battleLog.push({ type: 'pause', duration: 1000 });

    // End battle if someone is defeated
    if (health1 <= 0 || health2 <= 0) break;
  }

  return {
    winner: health1 > health2 ? 1 : 2,
    health1: Math.max(0, health1),
    health2: Math.max(0, health2),
    battleLog,
    finalCombo1: wallet1Combo,
    finalCombo2: wallet2Combo
  };
};

// First, move the HealthBar component definition before it's used
const HealthBar = ({ current, max, name, color }) => {
  // Calculate health percentage and ensure it's a valid number
  const healthPercent = max > 0 ? Math.max(0, Math.min((current / max) * 100, 100)) : 0;

  return (
    <motion.div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`font-bold ${color}`}>{name}</span>
        <span className={`${color}`}>{Math.max(0, Math.floor(current))} / {Math.floor(max)}HP</span>
      </div>
      <div className="h-4 bg-navy-900/50 rounded-full overflow-hidden border border-blue-500/20">
        <motion.div
          style={{ width: '0%' }}
          animate={{ 
            width: `${healthPercent}%`,
            transition: { 
              type: "spring", 
              damping: 15,
              stiffness: 100
            }
          }}
          className={`h-full ${color === 'text-blue-400' ? 'bg-blue-500' : 'bg-purple-500'}`}
        >
          <div className="h-full w-full relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Fix the stats bar animation in StatsDisplay
const StatBar = ({ value, color }) => {
  // Ensure value is a valid number between 0 and 100
  const percent = Math.max(0, Math.min(value || 0, 100));

  return (
    <div className="flex-1 h-1.5 bg-navy-950/50 rounded-full overflow-hidden">
      <motion.div
        style={{ width: '0%' }}
        animate={{ 
          width: `${percent}%`,
          transition: { duration: 1, ease: "easeOut" }
        }}
        className={`h-full ${color}`}
      />
    </div>
  );
};

// Update the StatsDisplay to use the new StatBar component
const StatsDisplay = ({ stats, color = "text-blue-400" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-navy-900/50 rounded-lg border border-blue-500/20"
  >
    <div className="grid grid-cols-2 gap-4">
      {/* Base Stats */}
      <div className="space-y-3">
        <div className="text-sm text-blue-300/80 uppercase tracking-wider">Base Stats</div>
        {Object.entries({
          Strength: stats.strength,
          Agility: stats.agility,
          Vitality: stats.vitality,
          Intelligence: stats.intelligence,
          Luck: stats.luck
        }).map(([stat, value]) => (
          <div key={stat} className="flex items-center gap-2">
            <div className="text-sm text-blue-200/60">{stat}</div>
            <StatBar value={value} color={color} />
            <div className={`text-sm ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Combat Stats */}
      <div className="space-y-3">
        <div className="text-sm text-blue-300/80 uppercase tracking-wider">Combat Stats</div>
        {Object.entries({
          Attack: stats.attack,
          Defense: stats.defense,
          'Critical Rate': `${(stats.criticalChance * 100).toFixed(1)}%`,
          'Dodge Rate': `${(stats.dodgeChance * 100).toFixed(1)}%`
        }).map(([stat, value]) => (
          <div key={stat} className="flex justify-between items-center">
            <div className="text-sm text-blue-200/60">{stat}</div>
            <div className={`text-sm font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Equipment Section */}
    <div className="mt-4 pt-4 border-t border-blue-500/10">
      <div className="grid grid-cols-2 gap-4">
        {/* Weapon */}
        <div className="space-y-2">
          <div className="text-sm text-blue-300/80 uppercase tracking-wider">Weapon</div>
          <div className={`flex items-center gap-2 ${stats.equipment.weapon.color}`}>
            <span className="text-xl">{stats.equipment.weapon.icon}</span>
            <div>
              <div className="font-medium">{stats.equipment.weapon.name}</div>
              <div className="text-xs opacity-60">Power: {stats.equipment.weapon.power}</div>
            </div>
          </div>
        </div>

        {/* Armor */}
        <div className="space-y-2">
          <div className="text-sm text-blue-300/80 uppercase tracking-wider">Armor</div>
          <div className={`flex items-center gap-2 ${stats.equipment.armor.color}`}>
            <span className="text-xl">{stats.equipment.armor.icon}</span>
            <div>
              <div className="font-medium">{stats.equipment.armor.name}</div>
              <div className="text-xs opacity-60">Defense: {stats.equipment.armor.defense}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Special Ability */}
    <motion.div 
      className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-yellow-400">✨</span>
        <span className="font-medium text-yellow-400">{stats.equipment.special.name}</span>
      </div>
      <div className="text-sm text-yellow-300/60 mt-1">{stats.equipment.special.effect}</div>
    </motion.div>
  </motion.div>
);

// Update the WalletComparison component to include stats display
const WalletComparison = ({ wallet1, wallet2 }) => {
  // Generate equipment first
  const [equipment1] = useState(() => generateEquipment());
  const [equipment2] = useState(() => generateEquipment());
  
  // Then use the equipment in stats calculation
  const [fixedWallet1Stats] = useState(() => calculateRPGStats(wallet1, equipment1));
  const [fixedWallet2Stats] = useState(() => calculateRPGStats(wallet2, equipment2));
  
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [maxHealth1, setMaxHealth1] = useState(0);
  const [maxHealth2, setMaxHealth2] = useState(0);
  const [currentHealth1, setCurrentHealth1] = useState(0);
  const [currentHealth2, setCurrentHealth2] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [battleResult, setBattleResult] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleLoading, setBattleLoading] = useState(false);

  // Add animations array
  const animations = [
    { text: "⚔️ Clash of Titans!", color: "text-blue-400", effect: "shake" },
    { text: "💫 Power Surge!", color: "text-purple-400", effect: "pulse" },
    { text: "⚡ Energy Storm!", color: "text-yellow-400", effect: "spin" },
    { text: "🌟 Battle Frenzy!", color: "text-emerald-400", effect: "bounce" },
    { text: "🔥 Heat Wave!", color: "text-red-400", effect: "flame" },
    { text: "❄️ Frost Nova!", color: "text-cyan-400", effect: "freeze" },
    { text: "🌪️ Chaos Vortex!", color: "text-indigo-400", effect: "spiral" },
    { text: "✨ Mystic Surge!", color: "text-pink-400", effect: "sparkle" }
  ];

  // Generate new animation only when currentLogIndex changes and it's a pause
  useEffect(() => {
    if (battleResult?.battleLog[currentLogIndex]?.type === 'pause') {
      setCurrentAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }
  }, [currentLogIndex, battleResult]);

  // Update health values when battle starts
  useEffect(() => {
    if (battleResult) {
      const max1 = 150 + (fixedWallet1Stats.vitality * 0.8);
      const max2 = 150 + (fixedWallet2Stats.vitality * 0.8);
      setMaxHealth1(max1);
      setMaxHealth2(max2);
      setCurrentHealth1(max1);
      setCurrentHealth2(max2);
      setCurrentLogIndex(0);
    }
  }, [battleResult, fixedWallet1Stats.vitality, fixedWallet2Stats.vitality]);

  // Handle battle log animation
  useEffect(() => {
    if (!battleResult?.battleLog) return;
    if (currentLogIndex >= battleResult.battleLog.length) return;

    const log = battleResult.battleLog[currentLogIndex];
    const timer = setTimeout(() => {
      if (log.health1 !== undefined && log.health2 !== undefined) {
        setCurrentHealth1(log.health1);
        setCurrentHealth2(log.health2);
      }
      setCurrentLogIndex(prev => prev + 1);
    }, log.type === 'pause' ? (log.duration || 1000) : 800);

    return () => clearTimeout(timer);
  }, [currentLogIndex, battleResult]);

  // Update the battle animations with more combat-focused messages
  const BATTLE_ACTIONS = [
    { 
      text: "Weapons clash in a fierce exchange! ⚔️", 
      color: "text-yellow-400",
      effect: "clash"
    },
    { 
      text: "The battle intensifies! 🔥", 
      color: "text-red-400",
      effect: "intense"
    },
    { 
      text: "Both fighters circle each other... 🎯", 
      color: "text-blue-400",
      effect: "tactical"
    },
    { 
      text: "The arena trembles with power! ⚡", 
      color: "text-purple-400",
      effect: "power"
    }
  ];

  // Update the renderBattleAnimation to show combat sequence
  const renderBattleAnimation = () => {
    if (!currentAnimation) return null;

    return (
      <motion.div
        className="text-center py-2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Combat Sequence */}
        <motion.div 
          className={`text-sm ${currentAnimation.color} font-medium`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {currentAnimation.text}
        </motion.div>

        {/* Show combat stats */}
        <div className="mt-2 flex justify-center gap-8 text-xs opacity-60">
          <span>{fixedWallet1Stats.equipment.name} vs {fixedWallet2Stats.equipment.name}</span>
        </div>
      </motion.div>
    );
  };

  const startBattle = () => {
    setBattleLoading(true);
    const health1 = calculateMaxHealth(fixedWallet1Stats);
    const health2 = calculateMaxHealth(fixedWallet2Stats);
    
    setMaxHealth1(health1);
    setMaxHealth2(health2);
    setCurrentHealth1(health1);
    setCurrentHealth2(health2);
    setBattleStarted(true);
    setCurrentLogIndex(0);
    
    // Simulate battle and set result
    setTimeout(() => {
      const result = simulateBattle(fixedWallet1Stats, fixedWallet2Stats);
      const battleResult = {
        ...result,
        winner: result.health1 > result.health2 ? 1 : 2,
        health1: Math.max(0, result.health1),
        health2: Math.max(0, result.health2),
        battleLog: result.battleLog || [],
        finalCombo1: result.finalCombo1 || 0,
        finalCombo2: result.finalCombo2 || 0
      };
      console.log('Battle Result:', battleResult);
      setBattleResult(battleResult);
      setBattleLoading(false);
    }, 1000);
  };

  const calculateMaxHealth = (stats) => {
    return 150 + (stats.vitality * 0.8);
  };

  if (!battleStarted) {
    return (
      <div className="space-y-8">
        {/* Stats Comparison */}
        <div className="grid grid-cols-2 gap-6">
          <StatsDisplay stats={fixedWallet1Stats} color="text-blue-400" />
          <StatsDisplay stats={fixedWallet2Stats} color="text-purple-400" />
        </div>

        {/* Battle Button */}
        <motion.button
          onClick={startBattle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={battleLoading}
          className="mx-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white shadow-lg flex items-center gap-2"
        >
          {battleLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Initializing Battle...
            </>
          ) : (
            <>
              <Sword className="w-5 h-5" />
              Start Battle
            </>
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 p-6 bg-navy-900/50 rounded-xl border border-blue-500/20"
    >
      <ErrorBoundary>
        {/* Health Bars */}
        <div className="space-y-4 mb-8">
          <HealthBar
            current={currentHealth1}
            max={maxHealth1}
            name={fixedWallet1Stats.equipment.name}
            color="text-blue-400"
          />
          <HealthBar
            current={currentHealth2}
            max={maxHealth2}
            name={fixedWallet2Stats.equipment.name}
            color="text-purple-400"
          />
        </div>
      </ErrorBoundary>

      {/* Battle Log */}
      <div className="space-y-2 max-h-64 overflow-y-auto mb-8 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
        {battleResult?.battleLog.slice(0, currentLogIndex).map((log, index) => {
          if (log.type === 'pause') {
            return (
              <motion.div key={index}>
                {renderBattleAnimation()}
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`p-3 rounded-lg ${getBattleLogStyle(log)}`}
            >
              {log.type === 'attack' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${log.attacker === 'Wallet 1' ? 'text-blue-400' : 'text-purple-400'}`}>
                      {log.attackerName}
                    </span>
                    <span className="text-sm opacity-60">
                      {getAttackDescription(log)}
                    </span>
                    <span className={`font-medium ${log.defender === 'Wallet 1' ? 'text-blue-400' : 'text-purple-400'}`}>
                      {log.defenderName}
                    </span>
                  </div>
                  
                  {/* Show damage and effects */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400 font-medium">
                      {log.damage} damage
                    </span>
                    {log.isCritical && (
                      <span className="text-yellow-400">Critical Hit! ⚡</span>
                    )}
                    {log.comboText && (
                      <span className="text-emerald-400">{log.comboText}</span>
                    )}
                  </div>
                </div>
              )}

              {log.type === 'heal' && (
                <div className="text-emerald-400">
                  {log.text}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Victory Screen */}
      {battleResult && currentLogIndex >= battleResult.battleLog.length && (
        <VictoryScreen
          result={battleResult}
          wallet1Stats={fixedWallet1Stats}
          wallet2Stats={fixedWallet2Stats}
          maxHealth1={maxHealth1}
          maxHealth2={maxHealth2}
          onRematch={() => {
            setBattleStarted(false);
            setBattleResult(null);
            setCurrentLogIndex(0);
            setCurrentHealth1(0);
            setCurrentHealth2(0);
          }}
        />
      )}
    </motion.div>
  );
};

// Replace the BattleAnimation component with this simpler version
const BattleIcon = ({ type, className = "" }) => {
  const icons = {
    sword: swordIcon,
    trophy: trophyIcon,
    vs: vsIcon,
    sparkle: sparkleIcon
  };

  return (
    <img 
      src={icons[type]} 
      alt={type} 
      className={`battle-icon ${className} ${type === 'sparkle' ? 'pulse' : ''}`}
    />
  );
};

// Add this function to generate random equipment
const generateEquipment = () => {
  // Ensure we always have a weapon and name
  const defaultWeapon = WEAPONS[0];
  const defaultName = NAMES[0];
  
  const weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)] || defaultWeapon;
  const armor = ARMOR[Math.floor(Math.random() * ARMOR.length)];
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)] || defaultName;
  
  // Add random special abilities
  const specialAbilities = [
    { name: 'Berserker Rage', effect: 'Gains strength when health is low' },
    { name: 'Diamond Hands', effect: 'Increased defense on consecutive blocks' },
    { name: 'Moon Shot', effect: 'Critical hits deal extra damage' },
    { name: 'Degen Energy', effect: 'Random damage multiplier each attack' },
    { name: 'Whale Power', effect: 'Higher base stats but slower' },
    { name: 'Paper Hands', effect: 'Higher dodge chance but lower defense' },
    { name: 'Rug Pull Master', effect: 'Chance to steal enemy buffs' },
    { name: 'Yield Farmer', effect: 'Regenerates health over time' }
  ];

  // Add random traits
  const traits = [
    { name: 'Trading Style', options: ['Day Trader', 'HODLer', 'Swing Trader', 'Scalper'] },
    { name: 'Risk Level', options: ['Conservative', 'Moderate', 'Aggressive', 'YOLO'] },
    { name: 'Specialty', options: ['DeFi', 'NFTs', 'Meme Coins', 'Blue Chips'] },
    { name: 'Experience', options: ['Novice', 'Intermediate', 'Veteran', 'Legend'] }
  ];

  const randomTraits = traits.reduce((acc, trait) => {
    acc[trait.name] = trait.options[Math.floor(Math.random() * trait.options.length)];
    return acc;
  }, {});

  return {
    weapon,
    armor,
    title,
    name,
    special: specialAbilities[Math.floor(Math.random() * specialAbilities.length)],
    traits: randomTraits,
    // Add random affinities
    affinities: {
      bull: Math.floor(Math.random() * 100),
      bear: Math.floor(Math.random() * 100),
      degen: Math.floor(Math.random() * 100),
      smart: Math.floor(Math.random() * 100)
    }
  };
};

// Helper function to get attack descriptions
const getAttackDescription = (log) => {
  if (log.specialMove) {
    return `unleashes ${log.specialMove.name} on`;
  }
  
  const attacks = [
    "strikes at",
    "lunges toward",
    "attacks",
    "charges at",
    "assaults",
    "rushes",
    "confronts"
  ];
  
  return attacks[Math.floor(Math.random() * attacks.length)];
};

// Helper function to get battle log styles
const getBattleLogStyle = (log) => {
  if (log.type === 'attack') {
    return log.attacker === 'Wallet 1' 
      ? 'bg-blue-500/10 border border-blue-500/20' 
      : 'bg-purple-500/10 border border-purple-500/20';
  }
  return 'bg-emerald-500/10 border border-emerald-500/20';
};

const WalletTracker = () => {
  const [wallet1Address, setWallet1Address] = useState('');
  const [wallet2Address, setWallet2Address] = useState('');
  const [wallet1Data, setWallet1Data] = useState(null);
  const [wallet2Data, setWallet2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wallet1Loading, setWallet1Loading] = useState(false);
  const [wallet2Loading, setWallet2Loading] = useState(false);

  const fetchWalletData = async (address, isWallet2 = false) => {
    try {
      if (isWallet2) {
        setWallet2Loading(true);
      } else {
        setWallet1Loading(true);
      }

      const transactions = await fetchTransactions(address);
      const analytics = processTransactionAnalytics(transactions);
      return {
        address,
        transactions,
        analytics
      };
    } finally {
      if (isWallet2) {
        setWallet2Loading(false);
      } else {
        setWallet1Loading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setWallet1Data(null);
    setWallet2Data(null);

    try {
      if (!wallet1Address.trim()) {
        throw new Error('Please enter the first wallet address');
      }

      // Fetch data sequentially to avoid rate limits
      const wallet1 = await fetchWalletData(wallet1Address.trim());
      setWallet1Data(wallet1);

      if (wallet2Address.trim()) {
        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
        const wallet2 = await fetchWalletData(wallet2Address.trim());
        setWallet2Data(wallet2);
      }

    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 relative">
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="space-y-4 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <div className="text-blue-400">Analyzing wallet data...</div>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-800/50 rounded-xl border border-blue-500/20 p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Setup Battle</h2>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Wallet 1 Input */}
              <div className="space-y-2">
                <label className="text-blue-400 text-sm">Wallet 1</label>
                <input
                  type="text"
                  value={wallet1Address}
                  onChange={(e) => setWallet1Address(e.target.value)}
                  placeholder="Enter first wallet address"
                  className="w-full px-6 py-4 bg-navy-900/50 border border-blue-500/20 focus:border-blue-500/60 rounded-lg text-blue-100 placeholder-blue-400/40 outline-none"
                />
              </div>

              {/* Wallet 2 Input */}
              <div className="space-y-2">
                <label className="text-purple-400 text-sm">Wallet 2 (Optional)</label>
                <input
                  type="text"
                  value={wallet2Address}
                  onChange={(e) => setWallet2Address(e.target.value)}
                  placeholder="Enter second wallet address"
                  className="w-full px-6 py-4 bg-navy-900/50 border border-purple-500/20 focus:border-purple-500/60 rounded-lg text-purple-100 placeholder-purple-400/40 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Setting Up Battle...</span>
                  </>
                ) : (
                  <>
                    <Sword className="w-5 h-5" />
                    <span>Setup Battle</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center mb-6"
            >
              <div className="text-red-400">{error}</div>
            </motion.div>
          )}

          {/* Show individual wallet data */}
          {wallet1Data && (
            <TransactionAnalytics analytics={wallet1Data.analytics} />
          )}

          {/* Show comparison when both wallets have data */}
          {wallet1Data && wallet2Data && (
            <WalletComparison 
              wallet1={wallet1Data} 
              wallet2={wallet2Data}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WalletTracker; 