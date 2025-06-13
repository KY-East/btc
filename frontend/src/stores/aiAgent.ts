import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { aiAgentApi } from '@/api/aiAgent'
import { useDualTokenStore } from './dualToken'

export interface ConversationType {
  type: string
  name: string
  description: string
  pointsCost: number
  estimatedResponseTime: string
}

export interface Conversation {
  id: string
  type: string
  message: string
  response: string
  pointsCost: number
  timestamp: string
  efficiency?: number
}

export const useAiAgentStore = defineStore('aiAgent', () => {
  const dualTokenStore = useDualTokenStore()
  
  // 状态
  const conversations = ref<Conversation[]>([])
  const conversationTypes = ref<ConversationType[]>([])
  const currentConversation = ref<Conversation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // 计算属性
  const canStartConversation = computed(() => (pointsCost: number) => {
    return dualTokenStore.alphaPointsState.balance >= pointsCost
  })
  
  const todayConversationCount = computed(() => {
    const today = new Date().toDateString()
    return conversations.value.filter(conv => 
      new Date(conv.timestamp).toDateString() === today
    ).length
  })
  
  const totalPointsSpentToday = computed(() => {
    const today = new Date().toDateString()
    return conversations.value
      .filter(conv => new Date(conv.timestamp).toDateString() === today)
      .reduce((total, conv) => total + conv.pointsCost, 0)
  })
  
  // Actions
  const fetchConversationTypes = async () => {
    loading.value = true
    error.value = null
    try {
      const types = await aiAgentApi.getConversationTypes()
      conversationTypes.value = types
    } catch (err: any) {
      error.value = err.message || '获取对话类型失败'
    } finally {
      loading.value = false
    }
  }
  
  const startConversation = async (type: string, message: string, context?: any) => {
    const conversationType = conversationTypes.value.find(t => t.type === type)
    if (!conversationType) {
      throw new Error('无效的对话类型')
    }
    
    if (!canStartConversation.value(conversationType.pointsCost)) {
      throw new Error('Alpha点数余额不足')
    }
    
    loading.value = true
    error.value = null
    try {
      // 先消耗Alpha点数
      await dualTokenStore.consumeAlphaPoints(
        conversationType.pointsCost,
        'ai_conversation',
        `${conversationType.name}对话`
      )
      
      // 发起对话
      const result = await aiAgentApi.startConversation({
        type,
        message,
        context
      })
      
      const conversation: Conversation = {
        id: result.conversation.id,
        type: result.conversation.type,
        message,
        response: result.conversation.response.content,
        pointsCost: result.conversation.pointsCost,
        timestamp: result.conversation.timestamp,
        efficiency: result.efficiency
      }
      
      conversations.value.unshift(conversation)
      currentConversation.value = conversation
      
      return conversation
    } catch (err: any) {
      error.value = err.message || '对话失败'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const fetchConversationHistory = async (page = 1, limit = 10) => {
    loading.value = true
    error.value = null
    try {
      const result = await aiAgentApi.getConversationHistory({ page, limit })
      if (page === 1) {
        conversations.value = result.conversations
      } else {
        conversations.value.push(...result.conversations)
      }
      return result
    } catch (err: any) {
      error.value = err.message || '获取对话历史失败'
    } finally {
      loading.value = false
    }
  }
  
  const clearCurrentConversation = () => {
    currentConversation.value = null
  }
  
  const getConversationTypeByType = (type: string) => {
    return conversationTypes.value.find(t => t.type === type)
  }
  
  return {
    // State
    conversations,
    conversationTypes,
    currentConversation,
    loading,
    error,
    
    // Computed
    canStartConversation,
    todayConversationCount,
    totalPointsSpentToday,
    
    // Actions
    fetchConversationTypes,
    startConversation,
    fetchConversationHistory,
    clearCurrentConversation,
    getConversationTypeByType
  }
}) 