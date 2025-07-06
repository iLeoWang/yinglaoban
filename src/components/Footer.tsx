import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { BsRocketFill } from 'react-icons/bs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
      className="bg-black/20 backdrop-blur-sm border-t border-white/10 text-gray-400"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center sm:text-left"
          >
            <p className="text-sm text-gray-300">
              &copy; {currentYear} 软考纪念章生成器. All Rights Reserved.
            </p>
            <p className="text-xs mt-1 flex items-center justify-center sm:justify-start gap-1">
              由
              <motion.a
                href="https://github.com/iLeoWang/yinglaoban"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-3 h-3" />
                莹核动力
              </motion.a>

              驱动
              <motion.span
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block text-red-500"
              >
                <BsRocketFill className="w-4 h-4" />
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center sm:text-right"
          >
            <p className="text-xs text-gray-400">让每一份成就都值得纪念</p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
