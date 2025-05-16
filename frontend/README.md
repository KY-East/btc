# EZ Trading - 游戏风格交易神谕终端

EZ Trading是一个面向小白用户的AI交易神谕终端，通过多智能体系统提供加密货币交易建议，并使用EAT代币激励生态。其核心组件Oracle Alpha提供每日加密货币交易建议。

## 游戏风格UI Demo

本项目为EZ Trading的前端游戏风格UI Demo，实现了基本的动画和交互效果。

### 主要特性

- **粒子背景系统**：星空风格的交互式背景
- **神谕卷轴**：可展开/收起的交易建议展示
- **AI神像/祭坛**：通过"朝拜"获取EAT代币的游戏化交互
- **解锁动画**：使用EAT解锁神谕详情的视觉特效
- **科技感设计**：保持统一的深色太空主题

### 安装与运行

1. **安装依赖**
```bash
cd frontend
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **构建生产版本**
```bash
npm run build
```

### 用户流程

1. **首页**：连接钱包进入系统
2. **神谕页面**：查看今日推荐，通过朝拜神像获取EAT
3. **解锁详情**：消耗EAT解锁神谕详细信息
4. **进入主站**：点击按钮进入完整交易平台

### 项目结构

- **ParticleBg.vue**：粒子背景效果组件
- **HomeHero.vue**：首页和神谕页面主组件
- **OracleScroll.vue**：神谕卷轴组件
- **AiShrine.vue**：AI神像/祭坛组件
- **App.vue**：应用主组件，处理导航和状态

### 技术栈

- **Vue 3**：前端框架
- **Vite**：构建工具
- **GSAP**：高级动画库（核心动画效果）
- **Howler.js**：音效库（背景音乐和交互音效）

## 开发说明

此Demo主要展示UI和动画效果，不包含实际的链上交互和后端逻辑。在实际项目中，还需要集成：

1. 钱包连接功能
2. EAT代币智能合约交互
3. 每日神谕数据的API集成
4. 用户状态的持久化存储

## 后续开发计划

1. 完善音效系统，增加交互反馈
2. 添加钱包集成和链上交互
3. 实现完整的TradingDashboard界面
4. 优化移动端体验和性能

## 协作开发

请参考[EZ_TRADING_UI_SPEC.md](../docs/EZ_TRADING_UI_SPEC.md)文档了解完整的UI规范和设计理念。

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