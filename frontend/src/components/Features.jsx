import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, LineChart, Shield, Lock, Cpu, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'framer-motion';

// Create a ScrollReveal component
const ScrollReveal = ({ children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI Pattern Recognition",
      description: "Our advanced neural networks analyze transaction patterns in real-time to detect potential market manipulation. Using sophisticated machine learning algorithms, we identify suspicious trading activities before they impact the market.",
      status: "In Development",
      completion: 80
    },
    {
      icon: Network,
      title: "Social Integration",
      description: "Correlate on-chain activities with social media presence to create comprehensive trader profiles. Track wallet clusters and identify coordinated trading groups.",
      status: "Coming Soon",
      completion: 60
    },
    {
      icon: Shield,
      title: "Manipulation Detection",
      description: "Identify pump-and-dump schemes, wash trading, and other forms of market manipulation through real-time monitoring and historical pattern analysis.",
      status: "In Testing",
      completion: 90
    },
    {
      icon: Lock,
      title: "Secure Analysis",
      description: "Private and secure analysis of blockchain data with zero-knowledge proofs ensuring user privacy while maintaining transparency.",
      status: "Planned",
      completion: 40
    },
    {
      icon: Cpu,
      title: "Advanced Analytics",
      description: "Deep dive into transaction flows, liquidity patterns, and wallet behaviors with our comprehensive analytics suite.",
      status: "In Development",
      completion: 70
    },
    {
      icon: LineChart,
      title: "More Features TBA",
      description: "Our roadmap includes additional features that will revolutionize blockchain analysis. Stay tuned for updates.",
      status: "Planned",
      completion: 20
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
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6"
            >
              Platform Features
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100/80 max-w-3xl mx-auto"
            >
              Discover how IGES AI is revolutionizing blockchain analysis with cutting-edge technology
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title}>
              <div className="bg-navy-800/50 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-100 font-display">{feature.title}</h3>
                </div>
                
                <p className="text-blue-200/80 mb-4 font-sans">{feature.description}</p>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-400 font-tech">{feature.status}</span>
                    <span className="text-sm text-blue-400">{feature.completion}%</span>
                  </div>
                  <div className="h-1 bg-navy-900 rounded-full">
                    <div 
                      className="h-1 bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${feature.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Coming Soon Section */}
        <ScrollReveal>
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">More Features Coming Soon</h2>
            <p className="text-blue-200/80">
              Our team is constantly working on new features to enhance your blockchain analysis capabilities.
              <br />
              Join our waitlist to stay updated on new developments.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Features; 