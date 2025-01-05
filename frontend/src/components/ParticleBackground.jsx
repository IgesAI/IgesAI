import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Primary flowing line */}
      <motion.div
        className="absolute w-[200px] h-[400vh] opacity-[0.03]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 25%, rgba(0, 240, 255, 1) 50%, transparent 75%, transparent 100%)',
          left: '30%',
          top: '-100vh',
          filter: 'blur(50px)',
          transform: 'translateX(-50%)'
        }}
        animate={{
          y: ['0%', '-50%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      />

      {/* Secondary flowing line */}
      <motion.div
        className="absolute w-[250px] h-[400vh] opacity-[0.02]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 25%, rgba(0, 240, 255, 1) 50%, transparent 75%, transparent 100%)',
          left: '70%',
          top: '-100vh',
          filter: 'blur(80px)',
          transform: 'translateX(-50%)'
        }}
        animate={{
          y: ['-50%', '0%']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      />
    </div>
  );
};

export default ParticleBackground; 