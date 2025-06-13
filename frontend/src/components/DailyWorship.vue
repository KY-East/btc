<template>
  <div class="alpha-activation" :class="{ 'fullscreen': true }">
    <!-- 背景系统 -->
    <div class="cosmic-background">
      <div class="star-field">
        <div v-for="i in 100" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>
    </div>

    <!-- 主要激活界面 -->
    <div class="alpha-activation-main">
      <!-- 顶部控制栏 -->
      <div class="activation-header">
        <div class="header-left">
          <h1 class="alpha-title">Alpha神谕激活</h1>
          <p class="alpha-subtitle">连接Alpha量子场，获取EAT能量</p>
        </div>
        
        <div class="header-right">
          <div class="energy-display">
            <span class="energy-icon">⚡</span>
            <span class="energy-amount">{{ userEnergy }}</span>
            <span class="energy-unit">EAT</span>
          </div>
          <button class="skip-button" @click="$emit('skip-activation')">
            跳过激活
          </button>
        </div>
      </div>

      <!-- Alpha激活核心 -->
      <div class="alpha-core-container">
        <div class="alpha-core" :class="{ 'activated': isActivated, 'activating': isActivating }">
          <!-- 背景粒子系统 -->
          <div class="alpha-particles">
            <div v-for="i in 50" :key="i" class="alpha-particle" :style="getParticleStyle(i)"></div>
          </div>
          
          <!-- 中央Alpha核心 -->
          <div class="core-center">
            <!-- 主球体 -->
            <div class="alpha-sphere">
              <div class="sphere-inner"></div>
              <div class="sphere-glow"></div>
            </div>
            
            <!-- Alpha符号 -->
            <div class="alpha-symbol">
              <svg viewBox="0 0 100 100" class="alpha-svg">
                <path d="M20 80 L50 20 L80 80 M30 65 L70 65" 
                      stroke="currentColor" 
                      stroke-width="3" 
                      fill="none" 
                      stroke-linecap="round"/>
              </svg>
            </div>
            
            <!-- 轨道环 -->
            <div class="orbit-ring orbit-1"></div>
            <div class="orbit-ring orbit-2"></div>
            <div class="orbit-ring orbit-3"></div>
          </div>
          
          <!-- 脉冲效果 -->
          <div class="pulse-effect"></div>
        </div>
      </div>

      <!-- 激活控制面板 -->
      <div class="activation-controls">
        <div class="activation-info">
          <div class="info-item">
            <span class="info-label">今日奖励</span>
            <span class="info-value">+{{ dailyReward }} EAT</span>
          </div>
          <div class="info-item">
            <span class="info-label">连续天数</span>
            <span class="info-value">{{ consecutiveDays }}天</span>
          </div>
          <div class="info-item">
            <span class="info-label">激活状态</span>
            <span class="info-value" :class="statusClass">{{ statusText }}</span>
          </div>
        </div>

        <!-- 激活按钮 -->
        <div class="activation-button-container">
          <button 
            class="activation-button" 
            :class="{ 'activated': isActivated, 'activating': isActivating }"
            :disabled="isActivated || isActivating"
            @click="startActivation"
          >
            <div class="button-content">
              <div class="button-icon">
                <span v-if="!isActivating && !isActivated">⚡</span>
                <div v-else-if="isActivating" class="loading-spinner"></div>
                <span v-else>✓</span>
              </div>
              <div class="button-text">
                <span v-if="!isActivating && !isActivated">激活Alpha神谕</span>
                <span v-else-if="isActivating">激活中...</span>
                <span v-else>今日已激活</span>
              </div>
            </div>
            <div class="button-energy"></div>
          </button>
        </div>

        <!-- 激活进度 -->
        <div v-if="isActivating" class="activation-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: activationProgress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(activationProgress) }}%</div>
        </div>
      </div>
    </div>

    <!-- 激活成功动画 -->
    <div v-if="showSuccessAnimation" class="success-animation">
      <div class="success-content">
        <div class="success-icon">⚡</div>
        <h2 class="success-title">激活成功！</h2>
        <p class="success-message">获得 {{ dailyReward }} EAT 能量</p>
        
        <!-- 添加进入交易终端按钮 -->
        <div class="success-actions">
          <button class="enter-trading-btn" @click="enterTrading">
            <span class="btn-icon">🚀</span>
            <span class="btn-text">进入交易终端</span>
            <div class="btn-glow"></div>
          </button>
          <button class="continue-btn" @click="closeSuccess">
            <span class="btn-text">查看详情</span>
          </button>
        </div>
        
        <div class="success-effects">
          <div v-for="i in 20" :key="i" class="success-particle" :style="getSuccessParticleStyle(i)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyWorship',
  
  emits: ['activation-complete', 'skip-activation', 'enter-trading'],
  
  data() {
    return {
      userEnergy: 125.5,
      dailyReward: 5,
      consecutiveDays: 7,
      isActivated: false,
      isActivating: false,
      activationProgress: 0,
      showSuccessAnimation: false
    }
  },
  
  computed: {
    statusText() {
      if (this.isActivated) return '已激活'
      if (this.isActivating) return '激活中'
      return '待激活'
    },
    
    statusClass() {
      if (this.isActivated) return 'activated'
      if (this.isActivating) return 'activating'
      return 'pending'
    }
  },
  
  methods: {
    getStarStyle(index) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 3
      const duration = 2 + Math.random() * 4
      
      return {
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    },
    
    getParticleStyle(index) {
      const angle = (index * 360 / 50) * Math.PI / 180
      const radius = 150 + Math.random() * 100
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const delay = Math.random() * 3
      const duration = 2 + Math.random() * 2
      
      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    },
    
    getSuccessParticleStyle(index) {
      const angle = (index * 360 / 20) * Math.PI / 180
      const radius = Math.random() * 200
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        animationDelay: `${Math.random() * 0.5}s`
      }
    },
    
    startActivation() {
      if (this.isActivated || this.isActivating) return
      
      this.isActivating = true
      this.activationProgress = 0
      
      // 模拟激活进度
      const progressInterval = setInterval(() => {
        this.activationProgress += Math.random() * 10
        
        if (this.activationProgress >= 100) {
          clearInterval(progressInterval)
          this.activationProgress = 100
          this.completeActivation()
        }
      }, 150)
    },
    
    completeActivation() {
      setTimeout(() => {
        this.isActivating = false
        this.isActivated = true
        this.showSuccessAnimation = true
        
        // 发送激活完成事件
        this.$emit('activation-complete', {
          reward: this.dailyReward,
          consecutiveDays: this.consecutiveDays
        })
      }, 500)
    },
    
    enterTrading() {
      // 发出进入交易终端事件
      this.$emit('enter-trading')
      this.showSuccessAnimation = false
    },
    
    closeSuccess() {
      // 隐藏成功动画，继续留在激活界面
      this.showSuccessAnimation = false
    }
  }
}
</script>

<style scoped>
.alpha-activation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #2a0845 100%);
  color: #fff;
  overflow-y: auto;
  z-index: 1000;
}

/* 背景系统 */
.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star-field {
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  animation: starTwinkle 3s ease-in-out infinite;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 主要激活界面 */
.alpha-activation-main {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  z-index: 10;
}

/* 顶部控制栏 */
.activation-header {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding: 20px 0;
}

.header-left {
  flex: 1;
}

.alpha-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffff, #0080ff, #8000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 10px 0;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
}

.alpha-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.energy-display {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.energy-icon {
  font-size: 1.2rem;
  color: #ffa500;
}

.energy-amount {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ffff;
}

.energy-unit {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.skip-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.skip-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Alpha激活核心 */
.alpha-core-container {
  position: relative;
  margin: 40px 0;
}

.alpha-core {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  transition: all 0.5s ease;
}

.alpha-core.activating {
  transform: scale(1.1);
}

.alpha-core.activated {
  transform: scale(1.05);
}

/* 背景粒子 */
.alpha-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.alpha-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #00ffff;
  border-radius: 50%;
  animation: particleFloat 4s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { opacity: 0.3; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}

/* 中央核心 */
.core-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
}

.alpha-sphere {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.3), rgba(0, 128, 255, 0.1));
  border: 2px solid rgba(0, 255, 255, 0.5);
  animation: spherePulse 2s ease-in-out infinite;
}

.sphere-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(0, 255, 255, 0.3));
}

.sphere-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes spherePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

/* Alpha符号 */
.alpha-symbol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #fff;
  z-index: 10;
}

.alpha-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
}

/* 轨道环 */
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  animation: orbitRotate 20s linear infinite;
}

.orbit-1 {
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  animation-duration: 15s;
}

.orbit-2 {
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  animation-duration: 25s;
  animation-direction: reverse;
}

.orbit-3 {
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  animation-duration: 35s;
}

@keyframes orbitRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 脉冲效果 */
.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 2px solid rgba(0, 255, 255, 0.2);
  border-radius: 50%;
  animation: pulseExpand 3s ease-out infinite;
}

@keyframes pulseExpand {
  0% {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* 激活控制面板 */
.activation-controls {
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.activation-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.info-item {
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 15px;
  backdrop-filter: blur(10px);
}

.info-label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ffff;
}

.info-value.activated {
  color: #00ff00;
}

.info-value.activating {
  color: #ffa500;
}

.info-value.pending {
  color: #888;
}

/* 激活按钮 */
.activation-button-container {
  margin-bottom: 20px;
}

.activation-button {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 128, 255, 0.2));
  border: 2px solid rgba(0, 255, 255, 0.4);
  color: #fff;
  padding: 20px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.activation-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
}

.activation-button.activating {
  animation: buttonPulse 1s ease-in-out infinite;
}

.activation-button.activated {
  background: linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2));
  border-color: rgba(0, 255, 0, 0.4);
}

.activation-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@keyframes buttonPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.button-content {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.button-icon {
  font-size: 1.3rem;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.button-energy {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.activation-button:hover .button-energy {
  left: 100%;
}

/* 激活进度 */
.activation-progress {
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #0080ff);
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-text {
  font-size: 1rem;
  color: #00ffff;
  font-weight: 600;
}

/* 成功动画 */
.success-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.5s ease;
}

.success-content {
  text-align: center;
  background: rgba(0, 20, 40, 0.9);
  border: 2px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(20px);
  position: relative;
  animation: successPop 0.5s ease;
}

.success-icon {
  font-size: 4rem;
  color: #00ff00;
  margin-bottom: 20px;
  animation: iconBounce 1s ease;
}

.success-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  background: linear-gradient(45deg, #00ff00, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.success-message {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 30px 0;
}

/* 成功动画按钮 */
.success-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0 20px 0;
  align-items: center;
}

.enter-trading-btn,
.continue-btn {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 150, 255, 0.2));
  border: 2px solid rgba(0, 255, 255, 0.4);
  color: #ffffff;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  justify-content: center;
  letter-spacing: 0.5px;
  overflow: hidden;
}

.enter-trading-btn {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.continue-btn {
  background: linear-gradient(135deg, rgba(100, 100, 100, 0.2), rgba(150, 150, 150, 0.2));
  border-color: rgba(150, 150, 150, 0.4);
  font-size: 14px;
  padding: 12px 25px;
  min-width: 150px;
}

.enter-trading-btn:hover {
  transform: translateY(-3px) scale(1.05);
  border-color: rgba(255, 215, 0, 0.8);
  box-shadow: 0 10px 40px rgba(255, 215, 0, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.15);
}

.continue-btn:hover {
  transform: translateY(-2px) scale(1.02);
  border-color: rgba(150, 150, 150, 0.6);
  box-shadow: 0 8px 25px rgba(150, 150, 150, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.btn-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

.btn-glow {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.2) 30%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: screen;
}

.enter-trading-btn:hover .btn-glow {
  opacity: 1;
  animation: btnGlowRotate 3s linear infinite;
}

@keyframes btnGlowRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.success-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #00ff00;
  border-radius: 50%;
  animation: successParticle 2s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes successPop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes iconBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes successParticle {
  0% { opacity: 1; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0) translateY(-100px); }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .alpha-activation-main {
    padding: 15px;
  }
  
  .activation-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .header-right {
    justify-content: center;
  }
  
  .alpha-core {
    width: 250px;
    height: 250px;
  }
  
  .activation-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .success-content {
    margin: 20px;
    padding: 30px 20px;
  }
}
</style> 