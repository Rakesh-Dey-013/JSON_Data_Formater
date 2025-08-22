import React from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  Code2, 
  Zap, 
  Shield, 
  Palette, 
  Download,
  Github,
  ExternalLink
} from 'lucide-react';

const About: React.FC = () => {
  const tools = [
    { name: 'React', description: 'Modern UI framework' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Framer Motion', description: 'Production-ready animations' },
    { name: 'React Syntax Highlighter', description: 'Beautiful code highlighting' },
    { name: 'React Hot Toast', description: 'Elegant notifications' },
    { name: 'React Dropzone', description: 'File upload functionality' },
    { name: 'File Saver', description: 'Client-side file downloads' },
  ];

  const jsonBenefits = [
    {
      icon: Code2,
      title: 'What is JSON?',
      description: 'JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy to read and write for humans and machines.',
    },
    {
      icon: Zap,
      title: 'Why Format JSON?',
      description: 'Proper formatting makes JSON data more readable, easier to debug, and helps identify syntax errors quickly.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'All processing happens locally in your browser. Your data never leaves your device, ensuring complete privacy and security.',
    },
    {
      icon: Palette,
      title: 'Syntax Highlighting',
      description: 'Color-coded syntax makes it easier to understand the structure and identify different data types at a glance.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About DataFormatter
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn more about JSON formatting and the tools that power this application
          </p>
        </motion.div>

        {/* JSON Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {jsonBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools & Libraries */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Code2 className="h-6 w-6 mr-2" />
              Built With Modern Tools
            </h3>
            <p className="text-gray-300">
              This application is built using cutting-edge web technologies for optimal performance and user experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl p-4 transition-all duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 p-[1px] group-hover:from-blue-400/50 group-hover:via-purple-400/50 group-hover:to-teal-400/50 transition-all duration-300">
                  <div className="h-full w-full rounded-xl bg-zinc-800/90" />
                </div>
                <div className="relative z-10">
                <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-8">
            <Github className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Open Source & Free</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              DataFormatter is completely free to use and built with modern web standards. 
              No registration required, no data collection, just pure functionality.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Documentation</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;