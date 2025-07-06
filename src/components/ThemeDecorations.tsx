import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconDroplets, IconFlower, IconCode, IconSparkles, IconBolt } from '@tabler/icons-react';

interface ThemeDecorationsProps {
  themeId: string;
  color: string;
}

// 火焰粒子效果 - 烈焰荣耀
const FlameParticles = ({ color }: { color: string }) => {
  const flameColors = ['#FFD700', '#FF8C00', '#FF6347', '#DC143C', '#8B0000'];
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 100 + Math.random() * 20,
    delay: Math.random() * 4,
    size: Math.random() * 10 + 6,
    colorIndex: Math.floor(Math.random() * flameColors.length),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 火焰粒子 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y - 100}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${flameColors[0]} 0%, ${flameColors[1]} 25%, ${flameColors[2]} 50%, ${flameColors[3]} 75%, ${flameColors[4]} 100%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [-30, -100],
            opacity: [0, 1, 0.9, 0],
            scale: [0.2, 1, 1.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* 火花轨迹 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-0.5 h-8"
          style={{
            left: `${15 + i * 8}%`,
            bottom: `${Math.random() * 40}%`,
            background: `linear-gradient(0deg, transparent 0%, ${flameColors[i % flameColors.length]} 50%, transparent 100%)`,
            transformOrigin: 'bottom',
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* 热浪效果 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`heatwave-${i}`}
          className="absolute w-full h-20 opacity-20"
          style={{
            bottom: `${i * 25}%`,
            background: `linear-gradient(90deg, transparent 0%, ${flameColors[1]}40 50%, transparent 100%)`,
            filter: 'blur(2px)',
          }}
          animate={{
            x: [-50, 50],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 水波纹效果 - 数字深海
const WaveRipples = ({ color }: { color: string }) => {
  const oceanColors = ['#60a5fa', '#3b82f6', '#1e40af', '#1e3a8a', '#0a0a23'];
  const waves = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 1.2,
    scale: 1 + i * 0.4,
    colorIndex: i % oceanColors.length,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 深海波浪层 */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className="absolute w-full h-full rounded-full border-2 opacity-25"
          style={{
            left: '50%',
            top: '50%',
            borderColor: oceanColors[wave.colorIndex],
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 20px ${oceanColors[wave.colorIndex]}40`,
          }}
          animate={{
            scale: [0, wave.scale * 2.5],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: wave.delay,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* 深海气泡群 */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10%',
            width: `${Math.random() * 12 + 3}px`,
            height: `${Math.random() * 12 + 3}px`,
            background: `radial-gradient(circle, ${oceanColors[i % oceanColors.length]}80 0%, transparent 70%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [-30, -350],
            x: [0, Math.sin(i) * 60],
            opacity: [0, 0.8, 0],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* 数字洋流 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`current-${i}`}
          className="absolute text-sm font-mono font-bold"
          style={{
            left: `${5 + i * 8}%`,
            top: '110%',
            color: oceanColors[i % oceanColors.length],
            textShadow: `0 0 8px ${oceanColors[i % oceanColors.length]}`,
          }}
          animate={{
            y: [-50, -450],
            opacity: [0, 1, 0.7, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
        >
          {['0', '1', 'Ω', '∞', '◊', '※'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
      
      {/* 深海光束 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-px h-full"
          style={{
            left: `${25 + i * 20}%`,
            background: `linear-gradient(0deg, transparent 0%, ${oceanColors[1]}60 30%, ${oceanColors[0]} 50%, ${oceanColors[1]}60 70%, transparent 100%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
};

// 玫瑰花瓣效果 - 钛金玫瑰
const RosePetals = ({ color }: { color: string }) => {
  const roseColors = ['#f3e8ff', '#c8b2db', '#8b7ca6', '#5d4e75', '#2d1b2e'];
  const metallicColors = ['#F8BBD9', '#E879F9', '#DDD6FE', '#C084FC'];
  
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 12 + 8,
    rotation: Math.random() * 360,
    colorIndex: i % roseColors.length,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 优雅花瓣 */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.6}px`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.9, 0.2],
            rotate: [petal.rotation, petal.rotation + 270],
            scale: [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from ${petal.rotation}deg, ${roseColors[0]} 0%, ${roseColors[1]} 25%, ${roseColors[2]} 50%, ${roseColors[3]} 75%, ${roseColors[4]} 100%)`,
              borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
              filter: 'blur(0.5px)',
              boxShadow: `0 0 15px ${roseColors[petal.colorIndex]}60`,
            }}
          />
        </motion.div>
      ))}
      
      {/* 钛金光束 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-0.5 h-full"
          style={{
            left: `${15 + i * 15}%`,
            background: `linear-gradient(0deg, transparent 0%, ${metallicColors[i % metallicColors.length]}80 30%, ${metallicColors[0]} 50%, ${metallicColors[i % metallicColors.length]}80 70%, transparent 100%)`,
            transform: `rotate(${i * 30}deg)`,
            transformOrigin: 'center',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* 金属粒子云 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + Math.sin(i * 0.5) * 30}%`,
            background: `radial-gradient(circle, ${metallicColors[i % metallicColors.length]} 0%, transparent 70%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            scale: [0.3, 1.2, 0.3],
            opacity: [0.4, 1, 0.4],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* 璀璨星钻 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute w-2 h-2"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(${metallicColors.join(', ')})`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: 'drop-shadow(0 0 6px rgba(248, 187, 217, 0.8))',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// 代码雨效果 - 赛博矩阵
const CodeRain = ({ color }: { color: string }) => {
  const matrixChars = ['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', '∞', '◊', '※', '§'];
  const cyberColors = ['#4ade80', '#22c55e', '#1a2332', '#0d1421', '#000000'];
  const accentColors = ['#00FF88', '#22D3EE', '#86EFAC', '#10B981'];
  
  const codeLines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i * 8.33) + Math.random() * 4,
    delay: Math.random() * 4,
    speed: Math.random() * 3 + 2,
    colorIndex: i % cyberColors.length,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 高密度矩阵字符雨 */}
      {codeLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute flex flex-col items-center"
          style={{
            left: `${line.x}%`,
            top: '-40%',
          }}
          animate={{
            y: ['0%', '140%'],
          }}
          transition={{
            duration: line.speed + 3,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
          }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <motion.div
              key={j}
              className="mb-0.5 text-sm font-mono font-bold"
              style={{
                color: accentColors[j % accentColors.length],
                textShadow: `0 0 8px ${accentColors[j % accentColors.length]}`,
                filter: 'brightness(1.2)',
              }}
              animate={{
                opacity: [0, 1, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: j * 0.08,
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </motion.div>
          ))}
        </motion.div>
      ))}
      
      {/* 动态网格系统 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`grid-h-${i}`}
          className="absolute w-full h-px"
          style={{
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent 0%, ${accentColors[0]}60 20%, ${accentColors[1]} 50%, ${accentColors[0]}60 80%, transparent 100%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
      
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`grid-v-${i}`}
          className="absolute h-full w-px"
          style={{
            left: `${15 + i * 15}%`,
            background: `linear-gradient(0deg, transparent 0%, ${accentColors[2]}60 20%, ${accentColors[3]} 50%, ${accentColors[2]}60 80%, transparent 100%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.6 + 2,
          }}
        />
      ))}
      
      {/* 数据包传输 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`packet-${i}`}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${5 + i * 12}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            background: `linear-gradient(45deg, ${accentColors[i % accentColors.length]} 0%, transparent 100%)`,
            boxShadow: `0 0 12px ${accentColors[i % accentColors.length]}`,
          }}
          animate={{
            x: [-60, 400],
            opacity: [0, 1, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* 系统脉冲 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2"
          style={{
            left: '50%',
            top: '50%',
            width: '30px',
            height: '30px',
            marginLeft: '-15px',
            marginTop: '-15px',
            borderColor: accentColors[i],
          }}
          animate={{
            scale: [0, 3],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// 彩虹粒子效果 - 幻彩琉璃
const RainbowParticles = ({ color }: { color: string }) => {
  const spectrumColors = ['#eab308', '#f97316', '#ec4899', '#a855f7', '#7c3aed', '#4c1d95'];
  const accentColors = ['#FBBF24', '#F472B6', '#C084FC', '#A78BFA'];
  
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    colorIndex: i % spectrumColors.length,
    size: Math.random() * 6 + 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 光谱流动背景 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`spectrum-${i}`}
          className="absolute w-full h-3"
          style={{
            top: `${10 + i * 12}%`,
            background: `linear-gradient(90deg, ${spectrumColors.join(', ')})`,
            opacity: 0.15,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [-150, 150],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* 琉璃粒子群 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${spectrumColors[particle.colorIndex]} 0%, ${spectrumColors[(particle.colorIndex + 1) % spectrumColors.length]}80 50%, transparent 100%)`,
            boxShadow: `0 0 15px ${spectrumColors[particle.colorIndex]}`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            scale: [0.2, 1.5, 0.2],
            rotate: [0, 720],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* 幻彩波纹 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute rounded-full border-2"
          style={{
            left: '50%',
            top: '50%',
            width: '25px',
            height: '25px',
            marginLeft: '-12.5px',
            marginTop: '-12.5px',
            borderColor: accentColors[i % accentColors.length],
            filter: 'blur(0.5px)',
          }}
          animate={{
            scale: [0, 5],
            opacity: [0.9, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* 光谱星座 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`constellation-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 6}%`,
            top: `${25 + Math.sin(i * 0.8) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          <div
            className="w-3 h-3"
            style={{
              background: `conic-gradient(from ${i * 30}deg, ${spectrumColors.join(', ')})`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))',
            }}
          />
        </motion.div>
      ))}
      
      {/* 琉璃光束 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute w-px h-full"
          style={{
            left: `${20 + i * 15}%`,
            background: `linear-gradient(0deg, transparent 0%, ${accentColors[i % accentColors.length]}80 30%, ${accentColors[(i + 1) % accentColors.length]} 50%, ${accentColors[i % accentColors.length]}80 70%, transparent 100%)`,
            transform: `rotate(${i * 15}deg)`,
            transformOrigin: 'center',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleY: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
};

// 金属光泽效果 - 钨钢黑
const MetallicGlow = ({ color }: { color: string }) => {
  const steelColors = ['#d1d5db', '#6b7280', '#374151', '#1f2937', '#000000'];
  const accentColors = ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF'];
  
  const glowElements = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: (i * 10) + Math.random() * 8,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 钢铁反光条 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`reflection-${i}`}
          className="absolute w-1 h-full"
          style={{
            left: `${15 + i * 15}%`,
            background: `linear-gradient(0deg, transparent 0%, ${accentColors[0]}90 20%, ${accentColors[1]} 40%, ${accentColors[2]} 60%, ${accentColors[3]}90 80%, transparent 100%)`,
            transform: 'skewX(-20deg)',
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        />
      ))}
      
      {/* 激光扫描线 */}
      <motion.div
        className="absolute w-full h-0.5"
        style={{
          top: '50%',
          background: `linear-gradient(90deg, transparent 0%, ${accentColors[0]}40 20%, ${accentColors[1]} 50%, ${accentColors[0]}40 80%, transparent 100%)`,
          boxShadow: `0 0 25px ${accentColors[1]}`,
          filter: 'blur(1px)',
        }}
        animate={{
          y: [-250, 250],
          opacity: [0, 1, 0.8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 钨钢粒子 */}
      {glowElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            scale: [0.3, 1.8, 0.3],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 270],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `conic-gradient(from ${element.id * 36}deg, ${steelColors.join(', ')})`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              filter: 'drop-shadow(0 0 6px rgba(209, 213, 219, 0.8))',
            }}
          />
        </motion.div>
      ))}
      
      {/* 工业环形结构 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`structure-${i}`}
          className="absolute rounded-full border-2"
          style={{
            left: '50%',
            top: '50%',
            width: `${80 + i * 50}px`,
            height: `${80 + i * 50}px`,
            marginLeft: `${-40 - i * 25}px`,
            marginTop: `${-40 - i * 25}px`,
            borderColor: accentColors[i % accentColors.length],
            borderStyle: 'dashed',
            opacity: 0.3,
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* 金属火花 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: accentColors[i % accentColors.length],
            boxShadow: `0 0 8px ${accentColors[i % accentColors.length]}`,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* 数据流线 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`dataline-${i}`}
          className="absolute w-full h-px"
          style={{
            top: `${20 + i * 12}%`,
            background: `linear-gradient(90deg, transparent 0%, ${accentColors[2]}60 30%, ${accentColors[1]}80 50%, ${accentColors[2]}60 70%, transparent 100%)`,
            opacity: 0.4,
          }}
          animate={{
            x: [-100, 100],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const ThemeDecorations: React.FC<ThemeDecorationsProps> = ({ themeId, color }) => {
  const decorationComponent = useMemo(() => {
    switch (themeId) {
      case 'crimson-core':
        return <FlameParticles color={color} />;
      case 'digital-ocean':
        return <WaveRipples color={color} />;
      case 'titanium-rose':
        return <RosePetals color={color} />;
      case 'cyber-matrix':
        return <CodeRain color={color} />;
      case 'liquid-glass':
        return <RainbowParticles color={color} />;
      case 'tungsten-black':
        return <MetallicGlow color={color} />;
      default:
        return null;
    }
  }, [themeId, color]);

  return decorationComponent;
};

export default ThemeDecorations;