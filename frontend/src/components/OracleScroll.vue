<template>
  <div class="oracle-scroll-container">
    <div 
      class="oracle-scroll" 
      :class="{
        'locked': isLocked,
        'expanded': isExpanded,
        'glow': isUnlocking
      }"
      @click="handleClick"
    >
      <!-- 卷轴装饰元素 -->
      <div class="scroll-handle scroll-handle-top"></div>
      <div class="scroll-handle scroll-handle-bottom"></div>
      
      <!-- 卷轴内容 -->
      <div class="scroll-content">
        <!-- 锁定状态下显示模糊内容 -->
        <template v-if="isLocked">
          <div class="locked-content">
            <div class="lock-icon">🔒</div>
            <h3 class="locked-title">今日神谕</h3>
            <div class="blurred-coin">{{ oracleData.coin || '???' }}</div>
            <div class="blurred-action"></div>
            <div class="blurred-text"></div>
            <div class="blurred-text"></div>
            <div class="unlock-instruction">使用1 EAT解锁详情</div>
          </div>
        </template>
        
        <!-- 解锁状态下显示完整内容 -->
        <template v-else>
          <div class="oracle-header">
            <div class="oracle-icon">🔮</div>
            <h3 class="oracle-title">今日神谕</h3>
            <div class="oracle-date">{{ formattedDate }}</div>
          </div>
          
          <div class="oracle-body">
            <div class="oracle-section">
              <div class="section-label">交易对</div>
              <div class="coin-name">{{ oracleData.coin || 'BTC/USDT' }}</div>
            </div>
            
            <div class="oracle-section">
              <div class="section-label">操作建议</div>
              <div 
                class="action-badge" 
                :class="actionClass"
              >{{ oracleData.action || '观望' }}</div>
            </div>
            
            <div class="oracle-section">
              <div class="section-label">分析概要</div>
              <div class="reason-text">{{ oracleData.reason || '暂无数据' }}</div>
            </div>
            
            <div v-if="oracleData.detail" class="oracle-section detail-section">
              <div class="section-label">
                <div class="expand-button" @click.stop="toggleDetail">
                  {{ isDetailExpanded ? '收起' : '展开' }} 详情
                  <span class="expand-icon">{{ isDetailExpanded ? '▲' : '▼' }}</span>
                </div>
              </div>
              <div v-if="isDetailExpanded" class="detail-text">
                {{ oracleData.detail }}
              </div>
            </div>
          </div>
          
          <div class="oracle-footer">
            <div class="confidence-meter">
              <div class="confidence-label">AI确信度</div>
              <div class="meter-track">
                <div 
                  class="meter-fill"
                  :style="{ width: `${oracleData.confidence || 50}%` }"
                  :class="confidenceClass"
                ></div>
              </div>
              <div class="confidence-value">{{ oracleData.confidence || 50 }}%</div>
            </div>
          </div>
        </template>
      </div>
      
      <!-- 解锁动画蒙层 -->
      <div v-if="isUnlocking" class="unlock-overlay">
        <div class="unlock-animation">
          <div class="unlock-spark"></div>
          <div class="unlock-text">解锁中...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isLocked: {
    type: Boolean,
    default: true
  },
  oracleData: {
    type: Object,
    default: () => ({
      coin: 'ETH/USDT',
      action: '买入',
      reason: '30日趋势线突破，资金流入显著增加',
      detail: '该币种展现出强劲上涨动能，近期资金净流入超过行业均值。技术面上，MACD金叉形成，RSI摆脱超卖区域。建议适量参与，止损设置在支撑位下方5%。',
      confidence: 78,
      date: new Date()
    })
  }
});

const emit = defineEmits(['unlock', 'expand']);

// 状态
const isExpanded = ref(false);
const isUnlocking = ref(false);
const isDetailExpanded = ref(false);

// 计算属性
const formattedDate = computed(() => {
  const date = props.oracleData.date instanceof Date 
    ? props.oracleData.date 
    : new Date();
  
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
});

const actionClass = computed(() => {
  const actionMap = {
    '买入': 'buy',
    '卖出': 'sell',
    '减仓': 'reduce',
    '观望': 'hold',
    '加仓': 'add'
  };
  
  return actionMap[props.oracleData.action] || 'hold';
});

const confidenceClass = computed(() => {
  const confidence = props.oracleData.confidence || 50;
  
  if (confidence >= 80) return 'high';
  if (confidence >= 50) return 'medium';
  return 'low';
});

// 方法
const handleClick = () => {
  if (props.isLocked) {
    // 触发解锁请求
    emit('unlock');
  } else {
    // 展开/收起卷轴
    isExpanded.value = !isExpanded.value;
    emit('expand', isExpanded.value);
  }
};

// 展开/收起详情
const toggleDetail = (event) => {
  isDetailExpanded.value = !isDetailExpanded.value;
  // 阻止事件冒泡，避免触发卷轴的点击事件
  event.stopPropagation();
};

// 显示解锁动画
const showUnlockAnimation = () => {
  isUnlocking.value = true;
  
  setTimeout(() => {
    isUnlocking.value = false;
  }, 2000); // 2秒后结束动画
};

// 导出方法给父组件调用
defineExpose({
  showUnlockAnimation
});
</script>

<style scoped>
.oracle-scroll-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.oracle-scroll {
  position: relative;
  background: linear-gradient(135deg, rgba(10, 20, 40, 0.8), rgba(5, 15, 35, 0.9));
  border: 1px solid rgba(0, 180, 255, 0.4);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 
    0 0 30px rgba(0, 150, 255, 0.25),
    inset 0 0 20px rgba(0, 100, 200, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  cursor: pointer;
  transform-origin: center top;
  max-width: 100%;
  width: 100%;
}

/* 卷轴展开状态 */
.oracle-scroll.expanded {
  transform: scale(1.02);
  box-shadow: 
    0 0 40px rgba(0, 180, 255, 0.35),
    inset 0 0 25px rgba(0, 130, 255, 0.15);
}

/* 锁定状态 */
.oracle-scroll.locked {
  filter: blur(1px) brightness(0.8);
}

/* 发光效果 */
.oracle-scroll.glow {
  box-shadow: 0 0 50px rgba(0, 200, 255, 0.7);
  border-color: rgba(0, 255, 255, 0.7);
}

.oracle-scroll::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent 40%,
    rgba(0, 200, 255, 0.1) 50%,
    transparent 60%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: hologram-scan 12s linear infinite;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
}

/* 卷轴装饰 */
.scroll-handle {
  position: absolute;
  width: 100%;
  height: 15px;
  background: linear-gradient(180deg, rgba(0, 60, 120, 0.8), rgba(0, 40, 80, 0.9));
  left: 0;
  z-index: 1;
}

.scroll-handle-top {
  top: 0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid rgba(0, 180, 255, 0.4);
}

.scroll-handle-bottom {
  bottom: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top: 1px solid rgba(0, 180, 255, 0.4);
}

/* 卷轴内容 */
.scroll-content {
  position: relative;
  z-index: 2;
  padding: 20px 5px 10px;
}

/* 锁定状态内容 */
.locked-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 250px;
}

.lock-icon {
  font-size: 36px;
  color: rgba(200, 200, 200, 0.6);
  margin-bottom: 20px;
  text-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
}

.locked-title {
  font-size: 24px;
  color: rgba(200, 230, 255, 0.8);
  margin-bottom: 25px;
  text-shadow: 0 0 10px rgba(0, 180, 255, 0.5);
}

.blurred-coin {
  font-size: 22px;
  color: rgba(200, 220, 255, 0.7);
  margin-bottom: 20px;
  filter: blur(3px);
  pointer-events: none;
}

.blurred-action {
  width: 80px;
  height: 28px;
  background: rgba(100, 200, 255, 0.4);
  border-radius: 14px;
  margin: 0 auto 20px;
  filter: blur(4px);
}

.blurred-text {
  width: 80%;
  height: 10px;
  background: rgba(200, 200, 200, 0.4);
  border-radius: 5px;
  margin: 10px auto;
  filter: blur(3px);
}

.unlock-instruction {
  margin-top: 25px;
  color: #00e0ff;
  font-size: 16px;
  font-weight: bold;
  animation: pulse 2s infinite;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
}

/* 解锁后内容样式 */
.oracle-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.3);
}

.oracle-icon {
  font-size: 28px;
  margin-right: 15px;
  text-shadow: 0 0 10px rgba(0, 180, 255, 0.8);
}

.oracle-title {
  font-size: 26px;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 15px rgba(0, 150, 255, 0.6);
}

.oracle-date {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  color: #8ae;
  background: rgba(0, 50, 100, 0.3);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 150, 255, 0.3);
}

.oracle-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.oracle-section {
  margin-bottom: 22px;
}

.section-label {
  font-size: 16px;
  color: #8ae;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.coin-name {
  font-size: 32px;
  font-weight: bold;
  color: #00e0ff;
  text-shadow: 0 0 15px rgba(0, 200, 255, 0.6);
  margin-bottom: 5px;
}

.action-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  overflow: hidden;
}

.action-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
}

.action-badge.buy {
  background: rgba(0, 200, 100, 0.25);
  color: #0fa;
  border: 1px solid rgba(0, 255, 150, 0.5);
  box-shadow: 0 0 15px rgba(0, 200, 100, 0.4);
}

.action-badge.sell {
  background: rgba(255, 50, 50, 0.25);
  color: #f88;
  border: 1px solid rgba(255, 100, 100, 0.5);
  box-shadow: 0 0 15px rgba(255, 50, 50, 0.4);
}

.action-badge.hold {
  background: rgba(200, 200, 200, 0.25);
  color: #eee;
  border: 1px solid rgba(200, 200, 200, 0.5);
  box-shadow: 0 0 15px rgba(200, 200, 200, 0.4);
}

.action-badge.reduce {
  background: rgba(255, 150, 50, 0.25);
  color: #fc0;
  border: 1px solid rgba(255, 150, 50, 0.5);
  box-shadow: 0 0 15px rgba(255, 150, 50, 0.4);
}

.action-badge.add {
  background: rgba(100, 200, 255, 0.25);
  color: #0df;
  border: 1px solid rgba(100, 200, 255, 0.5);
  box-shadow: 0 0 15px rgba(100, 200, 255, 0.4);
}

.reason-text {
  line-height: 1.6;
  color: #eee;
  font-size: 18px;
}

.detail-section {
  border-top: 1px dashed rgba(0, 180, 255, 0.4);
  padding-top: 15px;
}

.expand-button {
  color: #00e0ff;
  cursor: pointer;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 8px;
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 150, 255, 0.3);
  transition: all 0.2s ease;
}

.expand-button:hover {
  background: rgba(0, 120, 220, 0.3);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.4);
}

.expand-icon {
  margin-left: 6px;
  font-size: 12px;
}

.detail-text {
  font-size: 16px;
  line-height: 1.7;
  color: #ddd;
  margin-top: 15px;
  padding: 15px;
  background: rgba(0, 20, 40, 0.4);
  border-radius: 10px;
  border: 1px solid rgba(0, 150, 255, 0.25);
}

/* 底部内容 */
.oracle-footer {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 180, 255, 0.3);
}

.confidence-meter {
  display: flex;
  align-items: center;
  gap: 15px;
}

.confidence-label {
  font-size: 16px;
  color: #8ae;
  white-space: nowrap;
}

.meter-track {
  flex: 1;
  height: 10px;
  background: rgba(20, 30, 50, 0.6);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 100, 200, 0.4);
}

.meter-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 1s ease-out;
  position: relative;
  overflow: hidden;
}

.meter-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: meter-shine 2s linear infinite;
}

.meter-fill.high {
  background: linear-gradient(90deg, #0c0, #0f0);
  box-shadow: 0 0 10px rgba(0, 255, 100, 0.5);
}

.meter-fill.medium {
  background: linear-gradient(90deg, #fc0, #ff0);
  box-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
}

.meter-fill.low {
  background: linear-gradient(90deg, #f00, #f60);
  box-shadow: 0 0 10px rgba(255, 50, 0, 0.5);
}

.confidence-value {
  font-size: 18px;
  color: #eee;
  width: 50px;
  text-align: right;
  font-weight: bold;
}

/* 解锁动画 */
.unlock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 20, 40, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.unlock-animation {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.unlock-spark {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.9) 0%, rgba(0, 100, 255, 0) 70%);
  border-radius: 50%;
  animation: spark 1.5s ease-out infinite;
  margin-bottom: 25px;
  position: relative;
}

.unlock-spark::before, 
.unlock-spark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.unlock-spark::before {
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
  animation: inner-spark 1.5s ease-out infinite;
}

.unlock-spark::after {
  width: 120%;
  height: 120%;
  border: 2px solid rgba(0, 200, 255, 0.4);
  animation: expand-ring 1.5s ease-out infinite;
}

.unlock-text {
  color: #00e0ff;
  font-size: 20px;
  animation: fadeInOut 1.5s infinite;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
}

/* 动画定义 */
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; text-shadow: 0 0 15px rgba(0, 200, 255, 1); }
  100% { opacity: 0.6; }
}

@keyframes spark {
  0% { transform: scale(0.5); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(0.5); opacity: 0.3; }
}

@keyframes inner-spark {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

@keyframes expand-ring {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

@keyframes fadeInOut {
  0% { opacity: 0.4; }
  50% { opacity: 1; text-shadow: 0 0 15px rgba(0, 200, 255, 1); }
  100% { opacity: 0.4; }
}

@keyframes hologram-scan {
  0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
  20% { opacity: 0.3; }
  40% { opacity: 0; }
  60% { opacity: 0.3; }
  80% { opacity: 0; }
  100% { transform: translate(50%, 50%) rotate(45deg); opacity: 0; }
}

@keyframes meter-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 响应式设计，确保在不同设备上都有良好表现 */
@media (min-width: 768px) {
  .oracle-scroll-container {
    max-width: 800px;
  }
  
  .oracle-scroll {
    padding: 25px;
  }
  
  .scroll-content {
    padding: 30px 15px 15px;
  }
  
  .oracle-header {
    margin-bottom: 30px;
  }
  
  .coin-name {
    font-size: 36px;
  }
  
  .reason-text {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .oracle-scroll-container {
    max-width: 1000px;
  }
}
</style> 