import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            className="flex justify-center items-center space-x-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Code2 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">DataFormatter</span>
          </motion.div>

          <motion.p
            className="text-gray-300 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A modern, client-side JSON formatter built with React and designed for developers.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="p-3 glass rounded-xl hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-gray-300" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="border-t border-gray-800 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>by developers, for developers</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2025 DataFormatter. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;