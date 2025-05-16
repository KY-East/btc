# Oracle Alpha - AI交易神谕终端

轻量级AI驱动的加密货币交易神谕平台，让散户"像刷抖音一样轻松做交易"。

## 项目概述

Oracle Alpha是一个面向加密散户用户的轻量级AI交易神谕终端。用户每天仅需登录一次，即可免费领取一个热点山寨币的操作建议（买入/观望/减仓），所有建议由多智能体分析后，由AI总结为"Alpha神谕"。

**产品使命**: "Trade with answers, not questions."

## 核心功能

- **Oracle Alpha**: 智能推荐1个热点山寨币的操作建议
- **神谕解读**: 一句话解释背后逻辑，由多AI智能体生成
- **EAT代币（映射NAV）**: 策略表现的代币化，用户可参与但不托管资金
- **简洁界面**: 极简操作流程，小白也能轻松使用

## 技术栈

- **前端**: Vue 3 + Vite + 轻量级UI组件
- **后端**: Python多智能体系统 (黑盒)
- **区块链**: Solana (主网)，未来扩展SUI和TON
- **AI集成**: Claude、Perplexity、ChatGPT等API

## 文档资源

- [项目主文档](./docs/MASTER_DOCUMENTATION.md) - 整合所有文档的核心内容
- [EAT代币白皮书](./docs/EAT_WHITEPAPER.md) - Oracle Alpha Token详细设计
- [前台系统规格](./docs/FRONTEND_SPEC.md) - 面向用户的神谕终端界面设计
- [系统需求规格](./docs/REQUIREMENTS.md) - 后台系统技术架构(内部)
- [技术实现方案](./docs/IMPLEMENTATION.md) - 系统组件与流程详细实现
- [技术开发指南](./docs/DEVELOPMENT_TECHNICAL_GUIDE.md) - 产品各组件详细开发方法
- [开发协作手册](./docs/DEVELOPMENT_GUIDE.md) - 团队协作流程与规范
- [开发进度](./docs/PROGRESS.md) - 项目开发进度跟踪

## 产品结构

### 前台(面向用户)
轻量级交易神谕终端，每日提供一键式交易建议。

### 后台(内部系统) 
复杂的多智能体分析系统，作为黑盒运行:
- 市场分析团队(新闻、宏观、情绪分析)
- 技术分析团队(价格行为、技术指标、形态识别)
- 执行团队(风控、交易执行、资金管理)

## 发展路线

1. **第一阶段**: 神谕终端基础功能 + NAV计算器
2. **第二阶段**: EAT代币铸造 + 内部回购系统
3. **第三阶段**: 链上NAV验证 + Telegram机器人
4. **第四阶段**: 多策略支持(EAT-MEME, EAT-STABLE等)

## 项目结构

```
├── frontend/          # 前台神谕终端界面
├── backend/           # 后台多智能体系统
├── contracts/         # 代币智能合约
├── docs/              # 项目文档
└── assets/            # 资源文件
```

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md) 