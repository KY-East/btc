<template>
  <div class="buy-eat-container">
    <div class="exchange-card">
      <div class="card-header">
        <div class="header-title">购买EAT能量</div>
        <div class="exchange-status">交易进行中</div>
      </div>
      
      <div class="exchange-rates">
        <div class="rate-info">
          <div class="rate-label">当前NAV估值</div>
          <div class="rate-value">1 EAT = {{ navRate.toFixed(4) }} USDT</div>
          <div class="rate-updated">{{ lastUpdated }}更新</div>
        </div>
        
        <div class="rate-change" :class="changeDirection">
          <div class="change-value">{{ changePercentage }}%</div>
          <div class="change-direction-icon">{{ changeDirection === 'up' ? '↑' : changeDirection === 'down' ? '↓' : '→' }}</div>
          <div class="change-label">24h变化</div>
        </div>
      </div>
      
      <div class="exchange-form">
        <div class="input-wrapper">
          <div class="input-header">
            <div class="input-label">你支付</div>
            <div class="balance-info">余额: {{ walletBalance.toFixed(2) }} USDT</div>
          </div>
          
          <div class="input-control">
            <input 
              type="number" 
              v-model="payAmount" 
              placeholder="输入USDT金额" 
              min="0"
              @input="calculateReceiveAmount"
            />
            <div class="input-currency">USDT</div>
            <button class="max-btn" @click="setMaxAmount">最大</button>
          </div>
        </div>
        
        <div class="exchange-arrow">
          <div class="arrow-icon">↓</div>
        </div>
        
        <div class="input-wrapper">
          <div class="input-header">
            <div class="input-label">你获得</div>
            <div class="balance-info">估算值</div>
          </div>
          
          <div class="input-control">
            <input 
              type="number" 
              v-model="receiveAmount" 
              placeholder="获得EAT金额"
              disabled
            />
            <div class="input-currency">EAT</div>
          </div>
        </div>
        
        <div class="fee-calculator">
          <div class="fee-label">平台手续费 ({{ feePercentage }}%)</div>
          <div class="fee-value">{{ feeAmount.toFixed(4) }} USDT</div>
        </div>
      </div>
      
      <div class="exchange-summary">
        <div class="summary-row">
          <div class="summary-label">购买数量</div>
          <div class="summary-value">{{ receiveAmount }} EAT</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">价格</div>
          <div class="summary-value">{{ navRate.toFixed(4) }} USDT/EAT</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">手续费</div>
          <div class="summary-value">{{ feeAmount.toFixed(4) }} USDT</div>
        </div>
        <div class="summary-row total">
          <div class="summary-label">总计支付</div>
          <div class="summary-value">{{ payAmount }} USDT</div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="action-btn" :class="{ 'disabled': !canBuy }" @click="purchaseEAT">
          {{ payAmount > 0 ? '购买 EAT' : '输入金额' }}
        </button>
      </div>
      
      <div class="purchase-note">
        <div class="note-header">购买说明</div>
        <ul class="note-list">
          <li>单次最低购买金额: 10 USDT</li>
          <li>EAT将在完成交易后立即到账</li>
          <li>价格根据NAV实时估值，可能会有轻微波动</li>
          <li>大额交易可享受手续费优惠（2000+ USDT 1.5%，5000+ USDT 1%）</li>
        </ul>
      </div>
    </div>
    
    <div class="nav-history-card">
      <div class="card-header">
        <div class="header-title">NAV历史走势</div>
        <div class="chart-period">
          <button 
            v-for="(period, index) in chartPeriods" 
            :key="index"
            :class="{ 'active': activePeriod === period.value }"
            @click="changePeriod(period.value)"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
      
      <div class="chart-container">
        <div class="chart-placeholder">
          <!-- 这里将来会放实际的图表组件 -->
          <div class="chart-lines"></div>
          <div class="chart-price-points"></div>
          <div class="current-price-line"></div>
        </div>
        
        <div class="chart-stats">
          <div class="stat-item">
            <div class="stat-value up">+8.3%</div>
            <div class="stat-label">7日涨幅</div>
          </div>
          <div class="stat-item">
            <div class="stat-value up">+29.5%</div>
            <div class="stat-label">30日涨幅</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">1.2345</div>
            <div class="stat-label">最高NAV</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">0.9546</div>
            <div class="stat-label">最低NAV</div>
          </div>
        </div>
      </div>
      
      <div class="nav-description">
        <div class="desc-title">什么是NAV？</div>
        <div class="desc-content">
          NAV (净值) 是EAT代币的内在价值，根据平台策略账户表现每日计算，为代币提供价值支撑。当市场价格低于NAV时，平台会进行回购，维护价值稳定。
        </div>
      </div>
    </div>
    
    <div class="transaction-history-card">
      <div class="card-header">
        <div class="header-title">交易记录</div>
        <button class="view-all-btn">查看全部</button>
      </div>
      
      <div class="transaction-list">
        <div 
          v-for="(tx, index) in recentTransactions" 
          :key="index"
          class="transaction-item"
        >
          <div class="tx-icon" :class="tx.type">
            <span v-if="tx.type === 'buy'">↑</span>
            <span v-else-if="tx.type === 'claim'">⭐</span>
            <span v-else>↓</span>
          </div>
          
          <div class="tx-details">
            <div class="tx-title">{{ tx.title }}</div>
            <div class="tx-time">{{ tx.time }}</div>
          </div>
          
          <div class="tx-amount" :class="{ 'positive': tx.type !== 'sell' }">
            {{ tx.type !== 'sell' ? '+' : '-' }}{{ tx.amount }} EAT
          </div>
        </div>
      </div>
      
      <div class="no-transactions" v-if="recentTransactions.length === 0">
        <div class="empty-icon">📝</div>
        <div class="empty-text">暂无交易记录</div>
      </div>
    </div>
    
    <!-- 交易确认弹窗 -->
    <div class="confirmation-modal" v-if="showConfirmation">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">确认购买</div>
          <button class="close-btn" @click="showConfirmation = false">×</button>
        </div>
        
        <div class="confirmation-details">
          <div class="confirmation-row">
            <div class="detail-label">支付金额</div>
            <div class="detail-value">{{ payAmount }} USDT</div>
          </div>
          <div class="confirmation-row">
            <div class="detail-label">获得EAT</div>
            <div class="detail-value">{{ receiveAmount }} EAT</div>
          </div>
          <div class="confirmation-row">
            <div class="detail-label">当前价格</div>
            <div class="detail-value">{{ navRate.toFixed(4) }} USDT/EAT</div>
          </div>
          <div class="confirmation-row">
            <div class="detail-label">平台手续费</div>
            <div class="detail-value">{{ feeAmount.toFixed(4) }} USDT ({{ feePercentage }}%)</div>
          </div>
          
          <div class="confirmation-warning">
            交易完成后无法撤销，EAT将立即发送到您的钱包
          </div>
        </div>
        
        <div class="confirmation-actions">
          <button 
            class="confirm-btn" 
            :class="{ 'processing': processingPurchase }"
            @click="confirmPurchase" 
            :disabled="processingPurchase"
          >
            <span v-if="processingPurchase">处理中...</span>
            <span v-else>确认购买</span>
          </button>
          <button class="cancel-btn" @click="showConfirmation = false" :disabled="processingPurchase">取消</button>
        </div>
      </div>
    </div>
    
    <!-- 交易成功弹窗 -->
    <div class="success-modal" v-if="showSuccess">
      <div class="modal-content">
        <div class="success-icon">✅</div>
        <div class="success-title">购买成功！</div>
        <div class="success-message">
          您已成功购买 <span class="highlight">{{ receiveAmount }} EAT</span>
        </div>
        <div class="success-details">
          交易已完成，EAT已添加到您的钱包余额
        </div>
        <button class="done-btn" @click="finishTransaction">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuyEAT',
  data() {
    return {
      navRate: 1.12, // NAV估值，1 EAT = 1.12 USDT
      lastUpdated: '10分钟前',
      changePercentage: '+2.3',
      changeDirection: 'up', // up, down, neutral
      
      walletBalance: 1235.67, // 用户钱包USDT余额
      payAmount: '', // 用户想支付的USDT金额
      receiveAmount: '', // 用户将获得的EAT金额
      feePercentage: 2, // 手续费百分比
      feeAmount: 0, // 手续费金额
      
      activePeriod: '1m', // 默认选中1个月
      chartPeriods: [
        { label: '7天', value: '7d' },
        { label: '1个月', value: '1m' },
        { label: '3个月', value: '3m' },
        { label: '6个月', value: '6m' },
        { label: '1年', value: '1y' }
      ],
      
      recentTransactions: [
        { type: 'buy', title: '购买EAT', time: '2小时前', amount: 89.25 },
        { type: 'claim', title: '每日奖励', time: '昨天 09:24', amount: 1.0 },
        { type: 'buy', title: '购买EAT', time: '3天前', amount: 44.64 },
        { type: 'sell', title: '出售EAT', time: '1周前', amount: 20.0 },
        { type: 'claim', title: '邀请奖励', time: '1周前', amount: 5.0 }
      ],
      
      showConfirmation: false,
      showSuccess: false,
      processingPurchase: false
    }
  },
  
  computed: {
    // 是否可以购买
    canBuy() {
      return this.payAmount >= 10 && this.payAmount <= this.walletBalance;
    }
  },
  
  methods: {
    // 计算将获得的EAT金额
    calculateReceiveAmount() {
      if (!this.payAmount || this.payAmount <= 0) {
        this.receiveAmount = '';
        this.feeAmount = 0;
        return;
      }
      
      // 根据支付金额计算手续费
      this.updateFeePercentage();
      this.feeAmount = this.payAmount * (this.feePercentage / 100);
      
      // 净支付金额
      const netPayAmount = this.payAmount - this.feeAmount;
      
      // 计算获得的EAT
      this.receiveAmount = (netPayAmount / this.navRate).toFixed(4);
    },
    
    // 更新手续费百分比（根据金额梯度）
    updateFeePercentage() {
      if (this.payAmount >= 5000) {
        this.feePercentage = 1;
      } else if (this.payAmount >= 2000) {
        this.feePercentage = 1.5;
      } else {
        this.feePercentage = 2;
      }
    },
    
    // 设置最大金额
    setMaxAmount() {
      this.payAmount = this.walletBalance;
      this.calculateReceiveAmount();
    },
    
    // 切换图表周期
    changePeriod(period) {
      this.activePeriod = period;
      // 这里添加加载新数据的逻辑
    },
    
    // 开始购买流程
    purchaseEAT() {
      if (!this.canBuy) return;
      
      this.showConfirmation = true;
    },
    
    // 确认购买
    confirmPurchase() {
      this.processingPurchase = true;
      
      // 模拟网络请求延迟
      setTimeout(() => {
        this.processingPurchase = false;
        this.showConfirmation = false;
        this.showSuccess = true;
        
        // 更新用户余额
        this.walletBalance -= this.payAmount;
      }, 2000);
    },
    
    // 完成交易
    finishTransaction() {
      this.showSuccess = false;
      this.payAmount = '';
      this.receiveAmount = '';
      this.feeAmount = 0;
      
      // 添加新交易到历史记录
      this.recentTransactions.unshift({
        type: 'buy',
        title: '购买EAT',
        time: '刚刚',
        amount: parseFloat(this.receiveAmount)
      });
    }
  }
}
</script>

<style scoped>
.buy-eat-container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #e6e6ff;
}

/* 卡片通用样式 */
.exchange-card,
.nav-history-card,
.transaction-history-card {
  background: rgba(22, 28, 47, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(64, 110, 215, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px rgba(56, 114, 255, 0.1);
  overflow: hidden;
  padding: 20px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(64, 110, 215, 0.3);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.exchange-status {
  font-size: 14px;
  padding: 4px 10px;
  background: rgba(56, 168, 255, 0.2);
  border-radius: 20px;
  color: #38a8ff;
}

/* 汇率信息区域 */
.exchange-rates {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(16, 20, 40, 0.7);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.rate-info {
  flex: 1;
}

.rate-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.rate-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}

.rate-updated {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.rate-change {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 15px;
  border-radius: 8px;
  min-width: 80px;
}

.rate-change.up {
  background: rgba(0, 200, 100, 0.1);
}

.rate-change.down {
  background: rgba(255, 100, 100, 0.1);
}

.rate-change.neutral {
  background: rgba(200, 200, 200, 0.1);
}

.change-value {
  font-size: 18px;
  font-weight: 600;
}

.rate-change.up .change-value,
.rate-change.up .change-direction-icon {
  color: #2ecc71;
}

.rate-change.down .change-value,
.rate-change.down .change-direction-icon {
  color: #e74c3c;
}

.rate-change.neutral .change-value,
.rate-change.neutral .change-direction-icon {
  color: #bbb;
}

.change-direction-icon {
  font-size: 16px;
  margin-bottom: 2px;
}

.change-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 兑换表单 */
.exchange-form {
  margin-bottom: 20px;
}

.input-wrapper {
  margin-bottom: 15px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.input-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.balance-info {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.input-control {
  display: flex;
  background: rgba(16, 20, 40, 0.7);
  border: 1px solid rgba(64, 110, 215, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.input-control input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 12px 15px;
  outline: none;
}

.input-control input:disabled {
  opacity: 0.7;
}

.input-currency {
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: rgba(56, 114, 255, 0.1);
  color: #38a8ff;
  font-weight: 600;
}

.max-btn {
  background: rgba(56, 114, 255, 0.2);
  border: none;
  color: #38a8ff;
  padding: 0 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.max-btn:hover {
  background: rgba(56, 114, 255, 0.3);
}

.exchange-arrow {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.arrow-icon {
  width: 36px;
  height: 36px;
  background: rgba(56, 114, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38a8ff;
  font-size: 18px;
}

.fee-calculator {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px dashed rgba(64, 110, 215, 0.3);
  margin-top: 15px;
}

.fee-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.fee-value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 兑换总结 */
.exchange-summary {
  background: rgba(16, 20, 40, 0.7);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-row.total {
  padding-top: 8px;
  border-top: 1px dashed rgba(64, 110, 215, 0.3);
  margin-top: 8px;
}

.summary-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.summary-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.summary-row.total .summary-label,
.summary-row.total .summary-value {
  font-size: 16px;
  font-weight: 600;
}

/* 操作按钮 */
.action-buttons {
  margin-bottom: 20px;
}

.action-btn {
  width: 100%;
  background: linear-gradient(90deg, #3a7bd5, #2e5cc5);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: linear-gradient(90deg, #4887db, #3968cf);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(58, 123, 213, 0.3);
}

.action-btn.disabled {
  background: linear-gradient(90deg, #2c3e50, #34495e);
  color: rgba(255, 255, 255, 0.7);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 购买说明 */
.purchase-note {
  margin-top: 10px;
}

.note-header {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.note-list {
  padding-left: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

/* NAV历史走势卡片 */
.chart-period {
  display: flex;
  gap: 8px;
}

.chart-period button {
  background: rgba(16, 20, 40, 0.7);
  border: 1px solid rgba(64, 110, 215, 0.3);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.chart-period button.active {
  background: rgba(56, 114, 255, 0.2);
  color: #38a8ff;
  border-color: rgba(56, 114, 255, 0.4);
}

.chart-container {
  margin-bottom: 20px;
}

.chart-placeholder {
  height: 200px;
  background: rgba(16, 20, 40, 0.7);
  border-radius: 8px;
  position: relative;
  margin-bottom: 15px;
}

.chart-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(64, 110, 215, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 110, 215, 0.1) 1px, transparent 1px);
  background-size: 20% 25%, 20% 25%;
  background-position: center;
}

.chart-price-points {
  position: absolute;
  width: 80%;
  height: 60%;
  top: 20%;
  left: 10%;
  background-image: radial-gradient(circle, rgba(56, 114, 255, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

.current-price-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(56, 168, 255, 0.5), transparent);
  top: 40%;
  animation: pulseLine 2s infinite;
}

@keyframes pulseLine {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.chart-stats {
  display: flex;
  justify-content: space-between;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
}

.stat-value.up {
  color: #2ecc71;
}

.stat-value.down {
  color: #e74c3c;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.nav-description {
  background: rgba(16, 20, 40, 0.7);
  border-radius: 8px;
  padding: 15px;
}

.desc-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 10px;
}

.desc-content {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* 交易历史卡片 */
.view-all-btn {
  background: transparent;
  border: none;
  color: #38a8ff;
  font-size: 14px;
  cursor: pointer;
}

.transaction-list {
  max-height: 300px;
  overflow-y: auto;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(64, 110, 215, 0.1);
}

.transaction-item:last-child {
  border-bottom: none;
}

.tx-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 18px;
}

.tx-icon.buy {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.tx-icon.sell {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.tx-icon.claim {
  background: rgba(241, 196, 15, 0.1);
  color: #f1c40f;
}

.tx-details {
  flex: 1;
}

.tx-title {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 4px;
}

.tx-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.tx-amount {
  font-size: 16px;
  font-weight: 600;
  color: #e74c3c;
}

.tx-amount.positive {
  color: #2ecc71;
}

.no-transactions {
  text-align: center;
  padding: 40px 0;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

/* 确认弹窗 */
.confirmation-modal,
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgba(22, 28, 47, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(64, 110, 215, 0.5);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(64, 110, 215, 0.3);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
}

.confirmation-details {
  margin-bottom: 20px;
}

.confirmation-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.detail-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.detail-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.confirmation-warning {
  background: rgba(231, 76, 60, 0.1);
  border-left: 3px solid #e74c3c;
  padding: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 15px;
}

.confirmation-actions {
  display: flex;
  gap: 10px;
}

.confirm-btn,
.cancel-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn {
  background: linear-gradient(90deg, #3a7bd5, #2e5cc5);
  color: #fff;
  border: none;
}

.confirm-btn:hover {
  background: linear-gradient(90deg, #4887db, #3968cf);
  transform: translateY(-2px);
}

.confirm-btn.processing {
  background: linear-gradient(90deg, #34495e, #2c3e50);
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  background: transparent;
  border: 1px solid rgba(64, 110, 215, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

.cancel-btn:hover {
  background: rgba(64, 110, 215, 0.1);
}

.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 成功弹窗 */
.success-modal .modal-content {
  text-align: center;
  padding: 30px;
}

.success-icon {
  font-size: 48px;
  color: #2ecc71;
  margin-bottom: 15px;
}

.success-title {
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
}

.success-message {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
}

.highlight {
  color: #38a8ff;
  font-weight: 600;
}

.success-details {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
}

.done-btn {
  background: linear-gradient(90deg, #3a7bd5, #2e5cc5);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.done-btn:hover {
  background: linear-gradient(90deg, #4887db, #3968cf);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(58, 123, 213, 0.3);
}
</style> 