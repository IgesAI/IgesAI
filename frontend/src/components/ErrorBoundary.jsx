import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Battle System Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <h2 className="text-xl font-bold text-red-400">
                Something went wrong
              </h2>
              <p className="text-red-300/60">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500/20 rounded-lg text-red-400 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>

          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-red-500/5 rounded-lg text-red-300/60 text-sm overflow-auto">
              {this.state.errorInfo?.componentStack}
            </pre>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
} 