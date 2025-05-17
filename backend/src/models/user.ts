import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  wallet?: {
    address: string;
    publicKey: string;
  };
  role: 'user' | 'admin';
  referralCode: string;
  referredBy?: string;
  eatBalance: number;
  lastClaim?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    wallet: {
      address: {
        type: String,
        sparse: true
      },
      publicKey: {
        type: String,
        sparse: true
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    referralCode: {
      type: String,
      unique: true
    },
    referredBy: {
      type: String
    },
    eatBalance: {
      type: Number,
      default: 0
    },
    lastClaim: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// 保存前对密码进行哈希处理
userSchema.pre('save', async function (next) {
  const user = this;
  
  // 如果密码未修改，则跳过
  if (!user.isModified('password')) return next();
  
  try {
    // 生成盐值并哈希密码
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    // 生成唯一的推荐码
    if (!user.referralCode) {
      user.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    
    next();
  } catch (error: any) {
    next(error);
  }
});

// 比较密码
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 