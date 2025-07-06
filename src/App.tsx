import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BadgeGenerator from './components/BadgeGenerator';
import Footer from './components/Footer';

// 页面过渡动画配置
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.4
};

function App() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-200 font-sans overflow-x-hidden">
      <main className="max-w-6xl mx-auto relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <BadgeGenerator />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="max-w-4xl mx-auto p-4 sm:p-6"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center"
                  >
                    关于软考纪念章生成器
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white/5 rounded-xl shadow-2xl p-6 sm:p-8 ring-1 ring-white/10 backdrop-blur-sm"
                  >
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                      软考纪念章生成器是一个专为软考高级证书获得者设计的个性化纪念章制作工具。
                      无论您是信息系统项目管理师、系统架构设计师还是其他高级专业技术资格的获得者，
                      都可以通过这个工具制作属于自己的专属纪念章。
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">主要功能</h2>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            个性化定制纪念章内容
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            多种精美主题样式选择
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            高清图片导出
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            响应式设计，移动端适配
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                            实时预览效果
                          </li>
                        </ul>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">支持证书</h2>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            信息系统项目管理师
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            系统架构设计师
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            网络规划设计师
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            系统分析师
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                            其他高级专业技术资格
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
