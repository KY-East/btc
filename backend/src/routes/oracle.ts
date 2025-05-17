import express from 'express';
import { 
  getTodayOracles, 
  getHistoryOracles, 
  getOracleById, 
  getOracleStats,
  generateAIAnalysis
} from '../controllers/oracle';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 获取今日神谕
router.get('/today', getTodayOracles);

// 获取历史神谕
router.get('/history', authenticate, getHistoryOracles);

// 获取单个神谕详情
router.get('/:id', authenticate, getOracleById);

// 获取神谕统计数据
router.get('/stats', getOracleStats);

// 生成AI分析
router.post('/analyze', authenticate, generateAIAnalysis);

export default router; 