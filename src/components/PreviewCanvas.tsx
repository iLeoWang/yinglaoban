import React, { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CertificateData, ThemeConfig, CERTIFICATE_TYPES } from '../types';
import ThemeDecorations from './ThemeDecorations';

interface PreviewCanvasProps {
  data: CertificateData;
  theme: ThemeConfig;
  className?: string;
  style?: React.CSSProperties;
}

const Sparkles = React.memo(({ color }: { color: string }) => {
  const SPARKLE_COUNT = 20; // 减少粒子数量优化性能

  // 使用useMemo缓存粒子配置
  const sparkles = React.useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full sparkle will-change-transform"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: color,
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

const Laurel = React.memo(({ color, className }: { color: string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 200"
    className={`${className} will-change-transform`}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path
      d="M50,2 C 80,25 80,75 50,100 M50,100 C 20,75 20,25 50,2"
      opacity="0.2"
    />
    <path
      d="M50,2 C 60,25 60,75 50,100 C 40,75 40,25 50,2"
      opacity="0.4"
    />
    <path
      d="M50,25 C 65,40 65,60 50,75 C 35,60 35,40 50,25"
      opacity="0.6"
    />
    <path
      d="M50,45 C 55,55 55,45 50,55"
      opacity="0.8"
    />
  </svg>
));

const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(
  ({ data, theme, className = '', style }, ref) => {
    const canvasRef = useRef<HTMLDivElement>(null);

    // 使用useMemo优化计算
    const certificateLabel = React.useMemo(() => {
      const certType = CERTIFICATE_TYPES.find((type) => type.value === data.certificateType);
      return certType?.label || '软考高级证书';
    }, [data.certificateType]);

    const formattedDate = React.useMemo(() => {
      if (!data.issueDate) return '';
      const dateObj =
        typeof data.issueDate === 'string' ? new Date(data.issueDate) : data.issueDate;
      return `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
    }, [data.issueDate]);

    return (
      <div
        ref={ref || canvasRef}
        className={`${className}`}
        style={style}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ background: theme.gradient }}
          className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex flex-col items-center justify-center p-3 sm:p-6 shadow-2xl overflow-hidden will-change-transform`}
        >
          {/* 主题专属装饰 */}
          <ThemeDecorations
            key={theme.id}
            themeId={theme.id}
            color={theme.starColor || '#FFFFFF'}
          />

          {/* 背景装饰 */}
          <Sparkles color={theme.starColor || '#FFFFFF'} />

          {/* 外环装饰 - 优化动画性能 */}
          <motion.div
            className="absolute inset-0 border-4 rounded-full will-change-transform"
            style={{ borderColor: theme.starColor || '#FFFFFF' }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1.05, 1.08, 1.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
            }}
          />

          {/* 内容区域 */}
          <div className="relative z-10 text-center space-y-1 sm:space-y-2">
            {/* 标题 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-base sm:text-lg font-bold text-shadow`}
              style={{ color: theme.textColor }}
            >
              软考纪念章
            </motion.div>

            {/* 证书类型 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, ease: 'easeOut' }}
              className={`text-xs sm:text-sm opacity-90 font-medium`}
              style={{ color: theme.certColor || theme.textColor }}
            >
              {certificateLabel}
            </motion.div>

            {/* 姓名 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl sm:text-2xl font-bold text-shadow`}
              style={{
                color: theme.nameColor || theme.textColor,
                textShadow: `0 0 10px ${theme.nameColor || theme.textColor}40`,
              }}
            >
              {data.name || '请输入姓名'}
            </motion.div>

            {/* 发证日期 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, ease: 'easeOut' }}
              className={`text-[10px] sm:text-xs opacity-80 font-medium`}
              style={{ color: theme.dateColor || theme.textColor }}
            >
              {formattedDate}
            </motion.div>

            {/* 自定义消息 */}
            {data.customMessage && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className={`text-[10px] sm:text-xs opacity-90 max-w-[160px] sm:max-w-48 mx-auto`}
                style={{ color: theme.textColor }}
              >
                {data.customMessage}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  },
);

PreviewCanvas.displayName = 'PreviewCanvas';

export default PreviewCanvas;
