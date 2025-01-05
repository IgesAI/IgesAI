// src/components/EmailCaptureForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmailCaptureForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail(''); // Clear the input
    }, 1000); // Show loading state for 1 second
  };

  return (
    <div id="signup-section" className="relative py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">
            Join the Waitlist
          </h2>
          <p className="text-lg text-blue-200/80 mb-12">
            Be the first to access IGES AI's blockchain analysis platform and protect your investments.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-navy-900/50 border border-blue-500/20 focus:border-blue-500/60 rounded-lg text-blue-100 placeholder-blue-400/40 outline-none transition-all backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-600/50 disabled:to-blue-700/50 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
              >
                {status === 'loading' ? 'Recording...' : 'Join Now'}
              </button>
            </div>

            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400"
              >
                Email recorded! We'll be in touch soon.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailCaptureForm;