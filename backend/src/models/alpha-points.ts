import mongoose, { Document, Schema } from 'mongoose';

export interface IAlphaPointsAccount extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
  capacity: number;
  dailyFreeAllocation: number;
  lastFreeAllocation?: Date;
  stakingBonus: number;
  decayRate: number;
  lastDecayUpdate: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // 实例方法
  processDecay(): number;
  canClaimDaily(): boolean;
  getTotalCapacity(): number;
  hasEnoughBalance(amount: number): boolean;
}

export interface IAlphaPointsTransaction extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'exchange' | 'consume' | 'daily_free' | 'staking_reward' | 'decay';
  amount: number;
  description: string;
  metadata?: {
    exchangeId?: string;
    eatAmount?: number;
    burnedEAT?: number;
    conversationId?: string;
    stakingTier?: string;
  };
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
}

const alphaPointsAccountSchema = new Schema<IAlphaPointsAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 30, // 新用户初始30点
      min: 0
    },
    capacity: {
      type: Number,
      default: 800 // 基础容量
    },
    dailyFreeAllocation: {
      type: Number,
      default: 30
    },
    lastFreeAllocation: {
      type: Date
    },
    stakingBonus: {
      type: Number,
      default: 0 // 质押奖励容量
    },
    decayRate: {
      type: Number,
      default: 0.15 // 15%每日衰减
    },
    lastDecayUpdate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const alphaPointsTransactionSchema = new Schema<IAlphaPointsTransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['exchange', 'consume', 'daily_free', 'staking_reward', 'decay'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    metadata: {
      exchangeId: String,
      eatAmount: Number,
      burnedEAT: Number,
      conversationId: String,
      stakingTier: String
    },
    balanceBefore: {
      type: Number,
      required: true
    },
    balanceAfter: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// 索引优化
alphaPointsAccountSchema.index({ userId: 1 });
alphaPointsTransactionSchema.index({ userId: 1, createdAt: -1 });
alphaPointsTransactionSchema.index({ type: 1, createdAt: -1 });

// 实例方法：处理衰减
alphaPointsAccountSchema.methods.processDecay = function(this: IAlphaPointsAccount): number {
  const now = new Date();
  const hoursSinceLastUpdate = (now.getTime() - this.lastDecayUpdate.getTime()) / (1000 * 60 * 60);
  
  if (hoursSinceLastUpdate >= 24) {
    const daysPassed = Math.floor(hoursSinceLastUpdate / 24);
    const decayAmount = this.balance * this.decayRate * daysPassed;
    
    this.balance = Math.max(0, this.balance - decayAmount);
    this.lastDecayUpdate = now;
    
    return decayAmount;
  }
  
  return 0;
};

// 实例方法：检查是否可以领取每日免费额度
alphaPointsAccountSchema.methods.canClaimDaily = function(this: IAlphaPointsAccount): boolean {
  if (!this.lastFreeAllocation) return true;
  
  const now = new Date();
  const lastClaim = new Date(this.lastFreeAllocation);
  const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceLastClaim >= 24;
};

// 实例方法：获取总容量
alphaPointsAccountSchema.methods.getTotalCapacity = function(this: IAlphaPointsAccount): number {
  return this.capacity + this.stakingBonus;
};

// 实例方法：检查余额是否足够
alphaPointsAccountSchema.methods.hasEnoughBalance = function(this: IAlphaPointsAccount, amount: number): boolean {
  return this.balance >= amount;
};

export const AlphaPointsAccount = mongoose.model<IAlphaPointsAccount>('AlphaPointsAccount', alphaPointsAccountSchema);
export const AlphaPointsTransaction = mongoose.model<IAlphaPointsTransaction>('AlphaPointsTransaction', alphaPointsTransactionSchema); 