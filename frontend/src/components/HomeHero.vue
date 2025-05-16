<template>
  <div class="home-hero">
    <!-- 登录传送门页面 -->
    <div class="quantum-portal" v-if="step === 0">
      <!-- 量子核心 -->
      <div class="crystal-core">
        <div class="core-inner"></div>
        <div class="core-aura"></div>
        <div class="data-stream"></div>
        <div class="energy-field"></div>
      </div>
      
      <!-- 全息投影标题 -->
      <div class="hologram-title">
      <h1 class="main-title">EZ Trading</h1>
        <div class="title-glow"></div>
        <div class="matrix-code"></div>
      </div>
      
      <!-- 能量文字副标题 -->
      <div class="energy-subtitle">
        <p class="subtitle">AI交易神谕</p>
        <div class="subtitle-wave"></div>
      </div>
      
      <!-- 量子触发器 -->
      <div class="quantum-trigger">
        <button class="connect-btn" @click="connectWallet">
          <span class="btn-text">连接钱包</span>
          <div class="energy-particles"></div>
          <div class="btn-glow"></div>
      </button>
      </div>
      
      <!-- 功能简介 -->
      <div class="quantum-features">
        <div class="feature-item">
          <div class="feature-icon">🧠</div>
          <div class="feature-text">AI多智能体预测</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <div class="feature-text">每日免费神谕</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">💰</div>
          <div class="feature-text">自动跟单交易</div>
        </div>
    </div>
    
      <!-- 连接过程指示器 -->
      <div class="connection-status" v-if="isConnecting">
        <div class="status-ring"></div>
        <div class="status-text">建立量子连接中...</div>
      </div>
    </div>
    
    <!-- 神谕中心页面 -->
    <div class="center-content oracle-view" v-else-if="step === 1">
      <div class="terminal-header">
        <div class="terminal-title">Oracle Alpha v1.0</div>
        <div class="user-data">
          <div class="wallet-info">{{ shortenAddress(wallet.address) }}</div>
          <div class="eat-balance">
            <span class="eat-icon">₮</span>
            <span class="eat-amount">{{ wallet.eat.toFixed(2) }} EAT</span>
          </div>
        </div>
      </div>
      
      <OracleScroll 
        ref="oracleScrollRef"
        :is-locked="!detailUnlocked" 
        :oracle-data="oracle"
        @unlock="unlockDetail"
        @expand="handleOracleExpand"
      />
      
      <div class="bottom-controls">
        <AiShrine 
          :cooldown-seconds="claimedToday ? 86400 : 0"
          @worship-complete="claimDailyEAT"
        />
        
        <div class="action-buttons">
          <button 
            v-if="detailUnlocked" 
            class="action-btn enter-btn" 
            @click="step = 2"
          >
            <span class="btn-icon">💫</span>
            <span class="btn-text">进入EZ Trading</span>
            <div class="btn-glow-effect"></div>
          </button>
          
          <button class="action-btn nav-info-btn" @click="showNavInfo = !showNavInfo">
            <span class="btn-icon">📊</span>
            <span class="btn-text">NAV参考</span>
          </button>
        </div>
        </div>
        
      <transition name="slide-up">
        <div v-if="showNavInfo" class="nav-info-card">
          <div class="nav-info-header">EAT代币NAV估值</div>
          <div class="nav-info-value">1 EAT ≈ {{ navValue }} USD</div>
          <div class="nav-info-desc">基于过去30天策略表现</div>
          <div class="nav-info-note">NAV每24小时更新一次</div>
      </div>
      </transition>
    </div>
    
    <transition name="fade">
      <div class="oracle-detail-modal" v-if="showDetail">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title-section">
              <div class="glowing-icon">🔮</div>
              <h2>神谕深度分析</h2>
            </div>
            <div class="corner-badge">Alpha级</div>
          </div>
          
          <div class="data-grid">
            <div class="data-card">
              <div class="data-label">标的资产</div>
              <div class="data-value highlight">{{ oracle.symbol }}</div>
            </div>
            
            <div class="data-card">
              <div class="data-label">建议操作</div>
              <div class="data-value action" :class="oracle.actionClass">{{ oracle.action }}</div>
            </div>
            
            <div class="data-card">
              <div class="data-label">市场情绪</div>
              <div class="data-value">{{ oracle.sentiment }}</div>
            </div>
            
            <div class="data-card">
              <div class="data-label">交易量变化</div>
              <div class="data-value">{{ oracle.volumeChange }}</div>
            </div>
          </div>
          
          <div class="analysis-section">
            <div class="section-title">
              <div class="section-icon">📊</div>
              <div>决策依据</div>
            </div>
            <p class="reason-text">{{ oracle.reason }}</p>
          </div>
          
          <div class="analysis-section">
            <div class="section-title">
              <div class="section-icon">🧠</div>
              <div>AI分析摘要</div>
            </div>
            <p class="detail-text">{{ oracle.detail }}</p>
          </div>
          
          <div class="risk-assessment">
            <div class="risk-label">风险等级</div>
            <div class="risk-meter" :class="oracle.riskLevel"></div>
            <div class="risk-value">{{ oracle.riskLevel }}</div>
          </div>
          
          <div class="bot-signatures">
            <div class="bot-tag">技术面分析 ✓</div>
            <div class="bot-tag">链上数据 ✓</div>
            <div class="bot-tag">社交情绪 ✓</div>
            <div class="bot-tag">机构流向 ✓</div>
          </div>
          
          <button class="large-quantum-button" @click="showDetail = false; step = 2">
            <span class="btn-text">进入EZ Trading</span>
            <span class="btn-arrow">→</span>
            <div class="quantum-button-glow"></div>
          </button>
          
          <div class="modal-footnote">下一次神谕将在24小时后重置</div>
          <div class="burn-info">已燃烧 0.5 EAT (50%)</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import OracleScroll from './OracleScroll.vue';
import AiShrine from './AiShrine.vue';

const step = ref(0); // 0:未连接钱包 1:已连接 2:已进入主站
const showDetail = ref(false);
const detailUnlocked = ref(false);
const claimedToday = ref(false);
const navValue = ref('1.28');
const showNavInfo = ref(false);
const isConnecting = ref(false);

// 粒子动画相关
let particleInterval = null;
let matrixInterval = null;

const wallet = reactive({
  address: '0x7F9b8E35A3D0a4c818FAba9673BE5b106f65f774',
  eat: 12.5
});

const oracle = reactive({
  symbol: 'SOL/USDT',
  coin: 'SOL/USDT', // 兼容OracleScroll组件
  action: '买入',
  actionClass: 'buy',
  reason: '资金流入强劲，技术面突破关键阻力位',
  detail: 'SOL今日资金流入排名第一，4小时K线突破前高，AI多智能体一致看多，建议适度买入并设置止损。',
  confidence: 82,
  sentiment: '偏多',
  volumeChange: '+127%',
  riskLevel: 'medium',
  date: new Date() // 添加日期属性用于OracleScroll组件
});

const oracleScrollRef = ref(null);

function connectWallet() {
  isConnecting.value = true;
  
  // 模拟连接过程
  setTimeout(() => {
    playConnectAnimation();
    
    setTimeout(() => {
      isConnecting.value = false;
    step.value = 1;
    }, 2000);
  }, 1000);
}

function shortenAddress(address) {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

function claimDailyEAT() {
  if (claimedToday.value) return;
  
  wallet.eat += 1;
  claimedToday.value = true;
  
  showEatRewardAnimation();
}

function unlockDetail() {
  if (wallet.eat < 1) {
    alert('EAT 余额不足！需要 1 EAT 才能解锁详情。');
    return;
  }
  
  if (oracleScrollRef.value) {
    oracleScrollRef.value.showUnlockAnimation();
  }
  
  // 播放解锁音效
  playUnlockSound();
  
  setTimeout(() => {
    wallet.eat -= 1;
  detailUnlocked.value = true;
    
    // 稍后显示解锁成功提示
    setTimeout(() => {
      showSuccessToast('神谕解锁成功！');
    }, 500);
  }, 2000);
}

// 播放解锁音效
function playUnlockSound() {
  // 模拟音效播放
  console.log('播放解锁音效');
}

// 显示成功提示
function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.className = 'quantum-toast success';
  toast.innerText = message;
  
  document.body.appendChild(toast);
  
  // 动画显示
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // 3秒后移除
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}

function handleOracleExpand(expanded) {
  console.log('Oracle expanded:', expanded);
}

// 粒子动画函数
function createParticle(element, x, y) {
  const particle = document.createElement('div');
  particle.className = 'energy-micro-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  // 随机移动方向和距离
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 80 + 40;
  const duration = Math.random() * 1.5 + 0.5;
  
  particle.style.setProperty('--angle', angle + 'rad');
  particle.style.setProperty('--distance', distance + 'px');
  particle.style.setProperty('--duration', duration + 's');
  
  element.appendChild(particle);
  
  // 动画结束后移除粒子
  setTimeout(() => {
    if (particle.parentNode === element) {
      element.removeChild(particle);
}
  }, duration * 1000);
}

function startParticleAnimation() {
  const btn = document.querySelector('.connect-btn');
  const core = document.querySelector('.crystal-core');
  if (!btn || !core) return;
  
  // 按钮粒子效果
  particleInterval = setInterval(() => {
    if (Math.random() > 0.3) {
      const x = Math.random() * btn.offsetWidth;
      const y = Math.random() * btn.offsetHeight;
      createParticle(btn, x, y);
    }
    
    // 核心粒子效果
    if (Math.random() > 0.5) {
      const angle = Math.random() * Math.PI * 2;
      const radius = core.offsetWidth / 2;
      const x = radius + Math.cos(angle) * radius * 0.8;
      const y = radius + Math.sin(angle) * radius * 0.8;
      createParticle(core, x, y);
    }
  }, 100);
}

// 矩阵代码雨效果
function startMatrixEffect() {
  const matrix = document.querySelector('.matrix-code');
  if (!matrix) return;
  
  const chars = '01₿₮∞∑ΩΔ⚡⟁⚛◐◯';
  
  matrixInterval = setInterval(() => {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    
    const x = Math.random() * 100; // 0-100%
    const delay = Math.random() * 2;
    const duration = Math.random() * 2 + 1;
    
    char.style.left = `${x}%`;
    char.style.animationDelay = `${delay}s`;
    char.style.animationDuration = `${duration}s`;
    
    matrix.appendChild(char);
    
    // 移除旧字符（避免DOM过多）
    setTimeout(() => {
      if (char.parentNode === matrix) {
        matrix.removeChild(char);
      }
    }, duration * 1000 + 500);
  }, 200);
}

function playConnectAnimation() {
  // 实际动画效果通过CSS处理
  // 如需额外JS动画逻辑可在此处添加
}

function showEatRewardAnimation() {
  console.log('EAT reward animation');
}

onMounted(() => {
  startParticleAnimation();
  startMatrixEffect();
});

onUnmounted(() => {
  // 清理动画计时器
  if (particleInterval) clearInterval(particleInterval);
  if (matrixInterval) clearInterval(matrixInterval);
});

defineExpose({
  step
});
</script>

<style scoped>
.home-hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

/* 量子传送门样式 */
.quantum-portal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  min-height: 80vh;
  padding: 2rem;
  perspective: 1000px;
}

/* 核心水晶样式 */
.crystal-core {
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 2rem;
  transform-style: preserve-3d;
  animation: float 8s ease-in-out infinite, rotate3d 20s linear infinite;
}

.core-inner {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle, 
    rgba(0, 180, 255, 0.2) 0%, 
    rgba(0, 100, 200, 0.3) 40%,
    rgba(50, 50, 150, 0.4) 70%
  );
  border-radius: 40%;
  transform-style: preserve-3d;
  transform: translateZ(20px);
  box-shadow: 
    0 0 30px rgba(0, 150, 255, 0.3),
    inset 0 0 30px rgba(0, 200, 255, 0.4);
  filter: blur(2px);
  animation: pulse 4s ease-in-out infinite alternate;
}

.core-aura {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  border-radius: 40%;
  background: radial-gradient(
    circle, 
    rgba(0, 150, 255, 0.4) 0%,
    rgba(0, 80, 200, 0.2) 40%,
    rgba(0, 50, 150, 0.1) 60%,
    rgba(0, 0, 100, 0) 80%
  );
  filter: blur(15px);
  animation: auraPulse 6s ease-in-out infinite alternate;
}

.data-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 40%;
  overflow: hidden;
  opacity: 0.7;
}

.data-stream::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(0, 200, 255, 0.1) 30%,
    rgba(0, 150, 255, 0.2) 47%,
    rgba(0, 100, 255, 0.1) 53%,
    transparent 80%
  );
  animation: dataFlow 8s linear infinite;
}

.energy-field {
  position: absolute;
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
  border-radius: 50%;
  background: radial-gradient(
    circle, 
    rgba(0, 180, 255, 0.1) 0%,
    rgba(0, 120, 255, 0.05) 40%,
    rgba(80, 80, 255, 0.02) 60%,
    rgba(0, 0, 0, 0) 80%
  );
  filter: blur(10px);
  animation: fieldPulse 10s ease-in-out infinite;
}

/* 能量微粒子 */
.energy-micro-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00c8ff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.8);
  opacity: 0.8;
  animation: particleFly 1s forwards;
  z-index: 10;
}

@keyframes particleFly {
  0% {
    transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    transform: 
      translate(
        calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))
      );
    opacity: 0;
  }
}

/* 标题全息投影 */
.hologram-title {
  position: relative;
  margin-bottom: 1.5rem;
  transform-style: preserve-3d;
}

.main-title {
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 3px;
  font-weight: bold;
  text-shadow: 
    0 0 10px rgba(0, 200, 255, 0.8),
    0 0 20px rgba(0, 150, 255, 0.6),
    0 0 30px rgba(0, 100, 255, 0.4);
  animation: titleFloat 5s ease-in-out infinite;
  user-select: none;
}

.title-glow {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 120%;
  height: 150%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 200, 255, 0.15) 0%,
    rgba(0, 100, 255, 0.1) 30%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(10px);
  z-index: -1;
  opacity: 0.8;
  animation: glowPulse 4s ease-in-out infinite alternate;
}

.matrix-code {
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 200%;
  z-index: -1;
  overflow: hidden;
  opacity: 0.2;
}

.matrix-char {
  position: absolute;
  top: -20px;
  color: #00ff99;
  font-size: 14px;
  animation: matrixRain 2s linear forwards;
}

@keyframes matrixRain {
  0% {
    top: -20px;
    opacity: 0;
  }
  10% {
    opacity: 0.8;
}
  90% {
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* 能量文字副标题 */
.energy-subtitle {
  position: relative;
  margin-bottom: 3rem;
}

.subtitle {
  font-size: 1.8rem;
  color: rgba(200, 240, 255, 0.9);
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.7);
  font-weight: normal;
  letter-spacing: 2px;
}

.subtitle-wave {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    90deg,
    rgba(0, 150, 255, 0) 0%,
    rgba(0, 200, 255, 0.8) 50%,
    rgba(0, 150, 255, 0) 100%
  );
  filter: blur(2px);
  animation: waveFlow 3s ease-in-out infinite;
}

/* 量子触发器按钮 */
.quantum-trigger {
  position: relative;
  margin-bottom: 2.5rem;
}

.connect-btn {
  position: relative;
  background: rgba(0, 50, 100, 0.4);
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 1px;
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 50px;
  padding: 16px 60px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 0 20px rgba(0, 200, 255, 0.3), 
    inset 0 0 10px rgba(0, 150, 255, 0.2);
  z-index: 5;
}

.connect-btn:hover {
  background: rgba(0, 70, 130, 0.6);
  transform: translateY(-3px);
  box-shadow: 
    0 0 30px rgba(0, 200, 255, 0.5), 
    inset 0 0 15px rgba(0, 180, 255, 0.3);
}

.connect-btn:active {
  transform: translateY(1px);
}

.energy-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 200, 255, 0.5) 0%,
    rgba(0, 150, 255, 0.3) 20%,
    rgba(0, 100, 255, 0.1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
  filter: blur(10px);
}

.connect-btn:hover .btn-glow {
  opacity: 1;
  animation: rotatePulse 3s linear infinite;
}

/* 功能特性 */
.quantum-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(10, 30, 60, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.2);
  border-radius: 10px;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.15);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.3);
  border-color: rgba(0, 200, 255, 0.4);
  background: rgba(15, 40, 80, 0.5);
}

.feature-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.feature-text {
  font-size: 0.9rem;
  color: rgba(200, 230, 255, 0.9);
  text-align: center;
}

/* 连接状态 */
.connection-status {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(5, 15, 40, 0.85);
  z-index: 10;
  animation: fadeIn 0.5s ease forwards;
}

.status-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top: 3px solid rgba(0, 200, 255, 0.8);
  border-right: 3px solid rgba(0, 100, 255, 0.6);
  animation: rotate 1.5s linear infinite;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.3);
  margin-bottom: 1.5rem;
}

.status-text {
  font-size: 1.2rem;
  color: rgba(200, 230, 255, 0.9);
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.7);
  animation: pulse 2s ease-in-out infinite;
}

/* 原有样式保留 */
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(10, 15, 30, 0.85);
  border-radius: 12px;
  padding: 48px 32px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2), 0 0 60px rgba(0, 150, 255, 0.15);
  border: 1px solid rgba(0, 200, 255, 0.3);
  max-width: 90vw;
  position: relative;
  overflow: hidden;
}

.center-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0ff, transparent);
  animation: scanline 2s linear infinite;
}

@keyframes scanline {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 保留其他现有样式 */
.terminal-header,
.oracle-view,
.oracle-detail-modal,
.terminal-title,
.terminal-status,
.status-online,
.status-active,
.user-data,
.wallet-info,
.eat-balance,
.eat-icon,
.eat-amount,
.bottom-controls,
.action-buttons,
.action-btn,
.btn-icon,
.btn-text,
.enter-btn,
.nav-info-btn,
.nav-info-card,
.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-enter-from,
.slide-up-leave-to,
.fade-enter-active,
.fade-leave-active,
.fade-enter-from,
.fade-leave-to {
  /* 保留现有样式定义 */
}

/* 动画关键帧 */
@keyframes float {
  0% { transform: translateY(0) rotateX(0) rotateY(0); }
  25% { transform: translateY(-10px) rotateX(5deg) rotateY(2deg); }
  50% { transform: translateY(0) rotateX(0) rotateY(0); }
  75% { transform: translateY(10px) rotateX(-5deg) rotateY(-2deg); }
  100% { transform: translateY(0) rotateX(0) rotateY(0); }
}

@keyframes rotate3d {
  0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
  100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
}

@keyframes pulse {
  0% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.7; transform: scale(1); }
}

@keyframes auraPulse {
  0% { opacity: 0.5; transform: scale(1); filter: blur(15px); }
  50% { opacity: 0.8; transform: scale(1.1); filter: blur(20px); }
  100% { opacity: 0.5; transform: scale(1); filter: blur(15px); }
}

@keyframes dataFlow {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes fieldPulse {
  0% { transform: scale(1) rotate(0deg); opacity: 0.1; }
  25% { transform: scale(1.1) rotate(90deg); opacity: 0.2; }
  50% { transform: scale(1) rotate(180deg); opacity: 0.1; }
  75% { transform: scale(0.9) rotate(270deg); opacity: 0.2; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.1; }
}

@keyframes titleFloat {
  0% { transform: translateY(0) translateZ(0); }
  50% { transform: translateY(-5px) translateZ(20px); }
  100% { transform: translateY(0) translateZ(0); }
}

@keyframes glowPulse {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes waveFlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes rotatePulse {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes blink {
  50% { opacity: 0; }
}

/* 神谕中心页面 */
.oracle-view {
  width: 100%;
  max-width: 1200px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  position: relative;
  background: rgba(5, 10, 25, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(0, 150, 255, 0.3);
  box-shadow: 
    0 0 40px rgba(0, 100, 200, 0.2),
    inset 0 0 20px rgba(0, 150, 255, 0.1);
  overflow: hidden;
  z-index: 10;
}

.action-btn {
  background: rgba(0, 70, 150, 0.5);
  border: 2px solid rgba(0, 200, 255, 0.6);
  color: #fff;
  border-radius: 50px;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 25px rgba(0, 150, 255, 0.3),
    inset 0 0 15px rgba(0, 180, 255, 0.2);
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
  min-width: 220px;
  justify-content: center;
  margin: 15px 0;
}

.action-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 
    0 8px 30px rgba(0, 180, 255, 0.5),
    inset 0 0 20px rgba(0, 200, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.8);
}

.action-btn:active {
  transform: translateY(0) scale(0.98);
}

.enter-btn {
  background: rgba(0, 100, 180, 0.6);
  border: 2px solid rgba(0, 220, 255, 0.7);
  padding: 15px 50px;
  font-size: 1.4rem;
  min-width: 280px;
  box-shadow: 
    0 0 35px rgba(0, 180, 255, 0.4),
    inset 0 0 25px rgba(0, 200, 255, 0.3);
}

.btn-icon {
  font-size: 1.5rem;
  margin-right: 5px;
}

.btn-glow-effect {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    circle,
    rgba(0, 255, 255, 0.4) 0%,
    rgba(0, 150, 255, 0.2) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
  transform: rotate(30deg);
}

.action-btn:hover .btn-glow-effect {
  opacity: 1;
  animation: rotate-glow 3s linear infinite;
}

.large-quantum-button {
  background: rgba(0, 100, 200, 0.7);
  border: 3px solid rgba(0, 220, 255, 0.8);
  color: #fff;
  border-radius: 50px;
  padding: 18px 60px;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 40px rgba(0, 180, 255, 0.5),
    inset 0 0 25px rgba(0, 200, 255, 0.4);
  text-shadow: 0 0 15px rgba(0, 220, 255, 1);
  margin: 25px auto;
  min-width: 320px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 5;
}

.large-quantum-button:hover {
  transform: translateY(-8px) scale(1.08);
  box-shadow: 
    0 10px 40px rgba(0, 220, 255, 0.6),
    inset 0 0 30px rgba(0, 240, 255, 0.5);
  background: rgba(0, 120, 220, 0.8);
}

.large-quantum-button:active {
  transform: translateY(-2px) scale(1.02);
}

.quantum-button-glow {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 255, 255, 0.5) 0%,
    rgba(0, 180, 255, 0.3) 20%,
    rgba(0, 120, 220, 0.1) 40%,
    transparent 70%
  );
  opacity: 0;
  mix-blend-mode: screen;
  transform: rotate(30deg);
  z-index: -1;
  transition: opacity 0.3s ease;
}

.large-quantum-button:hover .quantum-button-glow {
  opacity: 1;
  animation: rotate-glow 3s linear infinite;
}

.btn-arrow {
  font-size: 1.6rem;
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.large-quantum-button:hover .btn-arrow {
  transform: translateX(5px);
}

@keyframes rotate-glow {
  0% { transform: rotate(30deg); }
  100% { transform: rotate(390deg); }
}

/* 量子弹窗和通知样式 */
.quantum-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.quantum-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.quantum-toast.success {
  background: rgba(0, 180, 120, 0.85);
  border: 1px solid rgba(0, 220, 150, 0.5);
  box-shadow: 
    0 5px 25px rgba(0, 150, 100, 0.4),
    0 0 15px rgba(0, 220, 150, 0.3);
  text-shadow: 0 0 10px rgba(0, 255, 150, 0.7);
}

.quantum-toast.error {
  background: rgba(200, 50, 50, 0.85);
  border: 1px solid rgba(255, 100, 100, 0.5);
  box-shadow: 
    0 5px 25px rgba(150, 50, 50, 0.4),
    0 0 15px rgba(255, 100, 100, 0.3);
  text-shadow: 0 0 10px rgba(255, 150, 150, 0.7);
}

.quantum-toast.info {
  background: rgba(50, 120, 200, 0.85);
  border: 1px solid rgba(100, 180, 255, 0.5);
  box-shadow: 
    0 5px 25px rgba(50, 100, 200, 0.4),
    0 0 15px rgba(100, 180, 255, 0.3);
  text-shadow: 0 0 10px rgba(150, 200, 255, 0.7);
}

/* 闪光充能按钮动画 */
.charging-button {
  position: relative;
  overflow: hidden;
}

.charging-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: skewX(-25deg);
  animation: charging-shine 2s infinite;
}

@keyframes charging-shine {
  100% {
    left: 150%;
  }
}
</style> 