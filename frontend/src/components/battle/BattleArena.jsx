import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { HealthBar } from '../common/HealthBar';
import { BattleLog } from './BattleLog';
import { VictoryScreen } from './VictoryScreen';

export const BattleArena = memo(({ 
  wallet1Stats, 
  wallet2Stats, 
  battleState,
  onRematch 
}) => {
  const { health, result, currentLogIndex } = battleState;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Health Bars */}
      <div className="grid grid-cols-2 gap-6">
        <HealthBar
          current={health.wallet1.current}
          max={health.wallet1.max}
          name={wallet1Stats.name}
          color="text-blue-400"
        />
        <HealthBar
          current={health.wallet2.current}
          max={health.wallet2.max}
          name={wallet2Stats.name}
          color="text-purple-400"
        />
      </div>

      {/* Battle Log */}
      <BattleLog
        log={result?.battleLog || []}
        currentIndex={currentLogIndex}
        wallet1Stats={wallet1Stats}
        wallet2Stats={wallet2Stats}
      />

      {/* Victory Screen */}
      {result && currentLogIndex >= result.battleLog.length && (
        <VictoryScreen
          result={result}
          wallet1Stats={wallet1Stats}
          wallet2Stats={wallet2Stats}
          onRematch={onRematch}
        />
      )}
    </motion.div>
  );
}); 