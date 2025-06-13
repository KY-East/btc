<template>
  <div class="dual-token-balance">
    <!-- EAT代币余额 -->
    <div class="token-card eat-card">
      <div class="token-header">
        <div class="token-icon eat-icon">₮</div>
        <div class="token-info">
          <div class="token-name">EAT代币</div>
          <div class="token-subtitle">价值存储 · 治理权益</div>
        </div>
      </div>
      
      <div class="token-balance">
        <div class="balance-amount">{{ formatNumber(eatState.balance) }}</div>
        <div class="balance-label">EAT</div>
      </div>
      
      <div class="token-details">
        <div class="detail-item">
          <span class="detail-label">NAV估值</span>
          <span class="detail-value">${{ formatNumber(eatState.navValue) }}</span>
        </div>
        <div class="detail-item" v-if="eatState.stakingAmount > 0">
          <span class="detail-label">质押中</span>
          <span class="detail-value">{{ formatNumber(eatState.stakingAmount) }} EAT</span>
        </div>
      </div>
      
      <div class="token-actions">
        <button class="action-btn primary" @click="$emit('buy-eat')">
          购买EAT
        </button>
        <button class="action-btn secondary" @click="showExchangeModal = true">
          兑换Alpha点数
        </button>
      </div>
    </div>
    
    <!-- Alpha点数余额 -->
    <div class="token-card alpha-card">
      <div class="token-header">
        <div class="token-icon alpha-icon">α</div>
        <div class="token-info">
          <div class="token-name">Alpha点数</div>
          <div class="token-subtitle">功能消耗 · 实用代币</div>
        </div>
      </div>
      
      <div class="token-balance">
        <div class="balance-amount">{{ formatNumber(alphaPointsState.balance) }}</div>
        <div class="balance-label">/ {{ formatNumber(totalCapacity) }}</div>
      </div>
      
      <div class="capacity-bar">
        <div 
          class="capacity-fill" 
          :style="{ width: `${(alphaPointsState.balance / totalCapacity) * 100}%` }"
        ></div>
      </div>
      
      <div class="token-details">
        <div class="detail-item">
          <span class="detail-label">衰减率</span>
          <span class="detail-value">{{ (alphaPointsState.decayRate * 100).toFixed(1) }}%/日</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">免费额度</span>
          <span class="detail-value">{{ alphaPointsState.dailyFreeAllocation }}/日</span>
        </div>
      </div>
      
      <div class="token-actions">
        <button 
          class="action-btn primary" 
          @click="claimDaily"
          :disabled="!canClaimDaily || loading"
        >
          {{ canClaimDaily ? '领取每日额度' : '已领取今日额度' }}
        </button>
      </div>
    </div>
    
    <!-- 兑换模态框 -->
    <div v-if="showExchangeModal" class="modal-overlay" @click="showExchangeModal = false">
      <div class="exchange-modal" @click.stop>
        <div class="modal-header">
          <h3>EAT兑换Alpha点数</h3>
          <button class="close-btn" @click="showExchangeModal = false">×</button>
        </div>
        
        <div class="exchange-form">
          <div class="input-group">
            <label>兑换数量</label>
            <div class="input-wrapper">
              <input 
                v-model.number="exchangeAmount" 
                type="number" 
                placeholder="输入EAT数量"
                :max="eatState.balance"
                min="0.01"
                step="0.01"
              >
              <span class="input-suffix">EAT</span>
            </div>
          </div>
          
          <div class="exchange-preview">
            <div class="preview-item">
              <span>兑换比例</span>
              <span>1 EAT = {{ exchangeRate }} Alpha点数</span>
            </div>
            <div class="preview-item">
              <span>将获得</span>
              <span class="highlight">{{ formatNumber(exchangeAmount * exchangeRate) }} Alpha点数</span>
            </div>
            <div class="preview-item">
              <span>燃烧EAT</span>
              <span class="burn-amount">{{ formatNumber(exchangeAmount * 0.85) }} EAT (85%)</span>
            </div>
          </div>
          
          <div class="modal-actions">
            <button class="action-btn secondary" @click="showExchangeModal = false">
              取消
            </button>
            <button 
              class="action-btn primary" 
              @click="handleExchange"
              :disabled="!canExchange || loading"
            >
              {{ loading ? '兑换中...' : '确认兑换' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDualTokenStore } from '@/stores/dualToken'
import { useNotification } from '@/composables/useNotification'

const emit = defineEmits(['buy-eat'])

const dualTokenStore = useDualTokenStore()
const { showSuccess, showError } = useNotification()

// 响应式数据
const showExchangeModal = ref(false)
const exchangeAmount = ref(1)

// 计算属性
const { 
  eatState, 
  alphaPointsState, 
  totalCapacity, 
  canClaimDaily, 
  exchangeRate,
  loading 
} = dualTokenStore

const canExchange = computed(() => {
  return exchangeAmount.value > 0 && 
         exchangeAmount.value <= eatState.balance &&
         !loading
})

// 方法
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num)
}

const claimDaily = async () => {
  try {
    const result = await dualTokenStore.claimDailyAlpha()
    showSuccess(`成功领取 ${result.pointsReceived} Alpha点数！`)
  } catch (error: any) {
    showError(error.message)
  }
}

const handleExchange = async () => {
  try {
    const result = await dualTokenStore.exchangeEATForAlpha(exchangeAmount.value)
    showSuccess(`成功兑换 ${result.transaction.alphaPointsReceived} Alpha点数！`)
    showExchangeModal.value = false
    exchangeAmount.value = 1
  } catch (error: any) {
    showError(error.message)
  }
}
</script>

<style scoped>
.dual-token-balance {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.token-card {
  background: linear-gradient(135deg, rgba(20, 40, 80, 0.8), rgba(10, 20, 40, 0.9));
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.token-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.6), transparent);
}

.eat-card::before {
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.6), transparent);
}

.alpha-card::before {
  background: linear-gradient(90deg, transparent, rgba(0, 150, 255, 0.6), transparent);
}

.token-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.token-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.eat-icon {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
}

.alpha-icon {
  background: linear-gradient(135deg, #0096FF, #0066CC);
  color: #fff;
}

.token-info {
  flex: 1;
}

.token-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.token-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.token-balance {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
}

.balance-amount {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.balance-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.capacity-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  background: linear-gradient(90deg, #0096FF, #00BFFF);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.token-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.detail-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.token-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #0096FF, #0066CC);
  color: #fff;
}

.action-btn.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #00BFFF, #0096FF);
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.exchange-modal {
  background: linear-gradient(135deg, rgba(20, 40, 80, 0.95), rgba(10, 20, 40, 0.98));
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 480px;
  backdrop-filter: blur(20px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.exchange-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-group label {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 60px 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #0096FF;
  box-shadow: 0 0 0 2px rgba(0, 150, 255, 0.2);
}

.input-suffix {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.exchange-preview {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.preview-item span:first-child {
  color: rgba(255, 255, 255, 0.7);
}

.preview-item span:last-child {
  color: #fff;
  font-weight: 500;
}

.highlight {
  color: #00BFFF !important;
}

.burn-amount {
  color: #FF6B6B !important;
}

.modal-actions {
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .dual-token-balance {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .token-card {
    padding: 20px;
  }
  
  .balance-amount {
    font-size: 28px;
  }
  
  .exchange-modal {
    padding: 24px;
    margin: 16px;
  }
}
</style> 