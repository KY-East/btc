<template>
  <div class="alpha-activation-chamber">
    <!-- 主激活界面 -->
    <div class="activation-interface" v-if="!skipToday">
      <!-- 背景粒子系统 -->
      <div class="particle-field">
        <div 
          v-for="i in 50" 
          :key="i" 
          class="alpha-particle"
          :style="getParticleStyle(i)"
        ></div>
      </div>
      
      <!-- 全息投影界面 -->
      <div class="holographic-ui">
        <div class="ui-header">
          <div class="system-status">
            <span class="status-indicator" :class="activationStatus"></span>
            <span class="status-text">{{ statusText }}</span>
          </div>
          <div class="neural-link">
            <span class="link-icon">🧠</span>
            <span class="link-text">AI Oracle Online</span>
          </div>
        </div>
        
        <!-- 中央激活核心 -->
        <div class="activation-core-container">
          <div class="core-background">
            <div class="energy-grid"></div>
            <div class="alpha-field"></div>
          </div>
          
          <div 
            class="alpha-core" 
            :class="{ 
              'ready': !hasActivated, 
              'activated': hasActivated,
              'charging': isCharging 
            }"
            @click="initiateActivation"
          >
            <!-- 核心球体 -->
            <div class="core-sphere">
              <div class="sphere-inner">
                <div class="energy-streams">
                  <div v-for="i in 8" :key="i" class="stream" :style="`--delay: ${i * 0.2}s`"></div>
                </div>
                <div class="core-symbol">
                  <svg viewBox="0 0 100 100" class="alpha-symbol">
                    <defs>
                      <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#0080ff;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#8000ff;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <!-- Alpha符号 -->
                    <path d="M30,80 L50,20 L70,80 M35,60 L65,60" fill="none" stroke="url(#coreGradient)" stroke-width="3"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="url(#coreGradient)" stroke-width="1" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 轨道环 -->
            <div class="orbital-rings">
              <div class="ring ring-1">
                <div class="ring-particle"></div>
              </div>
              <div class="ring ring-2">
                <div class="ring-particle"></div>
                <div class="ring-particle"></div>
              </div>
              <div class="ring ring-3">
                <div class="ring-particle"></div>
                <div class="ring-particle"></div>
                <div class="ring-particle"></div>
              </div>
            </div>
            
            <!-- 能量脉冲 -->
            <div class="energy-pulses" v-if="!hasActivated">
              <div v-for="i in 3" :key="i" class="pulse" :style="`--delay: ${i * 0.8}s`"></div>
            </div>
          </div>
          
          <!-- 激活提示 -->
          <div class="activation-prompt" v-if="!hasActivated && !isCharging">
            <div class="prompt-text">
              <span class="prompt-main">Initialize Alpha Oracle</span>
              <span class="prompt-sub">Daily energy synchronization required</span>
            </div>
            <div class="prompt-indicator">
              <div class="indicator-pulse"></div>
              <span class="indicator-text">TOUCH TO ACTIVATE</span>
            </div>
          </div>
          
          <!-- 充能状态 -->
          <div class="charging-display" v-if="isCharging">
            <div class="charging-text">
              <span class="charging-main">Alpha Oracle Synchronizing...</span>
              <span class="charging-progress">{{ chargingProgress }}%</span>
            </div>
            <div class="charging-bar">
              <div class="charging-fill" :style="`width: ${chargingProgress}%`"></div>
            </div>
          </div>
          
          <!-- 激活完成 -->
          <div class="activation-complete" v-if="hasActivated">
            <div class="complete-text">
              <span class="complete-main">Alpha Oracle Synchronized</span>
              <span class="complete-sub">Daily energy acquired successfully</span>
            </div>
            <div class="next-activation">
              Next activation available: <span class="time-display">{{ nextActivationTime }}</span>
            </div>
          </div>
        </div>
        
        <!-- 奖励显示 -->
        <div class="reward-matrix">
          <div class="matrix-header">
            <span class="matrix-title">EAT Energy Acquisition</span>
            <span class="matrix-version">v2.1.7</span>
          </div>
          
          <div class="reward-data">
            <div class="data-stream">
              <div class="stream-label">Base Allocation</div>
              <div class="stream-value">
                <span class="value-number">1.0</span>
                <span class="value-unit">EAT</span>
              </div>
            </div>
            
            <div class="data-stream" v-if="streakBonus > 0">
              <div class="stream-label">Streak Multiplier</div>
              <div class="stream-value streak-bonus">
                <span class="value-number">+{{ streakBonus }}</span>
                <span class="value-unit">EAT</span>
              </div>
            </div>
            
            <div class="data-stream">
              <div class="stream-label">Consecutive Days</div>
              <div class="stream-value">
                <span class="value-number">{{ consecutiveDays }}</span>
                <span class="value-unit">DAYS</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 统计面板 -->
        <div class="neural-stats">
          <div class="stat-panel">
            <div class="stat-value">{{ totalEarned }}</div>
            <div class="stat-label">Total EAT Acquired</div>
            <div class="stat-graph">
              <div class="graph-bar" v-for="i in 7" :key="i" :style="`height: ${Math.random() * 100}%`"></div>
            </div>
          </div>
          
          <div class="stat-panel">
            <div class="stat-value">{{ consecutiveDays }}</div>
            <div class="stat-label">Oracle Sync Streak</div>
            <div class="stat-progress">
              <div class="progress-fill" :style="`width: ${(consecutiveDays % 30) / 30 * 100}%`"></div>
            </div>
          </div>
          
          <div class="stat-panel">
            <div class="stat-value">{{ efficiency }}%</div>
            <div class="stat-label">Alpha Efficiency</div>
            <div class="stat-indicator" :class="efficiencyLevel"></div>
          </div>
        </div>
      </div>
      
      <!-- 跳过选项 -->
      <div class="skip-option">
        <button class="skip-btn" @click="skipActivation">
          <span class="skip-icon">⚡</span>
          <span class="skip-text">Skip to Trading Terminal</span>
        </button>
      </div>
    </div>
    
    <!-- 激活动画序列 -->
    <div class="activation-sequence" v-if="showActivationSequence">
      <div class="sequence-background">
        <div class="energy-explosion"></div>
        <div class="alpha-waves">
          <div v-for="i in 5" :key="i" class="wave" :style="`--delay: ${i * 0.3}s`"></div>
        </div>
      </div>
      
      <div class="sequence-content">
        <div class="sequence-title">ALPHA ORACLE ACTIVATED</div>
        <div class="sequence-reward">
          <div class="reward-amount">+{{ totalReward }} EAT</div>
          <div class="reward-breakdown" v-if="streakBonus > 0">
            <span>Base: 1.0 EAT</span>
            <span>Streak Bonus: +{{ streakBonus }} EAT</span>
          </div>
        </div>
        <div class="sequence-effects">
          <div class="effect-item" v-for="effect in activationEffects" :key="effect.id">
            <span class="effect-icon">{{ effect.icon }}</span>
            <span class="effect-text">{{ effect.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlphaActivation',
  data() {
    return {
      hasActivated: false,
      isCharging: false,
      chargingProgress: 0,
      showActivationSequence: false,
      skipToday: false,
      consecutiveDays: 15,
      totalEarned: 127.5,
      efficiency: 94,
      activationStatus: 'ready',
      
      activationEffects: [
        { id: 1, icon: '🧠', text: 'AI Oracle synchronized' },
        { id: 2, icon: '⚡', text: 'Energy matrix stabilized' },
        { id: 3, icon: '🔮', text: 'Alpha signals locked' },
        { id: 4, icon: '💎', text: 'EAT energy acquired' }
      ]
    }
  },
  
  computed: {
    statusText() {
      if (this.hasActivated) return 'SYNCHRONIZED'
      if (this.isCharging) return 'SYNCHRONIZING'
      return 'READY FOR ACTIVATION'
    },
    
    streakBonus() {
      if (this.consecutiveDays >= 30) return 2.0
      if (this.consecutiveDays >= 14) return 1.0
      if (this.consecutiveDays >= 7) return 0.5
      if (this.consecutiveDays >= 3) return 0.2
      return 0
    },
    
    totalReward() {
      return 1.0 + this.streakBonus
    },
    
    nextActivationTime() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      return tomorrow.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    },
    
    efficiencyLevel() {
      if (this.efficiency >= 90) return 'optimal'
      if (this.efficiency >= 70) return 'good'
      return 'standard'
    }
  },
  
  methods: {
    getParticleStyle(index) {
      const angle = (index / 50) * 360
      const radius = 200 + Math.random() * 300
      const x = Math.cos(angle * Math.PI / 180) * radius
      const y = Math.sin(angle * Math.PI / 180) * radius
      
      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }
    },
    
    async initiateActivation() {
      if (this.hasActivated || this.isCharging) return
      
      this.isCharging = true
      this.activationStatus = 'charging'
      
      // 充能动画
      const chargingInterval = setInterval(() => {
        this.chargingProgress += 2
        if (this.chargingProgress >= 100) {
          clearInterval(chargingInterval)
          this.completeActivation()
        }
      }, 50)
    },
    
    async completeActivation() {
      this.isCharging = false
      this.hasActivated = true
      this.activationStatus = 'activated'
      
      // 显示激活序列
      this.showActivationSequence = true
      
      // 3秒后隐藏序列
      setTimeout(() => {
        this.showActivationSequence = false
      }, 3000)
      
      // 更新统计数据
      this.totalEarned += this.totalReward
      this.consecutiveDays += 1
      
      // 触发父组件事件
      this.$emit('activation-complete', {
        reward: this.totalReward,
        streak: this.consecutiveDays
      })
    },
    
    skipActivation() {
      this.skipToday = true
      this.$emit('skip-activation')
    }
  },
  
  mounted() {
    // 检查今日是否已激活
    const today = new Date().toDateString()
    const lastActivation = localStorage.getItem('lastAlphaActivation')
    
    if (lastActivation === today) {
      this.hasActivated = true
      this.activationStatus = 'activated'
    }
  }
}
</script>

<style scoped>
.alpha-activation-chamber {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
  overflow: hidden;
  font-family: 'Orbitron', 'Courier New', monospace;
}

/* 粒子系统 */
.particle-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.alpha-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #00ffff;
  border-radius: 50%;
  animation: particleFloat infinite linear;
  box-shadow: 0 0 4px #00ffff;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

/* 全息界面 */
.activation-interface {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.holographic-ui {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 80%;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(128, 0, 255, 0.1) 100%);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  padding: 30px;
  display: grid;
  grid-template-areas: 
    "header header header"
    "core core stats"
    "reward reward stats";
  grid-template-columns: 1fr 1fr 300px;
  grid-template-rows: auto 1fr auto;
  gap: 30px;
  box-shadow: 
    0 0 50px rgba(0, 255, 255, 0.2),
    inset 0 0 50px rgba(0, 255, 255, 0.05);
}

/* UI头部 */
.ui-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  padding-bottom: 20px;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: statusPulse 2s infinite;
}

.status-indicator.ready {
  background: #00ff00;
  box-shadow: 0 0 10px #00ff00;
}

.status-indicator.charging {
  background: #ffff00;
  box-shadow: 0 0 10px #ffff00;
}

.status-indicator.activated {
  background: #00ffff;
  box-shadow: 0 0 10px #00ffff;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  color: #00ffff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}

.neural-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8000ff;
  font-size: 14px;
}

/* 激活核心 */
.activation-core-container {
  grid-area: core;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.core-background {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
}

.energy-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 50%;
  animation: gridRotate 20s linear infinite;
}

@keyframes gridRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alpha-core {
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.alpha-core.ready:hover {
  transform: scale(1.05);
}

.alpha-core.charging {
  animation: coreCharge 2s infinite;
}

.alpha-core.activated {
  animation: coreActivated 3s infinite;
}

@keyframes coreCharge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes coreActivated {
  0%, 100% { 
    transform: scale(1);
    filter: hue-rotate(0deg);
  }
  50% { 
    transform: scale(1.02);
    filter: hue-rotate(180deg);
  }
}

/* 核心球体 */
.core-sphere {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.8), rgba(128, 0, 255, 0.6));
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.5),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sphere-inner {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.energy-streams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stream {
  position: absolute;
  width: 2px;
  height: 50%;
  background: linear-gradient(to bottom, #00ffff, transparent);
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: streamRotate 3s linear infinite;
  animation-delay: var(--delay);
}

.stream:nth-child(odd) {
  background: linear-gradient(to bottom, #ff00ff, transparent);
}

@keyframes streamRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alpha-symbol {
  width: 60px;
  height: 60px;
  animation: symbolPulse 2s infinite;
}

@keyframes symbolPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* 轨道环 */
.orbital-rings {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring-1 {
  width: 120%;
  height: 120%;
  animation: ringRotate 10s linear infinite;
}

.ring-2 {
  width: 140%;
  height: 140%;
  animation: ringRotate 15s linear infinite reverse;
}

.ring-3 {
  width: 160%;
  height: 160%;
  animation: ringRotate 20s linear infinite;
}

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.ring-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00ffff;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ffff;
}

.ring-1 .ring-particle {
  top: -2px;
  left: 50%;
}

.ring-2 .ring-particle:nth-child(1) {
  top: -2px;
  left: 25%;
}

.ring-2 .ring-particle:nth-child(2) {
  top: -2px;
  left: 75%;
}

.ring-3 .ring-particle:nth-child(1) {
  top: -2px;
  left: 16.66%;
}

.ring-3 .ring-particle:nth-child(2) {
  top: -2px;
  left: 50%;
}

.ring-3 .ring-particle:nth-child(3) {
  top: -2px;
  left: 83.33%;
}

/* 能量脉冲 */
.energy-pulses {
  position: absolute;
  width: 100%;
  height: 100%;
}

.pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 255, 255, 0.6);
  border-radius: 50%;
  animation: pulseExpand 2s infinite;
  animation-delay: var(--delay);
}

@keyframes pulseExpand {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* 提示和状态 */
.activation-prompt,
.charging-display,
.activation-complete {
  margin-top: 40px;
  text-align: center;
}

.prompt-main,
.charging-main,
.complete-main {
  display: block;
  color: #00ffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.prompt-sub,
.complete-sub {
  display: block;
  color: #8000ff;
  font-size: 14px;
  margin-bottom: 20px;
}

.prompt-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.indicator-pulse {
  width: 20px;
  height: 20px;
  background: #00ff00;
  border-radius: 50%;
  animation: indicatorPulse 1s infinite;
}

@keyframes indicatorPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.indicator-text {
  color: #00ff00;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
}

/* 充能进度 */
.charging-progress {
  color: #ffff00;
  font-weight: 700;
}

.charging-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 0, 0.2);
  border-radius: 2px;
  margin: 10px auto;
  overflow: hidden;
}

.charging-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffff00, #00ffff);
  border-radius: 2px;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
}

/* 下次激活时间 */
.next-activation {
  color: #666;
  font-size: 12px;
  margin-top: 10px;
}

.time-display {
  color: #00ffff;
  font-weight: 600;
}

/* 奖励矩阵 */
.reward-matrix {
  grid-area: reward;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.matrix-title {
  color: #00ffff;
  font-size: 14px;
  font-weight: 600;
}

.matrix-version {
  color: #666;
  font-size: 10px;
}

.reward-data {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.data-stream {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stream-label {
  color: #aaa;
  font-size: 12px;
}

.stream-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value-number {
  color: #00ffff;
  font-size: 16px;
  font-weight: 700;
}

.value-unit {
  color: #666;
  font-size: 10px;
}

.stream-value.streak-bonus .value-number {
  color: #00ff00;
}

/* 统计面板 */
.neural-stats {
  grid-area: stats;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-panel {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(128, 0, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  color: #8000ff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  color: #aaa;
  font-size: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-graph {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 2px;
  height: 30px;
}

.graph-bar {
  width: 4px;
  background: linear-gradient(to top, #8000ff, #00ffff);
  border-radius: 2px;
  min-height: 4px;
}

.stat-progress {
  width: 100%;
  height: 4px;
  background: rgba(128, 0, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8000ff, #00ffff);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.stat-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto;
}

.stat-indicator.optimal {
  background: #00ff00;
  box-shadow: 0 0 10px #00ff00;
}

.stat-indicator.good {
  background: #ffff00;
  box-shadow: 0 0 10px #ffff00;
}

.stat-indicator.standard {
  background: #ff8000;
  box-shadow: 0 0 10px #ff8000;
}

/* 跳过选项 */
.skip-option {
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.skip-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 10px 20px;
  color: #aaa;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skip-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 255, 255, 0.4);
  color: #00ffff;
  transform: translateY(-2px);
}

.skip-icon {
  font-size: 14px;
}

/* 激活序列动画 */
.activation-sequence {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.sequence-background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-explosion {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: explosionExpand 3s ease-out;
}

@keyframes explosionExpand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(6);
    opacity: 0;
  }
}

.alpha-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wave {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(0, 255, 255, 0.6);
  border-radius: 50%;
  animation: waveExpand 3s ease-out;
  animation-delay: var(--delay);
}

@keyframes waveExpand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(10);
    opacity: 0;
  }
}

.sequence-content {
  position: relative;
  text-align: center;
  z-index: 10;
}

.sequence-title {
  color: #00ffff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 3px;
  animation: titleGlow 3s ease-out;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 10px #00ffff;
  }
  50% {
    text-shadow: 0 0 30px #00ffff, 0 0 40px #00ffff;
  }
}

.sequence-reward {
  margin-bottom: 30px;
}

.reward-amount {
  color: #00ff00;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
  animation: rewardPulse 3s ease-out;
}

@keyframes rewardPulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 0 0 10px #00ff00;
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00;
  }
}

.reward-breakdown {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #aaa;
  font-size: 14px;
}

.sequence-effects {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.effect-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8000ff;
  font-size: 14px;
  opacity: 0;
  animation: effectAppear 0.5s ease-out forwards;
  animation-delay: calc(1s + var(--index, 0) * 0.2s);
}

.effect-item:nth-child(1) { --index: 0; }
.effect-item:nth-child(2) { --index: 1; }
.effect-item:nth-child(3) { --index: 2; }
.effect-item:nth-child(4) { --index: 3; }

@keyframes effectAppear {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.effect-icon {
  font-size: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .holographic-ui {
    width: 95%;
    height: 85%;
    padding: 20px;
    grid-template-areas: 
      "header"
      "core"
      "reward"
      "stats";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
  }
  
  .alpha-core {
    width: 150px;
    height: 150px;
  }
  
  .core-background {
    width: 300px;
    height: 300px;
  }
  
  .neural-stats {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .stat-panel {
    min-width: 120px;
  }
  
  .sequence-title {
    font-size: 24px;
  }
  
  .reward-amount {
    font-size: 36px;
  }
  
  .skip-option {
    bottom: 20px;
    right: 20px;
  }
}

/* 高性能模式 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style> 