import { Control } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Shuffle } from 'lucide-react';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CertificateType, formSchema } from '../types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface FormControlsProps {
  certificateTypes: CertificateType[];
  control: Control<any>;
}

// 励志金句库 - 按软考专业类别分组
const INSPIRATIONAL_QUOTES = {
  项目管理: [
    '项目管理是艺术与科学的完美结合',
    '每一个成功的项目都是团队智慧的结晶',
    '用专业的管理方法，成就卓越的项目成果',
    '项目管理让复杂变得简单，让不可能成为可能',
    '在项目管理的道路上，每一步都是成长',
    '项目成功源于团队协作，管理卓越成就未来',
    '用专业证书记录项目管理之路，用智慧引领团队前行',
    '软考认证是对项目管理能力的权威认可',
    '项目管理让每个目标都有实现的路径',
    '在项目管理的世界里，我们是成功的缔造者',
  ],
  系统分析: [
    '系统分析是理解世界的智慧之眼',
    '用逻辑思维解析复杂，用创新思维设计未来',
    '每一个需求都是用户的心声，每一次分析都是价值的创造',
    '系统分析让技术服务于业务，让创新驱动发展',
    '在数据的世界里，我们是洞察真相的探索者',
    '系统分析是技术与业务的桥梁，是价值的创造者',
    '用专业证书记录分析之路，用智慧洞察业务本质',
    '软考认证是对系统分析能力的专业认可',
    '系统分析让每个需求都有完美的解决方案',
    '在系统分析的世界里，我们是智慧的传承者',
  ],
  架构设计: [
    '架构设计是技术与艺术的完美融合',
    '用全局思维构建系统，用创新理念引领未来',
    '每一个架构决策都是对未来的投资',
    '架构设计让系统更稳定，让技术更优雅',
    '在技术的海洋中，我们是架构的艺术家',
    '架构设计是系统稳定性的保障，是技术创新的基石',
    '用专业证书记录架构之路，用设计创造技术价值',
    '软考认证是对架构设计能力的权威认证',
    '架构设计让每个系统都有优雅的解决方案',
    '在架构设计的世界里，我们是技术的艺术家',
  ],
  网络规划: [
    '网络规划是连接世界的桥梁',
    '用专业的技术构建网络，用创新的思维优化架构',
    '每一个网络节点都是信息传递的纽带',
    '网络规划让信息流动更顺畅，让连接更可靠',
    '在数字化的时代，我们是网络的建筑师',
    '网络规划是信息时代的基石，是连接世界的纽带',
    '用专业证书记录网络之路，用规划连接数字世界',
    '软考认证是对网络规划能力的专业认证',
    '网络规划让每个连接都有最优的路径',
    '在网络规划的世界里，我们是连接的缔造者',
  ],
  系统管理: [
    '系统管理是保障稳定运行的守护者',
    '用专业的知识管理系统，用创新的方法优化流程',
    '每一个系统都是企业数字化转型的基石',
    '系统管理让技术更高效，让业务更顺畅',
    '在信息化的浪潮中，我们是系统的守护者',
    '系统管理是稳定运行的保障，是效率提升的推动者',
    '用专业证书记录管理之路，用服务保障系统稳定',
    '软考认证是对系统管理能力的权威认可',
    '系统管理让每个系统都有最佳的运行状态',
    '在系统管理的世界里，我们是稳定的守护者',
  ],
};

// 证书类型到金句分组的映射
const CERTIFICATE_TO_QUOTE_MAPPING: Record<string, keyof typeof INSPIRATIONAL_QUOTES> = {
  'info-sys-project-manager': '项目管理',
  'system-analyst': '系统分析',
  'system-architect': '架构设计',
  'network-architect': '网络规划',
  'system-planner-manager': '系统管理',
};

// 获取随机励志金句
const getRandomQuote = (certificateType?: string) => {
  // 如果没有选择证书类型，随机选择所有分组
  if (!certificateType) {
    const categories = Object.keys(INSPIRATIONAL_QUOTES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const quotes = INSPIRATIONAL_QUOTES[randomCategory as keyof typeof INSPIRATIONAL_QUOTES];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 根据证书类型选择对应的金句分组
  const quoteCategory = CERTIFICATE_TO_QUOTE_MAPPING[certificateType];
  if (quoteCategory && INSPIRATIONAL_QUOTES[quoteCategory]) {
    const quotes = INSPIRATIONAL_QUOTES[quoteCategory];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 如果映射失败，返回默认金句
  return '专业认证，成就未来';
};

const FormControls: React.FC<FormControlsProps> = ({ certificateTypes, control }) => {
  const [isRandomButtonActive, setIsRandomButtonActive] = useState(false);

  const handleRandomQuote = (field: any) => {
    // 获取当前选择的证书类型
    const currentCertificateType = control._formValues?.certificateType;
    const randomQuote = getRandomQuote(currentCertificateType);
    field.onChange(randomQuote);

    // 设置按钮高亮状态
    setIsRandomButtonActive(true);

    // 300ms后恢复正常状态
    setTimeout(() => {
      setIsRandomButtonActive(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>姓名</FormLabel>
            <FormControl>
              <Input
                placeholder="请输入您的姓名"
                {...field}
                className="bg-white/5 border-white/10 focus:bg-white/10 focus:ring-primary/50 transition-all duration-200"
                maxLength={10}
                autoComplete="name"
              />
            </FormControl>
            <FormDescription className="text-xs text-muted-foreground">
              {field.value?.length || 0}/10 字符
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="certificateType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>证书类型</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 focus:bg-white/10 focus:ring-primary/50">
                  <SelectValue placeholder="请选择您的证书类型" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-card border-white/20 text-foreground">
                {certificateTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="focus:bg-primary/20"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="issueDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>发证日期</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full pl-2.5 text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 rounded-md',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP', { locale: zhCN })
                    ) : (
                      <span>选择一个日期</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0 bg-card border-white/20 rounded-md overflow-hidden"
                align="start"
                style={{ width: 'var(--radix-popover-trigger-width)' }}
              >
                <Calendar
                  mode="single"
                  locale={zhCN}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={false}
                  initialFocus
                  classNames={{
                    day_selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
                    day_today: 'bg-accent text-accent-foreground',
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="customMessage"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>
                自定义消息
              </FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRandomQuote(field)}
                className={cn(
                  "text-xs transition-all duration-200",
                  isRandomButtonActive
                    ? "text-primary bg-primary/20 scale-105"
                    : "text-primary hover:text-primary/90 hover:bg-primary/10"
                )}
                title="获取随机励志金句"
              >
                <Shuffle className={cn(
                  "w-3 h-3 mr-1 transition-transform duration-200",
                  isRandomButtonActive && "rotate-180"
                )} />
                随机灵感
              </Button>
            </div>
            <FormControl>
              <Textarea
                placeholder="添加您的个人感言或祝福语（可选）"
                className="resize-none bg-white/5 border-white/10 focus:bg-white/10 focus:ring-primary/50 transition-all duration-200 min-h-[80px]"
                {...field}
                maxLength={50}
                rows={3}
              />
            </FormControl>
            <FormDescription className="text-xs text-muted-foreground flex justify-between">
              <span>个性化您的纪念章</span>
              <span>{field.value?.length || 0}/50 字符</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormControls;
