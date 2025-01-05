import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Users, Network } from 'lucide-react';

const features = [
  {
    title: "AI Pattern Detection",
    description: "Our advanced neural networks analyze transaction patterns in real-time, identifying suspicious activities before they impact the market.",
    demo: (
      <div className="h-full flex items-center justify-center">
        <div className="relative">
          {/* Simple Neural Network Visualization */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent_70%)]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Central AI Node */}
          <motion.div
            className="relative w-24 h-24 bg-blue-500/10 rounded-2xl border border-blue-500/30 flex items-center justify-center backdrop-blur-sm"
            animate={{
              boxShadow: ['0 0 20px rgba(59, 130, 246, 0.2)', '0 0 40px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(59, 130, 246, 0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-12 h-12 text-blue-400" />
          </motion.div>

          {/* Alert Indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-red-500/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    )
  },
  {
    title: "Social Integration",
    description: "Connect on-chain activities with social media signals to create comprehensive trader profiles and identify coordinated groups.",
    demo: (
      <div className="h-full flex items-center justify-center">
        <div className="relative">
          {/* Connection Web Background */}
          <motion.div
            className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(96,165,250,0.1),rgba(96,165,250,0.05),rgba(96,165,250,0.1))]"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Central Hub */}
          <motion.div
            className="relative w-24 h-24 bg-blue-500/10 rounded-2xl border border-blue-500/30 flex items-center justify-center backdrop-blur-sm"
            animate={{
              boxShadow: ['0 0 20px rgba(59, 130, 246, 0.2)', '0 0 40px rgba(59, 130, 246, 0.3)', '0 0 20px rgba(59, 130, 246, 0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Network className="w-12 h-12 text-blue-400" />
          </motion.div>

          {/* Connection Indicators */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    )
  }
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Feature Navigation */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-6 rounded-xl border ${
                  activeFeature === index 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-blue-500/20 hover:border-blue-500/40'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-blue-100">{feature.title}</h3>
                <p className="text-blue-200/80">{feature.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Feature Demo */}
          <div className="relative h-[400px] bg-navy-800/50 rounded-xl border border-blue-500/20">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-6"
              >
                {features[activeFeature].demo}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase; 