import React from 'react';
import { motion } from 'framer-motion';

const FeatureShowcase = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-100">CA: Coming Soon</h2>
          <div className="bg-navy-800/50 rounded-xl border border-blue-500/20 p-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/pump-santa.webp" 
                alt="PumpFun" 
                className="w-8 h-8"
              />
              <p className="text-xl text-blue-200/80">
                Token Launch on PumpFun
              </p>
            </div>
            <p className="text-blue-200/80 max-w-2xl mx-auto">
              IGES AI token will be launching on PumpFun, bringing tokenomics and community governance to our platform. Stay tuned for more details about our upcoming token launch.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureShowcase; 