// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Network, 
  LineChart, 
  Shield, 
  Users, 
  Cpu,
  Binary,
  Lock
} from 'lucide-react';

const TechnicalSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Wallet Analysis",
      description: "Machine learning algorithms detect transaction patterns indicative of pump-and-dump schemes or wash trading.",
      formula: "P(insider) = Σ[(Tx - μ) / σ] * W_interactions"
    },
    {
      icon: Network,
      title: "Social Profiling Integration",
      description: "Linking wallet activity with public social profiles through AI to create a holistic picture of actors behind transactions.",
      formula: "D(w,c) = Σ[wᵢ(xᵢ - cᵢ)²]"
    },
    {
      icon: LineChart,
      title: "Real-time Tracking",
      description: "Blockchain transaction flow mapped using bubble charts, heatmaps, and AI-generated visual paths.",
      metrics: {
        accuracy: "99.9%",
        response: "<100ms"
      }
    },
    {
      icon: Shield,
      title: "On-chain Alerts",
      description: "AI monitors wallet movements and alerts users to unusual liquidity shifts.",
      metrics: {
        monitoring: "24/7",
        detection: "Real-time"
      }
    }
  ];

  return (
    <div className="relative py-24 bg-navy-900/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Key Components
          </h2>
          <p className="font-tech mt-4 text-xl text-blue-200/80">
            Merging AI with blockchain tools for comprehensive market analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-navy-800/50 p-8 rounded-xl border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-blue-100 drop-shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                  {feature.title}
                </h3>
              </div>
              <div className="space-y-4">
                <p className="font-sans text-blue-200/80">
                  {feature.description}
                </p>
                {feature.formula && (
                  <div className="bg-navy-900/50 p-4 rounded-lg border border-blue-500/20 font-mono text-sm">
                    {feature.formula}
                  </div>
                )}
                {feature.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="bg-navy-900/50 p-4 rounded-lg border border-blue-500/20 text-center">
                        <div className="font-tech text-blue-400 font-bold">{value}</div>
                        <div className="text-blue-200/80 text-sm">{key}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold mb-8">Use Cases</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Retail Traders",
              "Auditors",
              "Regulators",
              "DeFi Projects"
            ].map((useCase) => (
              <div key={useCase} className="bg-navy-800/50 p-6 rounded-xl border border-blue-500/20">
                <p className="text-blue-100 font-semibold">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleImageLoad = (e) => {
    console.log('Image loaded successfully:', {
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    setImageError(true);
  };

  // Add this for debugging
  useEffect(() => {
    console.log('Current image states:', {
      loaded: imageLoaded,
      error: imageError
    });
  }, [imageLoaded, imageError]);

  console.log('Hero component rendering');

  // Example of a staggered fade-in animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Adjust playback speed if needed
      
      // Preload video
      const preloadVideo = new Promise((resolve) => {
        if (videoRef.current.readyState >= 3) {
          resolve();
        } else {
          videoRef.current.addEventListener('canplay', resolve);
        }
      });

      preloadVideo.then(() => setVideoLoaded(true));
    }
  }, []);

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background with fade-in */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src="/igesani.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay - adjust opacity values as needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-navy-900/60 to-navy-900/90" />
        </motion.div>

        {/* Rest of your content with higher z-index */}
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-xl"
              />

              {/* Main content */}
              <motion.h1
                variants={item}
                className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              >
                AI-Driven Blockchain Analysis Platform
              </motion.h1>

              <motion.p
                variants={item}
                className="font-sans text-xl md:text-2xl text-blue-100/90 mb-16 max-w-3xl mx-auto font-normal tracking-tight"
              >
                Exposing insider trading, pump-and-dump schemes, and coordinated manipulation within the Solana ecosystem
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <a
                  href="/whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-blue-400/30 text-blue-400 hover:bg-blue-400/10 rounded-lg font-semibold transition-all hover:border-blue-400/60 inline-block"
                >
                  Read Whitepaper
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="h-px mt-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>
      </div>
      <TechnicalSection />
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-blue-400/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-blue-400/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Hero;