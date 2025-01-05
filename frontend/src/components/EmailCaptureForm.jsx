// src/components/EmailCaptureForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmailCaptureForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="relative py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_50%)]" />
      
      <div className="max-w-xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">
            Join the Waitlist
          </h2>
          <p className="text-lg text-blue-200/80 mb-12">
            Be the first to access IGES AI's blockchain analysis platform and protect your investments.
          </p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-navy-900/50 border border-blue-500/20 focus:border-blue-500/60 rounded-lg text-blue-100 placeholder-blue-400/40 outline-none transition-all backdrop-blur-sm hover:border-blue-500/40"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
                >
                  Join Now
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/50 rounded-xl border border-blue-500/20 p-8"
            >
              <motion.p 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-green-400 font-semibold text-lg"
              >
                Email recorded! We'll be in touch soon.
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmailCaptureForm;