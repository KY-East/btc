import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

export interface EATBalanceResponse {
  eatBalance: number
  stakingAmount: number
  stakingTier: string
  navValue: number
}

export interface AlphaPointsBalanceResponse {
  alphaPoints: number
  capacity: number
  dailyFreeAllocation: number
  lastFreeAllocation: string | null
  stakingBonus: number
  decayRate: number
}

export interface ExchangeRequest {
  eatAmount: number
  expectedAlphaPoints: number
}

export interface ExchangeResponse {
  message: string
  transaction: {
    id: string
    eatAmount: number
    alphaPointsReceived: number
    burnedEAT: number
    exchangeRate: number
    burnRate: number
    timestamp: string
  }
  newBalances: {
    eatBalance: number
    alphaPoints: number
  }
}

export interface ConsumeRequest {
  amount: number
  type: string
  description: string
  metadata?: Record<string, any>
}

export interface ConsumeResponse {
  message: string
  transaction: {
    id: string
    amount: number
    type: string
    description: string
    timestamp: string
  }
  remainingBalance: number
}

export interface ClaimDailyResponse {
  message: string
  pointsReceived: number
  stakingBonus: number
  newBalance: number
  nextAllocationTime: string
}

export const dualTokenApi = {
  // 获取EAT代币余额
  async getEATBalance(): Promise<EATBalanceResponse> {
    return api.get('/eat/balance')
  },

  // 获取Alpha点数余额
  async getAlphaPointsBalance(): Promise<AlphaPointsBalanceResponse> {
    return api.get('/alpha-points/balance')
  },

  // EAT兑换Alpha点数
  async exchangeEATForAlpha(data: ExchangeRequest): Promise<ExchangeResponse> {
    return api.post('/alpha-points/exchange', data)
  },

  // 消耗Alpha点数
  async consumeAlphaPoints(data: ConsumeRequest): Promise<ConsumeResponse> {
    return api.post('/alpha-points/consume', data)
  },

  // 领取每日免费Alpha点数
  async claimDailyAlpha(): Promise<ClaimDailyResponse> {
    return api.post('/alpha-points/claim-daily')
  },

  // 获取Alpha点数消耗历史
  async getConsumptionHistory(params: {
    page?: number
    limit?: number
    type?: string
  } = {}) {
    return api.get('/alpha-points/history', { params })
  },
} 