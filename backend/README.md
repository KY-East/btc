# EZ Trading 后端服务

EZ Trading(原Oracle Alpha)后端API服务，提供用户认证、交易管理、神谕预测和EAT代币功能。

## 技术栈

- **Node.js** - JavaScript运行时
- **Express** - Web框架
- **TypeScript** - 类型安全的JavaScript超集
- **MongoDB** - NoSQL数据库
- **JWT** - JSON Web Token认证

## 目录结构

```
backend/
├── src/                    # 源代码目录
│   ├── controllers/        # 控制器(业务逻辑)
│   ├── models/             # 数据库模型
│   ├── routes/             # API路由
│   ├── middlewares/        # 中间件
│   ├── utils/              # 工具函数
│   └── index.ts            # 应用入口
├── .env                    # 环境变量
├── tsconfig.json           # TypeScript配置
└── package.json            # 依赖管理
```

## 环境要求

- Node.js >= 18.x
- MongoDB >= 7.x
- npm或yarn

## 快速开始

1. **安装依赖**

```bash
npm install
# 或
yarn install
```

2. **配置环境变量**

在项目根目录创建`.env`文件，内容参考：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/ez_trading

# JWT配置
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Solana配置
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# EAT代币配置
EAT_TOKEN_MINT_ADDRESS=your_token_mint_address
EAT_DAILY_CLAIM_AMOUNT=5
EAT_REFERRAL_REWARD=10

# n8n工作流配置
N8N_API_URL=http://localhost:5678/webhook
N8N_API_KEY=your_n8n_api_key
```

3. **启动开发服务器**

```bash
npm run dev
# 或
yarn dev
```

服务将在http://localhost:5000启动。

4. **构建生产版本**

```bash
npm run build
# 或
yarn build
```

5. **启动生产服务器**

```bash
npm run start
# 或
yarn start
```

## API文档

详细的API文档请查看[docs/API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md)。

主要API端点:

- **认证**: `/api/auth`
  - 注册: `POST /register`
  - 登录: `POST /login`
  - 获取当前用户: `GET /me`

- **用户**: `/api/users`
  - 获取所有用户: `GET /`
  - 获取单个用户: `GET /:id`
  - 更新用户: `PUT /:id`
  - 删除用户: `DELETE /:id`
  - 连接钱包: `POST /connect-wallet`

- **交易**: `/api/trades`
  - 创建交易: `POST /`
  - 获取所有交易: `GET /`
  - 获取单个交易: `GET /:id`
  - 跟单交易: `POST /follow/:tradeId`

- **神谕**: `/api/oracles`
  - 获取今日神谕: `GET /today`
  - 获取历史神谕: `GET /history`
  - 获取神谕统计: `GET /stats`

- **EAT代币**: `/api/eat`
  - 获取余额: `GET /balance`
  - 转账: `POST /transfer`
  - 领取每日奖励: `POST /claim-daily`

## 多智能体集成

后端系统设计为与n8n工作流引擎集成，用于执行多智能体分析。集成通过以下方式实现：

1. 使用环境变量`N8N_API_URL`和`N8N_API_KEY`配置n8n连接
2. 通过HTTP请求触发n8n工作流
3. 工作流执行完成后通过回调API返回结果

## 开发指南

- 编写控制器时，保持单一职责原则
- 使用async/await处理异步操作
- 确保所有数据库操作有适当的错误处理
- 使用适当的HTTP状态码和响应格式

## 数据库模型

- **User**: 用户信息和认证
- **Trade**: 交易订单和跟单
- **Oracle**: 神谕预测和分析
- **EatTransaction**: EAT代币交易记录

## 测试

运行测试:

```bash
npm run test
# 或
yarn test
```

## 贡献

请遵循以下工作流:

1. Fork该项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 相关文档

- [项目主文档](../docs/MASTER_DOCUMENTATION.md)
- [技术实现文档](../docs/IMPLEMENTATION.md)
- [开发指南](../docs/DEVELOPMENT_GUIDE.md) 