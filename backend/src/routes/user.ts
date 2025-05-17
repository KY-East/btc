import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  connectWallet,
  disconnectWallet
} from '../controllers/user';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

// 获取所有用户 (仅管理员)
router.get('/', authenticate, authorize(['admin']), getAllUsers);

// 获取单个用户
router.get('/:id', authenticate, getUserById);

// 更新用户
router.put('/:id', authenticate, updateUser);

// 删除用户
router.delete('/:id', authenticate, deleteUser);

// 连接钱包
router.post('/connect-wallet', authenticate, connectWallet);

// 断开钱包连接
router.post('/disconnect-wallet', authenticate, disconnectWallet);

export default router; 