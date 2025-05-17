import express from 'express';
import { register, login, getCurrentUser, refreshToken } from '../controllers/auth';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 用户注册
router.post('/register', register);

// 用户登录
router.post('/login', login);

// 获取当前用户信息
router.get('/me', authenticate, getCurrentUser);

// 刷新令牌
router.post('/refresh-token', refreshToken);

export default router; 