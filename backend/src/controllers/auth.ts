import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * 用户注册
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, referralCode } = req.body;

    // 检查用户名和邮箱是否已存在
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? '该邮箱已被注册' 
          : '该用户名已被使用' 
      });
    }

    // 处理推荐码
    let referredBy;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredBy = referrer._id;
      }
    }

    // 创建新用户
    const newUser = new User({
      username,
      email,
      password,
      referredBy,
      eatBalance: 5 // 新用户初始赠送5个EAT代币
    });

    await newUser.save();

    // 创建令牌
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 返回用户信息和令牌
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        eatBalance: newUser.eatBalance,
        referralCode: newUser.referralCode
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '注册失败', error: error.message });
  }
};

/**
 * 用户登录
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 验证密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '密码错误' });
    }

    // 创建令牌
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 返回用户信息和令牌
    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        wallet: user.wallet,
        eatBalance: user.eatBalance,
        referralCode: user.referralCode
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '登录失败', error: error.message });
  }
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        wallet: user.wallet,
        eatBalance: user.eatBalance,
        referralCode: user.referralCode,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取用户信息失败', error: error.message });
  }
};

/**
 * 刷新令牌
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: '令牌不能为空' });
    }
    
    try {
      // 验证旧令牌
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      
      // 查找用户
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }
      
      // 创建新令牌
      const newToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      res.status(200).json({
        message: '令牌刷新成功',
        token: newToken
      });
    } catch (error) {
      return res.status(401).json({ message: '无效的令牌' });
    }
  } catch (error: any) {
    res.status(500).json({ message: '令牌刷新失败', error: error.message });
  }
}; 