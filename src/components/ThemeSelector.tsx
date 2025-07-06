import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { CertificateData, ThemeConfig } from '../types';

interface ThemeSelectorProps {
  selectedTheme: string;
  themes: ThemeConfig[];
  onChange: (theme: string) => void;
}

// 主题预览组件优化
const ThemePreview = React.memo(
  ({
    theme,
    isSelected,
    onClick,
  }: {
    theme: ThemeConfig;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    // 将阴影效果定义为常量，便于管理
    const unselectedShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
    const selectedShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
    const glowShadow = '0 0 15px rgba(59,130,246,0.3)';

    // 使用内嵌阴影模拟未选中时的边框，避免布局抖动
    const borderShadowUnselected = 'inset 0 0 0 2px rgba(255,255,255,0.2)';
    const borderShadowUnselectedHover = 'inset 0 0 0 2px rgba(255,255,255,0.4)';

    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <motion.button
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-shadow duration-300 
          bg-clip-border backdrop-blur-sm`}
        style={{
          background: theme.gradient
            ? `linear-gradient(145deg, ${theme.gradient.split(',')[0]} 0%, ${theme.gradient.split(',')[1]} 100%)`
            : 'transparent',
          boxShadow: isSelected
            ? `${glowShadow}, ${selectedShadow}`
            : `${isHovered ? borderShadowUnselectedHover : borderShadowUnselected}, ${unselectedShadow}`
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 0.3
        }}
      >
        {/* 主题预览内容 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
            style={{
              backgroundColor: theme.starColor || '#FFFFFF',
              boxShadow: isSelected
                ? '0 0 8px rgba(0,0,0,0.2)'
                : '0 0 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* 选中指示器 */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-400/80 rounded-2xl pointer-events-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15
            }}
          />
        )}
      </motion.button>
    );
  },
);

const getThemeDescription = (themeId: string) => {
  switch (themeId) {
    case 'crimson-core':
      return '荣耀，加冕时刻';
    case 'digital-ocean':
      return '智慧，深蓝印记';
    case 'titanium-rose':
      return '耕耘，终将绽放';
    case 'cherry-blossom':
      return '喜悦，春华秋实';
    case 'summer-breeze':
      return '信念，清风拂面';
    case 'autumn-glow':
      return '收获，金色暖阳';
    default:
      return '';
  }
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, themes, onChange }) => {
  // 使用useMemo优化当前主题查找
  const selectedThemeConfig = React.useMemo(
    () => themes.find((t) => t.id === selectedTheme),
    [selectedTheme, themes],
  );

  // 使用useCallback优化事件处理
  const handleThemeChange = React.useCallback(
    (themeId: string) => {
      if (themeId !== selectedTheme) {
        onChange(themeId as CertificateData['theme']);
      }
    },
    [selectedTheme, onChange],
  );

  return (
    <div className="w-full p-4 space-y-4">
      {/* 主题网格 - 优化布局 */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 justify-items-center">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.03, // 减少延迟时间
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <ThemePreview
              theme={theme}
              isSelected={selectedTheme === theme.id}
              onClick={() => handleThemeChange(theme.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* 主题描述 - 优化动画 */}
      {selectedThemeConfig && (
        <motion.div
          key={selectedThemeConfig.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
          className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg"
        >
          <p className="text-base text-white/80 font-medium leading-relaxed tracking-wide">
            {getThemeDescription(selectedThemeConfig.id)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ThemeSelector;
