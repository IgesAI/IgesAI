import React from 'react';
import { motion } from 'framer-motion';

const TrustSignals = () => {
  const partners = [
    // Add partner logos
  ];

  const testimonials = [
    {
      quote: "IGES AI has revolutionized how we detect market manipulation in the Solana ecosystem.",
      author: "Sarah Chen",
      role: "Blockchain Security Analyst"
    },
    {
      quote: "The real-time alerts have helped us prevent multiple pump-and-dump schemes.",
      author: "Michael Rodriguez",
      role: "DeFi Protocol Lead"
    },
    {
      quote: "Best-in-class AI technology for blockchain analysis. A must-have tool.",
      author: "David Park",
      role: "Crypto Fund Manager"
    }
  ];

  return (
    <div className="py-20 bg-navy-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-navy-900/50 rounded-xl"
              >
                {/* Partner logo */}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-navy-900/50 rounded-xl border border-blue-500/20"
            >
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <div className="text-blue-400 font-bold">{testimonial.author}</div>
              <div className="text-blue-200/80">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals; 