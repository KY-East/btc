import express from 'express';
import { 
  createTrade, 
  getAllTrades, 
  getTradeById, 
  getUserTrades, 
  followTrade,
  cancelTrade,
  getTradingPairs
} from '../controllers/trade';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 创建交易订单
router.post('/', authenticate, createTrade);

// 获取所有交易
router.get('/', authenticate, getAllTrades);

// 获取单个交易详情
router.get('/:id', authenticate, getTradeById);

// 获取用户的交易
router.get('/user/:userId', authenticate, getUserTrades);

// 跟单交易
router.post('/follow/:tradeId', authenticate, followTrade);

// 取消交易
router.post('/cancel/:tradeId', authenticate, cancelTrade);

// 获取交易对列表
router.get('/pairs', getTradingPairs);

export default router; 