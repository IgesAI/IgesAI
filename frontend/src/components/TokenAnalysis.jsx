import React from 'react';
import { motion } from 'framer-motion';

const TokenAnalysis = () => {
  return (
    <div className="relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-navy-800/50 rounded-xl border border-blue-500/20 p-8"
        >
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">
            Token Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-navy-900/50 rounded-lg border border-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Contract Address</h3>
              <div className="font-mono text-blue-100 break-all">
              Hoic8iUSgmcAPL1fFFSAnUv26MqVn7cWcZecq5HSpump
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-navy-900/50 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Analysis Results</h3>
              </div>
              
              <div className="p-4 bg-navy-900/50 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Token Metrics</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TokenAnalysis; 