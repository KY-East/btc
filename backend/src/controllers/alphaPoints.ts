import { Request, Response } from 'express';
import { AlphaPointsAccount, AlphaPointsTransaction } from '../models/alpha-points';
import User from '../models/user';
import { EATTransaction } from '../models/eat-transaction';
import mongoose from 'mongoose';

// 扩展Request类型以包含user属性
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    [key: string]: any;
  };
}

/**
 * 获取Alpha点数余额
 */
export const getAlphaPointsBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    
    let account = await AlphaPointsAccount.findOne({ userId });
    
    // 如果账户不存在，创建新账户
    if (!account) {
      account = new AlphaPointsAccount({ userId });
      await account.save();
    }
    
    // 处理衰减
    const decayAmount = account.processDecay();
    if (decayAmount > 0) {
      await account.save();
      
      // 记录衰减交易
      await new AlphaPointsTransaction({
        userId,
        type: 'decay',
        amount: -decayAmount,
        description: '每日自动衰减',
        balanceBefore: account.balance + decayAmount,
        balanceAfter: account.balance
      }).save();
    }
    
    res.status(200).json({
      alphaPoints: account.balance,
      capacity: account.getTotalCapacity(),
      dailyFreeAllocation: account.dailyFreeAllocation,
      lastFreeAllocation: account.lastFreeAllocation,
      stakingBonus: account.stakingBonus,
      decayRate: account.decayRate
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取Alpha点数余额失败', error: error.message });
  }
};

/**
 * EAT兑换Alpha点数
 */
export const exchangeEATForAlpha = async (req: AuthenticatedRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const userId = req.user._id;
    const { eatAmount, expectedAlphaPoints } = req.body;
    
    if (!eatAmount || eatAmount <= 0) {
      return res.status(400).json({ message: 'EAT数量必须大于0' });
    }
    
    // 检查用户EAT余额
    const user = await User.findById(userId).session(session);
    if (!user || user.eatBalance < eatAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'EAT余额不足' });
    }
    
    // 获取Alpha点数账户
    let alphaAccount = await AlphaPointsAccount.findOne({ userId }).session(session);
    if (!alphaAccount) {
      alphaAccount = new AlphaPointsAccount({ userId });
    }
    
    // 计算兑换
    const exchangeRate = 100; // 1 EAT = 100 Alpha点数
    const burnRate = 0.85; // 85%燃烧率
    const alphaPointsReceived = eatAmount * exchangeRate;
    const burnedEAT = eatAmount * burnRate;
    
    // 检查容量限制
    const totalCapacity = alphaAccount.getTotalCapacity();
    if (alphaAccount.balance + alphaPointsReceived > totalCapacity) {
      await session.abortTransaction();
      return res.status(400).json({ 
        message: `超出Alpha点数容量限制 (${totalCapacity})` 
      });
    }
    
    // 更新用户EAT余额
    user.eatBalance -= eatAmount;
    await user.save({ session });
    
    // 记录EAT交易（燃烧）
    const eatTransaction = new EATTransaction({
      user: userId,
      type: 'burn',
      amount: -eatAmount,
      description: `兑换Alpha点数燃烧 ${burnedEAT.toFixed(2)} EAT`,
      status: 'completed',
      metadata: {
        alphaPointsReceived,
        burnRate
      }
    });
    await eatTransaction.save({ session });
    
    // 更新Alpha点数余额
    const balanceBefore = alphaAccount.balance;
    alphaAccount.balance += alphaPointsReceived;
    await alphaAccount.save({ session });
    
    // 记录Alpha点数交易
    const alphaTransaction = new AlphaPointsTransaction({
      userId,
      type: 'exchange',
      amount: alphaPointsReceived,
      description: `EAT兑换Alpha点数`,
      metadata: {
        exchangeId: eatTransaction._id.toString(),
        eatAmount,
        burnedEAT
      },
      balanceBefore,
      balanceAfter: alphaAccount.balance
    });
    await alphaTransaction.save({ session });
    
    await session.commitTransaction();
    
    res.status(200).json({
      message: '兑换成功',
      transaction: {
        id: alphaTransaction._id,
        eatAmount,
        alphaPointsReceived,
        burnedEAT,
        exchangeRate,
        burnRate,
        timestamp: alphaTransaction.createdAt
      },
      newBalances: {
        eatBalance: user.eatBalance,
        alphaPoints: alphaAccount.balance
      }
    });
  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({ message: '兑换失败', error: error.message });
  } finally {
    session.endSession();
  }
};

/**
 * 消耗Alpha点数
 */
export const consumeAlphaPoints = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { amount, type, description, metadata } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: '消耗数量必须大于0' });
    }
    
    const account = await AlphaPointsAccount.findOne({ userId });
    if (!account) {
      return res.status(404).json({ message: 'Alpha点数账户不存在' });
    }
    
    // 处理衰减
    account.processDecay();
    
    // 检查余额
    if (!account.hasEnoughBalance(amount)) {
      return res.status(400).json({ message: 'Alpha点数余额不足' });
    }
    
    // 扣除余额
    const balanceBefore = account.balance;
    account.balance -= amount;
    await account.save();
    
    // 记录交易
    const transaction = new AlphaPointsTransaction({
      userId,
      type: 'consume',
      amount: -amount,
      description: description || `消耗Alpha点数 - ${type}`,
      metadata,
      balanceBefore,
      balanceAfter: account.balance
    });
    await transaction.save();
    
    res.status(200).json({
      message: '消耗成功',
      transaction: {
        id: transaction._id,
        amount,
        type,
        description: transaction.description,
        timestamp: transaction.createdAt
      },
      remainingBalance: account.balance
    });
  } catch (error: any) {
    res.status(500).json({ message: '消耗失败', error: error.message });
  }
};

/**
 * 领取每日免费Alpha点数
 */
export const claimDailyAlpha = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    
    let account = await AlphaPointsAccount.findOne({ userId });
    if (!account) {
      account = new AlphaPointsAccount({ userId });
    }
    
    // 检查是否可以领取
    if (!account.canClaimDaily()) {
      return res.status(400).json({ message: '今日已领取免费Alpha点数' });
    }
    
    // 处理衰减
    account.processDecay();
    
    // 计算奖励（包括质押奖励）
    const baseAllocation = account.dailyFreeAllocation;
    const stakingBonus = Math.floor(account.stakingBonus * 0.1); // 质押奖励的10%
    const totalReceived = baseAllocation + stakingBonus;
    
    // 检查容量限制
    const totalCapacity = account.getTotalCapacity();
    const actualReceived = Math.min(totalReceived, totalCapacity - account.balance);
    
    if (actualReceived <= 0) {
      return res.status(400).json({ message: 'Alpha点数已达容量上限' });
    }
    
    // 更新余额和领取时间
    const balanceBefore = account.balance;
    account.balance += actualReceived;
    account.lastFreeAllocation = new Date();
    await account.save();
    
    // 记录交易
    const transaction = new AlphaPointsTransaction({
      userId,
      type: 'daily_free',
      amount: actualReceived,
      description: '每日免费Alpha点数',
      metadata: {
        baseAllocation,
        stakingBonus
      },
      balanceBefore,
      balanceAfter: account.balance
    });
    await transaction.save();
    
    res.status(200).json({
      message: '每日免费Alpha点数领取成功',
      pointsReceived: actualReceived,
      stakingBonus,
      newBalance: account.balance,
      nextAllocationTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
  } catch (error: any) {
    res.status(500).json({ message: '领取失败', error: error.message });
  }
};

/**
 * 获取Alpha点数消耗历史
 */
export const getConsumptionHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20, type } = req.query;
    
    const query: any = { userId };
    if (type) {
      query.type = type;
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [transactions, total] = await Promise.all([
      AlphaPointsTransaction.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      AlphaPointsTransaction.countDocuments(query)
    ]);
    
    const consumptions = transactions.map(tx => ({
      id: tx._id,
      type: tx.type,
      subType: tx.metadata?.conversationId ? 'ai_conversation' : 'feature_unlock',
      amount: Math.abs(tx.amount),
      description: tx.description,
      timestamp: tx.createdAt
    }));
    
    res.status(200).json({
      consumptions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取消耗历史失败', error: error.message });
  }
}; 