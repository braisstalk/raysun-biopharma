# Raysun Biopharma 网站代码

## 项目信息
- **网站**: https://www.raysunpharma.com
- **GitHub**: https://github.com/braisstalk/raysun-biopharma
- **本地位置**: ~/Desktop/raysun

## 技术栈
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5.9.3
- Tailwind CSS v4

## 主要问题 (待修复)
1. 多语言切换无效 - i18n 系统故障
2. 翻译内容未真正翻译 - 所有语言都是英文
3. Contact/Careers 表单无法提交 - 无后端API
4. 语言路由 404 - /th, /vi 等无法访问

## 目录结构
```
src/
├── app/              # 页面路由
│   ├── page.tsx      # 首页
│   ├── about/        # 关于我们
│   ├── products/     # 产品
│   ├── news/         # 新闻
│   ├── contact/      # 联系
│   ├── careers/      # 招聘
│   └── ...
├── components/       # 组件
├── i18n/            # 国际化
│   ├── locales/     # 翻译文件 (en, th, vi, ar, lo, es, pt)
│   └── LocaleContext.tsx
├── config/          # 配置
└── types/           # TypeScript类型
```

## 运行命令
```bash
cd ~/Desktop/raysun
npm install
npm run dev        # 开发模式
npm run build      # 构建
```

## 已知问题清单
详见: docs/issues.md (如有)

## 下载时间
2026-03-20 19:37
