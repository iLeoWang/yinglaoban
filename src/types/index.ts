import { z } from "zod";

// Zod schema for form validation
export const formSchema = z.object({
    name: z
        .string()
        .min(2, "姓名至少需要2个字符")
        .max(10, "姓名不能超过10个字符"),
    certificateType: z.string({
        required_error: "请选择一个证书类型",
    }),
    issueDate: z.date({
        required_error: "请选择一个发证日期",
    }),
    theme: z.enum([
        "titanium-rose",
        "crimson-core",
        "digital-ocean",
        "cherry-blossom",
    ]),
    customMessage: z.string().max(50, "自定义消息不能超过50个字符").optional(),
});

// 证书数据类型 - 从 Zod schema 推断
export type CertificateData = z.infer<typeof formSchema>;

// 导出选项
export interface ExportOptions {
    format: "png" | "jpeg";
    quality: number;
    scale: number;
    width: number;
    height: number;
}

// 主题配置
export interface ThemeConfig {
    id: string;
    name: string;
    gradient?: string;
    textColor: string;
    nameColor?: string;
    certColor?: string;
    dateColor?: string;
    starColor?: string;
}

// 证书类型选项
export interface CertificateType {
    value: string;
    label: string;
    category: string;
    description: string;
}

// 组件Props类型
export interface PreviewCanvasProps {
    data: CertificateData;
    theme: ThemeConfig;
    className?: string;
    style?: React.CSSProperties;
    onRender?: (canvas: HTMLCanvasElement) => void;
}

// 常量类型
export const CERTIFICATE_TYPES: CertificateType[] = [
    {
        value: "info-sys-project-manager",
        label: "信息系统项目管理师",
        category: "高级",
        description: "负责信息系统建设项目的管理，确保项目成功。",
    },
    {
        value: "system-analyst",
        label: "系统分析师",
        category: "高级",
        description: "负责信息系统的需求分析与业务建模。",
    },
    {
        value: "system-architect",
        label: "系统架构设计师",
        category: "高级",
        description: "负责信息系统的技术选型、架构设计与实现。",
    },
    {
        value: "network-architect",
        label: "网络规划设计师",
        category: "高级",
        description: "负责企业级网络架构的规划、设计与优化。",
    },
    {
        value: "system-planner-manager",
        label: "系统规划与管理师",
        category: "高级",
        description: "负责企业信息化的战略规划与系统运行管理。",
    },
];

export const THEMES: ThemeConfig[] = [
    {
        id: "titanium-rose",
        name: "星辰玫瑰",
        gradient:
            "linear-gradient(135deg, #2d1b2e 0%, #5d4e75 25%, #8b7ca6 50%, #c8b2db 75%, #f3e8ff 100%)",
        textColor: "#ffffff",
        nameColor: "#F8BBD9",
        certColor: "#E879F9",
        dateColor: "#DDD6FE",
        starColor: "#C084FC",
    },
    {
        id: "crimson-core",
        name: "赤金荣耀",
        gradient:
            "linear-gradient(135deg, #1a0404 0%, #8B0000 25%, #DC143C 50%, #FF6347 75%, #FFD700 100%)",
        textColor: "#ffffff",
        nameColor: "#FFD700",
        certColor: "#FF8C00",
        dateColor: "#FFA07A",
        starColor: "#FF4500",
    },
    {
        id: "digital-ocean",
        name: "静谧深蓝",
        gradient:
            "linear-gradient(135deg, #0a0a23 0%, #1e3a8a 25%, #1e40af 50%, #3b82f6 75%, #60a5fa 100%)",
        textColor: "#ffffff",
        nameColor: "#00D4FF",
        certColor: "#38BDF8",
        dateColor: "#7DD3FC",
        starColor: "#0EA5E9",
    },
    {
        id: "cherry-blossom",
        name: "春日序曲",
        gradient:
            "linear-gradient(135deg, #4A0E2E 0%, #8B2252 50%, #C75A8A 100%)",
        textColor: "#ffffff",
        nameColor: "#FFB6C1",
        certColor: "#FFC0CB",
        dateColor: "#FFD1DC",
        starColor: "#FFE4E1",
    },
];

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
    format: "png",
    quality: 0.95,
    scale: 3,
    width: 1080,
    height: 1080,
};
