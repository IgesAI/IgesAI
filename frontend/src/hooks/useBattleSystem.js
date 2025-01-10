import { useState, useEffect } from 'react';
import { calculateDamage } from '../utils/battle-utils';

export const useBattleSystem = (wallet1, wallet2) => {
  const [battleState, setBattleState] = useState({
    isStarted: false,
    currentLogIndex: 0,
    result: null,
    health: {
      wallet1: { current: 0, max: 0 },
      wallet2: { current: 0, max: 0 }
    },
    combo: { wallet1: 0, wallet2: 0 },
    animations: []
  });

  const generateBattleLog = (stats1, stats2) => {
    const log = [];
    let health1 = stats1.maxHealth;
    let health2 = stats2.maxHealth;
    let combo1 = 0;
    let combo2 = 0;

    while (health1 > 0 && health2 > 0) {
      // Determine attacker and defender
      const isWallet1Turn = Math.random() > 0.5;
      const attacker = isWallet1Turn ? stats1 : stats2;
      const defender = isWallet1Turn ? stats2 : stats1;
      
      // Calculate damage with combo system
      const damage = calculateDamage({
        attacker,
        defender,
        combo: isWallet1Turn ? combo1 : combo2
      });

      // Update health and combo
      if (isWallet1Turn) {
        health2 -= damage;
        combo1++;
        combo2 = 0;
      } else {
        health1 -= damage;
        combo2++;
        combo1 = 0;
      }

      // Add battle log entry
      log.push({
        type: 'attack',
        attacker: isWallet1Turn ? 'Wallet 1' : 'Wallet 2',
        attackerName: isWallet1Turn ? stats1.name : stats2.name,
        defender: isWallet1Turn ? 'Wallet 2' : 'Wallet 1',
        defenderName: isWallet1Turn ? stats2.name : stats1.name,
        damage,
        health1,
        health2,
        combo: isWallet1Turn ? combo1 : combo2
      });

      // Add dramatic pause every few moves
      if (log.length % 3 === 0) {
        log.push({ type: 'pause', duration: 1000 });
      }
    }

    return {
      battleLog: log,
      winner: health1 > 0 ? 1 : 2,
      finalCombo1: combo1,
      finalCombo2: combo2,
      health1,
      health2
    };
  };

  const startBattle = () => {
    setBattleState(prev => ({
      ...prev,
      isStarted: true,
      currentLogIndex: 0
    }));

    // Use Web Worker for battle calculations
    const worker = new Worker(new URL('../workers/battle.worker.js', import.meta.url));
    worker.postMessage({ wallet1, wallet2 });
    
    worker.onmessage = (e) => {
      setBattleState(prev => ({
        ...prev,
        result: e.data
      }));
    };
  };

  return {
    battleState,
    startBattle,
    setBattleState
  };
}; 