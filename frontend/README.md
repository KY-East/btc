# Oracle Alpha 展示页面

这是Oracle Alpha项目的展示页面，用于向团队和潜在用户展示项目概念。

## 技术栈

- Vue 3
- Vite
- SVG图标和插图

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 部署

此项目配置了用于Vercel部署的`vercel.json`文件，可以通过以下步骤部署：

1. 安装Vercel CLI: `npm i -g vercel`
2. 登录Vercel: `vercel login`
3. 部署: `vercel`

或者直接通过Vercel仪表盘导入GitHub仓库。

## 目录结构

```
frontend/
├── public/              # 静态资源
├── src/                 # 源代码
│   ├── assets/          # 图片、字体等资源
│   ├── components/      # Vue组件
│   ├── App.vue          # 主组件
│   └── main.js          # 入口文件
├── index.html           # HTML模板
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── vercel.json          # Vercel部署配置
``` 