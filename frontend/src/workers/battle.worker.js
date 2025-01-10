import { calculateDamage, calculateSpecialMoveChance } from '../utils/battle-utils';

self.onmessage = (e) => {
  const { wallet1, wallet2 } = e.data;
  
  // Initialize battle state
  let health1 = 150 + (wallet1.stats.vitality * 0.8);
  let health2 = 150 + (wallet2.stats.vitality * 0.8);
  let combo1 = 0;
  let combo2 = 0;
  const battleLog = [];

  // Battle loop
  while (health1 > 0 && health2 > 0 && battleLog.length < 20) {
    const isWallet1Turn = Math.random() > 0.5;
    const attacker = isWallet1Turn ? wallet1 : wallet2;
    const defender = isWallet1Turn ? wallet2 : wallet1;
    
    // Calculate damage
    const damage = calculateDamage({
      attacker: attacker.stats,
      defender: defender.stats,
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

    // Add to battle log
    battleLog.push({
      type: 'attack',
      attacker: isWallet1Turn ? 'Wallet 1' : 'Wallet 2',
      attackerName: attacker.name,
      defender: isWallet1Turn ? 'Wallet 2' : 'Wallet 1',
      defenderName: defender.name,
      damage,
      health1,
      health2,
      combo: isWallet1Turn ? combo1 : combo2
    });

    // Add dramatic pause
    if (battleLog.length % 3 === 0) {
      battleLog.push({ type: 'pause', duration: 1000 });
    }
  }

  // Send battle results back to main thread
  self.postMessage({
    battleLog,
    winner: health1 > health2 ? 1 : 2,
    finalCombo1: combo1,
    finalCombo2: combo2,
    health1: Math.max(0, health1),
    health2: Math.max(0, health2)
  });
}; 