import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import EatTransaction from '../models/eat-transaction';

/**
 * 获取用户EAT余额
 */
export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).select('eatBalance');
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.status(200).json({
      balance: user.eatBalance
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取余额失败', error: error.message });
  }
};

/**
 * 转账EAT给其他用户
 */
export const transfer = async (req: Request, res: Response) => {
  try {
    const { recipientId, amount, description } = req.body;
    const senderId = req.user._id;
    
    // 参数验证
    if (!recipientId || !amount) {
      return res.status(400).json({ message: '接收方ID和转账金额不能为空' });
    }
    
    if (amount <= 0) {
      return res.status(400).json({ message: '转账金额必须大于0' });
    }
    
    // 验证用户ID格式
    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ message: '无效的接收方ID格式' });
    }
    
    // 检查是否为自我转账
    if (recipientId === senderId.toString()) {
      return res.status(400).json({ message: '不能给自己转账' });
    }
    
    // 查找发送方和接收方
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);
    
    if (!sender) {
      return res.status(404).json({ message: '发送方用户不存在' });
    }
    
    if (!recipient) {
      return res.status(404).json({ message: '接收方用户不存在' });
    }
    
    // 检查发送方余额
    if (sender.eatBalance < amount) {
      return res.status(400).json({ 
        message: 'EAT余额不足',
        required: amount,
        current: sender.eatBalance
      });
    }
    
    // 开始MongoDB事务
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // 更新发送方余额
      await User.findByIdAndUpdate(
        senderId,
        { $inc: { eatBalance: -amount } },
        { session }
      );
      
      // 更新接收方余额
      await User.findByIdAndUpdate(
        recipientId,
        { $inc: { eatBalance: amount } },
        { session }
      );
      
      // 创建交易记录
      const transaction = new EatTransaction({
        user: senderId,
        type: 'transfer',
        amount,
        recipient: recipientId,
        description: description || `转账给 ${recipient.username}`,
        status: 'completed'
      });
      
      await transaction.save({ session });
      
      // 提交事务
      await session.commitTransaction();
      
      res.status(200).json({
        message: '转账成功',
        transaction
      });
    } catch (error) {
      // 回滚事务
      await session.abortTransaction();
      throw error;
    } finally {
      // 结束会话
      session.endSession();
    }
  } catch (error: any) {
    res.status(500).json({ message: '转账失败', error: error.message });
  }
};

/**
 * 领取每日EAT奖励
 */
export const claimDaily = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const dailyAmount = Number(process.env.EAT_DAILY_CLAIM_AMOUNT) || 5;
    
    // 查找用户
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 检查上次领取时间
    if (user.lastClaim) {
      const lastClaimDate = new Date(user.lastClaim);
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastClaimDay = new Date(
        lastClaimDate.getFullYear(),
        lastClaimDate.getMonth(),
        lastClaimDate.getDate()
      );
      
      // 如果今天已经领取过
      if (lastClaimDay.getTime() === today.getTime()) {
        return res.status(400).json({ 
          message: '今天已经领取过每日奖励',
          nextClaim: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        });
      }
    }
    
    // 更新用户余额和最后领取时间
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { eatBalance: dailyAmount },
        lastClaim: now
      },
      { new: true }
    );
    
    // 创建交易记录
    const transaction = new EatTransaction({
      user: userId,
      type: 'claim',
      amount: dailyAmount,
      description: '领取每日EAT奖励',
      status: 'completed'
    });
    
    await transaction.save();
    
    res.status(200).json({
      message: '每日奖励领取成功',
      amount: dailyAmount,
      balance: updatedUser?.eatBalance,
      transaction
    });
  } catch (error: any) {
    res.status(500).json({ message: '领取每日奖励失败', error: error.message });
  }
};

/**
 * 邀请奖励
 */
export const inviteReward = async (req: Request, res: Response) => {
  try {
    const { inviteeId } = req.body;
    const userId = req.user._id;
    const inviteAmount = Number(process.env.EAT_REFERRAL_REWARD) || 10;
    
    // 参数验证
    if (!inviteeId) {
      return res.status(400).json({ message: '被邀请者ID不能为空' });
    }
    
    // 验证用户ID格式
    if (!mongoose.Types.ObjectId.isValid(inviteeId)) {
      return res.status(400).json({ message: '无效的被邀请者ID格式' });
    }
    
    // 检查邀请关系
    const invitee = await User.findById(inviteeId);
    
    if (!invitee) {
      return res.status(404).json({ message: '被邀请者不存在' });
    }
    
    if (!invitee.referredBy || invitee.referredBy.toString() !== userId.toString()) {
      return res.status(400).json({ message: '该用户不是由您邀请的' });
    }
    
    // 检查是否已经领取过该用户的邀请奖励
    const existingReward = await EatTransaction.findOne({
      user: userId,
      type: 'reward',
      referralId: inviteeId
    });
    
    if (existingReward) {
      return res.status(400).json({ message: '已经领取过该用户的邀请奖励' });
    }
    
    // 更新用户余额
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { eatBalance: inviteAmount } },
      { new: true }
    );
    
    // 创建交易记录
    const transaction = new EatTransaction({
      user: userId,
      type: 'reward',
      amount: inviteAmount,
      referralId: inviteeId,
      description: `邀请 ${invitee.username} 的奖励`,
      status: 'completed'
    });
    
    await transaction.save();
    
    res.status(200).json({
      message: '邀请奖励领取成功',
      amount: inviteAmount,
      balance: updatedUser?.eatBalance,
      transaction
    });
  } catch (error: any) {
    res.status(500).json({ message: '领取邀请奖励失败', error: error.message });
  }
};

/**
 * 购买EAT代币
 */
export const purchaseEAT = async (req: Request, res: Response) => {
  try {
    const { amount, paymentMethod } = req.body;
    const userId = req.user._id;
    
    // 参数验证
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: '购买金额必须大于0' });
    }
    
    if (!paymentMethod) {
      return res.status(400).json({ message: '支付方式不能为空' });
    }
    
    // TODO: 这里将集成实际的支付处理逻辑
    // 目前使用模拟数据
    const purchaseSuccess = Math.random() > 0.1; // 90%成功率
    
    if (!purchaseSuccess) {
      return res.status(400).json({ message: '支付处理失败，请稍后重试' });
    }
    
    // 更新用户余额
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { eatBalance: amount } },
      { new: true }
    );
    
    // 创建交易记录
    const transaction = new EatTransaction({
      user: userId,
      type: 'purchase',
      amount,
      description: `通过${paymentMethod}购买EAT`,
      status: 'completed'
    });
    
    await transaction.save();
    
    res.status(200).json({
      message: 'EAT购买成功',
      amount,
      balance: updatedUser?.eatBalance,
      transaction
    });
  } catch (error: any) {
    res.status(500).json({ message: '购买EAT失败', error: error.message });
  }
};

/**
 * 获取EAT交易历史
 */
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { type, limit = 10, page = 1 } = req.query;
    
    // 构建查询条件
    const query: any = { user: userId };
    
    if (type) {
      query.type = type;
    }
    
    // 分页
    const skip = (Number(page) - 1) * Number(limit);
    
    const transactions = await EatTransaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('recipient', 'username')
      .populate('sender', 'username')
      .populate('referralId', 'username');
    
    const total = await EatTransaction.countDocuments(query);
    
    res.status(200).json({
      transactions,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取交易历史失败', error: error.message });
  }
}; 