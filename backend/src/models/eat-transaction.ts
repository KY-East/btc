import mongoose, { Document, Schema } from 'mongoose';

export interface IEatTransaction extends Document {
  user: mongoose.Types.ObjectId;
  type: 'mint' | 'burn' | 'transfer' | 'stake' | 'unstake' | 'reward';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: {
    alphaPointsReceived?: number;
    stakingTier?: string;
    navValue?: number;
    burnRate?: number;
  };
  txHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const eatTransactionSchema = new Schema<IEatTransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['mint', 'burn', 'transfer', 'stake', 'unstake', 'reward'],
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
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    metadata: {
      alphaPointsReceived: Number,
      stakingTier: String,
      navValue: Number,
      burnRate: Number
    },
    txHash: {
      type: String,
      sparse: true
    }
  },
  {
    timestamps: true
  }
);

// 索引优化
eatTransactionSchema.index({ user: 1, createdAt: -1 });
eatTransactionSchema.index({ type: 1, status: 1 });
eatTransactionSchema.index({ txHash: 1 }, { sparse: true });

export const EATTransaction = mongoose.model<IEatTransaction>('EATTransaction', eatTransactionSchema); 