# 🎖️ 软考纪念章生成器

一个专为软考高级证书获得者打造的纪念章生成工具，支持个性化定制、高清图片导出和微信分享功能。

## ✨ 功能特性

-   **🎨 个性化定制**：支持姓名、证书类型、发证日期等信息定制
-   **🎭 多种主题**：赤色核心、数字深海、钛金玫瑰、赛博矩阵、幻彩琉璃、钨钢黑等精美主题
-   **📱 实时预览**：所见即所得的实时预览效果
-   **🖼️ 高清导出**：支持PNG/JPEG格式，多种分辨率的高清图片导出
-   **💾 数据持久化**：支持本地存储，自动保存用户输入
-   **🎨 动画效果**：流畅的动画交互和主题装饰效果
-   **📱 响应式设计**：完美适配桌面端和移动端设备

## 🛠️ 技术栈

-   **React 18** + **TypeScript** - 现代化的前端框架
-   **Vite** - 快速的构建工具和开发服务器
-   **Tailwind CSS** - 实用优先的 CSS 框架
-   **shadcn/ui** - 高质量的 React 组件库
-   **html2canvas** - 高质量的截图导出
-   **Framer Motion** - 流畅的动画效果
-   **React Hook Form**？？？？ + **Zod** - 高性能的表单处理和验证
-   **React Router** - 客户端路由管理
-   **date-fns** - 现代化的日期处理库
-   **Lucide React** + **Tabler Icons** - 精美的图标库

## 🚀 快速开始

### 环境要求

-   Node.js 18+
-   pnpm 8+ (推荐) 或 npm/yarn

### 开发流程

1.  **克隆项目**

    ```bash
    git clone https://github.com/Yinglaoban/ruankao-badge-generator.git
    cd yinglaoban
    ```

2.  **安装依赖**

    ```bash
    pnpm install
    ```

3.  **启动开发服务器**

    ```bash
    pnpm dev
    ```

4.  **访问应用**

    打开浏览器访问: `http://localhost:5173`

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📝 可用脚本

项目提供了以下 npm 脚本：

-   `pnpm dev`: 启动开发服务器
-   `pnpm build`: 构建生产版本
-   `pnpm preview`: 预览生产版本
-   `pnpm lint`: 运行 ESLint 代码检查
-   `pnpm lint:fix`: 自动修复 ESLint 问题
-   `pnpm test`: 运行单元测试
-   `pnpm test:ui`: 运行测试并打开 UI 界面

## 📁 项目结构

```
yinglaoban/
├── src/
│   ├── components/              # React组件
│   │   ├── ui/                 # 基础UI组件
│   │   ├── BadgeGenerator.tsx  # 主要生成器组件
│   │   ├── ExportPanel.tsx     # 导出面板
│   │   ├── FormControls.tsx    # 表单控件
│   │   ├── PreviewCanvas.tsx   # 预览画布
│   │   ├── ThemeSelector.tsx   # 主题选择器
│   │   ├── ThemeDecorations.tsx # 主题装饰效果
│   │   └── Footer.tsx          # 页脚组件
│   ├── hooks/                  # 自定义Hook
│   │   ├── useExportImage.ts   # 图片导出Hook
│   │   ├── useLocalStorage.ts  # 本地存储Hook
│   │   └── useWindowSize.ts    # 窗口尺寸Hook
│   ├── types/                  # TypeScript类型定义
│   │   └── index.ts           # 主要类型定义
│   ├── lib/                    # 工具函数
│   │   └── utils.ts           # 通用工具函数
│   ├── assets/                 # 静态资源
│   ├── App.tsx                 # 主应用组件
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── public/                     # 公共静态文件
├── components.json             # shadcn/ui配置
├── package.json               # 项目依赖配置
├── tailwind.config.js         # Tailwind CSS配置
├── tsconfig.json              # TypeScript配置
├── vite.config.ts             # Vite构建配置
└── README.md                  # 项目文档
```

## 🌟 核心功能

### 1. 纪念章生成器

-   **多种证书类型**：信息系统项目管理师、系统架构设计师、网络规划设计师、系统分析师、系统规划与管理师
-   **六种精美主题**：赤色核心、数字深海、钛金玫瑰、赛博矩阵、幻彩琉璃、钨钢黑
-   **实时预览**：所见即所得的预览效果，支持主题切换
-   **高清导出**：支持PNG/JPEG格式，1080p/1920p/4K多种分辨率

### 2. 用户体验

-   **响应式设计**：完美适配桌面端和移动端
-   **流畅动画**：基于 Framer Motion 的精美动画效果
-   **主题装饰**：每个主题都有独特的粒子效果和装饰元素
-   **数据持久化**：自动保存用户输入，刷新页面不丢失

### 3. 技术特性

-   **现代化架构**：基于 React 18 + TypeScript + Vite
-   **类型安全**：完整的 TypeScript 类型定义
-   **表单验证**：基于 Zod 的强类型表单验证
-   **组件化设计**：高度模块化的组件架构

## 🔧 自定义配置

### 主题定制

项目支持自定义主题，您可以在 `src/types/index.ts` 中的 `THEMES` 数组中添加新主题：

```typescript
{
    id: "custom-theme",
    name: "自定义主题",
    gradient: "linear-gradient(135deg, #your-color1 0%, #your-color2 100%)",
    textColor: "#ffffff",
    nameColor: "#your-name-color",
    certColor: "#your-cert-color",
    dateColor: "#your-date-color",
    starColor: "#your-star-color",
}
```

### 证书类型扩展

在 `src/types/index.ts` 中的 `CERTIFICATE_TYPES` 数组中添加新的证书类型：

```typescript
{
    value: "new-certificate",
    label: "新证书类型",
    category: "高级",
    description: "证书描述",
}
```

## 🐛 常见问题

### Q: 导出的图片质量不佳？

A: 尝试选择更高的分辨率（1920x1920 或 2160x2160）和PNG格式以获得最佳质量。

### Q: 在移动端预览效果不佳？

A: 项目已针对移动端优化，确保使用现代浏览器访问以获得最佳体验。

### Q: 如何添加新的主题装饰效果？

A: 在 `src/components/ThemeDecorations.tsx` 中添加新的装饰组件，并在主组件中引用。

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者们！

---

<p align="center">
  <strong>🎯 让每一个软考证书都有专属的纪念章！</strong>
</p>
