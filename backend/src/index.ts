import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config();

// 导入路由
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import tradeRoutes from './routes/trade';
import eatRoutes from './routes/eat';
import oracleRoutes from './routes/oracle';

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// 路由
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/eat', eatRoutes);
app.use('/api/oracles', oracleRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({ message: 'EZ Trading API服务已运行' });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || '服务器发生错误',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 连接数据库
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ez_trading')
  .then(() => {
    console.log('成功连接到MongoDB');
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器运行在: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB连接失败:', error.message);
  });

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (error) => {
  console.error('未处理的Promise拒绝:', error);
});

export default app; 