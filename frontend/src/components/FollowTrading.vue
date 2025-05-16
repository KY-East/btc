<template>
  <div class="follow-trading-container">
    <div class="quantum-card main-card">
      <div class="card-header">
        <div class="header-title">量子跟单系统</div>
        <div class="header-tag">Alpha</div>
      </div>
      
      <div class="content-section">
        <div class="quantum-description">
          <div class="description-icon">
            <div class="icon-glow"></div>
            <span>🔮</span>
          </div>
          <div class="description-text">
            <p class="main-text">量子跟单是EZ Trading的顶级服务，允许您自动跟随神谕提供的交易信号</p>
            <p class="sub-text">解锁后，系统将根据您的风险偏好和资金设置，自动执行交易指令</p>
          </div>
        </div>
        
        <!-- 跟单设置卡片 -->
        <div class="settings-card">
          <h3 class="settings-title">跟单设置</h3>
          
          <div class="settings-section">
            <div class="setting-item">
              <div class="setting-label">风险等级</div>
              <div class="setting-control range-slider">
                <input type="range" min="1" max="10" v-model="riskLevel" class="slider" disabled />
                <div class="range-values">
                  <span>保守</span>
                  <span>平衡</span>
                  <span>激进</span>
                </div>
                <div class="selected-value">
                  {{ riskLevel <= 3 ? '保守' : riskLevel <= 7 ? '平衡' : '激进' }}
                </div>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">每单资金比例</div>
              <div class="setting-control range-slider">
                <input type="range" min="5" max="50" step="5" v-model="fundPercentage" class="slider" disabled />
                <div class="range-values">
                  <span>5%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
                <div class="selected-value">{{ fundPercentage }}%</div>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">杠杆倍数</div>
              <div class="setting-control range-slider">
                <input type="range" min="1" max="20" v-model="leverage" class="slider" disabled />
                <div class="range-values">
                  <span>1×</span>
                  <span>10×</span>
                  <span>20×</span>
                </div>
                <div class="selected-value">{{ leverage }}×</div>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">止盈比例</div>
              <div class="setting-control range-slider">
                <input type="range" min="10" max="100" step="10" v-model="takeProfitPercentage" class="slider" disabled />
                <div class="range-values">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <div class="selected-value">{{ takeProfitPercentage }}%</div>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">止损比例</div>
              <div class="setting-control range-slider">
                <input type="range" min="5" max="50" step="5" v-model="stopLossPercentage" class="slider" disabled />
                <div class="range-values">
                  <span>5%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
                <div class="selected-value">{{ stopLossPercentage }}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 解锁信息 -->
        <div class="unlock-info">
          <div class="lock-icon">🔒</div>
          <div class="unlock-message">解锁量子跟单需要消耗 <span class="eat-amount">3 EAT</span></div>
          <div class="benefits">
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">自动跟随神谕交易信号</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">自定义风险等级与资金配置</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">24/7不间断监控市场</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">定制化止盈止损策略</div>
            </div>
          </div>
          <button class="quantum-unlock-button">
            解锁跟单功能
          </button>
        </div>
      </div>
    </div>
    
    <!-- 历史跟单记录 -->
    <div class="quantum-card history-card">
      <div class="card-header">
        <div class="header-title">历史跟单记录</div>
        <div class="locked-tag">未解锁</div>
      </div>
      
      <div class="locked-content">
        <div class="quantum-lock-visual">
          <div class="lock-circle"></div>
          <div class="lock-body"></div>
          <div class="lock-energy"></div>
        </div>
        <div class="locked-text">解锁后查看历史跟单记录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 跟单设置参数
const riskLevel = ref(5); // 1-10
const fundPercentage = ref(20); // 资金比例 5-50%
const leverage = ref(3); // 杠杆倍数 1-20
const takeProfitPercentage = ref(30); // 止盈比例 10-100%
const stopLossPercentage = ref(10); // 止损比例 5-50%
</script>

<style scoped>
.follow-trading-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  width: 100%;
}

.quantum-card {
  background: rgba(15, 25, 50, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(0, 150, 255, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 100, 255, 0.15);
}

.quantum-card:hover {
  box-shadow: 0 0 30px rgba(0, 150, 255, 0.3);
  border-color: rgba(0, 200, 255, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(90deg, rgba(20, 30, 60, 0.8), rgba(30, 40, 80, 0.5));
  border-bottom: 1px solid rgba(0, 150, 255, 0.2);
}

.header-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0cf;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.header-tag {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 150, 255, 0.2);
  color: #0cf;
}

.locked-tag {
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 4px;
  background: rgba(150, 50, 50, 0.3);
  color: #f77;
}

.content-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quantum-description {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(20, 40, 70, 0.4);
  border-radius: 10px;
  border-left: 3px solid #0af;
}

.description-icon {
  position: relative;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 150, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(0.8); opacity: 0.3; }
}

.description-text {
  flex: 1;
}

.description-text .main-text {
  font-size: 1rem;
  color: #fff;
  margin: 0 0 5px 0;
}

.description-text .sub-text {
  font-size: 0.85rem;
  color: #aac;
  margin: 0;
}

.settings-card {
  background: rgba(20, 35, 60, 0.4);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(0, 100, 200, 0.2);
}

.settings-title {
  font-size: 1.1rem;
  color: #0cf;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.2);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-size: 0.9rem;
  color: #bbc;
}

.range-slider {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #2a5798, #06a7ff);
  outline: none;
  border-radius: 2px;
  cursor: not-allowed;
  opacity: 0.7;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #06a7ff;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.7);
}

.range-values {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 0.7rem;
  color: #99a;
}

.selected-value {
  position: absolute;
  right: 0;
  top: -5px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0df;
  text-shadow: 0 0 5px rgba(0, 200, 255, 0.5);
}

.unlock-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(0, 20, 50, 0.5);
  border-radius: 12px;
  text-align: center;
}

.lock-icon {
  font-size: 2.5rem;
  animation: float 2s infinite ease-in-out;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.unlock-message {
  font-size: 1.1rem;
  color: #ccd;
}

.eat-amount {
  font-weight: 600;
  color: #0fa;
  font-size: 1.2rem;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.benefit-check {
  width: 22px;
  height: 22px;
  background: rgba(0, 200, 100, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0fa;
  font-weight: bold;
}

.benefit-text {
  flex: 1;
  text-align: left;
  font-size: 0.9rem;
  color: #aad;
}

.quantum-unlock-button {
  padding: 10px 30px;
  background: linear-gradient(90deg, #025a9a, #06a7ff);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
}

.quantum-unlock-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.7);
}

.quantum-unlock-button:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  transform: rotate(45deg);
  z-index: 1;
  transition: all 0.5s;
  opacity: 0;
}

.quantum-unlock-button:hover:before {
  opacity: 1;
  transform: rotate(45deg) translate(10%, 10%);
}

.history-card {
  min-height: 250px;
}

.locked-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 20px;
}

.quantum-lock-visual {
  position: relative;
  width: 50px;
  height: 70px;
}

.lock-circle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid rgba(100, 150, 200, 0.7);
}

.lock-body {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background: rgba(50, 80, 120, 0.8);
  border-radius: 8px;
  border: 3px solid rgba(100, 150, 200, 0.7);
}

.lock-energy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.9) 0%, rgba(0, 100, 200, 0.2) 70%);
  border-radius: 50%;
  animation: glow 1.5s infinite alternate ease-in-out;
}

@keyframes glow {
  0% { opacity: 0.5; box-shadow: 0 0 5px rgba(0, 200, 255, 0.3); }
  100% { opacity: 0.9; box-shadow: 0 0 15px rgba(0, 200, 255, 0.8); }
}

.locked-text {
  font-size: 1rem;
  color: #99a;
  text-align: center;
}
</style>