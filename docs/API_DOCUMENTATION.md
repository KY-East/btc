# EZ Trading API文档

本文档详细记录EZ Trading后端API接口，供前端开发团队参考。

## 基础信息

- **Base URL**: `http://localhost:5000/api` (开发环境)
- **认证方式**: Bearer Token (JWT)
- **内容类型**: `application/json`

## 认证接口 (`/auth`)

### 用户注册

- **URL**: `/auth/register`
- **方法**: `POST`
- **认证**: 不需要
- **请求体**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "securepassword",
    "referralCode": "ABC123" // 可选
  }
  ```
- **成功响应** (201):
  ```json
  {
    "message": "注册成功",
    "token": "eyJhbGciOiJIUzI...",
    "user": {
      "id": "60d5e...",
      "username": "user123",
      "email": "user@example.com",
      "eatBalance": 5,
      "referralCode": "XYZ789"
    }
  }
  ```

### 用户登录

- **URL**: `/auth/login`
- **方法**: `POST`
- **认证**: 不需要
- **请求体**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "登录成功",
    "token": "eyJhbGciOiJIUzI...",
    "user": {
      "id": "60d5e...",
      "username": "user123",
      "email": "user@example.com",
      "wallet": {
        "address": "0x123...",
        "publicKey": "0x456..."
      },
      "eatBalance": 10,
      "referralCode": "XYZ789"
    }
  }
  ```

### 获取当前用户信息

- **URL**: `/auth/me`
- **方法**: `GET`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "user": {
      "id": "60d5e...",
      "username": "user123",
      "email": "user@example.com",
      "wallet": {
        "address": "0x123...",
        "publicKey": "0x456..."
      },
      "eatBalance": 10,
      "referralCode": "XYZ789",
      "role": "user"
    }
  }
  ```

### 刷新令牌

- **URL**: `/auth/refresh-token`
- **方法**: `POST`
- **认证**: 不需要
- **请求体**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI..."
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "令牌刷新成功",
    "token": "eyJhbGciOiJIUzI..."
  }
  ```

## 用户接口 (`/users`)

### 获取所有用户(仅管理员)

- **URL**: `/users`
- **方法**: `GET`
- **认证**: 需要(admin)
- **成功响应** (200):
  ```json
  {
    "count": 10,
    "users": [
      {
        "id": "60d5e...",
        "username": "user1",
        "email": "user1@example.com",
        "eatBalance": 15,
        "role": "user",
        "createdAt": "2023-01-01T12:00:00.000Z"
      },
      // ...更多用户
    ]
  }
  ```

### 获取单个用户信息

- **URL**: `/users/:id`
- **方法**: `GET`
- **认证**: 需要(admin或本人)
- **成功响应** (200):
  ```json
  {
    "user": {
      "id": "60d5e...",
      "username": "user123",
      "email": "user@example.com",
      "wallet": {
        "address": "0x123...",
        "publicKey": "0x456..."
      },
      "eatBalance": 10,
      "referralCode": "XYZ789",
      "role": "user"
    }
  }
  ```

### 更新用户信息

- **URL**: `/users/:id`
- **方法**: `PUT`
- **认证**: 需要(admin或本人)
- **请求体**:
  ```json
  {
    "username": "newusername",
    "email": "newemail@example.com"
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "用户信息更新成功",
    "user": {
      "id": "60d5e...",
      "username": "newusername",
      "email": "newemail@example.com",
      // ...其他用户信息
    }
  }
  ```

### 删除用户(禁用)

- **URL**: `/users/:id`
- **方法**: `DELETE`
- **认证**: 需要(admin或本人)
- **成功响应** (200):
  ```json
  {
    "message": "用户已禁用",
    "userId": "60d5e..."
  }
  ```

### 连接钱包

- **URL**: `/users/connect-wallet`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "address": "0x123...",
    "publicKey": "0x456..."
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "钱包连接成功",
    "user": {
      "id": "60d5e...",
      "username": "user123",
      "wallet": {
        "address": "0x123...",
        "publicKey": "0x456..."
      },
      // ...其他用户信息
    }
  }
  ```

### 断开钱包连接

- **URL**: `/users/disconnect-wallet`
- **方法**: `POST`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "message": "钱包断开连接成功",
    "user": {
      "id": "60d5e...",
      "username": "user123",
      // ...不再包含wallet字段
    }
  }
  ```

## 交易接口 (`/trades`)

### 创建交易订单

- **URL**: `/trades`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "symbol": "BTC/USDT",
    "type": "buy",
    "position": "long",
    "amount": 1000,
    "leverage": 2,
    "entryPrice": 30000,
    "confidence": 80
  }
  ```
- **成功响应** (201):
  ```json
  {
    "message": "交易订单创建成功",
    "trade": {
      "id": "60e5f...",
      "user": "60d5e...",
      "symbol": "BTC/USDT",
      "type": "buy",
      "position": "long",
      "amount": 1000,
      "leverage": 2,
      "entryPrice": 30000,
      "status": "open",
      "eatConsumed": 20,
      "confidence": 80,
      "followers": [],
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 获取所有交易

- **URL**: `/trades`
- **方法**: `GET`
- **认证**: 需要
- **参数**:
  - `status` (可选): 交易状态 (open, closed, cancelled)
  - `symbol` (可选): 交易对
  - `limit` (可选): 每页数量，默认20
  - `page` (可选): 页码，默认1
- **成功响应** (200):
  ```json
  {
    "trades": [
      {
        "id": "60e5f...",
        "user": {
          "id": "60d5e...",
          "username": "user123"
        },
        "symbol": "BTC/USDT",
        "type": "buy",
        "position": "long",
        "amount": 1000,
        "leverage": 2,
        "entryPrice": 30000,
        "status": "open",
        "eatConsumed": 20,
        "confidence": 80,
        "followers": [],
        "createdAt": "2023-01-01T12:00:00.000Z"
      },
      // ...更多交易
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 20,
      "pages": 3
    }
  }
  ```

### 获取单个交易详情

- **URL**: `/trades/:id`
- **方法**: `GET`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "trade": {
      "id": "60e5f...",
      "user": {
        "id": "60d5e...",
        "username": "user123"
      },
      "symbol": "BTC/USDT",
      "type": "buy",
      "position": "long",
      "amount": 1000,
      "leverage": 2,
      "entryPrice": 30000,
      "status": "open",
      "eatConsumed": 20,
      "confidence": 80,
      "followers": [
        {
          "id": "60d6f...",
          "username": "follower1"
        }
      ],
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 获取用户的交易

- **URL**: `/trades/user/:userId`
- **方法**: `GET`
- **认证**: 需要
- **参数**:
  - `status` (可选): 交易状态
  - `limit` (可选): 每页数量，默认10
  - `page` (可选): 页码，默认1
- **成功响应** (200):
  ```json
  {
    "trades": [
      // 用户的交易列表
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
  ```

### 跟单交易

- **URL**: `/trades/follow/:tradeId`
- **方法**: `POST`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "message": "跟单成功",
    "trade": {
      "id": "60e5f...",
      "user": {
        "id": "60d5e...",
        "username": "user123"
      },
      "symbol": "BTC/USDT",
      // ...交易详情
      "followers": [
        "60d6f..." // 当前用户ID
      ]
    }
  }
  ```

### 取消交易

- **URL**: `/trades/cancel/:tradeId`
- **方法**: `POST`
- **认证**: 需要(创建者或管理员)
- **成功响应** (200):
  ```json
  {
    "message": "交易已取消",
    "trade": {
      "id": "60e5f...",
      "status": "cancelled",
      // ...交易详情
    }
  }
  ```

### 获取交易对列表

- **URL**: `/trades/pairs`
- **方法**: `GET`
- **认证**: 不需要
- **成功响应** (200):
  ```json
  {
    "pairs": [
      {
        "symbol": "BTC/USDT",
        "name": "比特币"
      },
      {
        "symbol": "ETH/USDT",
        "name": "以太坊"
      },
      // ...更多交易对
    ]
  }
  ```

## 神谕接口 (`/oracles`)

### 获取今日神谕

- **URL**: `/oracles/today`
- **方法**: `GET`
- **认证**: 不需要
- **成功响应** (200):
  ```json
  {
    "count": 3,
    "oracles": [
      {
        "id": "60f6g...",
        "symbol": "BTC/USDT",
        "prediction": "up",
        "description": "比特币今日可能上涨",
        "confidence": 85,
        "timeframe": "1d",
        "isActive": true,
        "expiresAt": "2023-01-02T00:00:00.000Z",
        "createdAt": "2023-01-01T00:00:00.000Z"
      },
      // ...更多神谕
    ]
  }
  ```

### 获取历史神谕

- **URL**: `/oracles/history`
- **方法**: `GET`
- **认证**: 需要
- **参数**:
  - `symbol` (可选): 交易对
  - `limit` (可选): 每页数量，默认10
  - `page` (可选): 页码，默认1
- **成功响应** (200):
  ```json
  {
    "oracles": [
      {
        "id": "60f5g...",
        "symbol": "BTC/USDT",
        "prediction": "up",
        "description": "比特币昨日预测",
        "confidence": 85,
        "timeframe": "1d",
        "isActive": false,
        "isHit": true,
        "actualResult": "up",
        "expiresAt": "2023-01-01T00:00:00.000Z",
        "createdAt": "2022-12-31T00:00:00.000Z"
      },
      // ...更多历史神谕
    ],
    "pagination": {
      "total": 30,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
  ```

### 获取单个神谕详情

- **URL**: `/oracles/:id`
- **方法**: `GET`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "oracle": {
      "id": "60f6g...",
      "symbol": "BTC/USDT",
      "prediction": "up",
      "description": "比特币今日可能上涨",
      "confidence": 85,
      "timeframe": "1d",
      "isActive": true,
      "expiresAt": "2023-01-02T00:00:00.000Z",
      "trades": [
        {
          "id": "60e5f...",
          "user": {
            "username": "user123"
          },
          "type": "buy",
          "position": "long",
          "amount": 1000,
          "entryPrice": 30000,
          "status": "open"
        }
      ],
      "analysisData": {
        "technical": "基于RSI、MACD和布林带的分析...",
        "fundamental": "市场流动性、宏观经济因素分析...",
        "onchain": "链上交易量、活跃地址数分析...",
        "social": "社交媒体情绪分析、社区活跃度..."
      },
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```

### 获取神谕统计数据

- **URL**: `/oracles/stats`
- **方法**: `GET`
- **认证**: 不需要
- **成功响应** (200):
  ```json
  {
    "total": 100,
    "hit": 75,
    "hitRate": "75.00",
    "confidenceDistribution": {
      "high": 40,
      "medium": 50,
      "low": 10
    },
    "symbolStats": [
      {
        "symbol": "BTC/USDT",
        "count": 30,
        "hitCount": 24,
        "hitRate": 80
      },
      // ...更多币种统计
    ]
  }
  ```

### 生成AI分析

- **URL**: `/oracles/analyze`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "symbol": "BTC/USDT",
    "timeframe": "1d"
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "AI分析生成成功",
    "analysis": {
      "symbol": "BTC/USDT",
      "timeframe": "1d",
      "prediction": "up",
      "confidence": 85,
      "description": "BTC/USDT在1d时间框架内的AI分析预测",
      "analysisData": {
        "technical": "基于RSI、MACD和布林带的分析...",
        "fundamental": "市场流动性、宏观经济因素分析...",
        "onchain": "链上交易量、活跃地址数分析...",
        "social": "社交媒体情绪分析、社区活跃度..."
      }
    }
  }
  ```

## EAT代币接口 (`/eat`)

### 获取EAT余额

- **URL**: `/eat/balance`
- **方法**: `GET`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "balance": 15
  }
  ```

### 转账EAT

- **URL**: `/eat/transfer`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "recipientId": "60d6f...",
    "amount": 5,
    "description": "感谢分享" // 可选
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "转账成功",
    "transaction": {
      "id": "60g7h...",
      "user": "60d5e...",
      "type": "transfer",
      "amount": 5,
      "recipient": "60d6f...",
      "description": "感谢分享",
      "status": "completed",
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 领取每日奖励

- **URL**: `/eat/claim-daily`
- **方法**: `POST`
- **认证**: 需要
- **成功响应** (200):
  ```json
  {
    "message": "每日奖励领取成功",
    "amount": 5,
    "balance": 20,
    "transaction": {
      "id": "60g8h...",
      "user": "60d5e...",
      "type": "claim",
      "amount": 5,
      "description": "领取每日EAT奖励",
      "status": "completed",
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 邀请奖励

- **URL**: `/eat/invite-reward`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "inviteeId": "60d7f..."
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "邀请奖励领取成功",
    "amount": 10,
    "balance": 30,
    "transaction": {
      "id": "60g9h...",
      "user": "60d5e...",
      "type": "reward",
      "amount": 10,
      "referralId": "60d7f...",
      "description": "邀请 user456 的奖励",
      "status": "completed",
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 购买EAT

- **URL**: `/eat/purchase`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "amount": 20,
    "paymentMethod": "USDT"
  }
  ```
- **成功响应** (200):
  ```json
  {
    "message": "EAT购买成功",
    "amount": 20,
    "balance": 50,
    "transaction": {
      "id": "60h0i...",
      "user": "60d5e...",
      "type": "purchase",
      "amount": 20,
      "description": "通过USDT购买EAT",
      "status": "completed",
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 获取EAT交易历史

- **URL**: `/eat/transactions`
- **方法**: `GET`
- **认证**: 需要
- **参数**:
  - `type` (可选): 交易类型 (claim, transfer, reward, purchase, consume)
  - `limit` (可选): 每页数量，默认10
  - `page` (可选): 页码，默认1
- **成功响应** (200):
  ```json
  {
    "transactions": [
      {
        "id": "60h0i...",
        "user": "60d5e...",
        "type": "purchase",
        "amount": 20,
        "description": "通过USDT购买EAT",
        "status": "completed",
        "createdAt": "2023-01-01T12:00:00.000Z"
      },
      // ...更多交易
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 10,
      "pages": 2
    }
  }
  ```

## 错误响应

所有API请求在发生错误时会返回适当的HTTP状态码和JSON响应，包含错误信息：

```json
{
  "message": "错误描述信息",
  "error": "详细错误信息" // 仅在开发环境返回
}
```

常见HTTP状态码：
- `400 Bad Request`: 请求参数错误
- `401 Unauthorized`: 未认证或认证失败
- `403 Forbidden`: 无权限访问
- `404 Not Found`: 资源不存在
- `500 Internal Server Error`: 服务器内部错误 