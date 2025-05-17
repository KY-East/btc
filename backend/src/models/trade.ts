import mongoose, { Document, Schema } from 'mongoose';

export interface ITrade extends Document {
  user: mongoose.Types.ObjectId;
  symbol: string;
  type: 'buy' | 'sell';
  position: 'long' | 'short';
  amount: number;
  leverage: number;
  entryPrice: number;
  status: 'open' | 'closed' | 'cancelled';
  exitPrice?: number;
  profit?: number;
  profitPercentage?: number;
  followers: mongoose.Types.ObjectId[];
  eatConsumed: number;
  confidence: number;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const tradeSchema = new Schema<ITrade>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['buy', 'sell'],
      required: true
    },
    position: {
      type: String,
      enum: ['long', 'short'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    leverage: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 10
    },
    entryPrice: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'cancelled'],
      default: 'open'
    },
    exitPrice: {
      type: Number,
      min: 0
    },
    profit: {
      type: Number
    },
    profitPercentage: {
      type: Number
    },
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    eatConsumed: {
      type: Number,
      required: true,
      default: 0
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    closedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// 索引
tradeSchema.index({ user: 1, status: 1 });
tradeSchema.index({ symbol: 1, status: 1 });
tradeSchema.index({ createdAt: -1 });

const Trade = mongoose.model<ITrade>('Trade', tradeSchema);

export default Trade; 