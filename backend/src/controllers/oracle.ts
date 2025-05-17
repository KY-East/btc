import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Oracle from '../models/oracle';
import Trade from '../models/trade';

/**
 * 获取今日神谕预测
 */
export const getTodayOracles = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    
    // 获取今日活跃的神谕预测
    const oracles = await Oracle.find({
      isActive: true,
      expiresAt: { $gt: now }
    }).sort({ confidence: -1 });
    
    res.status(200).json({
      count: oracles.length,
      oracles
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取今日神谕失败', error: error.message });
  }
};

/**
 * 获取历史神谕预测
 */
export const getHistoryOracles = async (req: Request, res: Response) => {
  try {
    const { symbol, limit = 10, page = 1 } = req.query;
    
    // 构建查询条件
    const query: any = { 
      $or: [
        { isActive: false },
        { expiresAt: { $lt: new Date() } }
      ]
    };
    
    if (symbol) {
      query.symbol = symbol;
    }
    
    // 分页
    const skip = (Number(page) - 1) * Number(limit);
    
    const oracles = await Oracle.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Oracle.countDocuments(query);
    
    res.status(200).json({
      oracles,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取历史神谕失败', error: error.message });
  }
};

/**
 * 获取单个神谕详情
 */
export const getOracleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 验证ID格式
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: '无效的神谕ID格式' });
    }
    
    const oracle = await Oracle.findById(id)
      .populate({
        path: 'trades',
        select: 'user type position amount entryPrice exitPrice profit status',
        populate: {
          path: 'user',
          select: 'username'
        }
      });
    
    if (!oracle) {
      return res.status(404).json({ message: '神谕不存在' });
    }
    
    res.status(200).json({ oracle });
  } catch (error: any) {
    res.status(500).json({ message: '获取神谕详情失败', error: error.message });
  }
};

/**
 * 获取神谕统计数据
 */
export const getOracleStats = async (req: Request, res: Response) => {
  try {
    // 全部神谕数量
    const totalOracles = await Oracle.countDocuments();
    
    // 已实现的神谕数量
    const hitOracles = await Oracle.countDocuments({ isHit: true });
    
    // 按准确率统计
    const highConfidence = await Oracle.countDocuments({ confidence: { $gte: 80 } });
    const mediumConfidence = await Oracle.countDocuments({ 
      confidence: { $gte: 50, $lt: 80 } 
    });
    const lowConfidence = await Oracle.countDocuments({ confidence: { $lt: 50 } });
    
    // 按币种分组统计
    const symbolStats = await Oracle.aggregate([
      {
        $group: {
          _id: '$symbol',
          count: { $sum: 1 },
          hitCount: {
            $sum: { $cond: [{ $eq: ['$isHit', true] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          symbol: '$_id',
          count: 1,
          hitCount: 1,
          hitRate: {
            $cond: [
              { $eq: ['$count', 0] },
              0,
              { $multiply: [{ $divide: ['$hitCount', '$count'] }, 100] }
            ]
          }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      total: totalOracles,
      hit: hitOracles,
      hitRate: totalOracles > 0 ? (hitOracles / totalOracles * 100).toFixed(2) : 0,
      confidenceDistribution: {
        high: highConfidence,
        medium: mediumConfidence,
        low: lowConfidence
      },
      symbolStats
    });
  } catch (error: any) {
    res.status(500).json({ message: '获取神谕统计失败', error: error.message });
  }
};

/**
 * 生成AI分析
 * 这里将调用n8n工作流来获取AI分析结果
 */
export const generateAIAnalysis = async (req: Request, res: Response) => {
  try {
    const { symbol, timeframe } = req.body;
    
    if (!symbol || !timeframe) {
      return res.status(400).json({ message: '缺少必要的分析参数' });
    }
    
    // TODO: 这里将集成n8n工作流调用
    // 目前使用模拟数据
    const analysisResult = {
      symbol,
      timeframe,
      prediction: Math.random() > 0.5 ? 'up' : 'down',
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100之间的随机值
      description: `${symbol}在${timeframe}时间框架内的AI分析预测`,
      analysisData: {
        technical: '基于RSI、MACD和布林带的分析...',
        fundamental: '市场流动性、宏观经济因素分析...',
        onchain: '链上交易量、活跃地址数分析...',
        social: '社交媒体情绪分析、社区活跃度...'
      }
    };
    
    // 如果需要，可以将分析结果保存为新的神谕预测
    
    res.status(200).json({
      message: 'AI分析生成成功',
      analysis: analysisResult
    });
  } catch (error: any) {
    res.status(500).json({ message: 'AI分析生成失败', error: error.message });
  }
}; 