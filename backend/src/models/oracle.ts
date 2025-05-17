import mongoose, { Document, Schema } from 'mongoose';

export interface IOracle extends Document {
  symbol: string;
  prediction: 'up' | 'down' | 'sideways';
  description: string;
  confidence: number;
  targetPrice?: number;
  timeframe: string;
  isHit?: boolean;
  actualResult?: 'up' | 'down' | 'sideways';
  trades: mongoose.Types.ObjectId[];
  analysisData: {
    technical?: string;
    fundamental?: string;
    onchain?: string;
    social?: string;
  };
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const oracleSchema = new Schema<IOracle>(
  {
    symbol: {
      type: String,
      required: true,
      index: true
    },
    prediction: {
      type: String,
      enum: ['up', 'down', 'sideways'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    targetPrice: {
      type: Number
    },
    timeframe: {
      type: String,
      required: true
    },
    isHit: {
      type: Boolean
    },
    actualResult: {
      type: String,
      enum: ['up', 'down', 'sideways']
    },
    trades: [{
      type: Schema.Types.ObjectId,
      ref: 'Trade'
    }],
    analysisData: {
      technical: {
        type: String
      },
      fundamental: {
        type: String
      },
      onchain: {
        type: String
      },
      social: {
        type: String
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// 索引
oracleSchema.index({ createdAt: -1 });
oracleSchema.index({ isActive: 1, expiresAt: 1 });
oracleSchema.index({ symbol: 1, isActive: 1 });

const Oracle = mongoose.model<IOracle>('Oracle', oracleSchema);

export default Oracle; 