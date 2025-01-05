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
      title: "Phase 1: Foundation",
      description: "Initial platform development and core AI model training",
      status: "Completed",
      completion: 100,
      date: "Q4 2024",
      items: [
        "Core AI model development",
        "Basic blockchain data integration",
        "Initial UI/UX design",
        "Infrastructure setup"
      ]
    },
    {
      title: "Phase 2: Beta Development",
      description: "Advanced features and testing phase",
      status: "In Progress",
      completion: 60,
      date: "Q1 2025",
      items: [
        "Advanced pattern recognition",
        "Social signal integration",
        "Beta testing program",
        "Security audits"
      ]
    },
    {
      title: "Phase 3: Platform Launch",
      description: "Public release and feature expansion",
      status: "Planned",
      completion: 0,
      date: "Q2 2025",
      items: [
        "Public platform launch",
        "Advanced analytics dashboard",
        "Real-time alert system",
        "Community features"
      ]
    },
    {
      title: "Phase 4: Ecosystem Growth",
      description: "Expanding capabilities and partnerships",
      status: "Planned",
      completion: 0,
      date: "Q3 2025",
      items: [
        "Partnership integrations",
        "Advanced API access",
        "Mobile application",
        "Enhanced ML models"
      ]
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
            <ScrollReveal key={phase.title} delay={index * 0.2}>
              <div className="bg-navy-800/50 rounded-xl border border-blue-500/20 overflow-hidden">
                {/* Phase Header */}
                <div className="p-6 border-b border-blue-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg">
                        <Cpu className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-100">{phase.title}</h3>
                        <p className="text-blue-400">{phase.date}</p>
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
                  <p className="text-blue-100/80">{phase.description}</p>
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