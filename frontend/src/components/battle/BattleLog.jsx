import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Zap } from 'lucide-react';

export const BattleLog = memo(({ log, currentIndex, wallet1Stats, wallet2Stats }) => {
  const renderAttackMessage = (entry) => {
    const isWallet1 = entry.attacker === 'Wallet 1';
    const attackerColor = isWallet1 ? 'text-blue-400' : 'text-purple-400';
    const defenderColor = isWallet1 ? 'text-purple-400' : 'text-blue-400';

    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${attackerColor}`}>
            {entry.attackerName}
          </span>
          <Sword className="w-4 h-4 text-gray-400" />
          <span className={`font-medium ${defenderColor}`}>
            {entry.defenderName}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-400 font-medium flex items-center gap-1">
            <Zap className="w-4 h-4" />
            {entry.damage} damage
          </span>
          {entry.combo > 1 && (
            <span className="text-yellow-400 flex items-center gap-1">
              {entry.combo}x Combo!
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20">
      <AnimatePresence mode="popLayout">
        {log.slice(0, currentIndex).map((entry, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className={`p-3 rounded-lg ${
              entry.type === 'attack'
                ? entry.attacker === 'Wallet 1'
                  ? 'bg-blue-500/10 border border-blue-500/20'
                  : 'bg-purple-500/10 border border-purple-500/20'
                : 'bg-navy-900/50 border border-blue-500/10'
            }`}
          >
            {entry.type === 'attack' ? (
              renderAttackMessage(entry)
            ) : (
              <div className="text-center text-sm text-blue-300/60">
                {entry.text}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}); 