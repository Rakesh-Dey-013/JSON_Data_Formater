import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Edit3, 
  Palette, 
  Copy, 
  Download, 
  CheckCircle, 
  Bell, 
  Zap, 
  Shield 
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Drag & Drop JSON Files',
      description: 'Simply drag and drop your JSON files for instant formatting and validation.',
    },
    {
      icon: Edit3,
      title: 'Paste Raw JSON',
      description: 'Copy and paste your JSON data directly into our intuitive textarea editor.',
    },
    {
      icon: Palette,
      title: 'Auto Beautify & Syntax Highlight',
      description: 'Automatically format and colorize your JSON with beautiful syntax highlighting.',
    },
    {
      icon: Copy,
      title: 'Copy to Clipboard',
      description: 'One-click copying to your clipboard with visual confirmation feedback.',
    },
    {
      icon: Download,
      title: 'Download Formatted JSON',
      description: 'Export your beautifully formatted JSON files with a single click.',
    },
    {
      icon: CheckCircle,
      title: 'Real-time Validation',
      description: 'Instant validation with clear error messages and line-by-line feedback.',
    },
    {
      icon: Bell,
      title: 'Toast Notifications',
      description: 'Elegant notifications keep you informed of all actions and results.',
    },
    {
      icon: Zap,
      title: 'Animated Transitions',
      description: 'Smooth, delightful animations that enhance the user experience.',
    },
    {
      icon: Shield,
      title: 'Secure Client-side Processing',
      description: 'All processing happens in your browser. Your data never leaves your device.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to format, validate, and work with JSON data efficiently
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
                <div className="h-full w-full rounded-2xl bg-zinc-900/90 backdrop-blur-md" />
              </div>
              <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;