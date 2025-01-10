import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const HealthBar = memo(({ current, max, name, color, equipment }) => {
  const healthPercent = Math.max(0, Math.min((current / max) * 100, 100));
  const isLowHealth = healthPercent < 30;

  return (
    <div className="space-y-2">
      {/* Character Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`text-xl ${equipment?.weapon.color}`}>
            {equipment?.weapon.icon}
          </span>
          <div>
            <div className={`font-bold ${color}`}>{name}</div>
            <div className="text-xs opacity-60">{equipment?.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className={color}>
            {Math.max(0, Math.floor(current))} / {Math.floor(max)}
          </span>
        </div>
      </div>

      {/* Health Bar */}
      <div className="relative h-4">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-900/50 rounded-full overflow-hidden border border-blue-500/20" />

        {/* Health Fill */}
        <motion.div
          className={`absolute h-full ${
            isLowHealth 
              ? 'bg-gradient-to-r from-red-500 to-red-600' 
              : color === 'text-blue-400'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-purple-500 to-purple-600'
          } rounded-full`}
          style={{ width: `${healthPercent}%` }}
          animate={{ 
            width: `${healthPercent}%`,
            transition: { type: "spring", damping: 15, stiffness: 100 }
          }}
        >
          {/* Shine Effect */}
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
        </motion.div>

        {/* Low Health Warning */}
        {isLowHealth && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: ['0 0 0px red', '0 0 10px red'],
              opacity: [0.5, 1]
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        )}
      </div>
    </div>
  );
}); 