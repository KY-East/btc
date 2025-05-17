import mongoose, { Document, Schema } from 'mongoose';

export interface IEatTransaction extends Document {
  user: mongoose.Types.ObjectId;
  type: 'claim' | 'transfer' | 'reward' | 'purchase' | 'consume';
  amount: number;
  recipient?: mongoose.Types.ObjectId;
  sender?: mongoose.Types.ObjectId;
  tradeId?: mongoose.Types.ObjectId;
  referralId?: mongoose.Types.ObjectId;
  transactionHash?: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
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
      enum: ['claim', 'transfer', 'reward', 'purchase', 'consume'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    tradeId: {
      type: Schema.Types.ObjectId,
      ref: 'Trade'
    },
    referralId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    transactionHash: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

// 索引
eatTransactionSchema.index({ user: 1, createdAt: -1 });
eatTransactionSchema.index({ type: 1, status: 1 });
eatTransactionSchema.index({ createdAt: -1 });

const EatTransaction = mongoose.model<IEatTransaction>('EatTransaction', eatTransactionSchema);

export default EatTransaction; 