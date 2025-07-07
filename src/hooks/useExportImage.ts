import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { ExportOptions } from "../types";

export const useExportImage = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const exportImage = useCallback(
        async (
            element: HTMLElement,
            options: ExportOptions
        ): Promise<string> => {
            setIsExporting(true);
            setError(null);

            try {
                // 检测移动设备并调整配置
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const mobileScale = isMobile ? Math.min(options.scale || 2, 2) : (options.scale || 3);
                
                // 配置html2canvas选项
                // 优化canvas配置
                const canvas = await html2canvas(element, {
                    scale: mobileScale,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                    logging: false,
                    // 性能优化
                    removeContainer: true,
                    foreignObjectRendering: !isMobile, // 移动端禁用以提高兼容性
                    // 处理跨域图片和字体
                    onclone: (clonedDoc) => {
                        // 确保字体已加载并优化渲染
                        const style = clonedDoc.createElement("style");
                        style.textContent = `
                            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');
                            * {
                                font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif !important;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                                text-rendering: optimizeLegibility;
                            }
                            /* 确保动画在截图时停止 */
                            *, *::before, *::after {
                                animation-duration: 0s !important;
                                animation-delay: 0s !important;
                                transition-duration: 0s !important;
                                transition-delay: 0s !important;
                            }
                        `;
                        clonedDoc.head.appendChild(style);
                    },
                });

                // 移动端尺寸限制检查
                const maxMobileSize = 2048; // 移动端最大尺寸限制
                let finalWidth = options.width;
                let finalHeight = options.height;
                
                if (isMobile && (finalWidth > maxMobileSize || finalHeight > maxMobileSize)) {
                    const ratio = Math.min(maxMobileSize / finalWidth, maxMobileSize / finalHeight);
                    finalWidth = Math.floor(finalWidth * ratio);
                    finalHeight = Math.floor(finalHeight * ratio);
                    console.log(`移动端尺寸调整: ${options.width}x${options.height} -> ${finalWidth}x${finalHeight}`);
                }

                // 创建新的canvas用于调整大小
                const finalCanvas = document.createElement("canvas");
                const ctx = finalCanvas.getContext("2d");

                if (!ctx) {
                    throw new Error("无法获取Canvas上下文");
                }

                // 设置最终尺寸
                finalCanvas.width = finalWidth;
                finalCanvas.height = finalHeight;

                // 优化图片绘制质量
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";

                // 使用更好的缩放算法
                const sourceRatio = canvas.width / canvas.height;
                const targetRatio = finalWidth / finalHeight;

                let drawWidth = finalWidth;
                let drawHeight = finalHeight;
                let offsetX = 0;
                let offsetY = 0;

                // 保持宽高比，居中绘制
                if (sourceRatio > targetRatio) {
                    drawHeight = finalWidth / sourceRatio;
                    offsetY = (finalHeight - drawHeight) / 2;
                } else {
                    drawWidth = finalHeight * sourceRatio;
                    offsetX = (finalWidth - drawWidth) / 2;
                }

                // 填充背景（如果需要）
                if (offsetX > 0 || offsetY > 0) {
                    ctx.fillStyle = 'transparent';
                    ctx.fillRect(0, 0, finalWidth, finalHeight);
                }

                ctx.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);

                // 导出图片并优化质量
                const mimeType = options.format === "jpeg" ? "image/jpeg" : "image/png";
                
                // 移动端使用较低质量以避免内存问题
                const finalQuality = isMobile ? Math.min(options.quality, 0.8) : options.quality;
                
                let dataUrl: string;
                try {
                    dataUrl = finalCanvas.toDataURL(mimeType, finalQuality);
                } catch (canvasError) {
                    console.error('Canvas导出失败:', canvasError);
                    // 尝试使用更低的质量重试
                    if (isMobile && finalQuality > 0.5) {
                        console.log('尝试使用更低质量重新导出...');
                        dataUrl = finalCanvas.toDataURL(mimeType, 0.5);
                    } else {
                        throw new Error('图片生成失败，请尝试选择较小的尺寸');
                    }
                }

                // 验证导出结果
                if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 100) {
                    throw new Error('图片导出失败，请重试');
                }
                
                console.log(`图片生成成功: ${finalWidth}x${finalHeight}, 大小: ${Math.round(dataUrl.length / 1024)}KB`);

                // 根据设备类型处理下载
                if (isMobile) {
                    // 移动端不自动下载，只返回dataUrl供预览
                    console.log('移动端检测到，返回图片用于预览');
                } else {
                    // 桌面端触发下载
                    const link = document.createElement('a');
                    link.download = `软考纪念章_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.${options.format}`;
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }

                return dataUrl;
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "导出失败";
                setError(errorMessage);
                throw new Error(errorMessage);
            } finally {
                setIsExporting(false);
            }
        },
        []
    );

    return {
        exportImage,
        isExporting,
        error,
    };
};
