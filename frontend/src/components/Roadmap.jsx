import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Milestone, Flag, Target, Code, Users, Cpu, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Roadmap = () => {
  const navigate = useNavigate();

  const phases = [
    {
      phase: "Phase 1",
      title: "AI Model Training & Solana Integration",
      status: "Completed",
      completion: 100,
      timeline: "Q3-Q4 2024",
      items: [
        "Training AI models on historical transaction data ✓",
        "Integration with Helius APIs ✓",
        "Development of pattern recognition algorithms ✓",
        "Initial blockchain data processing pipeline ✓"
      ],
      icon: Cpu
    },
    {
      phase: "Phase 2",
      title: "Visualization Layer Development",
      status: "Completed",
      completion: 100,
      timeline: "Q4 2024",
      items: [
        "Implementation of Bubble Maps integration ✓",
        "Custom heatmap development ✓",
        "Interactive dashboard creation ✓",
        "Real-time data visualization system ✓"
      ],
      icon: Code
    },
    {
      phase: "Phase 3",
      title: "Social Media Integration & Launch",
      status: "In Progress",
      completion: 85,
      timeline: "Q1 2025",
      items: [
        "Social media data correlation system ✓",
        "Public beta testing ✓",
        "Platform security audits - In Progress",
        "Initial public release - Scheduled for Feb 2025"
      ],
      icon: Users
    },
    {
      phase: "Phase 4",
      title: "Community & Governance",
      status: "Starting Soon",
      completion: 15,
      timeline: "Q2 2025",
      items: [
        "Community feedback implementation - In Progress",
        "Governance system development - Planning",
        "Advanced feature rollout - Scheduled",
        "Ecosystem partnerships - In Discussions"
      ],
      icon: Network
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
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
              Development Roadmap
            </h1>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto font-normal tracking-tight">
              Our journey to revolutionize blockchain analysis and market manipulation detection
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <ScrollReveal key={phase.phase} delay={index * 0.2}>
              <div className="bg-navy-800/50 rounded-xl border border-blue-500/20 overflow-hidden">
                {/* Phase Header */}
                <div className="p-6 border-b border-blue-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <phase.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-100">{phase.phase}: {phase.title}</h3>
                        <p className="text-blue-400">{phase.timeline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        phase.completion > 70 ? 'bg-green-500/20 text-green-400' :
                        phase.completion > 30 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-navy-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${phase.completion}%` }}
                    />
                  </div>
                </div>

                {/* Phase Details */}
                <div className="p-6 bg-navy-900/30">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-blue-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap; 