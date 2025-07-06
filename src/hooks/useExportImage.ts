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
                // 配置html2canvas选项
                // 优化canvas配置
                const canvas = await html2canvas(element, {
                    scale: options.scale || 3,
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
                    foreignObjectRendering: true,
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

                // 创建新的canvas用于调整大小
                const finalCanvas = document.createElement("canvas");
                const ctx = finalCanvas.getContext("2d");

                if (!ctx) {
                    throw new Error("无法获取Canvas上下文");
                }

                // 设置最终尺寸
                finalCanvas.width = options.width;
                finalCanvas.height = options.height;

                // 优化图片绘制质量
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                
                // 使用更好的缩放算法
                const sourceRatio = canvas.width / canvas.height;
                const targetRatio = options.width / options.height;
                
                let drawWidth = options.width;
                let drawHeight = options.height;
                let offsetX = 0;
                let offsetY = 0;
                
                // 保持宽高比，居中绘制
                if (sourceRatio > targetRatio) {
                    drawHeight = options.width / sourceRatio;
                    offsetY = (options.height - drawHeight) / 2;
                } else {
                    drawWidth = options.height * sourceRatio;
                    offsetX = (options.width - drawWidth) / 2;
                }
                
                // 填充背景（如果需要）
                if (offsetX > 0 || offsetY > 0) {
                    ctx.fillStyle = 'transparent';
                    ctx.fillRect(0, 0, options.width, options.height);
                }
                
                ctx.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);

                // 导出图片并优化质量
                const mimeType = options.format === "jpeg" ? "image/jpeg" : "image/png";
                const dataUrl = finalCanvas.toDataURL(mimeType, options.quality);
                
                // 验证导出结果
                if (!dataUrl || dataUrl === 'data:,') {
                    throw new Error('图片导出失败，请重试');
                }
                
                // 触发下载
                const link = document.createElement('a');
                link.download = `软考纪念章_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.${options.format}`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

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
