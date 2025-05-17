import express from 'express';
import { 
  getBalance, 
  transfer, 
  claimDaily, 
  inviteReward, 
  purchaseEAT, 
  getTransactions 
} from '../controllers/eat';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 获取EAT余额
router.get('/balance', authenticate, getBalance);

// 转账EAT
router.post('/transfer', authenticate, transfer);

// 领取每日奖励
router.post('/claim-daily', authenticate, claimDaily);

// 邀请奖励
router.post('/invite-reward', authenticate, inviteReward);

// 购买EAT
router.post('/purchase', authenticate, purchaseEAT);

// 获取EAT交易历史
router.get('/transactions', authenticate, getTransactions);

export default router; 