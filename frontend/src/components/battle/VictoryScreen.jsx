import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sword, Medal } from 'lucide-react';

export const VictoryScreen = memo(({ 
  result, 
  wallet1Stats, 
  wallet2Stats, 
  onRematch,
  maxHealth1,
  maxHealth2
}) => {
  if (!result?.winner || !result?.health1 || !result?.health2 || 
      !wallet1Stats?.equipment?.name || !wallet2Stats?.equipment?.name || 
      !maxHealth1 || !maxHealth2) {
    console.log('Missing required props:', { result, wallet1Stats, wallet2Stats, maxHealth1, maxHealth2 });
    return null;
  }

  const winner = result.winner === 1 ? wallet1Stats : wallet2Stats;
  const loser = result.winner === 1 ? wallet2Stats : wallet1Stats;
  
  const winnerHealthPercent = Math.max(0, Math.min(100, result.winner === 1 
    ? ((result.health1 || 0) / maxHealth1) * 100
    : ((result.health2 || 0) / maxHealth2) * 100
  ));
  
  const loserHealthPercent = Math.max(0, Math.min(100, result.winner === 1
    ? ((result.health2 || 0) / maxHealth2) * 100
    : ((result.health1 || 0) / maxHealth1) * 100
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-12"
    >
      {/* Victory Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 h-[200%] w-1 bg-gradient-to-b from-yellow-500/20 to-transparent"
            style={{ 
              transformOrigin: 'top',
              rotate: `${i * 45}deg`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-8">
        {/* Victory Banner */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block"
          >
            <Trophy className="w-24 h-24 text-yellow-400" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              VICTORY!
            </h2>
            <div className={`text-2xl font-medium ${result.winner === 1 ? 'text-blue-400' : 'text-purple-400'}`}>
              {winner.equipment.name} Triumphs!
            </div>
          </motion.div>
        </div>

        {/* Battle Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <BattleStats
            stats={winner}
            health={result.winner === 1 ? result.health1 : result.health2}
            maxHealth={result.winner === 1 ? maxHealth1 : maxHealth2}
            combo={result.winner === 1 ? result.finalCombo1 : result.finalCombo2}
            isWinner={true}
          />
          <BattleStats
            stats={loser}
            health={result.winner === 1 ? result.health2 : result.health1}
            maxHealth={result.winner === 1 ? maxHealth2 : maxHealth1}
            combo={result.winner === 1 ? result.finalCombo2 : result.finalCombo1}
            isWinner={false}
          />
        </motion.div>

        {/* Rematch Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onRematch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white shadow-lg flex items-center gap-3"
          >
            <Sword className="w-5 h-5" />
            Battle Again
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
});

// Battle stats component
const BattleStats = memo(({ stats, health, maxHealth, combo, isWinner }) => {
  const baseColor = isWinner ? 'blue' : 'purple';
  const healthPercent = Math.max(0, Math.min((health / maxHealth) * 100, 100));
  
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-${baseColor}-500/20 to-${baseColor}-500/5 border-2 border-${baseColor}-500/30 p-6`}>
      <div className="space-y-4">
        {/* Character info */}
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-${baseColor}-500/10`}>
            {stats.equipment.weapon.icon}
          </div>
          <div>
            <div className={`font-bold text-${baseColor}-400`}>{stats.equipment.name}</div>
            <div className={`text-sm text-${baseColor}-300/60`}>{stats.equipment.title}</div>
          </div>
          {isWinner && <Medal className="w-6 h-6 text-yellow-400 ml-auto" />}
        </div>

        {/* Health Bar */}
        <div className="space-y-1">
          <div className="text-sm text-blue-300/60">Final Health</div>
          <div className="h-2 bg-navy-900/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthPercent}%` }}
              className={`h-full bg-${baseColor}-500`}
            />
          </div>
          <div className="text-right text-sm text-blue-300/60">
            {Math.max(0, Math.floor(health))} / {Math.floor(maxHealth)}
          </div>
        </div>

        {/* Combo Counter */}
        <div className="space-y-1">
          <div className="text-sm text-blue-300/60">Max Combo</div>
          <div className="text-2xl font-bold text-yellow-400">{combo}x</div>
        </div>
      </div>
    </div>
  );
}); 