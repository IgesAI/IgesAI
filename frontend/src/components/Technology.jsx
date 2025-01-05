import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Network, Database, Brain, LineChart, Shield, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Technology = () => {
  const navigate = useNavigate();

  const techComponents = [
    {
      icon: Brain,
      title: "AI Pattern Recognition",
      description: "Advanced machine learning algorithms detect complex transaction patterns indicative of market manipulation.",
      formula: "P(insider) = Σ[(Tx - μ) / σ] * W_interactions"
    },
    {
      icon: Network,
      title: "Cabal Detection",
      description: "K-means clustering with dynamic weights identifies coordinated trading groups and suspicious wallet clusters.",
      formula: "D(w,c) = Σ[wᵢ(xᵢ - cᵢ)²]"
    },
    {
      icon: LineChart,
      title: "Network Analysis",
      description: "Eigenvalue decomposition detects wallet influence and flow dominance in the ecosystem.",
      formula: "A = λv"
    },
    {
      icon: Shield,
      title: "Wallet Ranking",
      description: "Modified PageRank algorithm assesses wallet significance and identifies key players.",
      formula: "PR(w) = (1-d) + d * Σ[PR(v)/L(v)]"
    }
  ];

  return (
    <div className="min-h-screen bg-navy-900 py-20">
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-24 left-4 md:left-8 px-4 py-2 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        whileHover={{ x: -5 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6"
            >
              Our Technology
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100/80 max-w-3xl mx-auto font-normal tracking-tight"
            >
              Merging AI with blockchain tools for comprehensive market analysis and manipulation detection
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Architecture Diagram */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-2xl font-display font-bold text-center mb-8">Platform Architecture</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {['Data Layer', 'AI Processing', 'Visualization', 'User Layer'].map((layer, index) => (
                <ScrollReveal key={layer} delay={index * 0.2}>
                  <div className="bg-navy-800/50 p-6 rounded-xl border border-blue-500/20 text-center">
                    <h3 className="font-display font-bold text-blue-400 mb-2">{layer}</h3>
                    <div className="h-1 bg-gradient-to-r from-blue-500/20 via-blue-400/40 to-blue-500/20" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tech Components Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {techComponents.map((tech, index) => (
            <ScrollReveal key={tech.title} delay={index * 0.2}>
              <div className="bg-navy-800/50 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <tech.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-100">{tech.title}</h3>
                </div>
                <p className="text-blue-200/80 mb-4">{tech.description}</p>
                <div className="bg-navy-900/50 p-4 rounded-lg border border-blue-500/20 font-mono text-sm">
                  {tech.formula}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology; 