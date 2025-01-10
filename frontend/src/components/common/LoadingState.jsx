import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap } from 'lucide-react';

export const LoadingState = memo(({ message = "Loading..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 space-y-4"
    >
      {/* Animated battle icons */}
      <div className="relative">
        <motion.div
          className="absolute"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sword className="w-8 h-8 text-blue-400" />
        </motion.div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <Shield className="w-12 h-12 text-purple-400" />
        </motion.div>

        <motion.div
          className="absolute top-0 right-0"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Zap className="w-8 h-8 text-yellow-400" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
        className="text-blue-400 font-medium"
      >
        {message}
      </motion.div>
    </motion.div>
  );
}); 