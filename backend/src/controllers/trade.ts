import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Trade from '../models/trade';
import User from '../models/user';
import EatTransaction from '../models/eat-transaction';

/**
 * 创建交易订单
 */
export const createTrade = async (req: Request, res: Response) => {
  try {
    const { symbol, type, position, amount, leverage, entryPrice, confidence } = req.body;
    const userId = req.user._id;
    
    // 参数验证
    if (!symbol || !type || !position || !amount || !entryPrice) {
      return res.status(400).json({ message: '交易参数不完整' });
    }
    
    // 验证杠杆倍数
    if (leverage < 1 || leverage > 10) {
      return res.status(400).json({ message: '杠杆倍数必须在1-10之间' });
    }
    
    // 计算所需EAT消耗量 (基于杠杆和交易金额)
    const eatConsumed = Math.ceil(amount * leverage * 0.01); // 暂定为交易金额*杠杆的1%
    
    // 检查用户EAT余额
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    if (user.eatBalance < eatConsumed) {
      return res.status(400).json({ 
        message: 'EAT余额不足',
        required: eatConsumed,
        current: user.eatBalance
      });
    }
    
    // 创建交易订单
    const newTrade = new Trade({
      user: userId,
      symbol,
      type,
      position,
      amount,
      leverage: leverage || 1,
      entryPrice,
      eatConsumed,
      confidence: confidence || 50,
      status: 'open',
      followers: []
    });
    
    const savedTrade = await newTrade.save();
    
    // 扣除用户EAT代币
    await User.findByIdAndUpdate(userId, {
      $inc: { eatBalance: -eatConsumed }
    });
    
    // 记录EAT消耗交易
    const eatTransaction = new EatTransaction({
      user: userId,
      type: 'consume',
      amount: eatConsumed,
      tradeId: savedTrade._id,
      description: `交易 ${symbol} 消耗`,
      status: 'completed'
    });
    
    await eatTransaction.save();
    
    res.status(201).json({
      message: '交易订单创建成功',
      trade: savedTrade
    });
  } catch (error: any) {
    res.status(500).json({ message: '创建交易失败', error: error.message });
  }
};

/**
 * 获取所有交易
 */
export const getAllTrades = async (req: Request, res: Response) => {
  try {
    const { status, symbol, limit = 20, page = 1 } = req.query;
    
    // 构建查询条件
    const query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    if (symbol) {
      query.symbol = symbol;
    }
    
    // 分页
    const skip = (Number(page) - 1) * Number(limit);
    
    const trades = await Trade.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'username');
    
    const total = await Trade.countDocuments(query);
    
    res.status(200).json({
      trades,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取交易列表失败', error: error.message });
  }
};

/**
 * 获取单个交易详情
 */
export const getTradeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '无效的交易ID格式' });
    }
    
    const trade = await Trade.findById(id)
      .populate('user', 'username')
      .populate('followers', 'username');
    
    if (!trade) {
      return res.status(404).json({ message: '交易不存在' });
    }
    
    res.status(200).json({ trade });
  } catch (error: any) {
    res.status(500).json({ message: '获取交易详情失败', error: error.message });
  }
};

/**
 * 获取用户的交易
 */
export const getUserTrades = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status, limit = 10, page = 1 } = req.query;
    
    // 验证用户ID格式
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: '无效的用户ID格式' });
    }
    
    // 构建查询条件
    const query: any = { user: userId };
    
    if (status) {
      query.status = status;
    }
    
    // 分页
    const skip = (Number(page) - 1) * Number(limit);
    
    const trades = await Trade.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Trade.countDocuments(query);
    
    res.status(200).json({
      trades,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取用户交易列表失败', error: error.message });
  }
};

/**
 * 跟单交易
 */
export const followTrade = async (req: Request, res: Response) => {
  try {
    const { tradeId } = req.params;
    const userId = req.user._id;
    
    // 验证交易ID格式
    if (!mongoose.Types.ObjectId.isValid(tradeId)) {
      return res.status(400).json({ message: '无效的交易ID格式' });
    }
    
    // 查找交易
    const trade = await Trade.findById(tradeId);
    if (!trade) {
      return res.status(404).json({ message: '交易不存在' });
    }
    
    // 检查交易状态
    if (trade.status !== 'open') {
      return res.status(400).json({ message: '只能跟单开放的交易' });
    }
    
    // 避免跟单自己的交易
    if (trade.user.toString() === userId.toString()) {
      return res.status(400).json({ message: '不能跟单自己的交易' });
    }
    
    // 检查是否已经跟单
    if (trade.followers.includes(userId)) {
      return res.status(400).json({ message: '已经跟单过该交易' });
    }
    
    // 检查EAT余额
    const eatRequired = Math.ceil(trade.eatConsumed * 0.5); // 跟单只需要原始交易消耗的50%
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    if (user.eatBalance < eatRequired) {
      return res.status(400).json({ 
        message: 'EAT余额不足',
        required: eatRequired,
        current: user.eatBalance
      });
    }
    
    // 更新交易跟单列表
    const updatedTrade = await Trade.findByIdAndUpdate(
      tradeId,
      { $push: { followers: userId } },
      { new: true }
    ).populate('user', 'username');
    
    // 扣除跟单用户的EAT
    await User.findByIdAndUpdate(userId, {
      $inc: { eatBalance: -eatRequired }
    });
    
    // 记录EAT消耗
    const eatTransaction = new EatTransaction({
      user: userId,
      type: 'consume',
      amount: eatRequired,
      tradeId: tradeId,
      description: `跟单 ${trade.symbol} 消耗`,
      status: 'completed'
    });
    
    await eatTransaction.save();
    
    res.status(200).json({
      message: '跟单成功',
      trade: updatedTrade
    });
  } catch (error: any) {
    res.status(500).json({ message: '跟单失败', error: error.message });
  }
};

/**
 * 取消交易
 */
export const cancelTrade = async (req: Request, res: Response) => {
  try {
    const { tradeId } = req.params;
    const userId = req.user._id;
    
    // 验证交易ID格式
    if (!mongoose.Types.ObjectId.isValid(tradeId)) {
      return res.status(400).json({ message: '无效的交易ID格式' });
    }
    
    // 查找交易
    const trade = await Trade.findById(tradeId);
    if (!trade) {
      return res.status(404).json({ message: '交易不存在' });
    }
    
    // 检查交易状态
    if (trade.status !== 'open') {
      return res.status(400).json({ message: '只能取消开放的交易' });
    }
    
    // 检查权限 - 只有交易创建者或管理员可以取消
    if (trade.user.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '没有权限取消此交易' });
    }
    
    // 更新交易状态
    const updatedTrade = await Trade.findByIdAndUpdate(
      tradeId,
      { status: 'cancelled' },
      { new: true }
    );
    
    res.status(200).json({
      message: '交易已取消',
      trade: updatedTrade
    });
  } catch (error: any) {
    res.status(500).json({ message: '取消交易失败', error: error.message });
  }
};

/**
 * 获取交易对列表
 */
export const getTradingPairs = async (req: Request, res: Response) => {
  try {
    // 这里可以从交易所API获取，或者使用预设的列表
    const tradingPairs = [
      { symbol: 'BTC/USDT', name: '比特币' },
      { symbol: 'ETH/USDT', name: '以太坊' },
      { symbol: 'SOL/USDT', name: '索拉纳' },
      { symbol: 'BNB/USDT', name: '币安币' },
      { symbol: 'ADA/USDT', name: '卡尔达诺' },
      { symbol: 'XRP/USDT', name: '瑞波币' },
      { symbol: 'DOGE/USDT', name: '狗狗币' },
      { symbol: 'AVAX/USDT', name: '雪崩' },
      { symbol: 'MATIC/USDT', name: 'Polygon' },
      { symbol: 'DOT/USDT', name: '波卡' }
    ];
    
    res.status(200).json({ pairs: tradingPairs });
  } catch (error: any) {
    res.status(500).json({ message: '获取交易对列表失败', error: error.message });
  }
}; 