import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Counter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

const StatsBanner = () => {
  const stats = [
    { value: 99.9, label: "Detection Rate", suffix: "%" },
    { value: 500, label: "Threats Detected", prefix: "+" },
    { value: 100000, label: "Transactions Analyzed", prefix: ">" },
    { value: 24, label: "Real-time Monitoring", suffix: "/7" }
  ];

  return (
    <div className="bg-navy-800/50 border-y border-blue-500/20">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">
                <Counter 
                  end={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-blue-200/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner; 