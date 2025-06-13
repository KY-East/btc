import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dualTokenApi } from '@/api/dualToken'

export interface AlphaPointsState {
  balance: number
  capacity: number
  dailyFreeAllocation: number
  lastFreeAllocation: string | null
  stakingBonus: number
  decayRate: number
}

export interface EATState {
  balance: number
  stakingAmount: number
  stakingTier: string
  navValue: number
}

export const useDualTokenStore = defineStore('dualToken', () => {
  // EAT代币状态
  const eatState = ref<EATState>({
    balance: 0,
    stakingAmount: 0,
    stakingTier: 'none',
    navValue: 1.28
  })

  // Alpha点数状态
  const alphaPointsState = ref<AlphaPointsState>({
    balance: 0,
    capacity: 800,
    dailyFreeAllocation: 30,
    lastFreeAllocation: null,
    stakingBonus: 0,
    decayRate: 0.15
  })

  // 加载状态
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const totalCapacity = computed(() => 
    alphaPointsState.value.capacity + alphaPointsState.value.stakingBonus
  )

  const canClaimDaily = computed(() => {
    if (!alphaPointsState.value.lastFreeAllocation) return true
    const lastClaim = new Date(alphaPointsState.value.lastFreeAllocation)
    const now = new Date()
    return now.getTime() - lastClaim.getTime() >= 24 * 60 * 60 * 1000
  })

  const exchangeRate = computed(() => 100) // 1 EAT = 100 Alpha点数

  // Actions
  const fetchBalances = async () => {
    loading.value = true
    error.value = null
    try {
      const [eatData, alphaData] = await Promise.all([
        dualTokenApi.getEATBalance(),
        dualTokenApi.getAlphaPointsBalance()
      ])
      
      eatState.value = { ...eatState.value, ...eatData }
      alphaPointsState.value = { ...alphaPointsState.value, ...alphaData }
    } catch (err: any) {
      error.value = err.message || '获取余额失败'
    } finally {
      loading.value = false
    }
  }

  const exchangeEATForAlpha = async (eatAmount: number) => {
    loading.value = true
    error.value = null
    try {
      const expectedAlphaPoints = eatAmount * exchangeRate.value
      const result = await dualTokenApi.exchangeEATForAlpha({
        eatAmount,
        expectedAlphaPoints
      })
      
      // 更新本地状态
      eatState.value.balance = result.newBalances.eatBalance
      alphaPointsState.value.balance = result.newBalances.alphaPoints
      
      return result
    } catch (err: any) {
      error.value = err.message || '兑换失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const claimDailyAlpha = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await dualTokenApi.claimDailyAlpha()
      alphaPointsState.value.balance = result.newBalance
      alphaPointsState.value.lastFreeAllocation = new Date().toISOString()
      return result
    } catch (err: any) {
      error.value = err.message || '领取失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const consumeAlphaPoints = async (amount: number, type: string, description: string) => {
    if (alphaPointsState.value.balance < amount) {
      throw new Error('Alpha点数余额不足')
    }
    
    loading.value = true
    error.value = null
    try {
      const result = await dualTokenApi.consumeAlphaPoints({
        amount,
        type,
        description
      })
      
      alphaPointsState.value.balance = result.remainingBalance
      return result
    } catch (err: any) {
      error.value = err.message || '消耗失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 自动衰减处理
  const processDecay = () => {
    const now = new Date()
    const lastUpdate = alphaPointsState.value.lastFreeAllocation 
      ? new Date(alphaPointsState.value.lastFreeAllocation)
      : new Date()
    
    const hoursPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
    
    if (hoursPassed >= 24) {
      const decayAmount = alphaPointsState.value.balance * alphaPointsState.value.decayRate
      alphaPointsState.value.balance = Math.max(0, alphaPointsState.value.balance - decayAmount)
    }
  }

  return {
    // State
    eatState,
    alphaPointsState,
    loading,
    error,
    
    // Computed
    totalCapacity,
    canClaimDaily,
    exchangeRate,
    
    // Actions
    fetchBalances,
    exchangeEATForAlpha,
    claimDailyAlpha,
    consumeAlphaPoints,
    processDecay
  }
}) 