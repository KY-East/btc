import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // AI对话可能需要更长时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
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

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || error.message)
  }
)

export interface ConversationType {
  type: string
  name: string
  description: string
  pointsCost: number
  estimatedResponseTime: string
  features: string[]
}

export interface ConversationRequest {
  type: string
  message: string
  context?: {
    symbol?: string
    timeframe?: string
    additionalData?: Record<string, any>
  }
}

export interface ConversationResponse {
  conversation: {
    id: string
    type: string
    response: {
      content: string
      confidence: number
      sources?: string[]
      charts?: string[]
    }
    pointsCost: number
    timestamp: string
    model: string
  }
  efficiency: number
  remainingBalance: number
}

export interface ConversationHistory {
  conversations: Array<{
    id: string
    type: string
    message: string
    response: string
    pointsCost: number
    timestamp: string
    rating?: number
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ConversationRating {
  conversationId: string
  rating: number // 1-5
  feedback?: string
}

export const aiAgentApi = {
  // 获取对话类型列表
  async getConversationTypes(): Promise<ConversationType[]> {
    return api.get('/ai-agent/conversation-types')
  },

  // 发起AI对话
  async startConversation(data: ConversationRequest): Promise<ConversationResponse> {
    return api.post('/ai-agent/conversation', data)
  },

  // 获取对话历史
  async getConversationHistory(params: {
    page?: number
    limit?: number
    type?: string
  } = {}): Promise<ConversationHistory> {
    return api.get('/ai-agent/history', { params })
  },

  // 评价对话质量
  async rateConversation(data: ConversationRating): Promise<{ message: string }> {
    return api.post('/ai-agent/rate', data)
  },

  // 获取对话统计
  async getConversationStats(): Promise<{
    totalConversations: number
    todayConversations: number
    totalPointsSpent: number
    todayPointsSpent: number
    averageRating: number
    favoriteType: string
  }> {
    return api.get('/ai-agent/stats')
  },
} 