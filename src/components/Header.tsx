import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2
      }}
      className="text-center py-6 sm:py-8 px-4"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-wide leading-tight"
      >
        软考纪念章生成器
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-2"
      >
        为您的软考成就创造专属纪念章，记录每一个重要的技术里程碑
      </motion.p>
      
      {/* 装饰性分割线 */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-6 sm:mt-8"
      />
    </motion.header>
  );
};

export default Header;