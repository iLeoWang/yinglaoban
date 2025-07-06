import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Confetti from 'react-confetti';
import { X } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CertificateData, ExportOptions, CERTIFICATE_TYPES, THEMES, formSchema } from '../types';
import PreviewCanvas from './PreviewCanvas';
import FormControls from './FormControls';
import ExportPanel from './ExportPanel';
import ThemeSelector from './ThemeSelector';
import { useExportImage } from '../hooks/useExportImage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Form } from '@/components/ui/form';
import Header from './Header';
import { Paintbrush, FileText, Share2 } from 'lucide-react';

const CONFETTI_DURATION = 8000;

const BadgeGenerator = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const [savedData, setSavedData] = useLocalStorage<CertificateData>('certificate-data', {
    name: '莹老板',
    certificateType: 'info-sys-project-manager',
    issueDate: new Date(),
    theme: 'titanium-rose',
    customMessage: '技术与颜值并存，智慧与担当齐飞！',
  });

  const form = useForm<CertificateData>({
    resolver: zodResolver(formSchema),
    defaultValues: savedData,
  });

  const { exportImage, isExporting } = useExportImage();

  const formData = form.watch();
  const selectedTheme = THEMES.find((theme) => theme.id === formData.theme) || THEMES[0];

  useEffect(() => {
    const subscription = form.watch((value) => {
      setSavedData(value as CertificateData);
    });
    return () => subscription.unsubscribe();
  }, [form, setSavedData]);

  const handleExport = useCallback(
    async (options: ExportOptions) => {
      if (!form.getValues('name').trim()) {
        form.setError('name', {
          type: 'required',
          message: '请输入姓名',
        });
        return;
      }

      if (!canvasRef.current || isExporting) return;

      try {
        const imageUrl = await exportImage(canvasRef.current, options);
        setPreviewImage(imageUrl);
        setShowPreviewModal(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
      } catch (error) {
        console.error('导出失败:', error);
      }
    },
    [exportImage, form, isExporting],
  );

  return (
    <Form {...form}>
      <div className="min-h-screen flex flex-col items-center w-full sm:p-6 lg:p-8">
        <Header />

        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 px-4 py-6 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-grow lg:w-3/5"
          >
            <div className="bg-card/80 border border-white/10 rounded-2xl shadow-2xl shadow-black/20 p-6">
              <div className="flex justify-between items-center">
                <h2 className="inline-block text-xl font-bold text-foreground tracking-wider bg-white/10 px-4 py-2 rounded-lg mb-4">
                  效果预览
                </h2>
              </div>
              <div className="bg-black/20 rounded-xl p-4 flex justify-center items-center aspect-square relative group overflow-hidden border border-white/10">
                <div
                  className="absolute inset-0 blur-3xl transition-all duration-500 group-hover:blur-4xl opacity-50 group-hover:opacity-70"
                  style={{ background: selectedTheme.gradient }}
                ></div>
                <PreviewCanvas
                  key={selectedTheme.id}
                  ref={canvasRef}
                  data={formData}
                  theme={selectedTheme}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 lg:w-2/5 space-y-6"
          >
            <div className="bg-card/80 border border-white/10 rounded-2xl shadow-2xl shadow-black/20 p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Paintbrush className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground tracking-wider">精选主题</h2>
                </div>
                <div className="-mx-6">
                  <ThemeSelector
                    selectedTheme={formData.theme!}
                    themes={THEMES}
                    onChange={(theme) => form.setValue('theme', theme as CertificateData['theme'])}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground tracking-wider">填写信息</h2>
                </div>
                <FormControls
                  certificateTypes={CERTIFICATE_TYPES}
                  control={form.control}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground tracking-wider">生成与分享</h2>
                </div>
                <ExportPanel
                  data={formData}
                  onExport={handleExport}
                  isExporting={isExporting}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showPreviewModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowPreviewModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-surface p-4 rounded-lg ring-1 ring-border shadow-2xl max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center text-gray-300 font-semibold mb-3">
                  请长按图片保存到手机
                </div>
                <img
                  src={previewImage}
                  alt="生成的纪念章"
                  className="max-w-[80vw] max-h-[80vh] rounded-md"
                />
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="absolute -top-4 -right-4 bg-surface rounded-full p-2 ring-1 ring-border shadow-lg text-gray-300 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showConfetti &&
          createPortal(
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
            />,
            document.body,
          )}
      </div>
    </Form>
  );
};

export default BadgeGenerator;
