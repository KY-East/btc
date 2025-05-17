import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// 扩展请求类型，添加用户信息
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * 验证用户JWT令牌
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 从请求头获取令牌
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供访问令牌' });
    }

    const token = authHeader.split(' ')[1];
    
    // 验证令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    // 查找用户
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: '用户不存在或令牌无效' });
    }
    
    // 将用户信息附加到请求对象
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '无效的令牌' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '令牌已过期' });
    }
    
    return res.status(500).json({ message: '身份验证失败' });
  }
};

/**
 * 验证用户角色
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: '未经授权' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '没有权限执行此操作' });
    }
    
    next();
  };
}; 