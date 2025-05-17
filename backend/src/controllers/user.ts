import { Request, Response } from 'express';
import User from '../models/user';
import mongoose from 'mongoose';

/**
 * 获取所有用户（管理员权限）
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取用户列表失败', error: error.message });
  }
};

/**
 * 根据ID获取单个用户
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '无效的用户ID格式' });
    }
    
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 检查权限 - 只有管理员或用户本人可以访问
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: '没有权限访问此用户信息' });
    }
    
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: '获取用户信息失败', error: error.message });
  }
};

/**
 * 更新用户信息
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // 验证ID格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '无效的用户ID格式' });
    }
    
    // 检查权限 - 只有管理员或用户本人可以更新
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: '没有权限更新此用户信息' });
    }
    
    // 不允许更新敏感字段
    delete updateData.password;
    delete updateData.role;
    delete updateData.eatBalance;
    
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.status(200).json({
      message: '用户信息更新成功',
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: '更新用户信息失败', error: error.message });
  }
};

/**
 * 删除用户
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '无效的用户ID格式' });
    }
    
    // 检查权限 - 只有管理员或用户本人可以删除
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: '没有权限删除此用户' });
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.status(200).json({
      message: '用户已禁用',
      userId: id
    });
  } catch (error: any) {
    res.status(500).json({ message: '删除用户失败', error: error.message });
  }
};

/**
 * 连接钱包
 */
export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { address, publicKey } = req.body;
    const userId = req.user._id;
    
    if (!address || !publicKey) {
      return res.status(400).json({ message: '钱包地址和公钥不能为空' });
    }
    
    // 检查钱包地址是否已被其他用户使用
    const existingWallet = await User.findOne({ 'wallet.address': address });
    if (existingWallet && existingWallet._id.toString() !== userId.toString()) {
      return res.status(400).json({ message: '该钱包地址已与其他账户绑定' });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        wallet: { 
          address,
          publicKey
        } 
      },
      { new: true }
    ).select('-password');
    
    res.status(200).json({
      message: '钱包连接成功',
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: '钱包连接失败', error: error.message });
  }
};

/**
 * 断开钱包连接
 */
export const disconnectWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { wallet: 1 } },
      { new: true }
    ).select('-password');
    
    res.status(200).json({
      message: '钱包断开连接成功',
      user
    });
  } catch (error: any) {
    res.status(500).json({ message: '钱包断开连接失败', error: error.message });
  }
}; 