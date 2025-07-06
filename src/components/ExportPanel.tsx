import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, AlertCircle } from 'lucide-react';
import { CertificateData, ExportOptions, DEFAULT_EXPORT_OPTIONS } from '../types';

interface ExportPanelProps {
  data: CertificateData;
  onExport: (options: ExportOptions) => void;
  isExporting: boolean;
}

const formatOptions = [
  { value: 'png', label: 'PNG', description: '无损压缩，适合打印', fileSize: '较大' },
  { value: 'jpeg', label: 'JPEG', description: '文件更小，适合网络分享', fileSize: '较小' },
] as const;

const resolutionOptions = [
  { width: 1080, height: 1080, label: '1080x1080', description: '社交媒体标准', estimatedSize: '约1MB' },
  { width: 1920, height: 1920, label: '1920x1920', description: '高清版本', estimatedSize: '约3MB' },
  { width: 2160, height: 2160, label: '2160x2160', description: '4K超清', estimatedSize: '约5MB' },
] as const;

const qualityOptions = [
  { value: 0.8, label: '标准', description: '文件较小', percentage: 80 },
  { value: 0.9, label: '高', description: '平衡效果', percentage: 90 },
  { value: 0.95, label: '最佳', description: '最佳效果', percentage: 95 },
] as const;

const ExportPanel: React.FC<ExportPanelProps> = ({ data, onExport, isExporting }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>(DEFAULT_EXPORT_OPTIONS);
  const [nameError, setNameError] = useState(false);

  const handleExport = () => {
    if (!data.name.trim()) {
      setNameError(true);
      setTimeout(() => setNameError(false), 3000);
      return;
    }
    setNameError(false);
    onExport(exportOptions);
  };

  // 获取当前选择的估算文件大小
  const getEstimatedFileSize = () => {
    const resolution = resolutionOptions.find(r => r.width === exportOptions.width);
    const quality = qualityOptions.find(q => q.value === exportOptions.quality);
    const format = formatOptions.find(f => f.value === exportOptions.format);
    
    if (!resolution || !quality || !format) return '';
    
    const baseSize = resolution.estimatedSize;
    const qualityMultiplier = quality.percentage / 100;
    const formatMultiplier = format.value === 'jpeg' ? 0.7 : 1;
    
    return `预估大小: ${baseSize.replace(/\d+/, (match) => 
      Math.round(parseInt(match) * qualityMultiplier * formatMultiplier).toString()
    )}`;
  };

  return (
    <div className="space-y-6">
      {/* 文件格式 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <label>文件格式</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formatOptions.map((format) => (
            <button
              key={format.value}
              onClick={() => setExportOptions((prev) => ({ ...prev, format: format.value as any }))}
              className={`p-2.5 rounded-lg text-left transition-all duration-200 border ${
                exportOptions.format === format.value
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-white/5 hover:border-primary/50'
              }`}
            >
              <div className="font-semibold text-sm text-foreground">{format.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{format.description}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* 图片分辨率 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <label>图片分辨率</label>
        <div className="space-y-2">
          {resolutionOptions.map((resolution) => (
            <button
              key={resolution.label}
              onClick={() =>
                setExportOptions((prev) => ({
                  ...prev,
                  width: resolution.width,
                  height: resolution.height,
                }))
              }
              className={`w-full p-2.5 rounded-lg text-left transition-all duration-200 border ${
                exportOptions.width === resolution.width
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-white/5 hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm text-foreground">{resolution.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{resolution.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {resolution.estimatedSize}
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* 图片质量 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <label>图片质量</label>
        <div className="space-y-2">
          {qualityOptions.map((quality) => (
            <button
              key={quality.value}
              onClick={() => setExportOptions((prev) => ({ ...prev, quality: quality.value }))}
              className={`w-full p-2.5 rounded-lg text-left transition-all duration-200 border ${
                exportOptions.quality === quality.value
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 bg-white/5 hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm text-foreground">{quality.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{quality.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {quality.percentage}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {nameError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center space-x-2 text-sm text-destructive-foreground bg-destructive/20 p-3 rounded-xl border border-destructive/50"
        >
          <AlertCircle className="h-5 w-5" />
          <span>在导出前，请输入您的姓名。</span>
        </motion.div>
      )}

      {/* 导出按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <button
          onClick={handleExport}
          disabled={isExporting || !data.name.trim()}
          className="w-full py-3 px-4 rounded-lg font-semibold text-primary-foreground transition-all duration-300 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isExporting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>正在生成...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Download className="h-6 w-6" />
              <span>生成并导出纪念章</span>
            </div>
          )}
        </button>
        {/* 文件大小预估 */}
        {!isExporting && (
          <div className="text-xs text-center text-muted-foreground mt-2">
            {getEstimatedFileSize()}
          </div>
        )}
      </motion.div>

      {/* 提示信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 p-3 rounded-lg border border-white/10"
      >
        <div className="flex items-start space-x-3">
          <div className="text-primary">
            <AlertCircle className="h-5 w-5 mt-[-1px]" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">导出指南:</p>
            <ul className="space-y-1 text-xs list-disc list-inside">
              <li>生成的图片将直接下载到您的设备。</li>
              <li>文件名格式为：软考纪念章_姓名_日期。</li>
              <li>为获得最佳打印质量，建议选择 PNG 格式。</li>
              <li>高分辨率图片（如 4K）更适合打印和展示。</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExportPanel;
