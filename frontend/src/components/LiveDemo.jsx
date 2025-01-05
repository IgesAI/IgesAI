import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LiveDemo = () => {
  const navigate = useNavigate();

  const scrollToSignup = () => {
    navigate('/');  // First navigate to home
    setTimeout(() => {  // Then scroll after a brief delay to allow navigation
      const signupSection = document.getElementById('signup-section');
      if (signupSection) {
        signupSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-navy-800/50 rounded-xl border border-blue-500/20 p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Request a Demo</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-blue-200/80 mb-8">
              Experience the power of AI-driven blockchain analysis firsthand. 
              Join our waitlist to get early access to our platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={scrollToSignup}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-semibold"
            >
              Join Waitlist
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveDemo; 