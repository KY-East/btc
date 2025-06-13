<template>
  <div class="divine-hero">
    <!-- 神圣背景层 -->
    <div class="divine-background">
      <div class="celestial-grid"></div>
      <div class="divine-particles"></div>
      <div class="sacred-geometry"></div>
      <div class="ethereal-mist"></div>
    </div>

    <!-- 登录神殿页面 -->
    <div class="sacred-temple" v-if="step === 0">
      <!-- 神圣光环 -->
      <div class="divine-halo">
        <div class="inner-sanctum"></div>
        <div class="sacred-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
        <div class="divine-essence"></div>
      </div>
      
      <!-- 神圣标题 -->
      <div class="divine-title">
        <h1 class="sacred-text">Oracle Alpha</h1>
        <div class="title-blessing"></div>
        <div class="divine-runes"></div>
      </div>
      
      <!-- 神谕副标题 -->
      <div class="oracle-subtitle">
        <p class="sacred-subtitle">神谕交易终端</p>
        <div class="subtitle-aura"></div>
      </div>
      
      <!-- 神圣召唤按钮 -->
      <div class="divine-summon">
        <button class="sacred-button" @click="connectWallet">
          <span class="button-text">启动神谕连接</span>
          <div class="button-blessing"></div>
          <div class="sacred-glow"></div>
        </button>
      </div>
      
      <!-- 神圣特性 -->
      <div class="divine-features">
        <div class="feature-shrine">
          <div class="shrine-icon">⚡</div>
          <div class="shrine-text">AI神谕预言</div>
          <div class="shrine-blessing"></div>
        </div>
        <div class="feature-shrine">
          <div class="shrine-icon">🔮</div>
          <div class="shrine-text">每日神圣启示</div>
          <div class="shrine-blessing"></div>
        </div>
        <div class="feature-shrine">
          <div class="shrine-icon">💎</div>
          <div class="shrine-text">自动交易神术</div>
          <div class="shrine-blessing"></div>
        </div>
      </div>
      
      <!-- 连接仪式指示器 -->
      <div class="connection-ritual" v-if="isConnecting">
        <div class="ritual-circle">
          <div class="ritual-inner"></div>
          <div class="ritual-symbols"></div>
        </div>
        <div class="ritual-text">正在建立神圣连接...</div>
      </div>
    </div>
    
    <!-- 神谕圣殿页面 -->
    <div class="oracle-sanctuary" v-else-if="step === 1">
      <div class="sanctuary-header">
        <div class="sanctuary-title">Oracle Alpha Sanctuary</div>
        <div class="divine-status">
          <div class="wallet-shrine">{{ shortenAddress(wallet.address) }}</div>
          <div class="eat-sanctuary">
            <span class="eat-symbol">⚡</span>
            <span class="eat-value">{{ wallet.eat.toFixed(2) }} EAT</span>
          </div>
        </div>
      </div>
      
      <DailyWorship 
        ref="dailyWorshipRef"
        @activation-complete="handleActivationComplete"
        @skip-activation="handleSkipActivation"
        @enter-trading="handleEnterTrading"
      />
      
      <div class="sanctuary-controls">
        <AiShrine 
          :cooldown-seconds="claimedToday ? 86400 : 0"
          @worship-complete="claimDailyEAT"
        />
        
        <div class="divine-actions">
          <button 
            v-if="detailUnlocked" 
            class="divine-btn ascension-btn" 
            @click="step = 2"
          >
            <span class="btn-symbol">✨</span>
            <span class="btn-label">进入交易圣域</span>
            <div class="btn-divine-glow"></div>
          </button>
          
          <button class="divine-btn oracle-btn" @click="showNavInfo = !showNavInfo">
            <span class="btn-symbol">📊</span>
            <span class="btn-label">神谕价值</span>
          </button>
        </div>
      </div>
        
      <transition name="divine-reveal">
        <div v-if="showNavInfo" class="oracle-wisdom-card">
          <div class="wisdom-header">EAT神谕价值</div>
          <div class="wisdom-value">1 EAT ≈ {{ navValue }} USD</div>
          <div class="wisdom-desc">基于30日神谕表现</div>
          <div class="wisdom-note">每日神圣更新</div>
        </div>
      </transition>
    </div>
    
    <transition name="divine-fade">
      <div class="oracle-revelation-modal" v-if="showDetail">
        <div class="revelation-content">
          <div class="revelation-header">
            <div class="revelation-title-section">
              <div class="sacred-icon">🔮</div>
              <h2>神谕深度启示</h2>
            </div>
            <div class="divine-badge">Alpha级</div>
          </div>
          
          <div class="wisdom-grid">
            <div class="wisdom-card">
              <div class="wisdom-label">神谕标的</div>
              <div class="wisdom-value highlight">{{ oracle.symbol }}</div>
            </div>
            
            <div class="wisdom-card">
              <div class="wisdom-label">神圣指引</div>
              <div class="wisdom-value action" :class="oracle.actionClass">{{ oracle.action }}</div>
            </div>
            
            <div class="wisdom-card">
              <div class="wisdom-label">市场神意</div>
              <div class="wisdom-value">{{ oracle.sentiment }}</div>
            </div>
            
            <div class="wisdom-card">
              <div class="wisdom-label">能量变化</div>
              <div class="wisdom-value">{{ oracle.volumeChange }}</div>
            </div>
          </div>
          
          <div class="revelation-section">
            <div class="section-title">
              <div class="section-symbol">📊</div>
              <div>神谕依据</div>
            </div>
            <p class="revelation-text">{{ oracle.reason }}</p>
          </div>
          
          <div class="revelation-section">
            <div class="section-title">
              <div class="section-symbol">🧠</div>
              <div>AI神谕摘要</div>
            </div>
            <p class="divine-text">{{ oracle.detail }}</p>
          </div>
          
          <div class="divine-risk-assessment">
            <div class="risk-label">神圣风险等级</div>
            <div class="risk-meter" :class="oracle.riskLevel"></div>
            <div class="risk-value">{{ oracle.riskLevel }}</div>
          </div>
          
          <div class="oracle-signatures">
            <div class="oracle-seal">技术神谕 ✓</div>
            <div class="oracle-seal">链上神意 ✓</div>
            <div class="oracle-seal">情绪神谕 ✓</div>
            <div class="oracle-seal">机构神意 ✓</div>
          </div>
          
          <button class="divine-ascension-button" @click="showDetail = false; step = 2">
            <span class="ascension-text">进入交易圣域</span>
            <span class="ascension-arrow">→</span>
            <div class="divine-ascension-glow"></div>
          </button>
          
          <div class="divine-footnote">下一次神谕将在24小时后降临</div>
          <div class="sacred-burn-info">已献祭 0.5 EAT (50%)</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import DailyWorship from './DailyWorship.vue';
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

const dailyWorshipRef = ref(null);

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
  
  if (dailyWorshipRef.value) {
    dailyWorshipRef.value.showUnlockAnimation();
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

function handleActivationComplete() {
  console.log('Activation complete');
}

function handleSkipActivation() {
  console.log('Activation skipped');
}

function handleEnterTrading() {
  console.log('Enter trading');
  step.value = 2; // 直接进入交易终端
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
/* 神圣主容器 */
.divine-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(
    ellipse at center,
    #0a0a1a 0%,
    #050510 30%,
    #020208 60%,
    #000000 100%
  );
}

/* 神圣背景层 */
.divine-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.celestial-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 215, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: celestialDrift 60s linear infinite;
}

.divine-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="rgba(255,215,0,0.3)"/><circle cx="80" cy="40" r="0.5" fill="rgba(255,255,255,0.4)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,215,0,0.2)"/><circle cx="70" cy="10" r="0.8" fill="rgba(255,255,255,0.3)"/><circle cx="10" cy="60" r="1.2" fill="rgba(255,215,0,0.25)"/></svg>') repeat;
  background-size: 200px 200px;
  animation: particleFloat 40s linear infinite;
  opacity: 0.6;
}

.sacred-geometry {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    transparent 40%,
    rgba(255, 215, 0, 0.02) 41%,
    rgba(255, 215, 0, 0.02) 42%,
    transparent 43%
  );
  border-radius: 50%;
  animation: geometryRotate 120s linear infinite;
}

.ethereal-mist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at 30% 70%,
    rgba(138, 43, 226, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 70% 30%,
    rgba(255, 215, 0, 0.05) 0%,
    transparent 50%
  );
  animation: mistFlow 80s ease-in-out infinite;
}

/* 神圣神殿 */
.sacred-temple {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 3rem;
  z-index: 10;
}

/* 神圣光环 */
.divine-halo {
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-sanctum {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.4) 0%,
    rgba(255, 215, 0, 0.2) 30%,
    rgba(138, 43, 226, 0.1) 60%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 
    0 0 40px rgba(255, 215, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  animation: sanctumPulse 4s ease-in-out infinite;
}

.sacred-rings {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  background: linear-gradient(45deg, 
    rgba(255, 215, 0, 0.3), 
    rgba(138, 43, 226, 0.2), 
    rgba(255, 215, 0, 0.3)
  ) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.ring-1 {
  width: 200px;
  height: 200px;
  top: 50px;
  left: 50px;
  animation: ringRotate 20s linear infinite;
}

.ring-2 {
  width: 250px;
  height: 250px;
  top: 25px;
  left: 25px;
  animation: ringRotate 30s linear infinite reverse;
}

.ring-3 {
  width: 300px;
  height: 300px;
  top: 0;
  left: 0;
  animation: ringRotate 40s linear infinite;
}

.divine-essence {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(138, 43, 226, 0.05) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: essencePulse 6s ease-in-out infinite;
}

/* 神圣标题 */
.divine-title {
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
}

.sacred-text {
  font-size: 4.5rem;
  font-weight: 300;
  color: transparent;
  background: linear-gradient(
    135deg,
    #ffd700 0%,
    #ffffff 25%,
    #ffd700 50%,
    #8a2be2 75%,
    #ffd700 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 
    0 0 30px rgba(255, 215, 0, 0.5),
    0 0 60px rgba(255, 215, 0, 0.3),
    0 0 90px rgba(138, 43, 226, 0.2);
  letter-spacing: 3px;
  animation: titleShimmer 8s ease-in-out infinite;
}

.title-blessing {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 120%;
  height: 140%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(138, 43, 226, 0.05) 30%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: -1;
  animation: blessingPulse 5s ease-in-out infinite;
}

.divine-runes {
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 200%;
  overflow: hidden;
  opacity: 0.3;
}

/* 神谕副标题 */
.oracle-subtitle {
  position: relative;
  margin-bottom: 3rem;
  text-align: center;
}

.sacred-subtitle {
  font-size: 1.8rem;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  letter-spacing: 2px;
  margin: 0;
}

.subtitle-aura {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 215, 0, 0.6) 50%,
    transparent 100%
  );
  animation: auraFlow 3s ease-in-out infinite;
}

/* 神圣召唤按钮 */
.divine-summon {
  position: relative;
  margin-bottom: 3rem;
}

.sacred-button {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(138, 43, 226, 0.1) 50%,
    rgba(255, 215, 0, 0.1) 100%
  );
  border: 2px solid transparent;
  background-clip: padding-box;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 1px;
  border-radius: 50px;
  padding: 18px 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 0 30px rgba(255, 215, 0, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.sacred-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    #ffd700,
    #8a2be2,
    #ffd700,
    #ffffff,
    #ffd700
  );
  border-radius: 50px;
  z-index: -1;
  animation: borderShimmer 4s linear infinite;
}

.sacred-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 10px 40px rgba(255, 215, 0, 0.4),
    inset 0 0 30px rgba(255, 255, 255, 0.08);
}

.button-blessing {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(138, 43, 226, 0.2) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: screen;
}

.sacred-button:hover .button-blessing {
  opacity: 1;
  animation: blessingRotate 3s linear infinite;
}

.sacred-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.2) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.sacred-button:hover .sacred-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

/* 神圣特性 */
.divine-features {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.feature-shrine {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.05) 0%,
    rgba(138, 43, 226, 0.05) 50%,
    rgba(255, 215, 0, 0.05) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.02);
}

.feature-shrine:hover {
  transform: translateY(-8px) scale(1.05);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 
    0 15px 40px rgba(255, 215, 0, 0.2),
    inset 0 0 30px rgba(255, 255, 255, 0.05);
}

.shrine-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
}

.shrine-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.shrine-blessing {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.1) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 50%;
}

.feature-shrine:hover .shrine-blessing {
  opacity: 1;
  animation: blessingPulse 2s ease-in-out infinite;
}

/* 连接仪式 */
.connection-ritual {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 20;
}

.ritual-circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
}

.ritual-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(138, 43, 226, 0.2) 50%,
    transparent 100%
  );
  animation: ritualPulse 2s ease-in-out infinite;
}

.ritual-symbols {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top: 2px solid rgba(255, 215, 0, 0.6);
  border-right: 2px solid rgba(138, 43, 226, 0.4);
  border-radius: 50%;
  animation: ritualRotate 3s linear infinite;
}

.ritual-text {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
  animation: textPulse 2s ease-in-out infinite;
}

/* 神谕圣殿 */
.oracle-sanctuary {
  position: relative;
  width: 100%;
  max-width: 1400px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.02) 0%,
    rgba(138, 43, 226, 0.02) 50%,
    rgba(255, 215, 0, 0.02) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 50px rgba(255, 215, 0, 0.1),
    inset 0 0 30px rgba(255, 255, 255, 0.02);
  z-index: 10;
}

.sanctuary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.sanctuary-title {
  font-size: 2rem;
  font-weight: 200;
  color: transparent;
  background: linear-gradient(
    90deg,
    #ffd700 0%,
    #ffffff 50%,
    #8a2be2 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  letter-spacing: 1px;
}

.divine-status {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.wallet-shrine {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  padding: 8px 16px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.eat-sanctuary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #ffd700;
  font-weight: 400;
  padding: 10px 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(138, 43, 226, 0.1) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.2),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.eat-symbol {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

/* 神圣动作按钮 */
.divine-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
}

.divine-btn {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(138, 43, 226, 0.1) 50%,
    rgba(255, 215, 0, 0.1) 100%
  );
  border: 2px solid rgba(255, 215, 0, 0.3);
  color: #ffffff;
  border-radius: 50px;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 25px rgba(255, 215, 0, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.03);
  min-width: 250px;
  justify-content: center;
  letter-spacing: 0.5px;
}

.divine-btn:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 
    0 10px 40px rgba(255, 215, 0, 0.3),
    inset 0 0 25px rgba(255, 255, 255, 0.08);
}

.ascension-btn {
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.15) 0%,
    rgba(138, 43, 226, 0.15) 50%,
    rgba(255, 215, 0, 0.15) 100%
  );
  border: 2px solid rgba(255, 215, 0, 0.4);
  padding: 18px 50px;
  font-size: 1.4rem;
  min-width: 300px;
}

.btn-symbol {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

.btn-divine-glow {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.3) 0%,
    rgba(138, 43, 226, 0.2) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: screen;
}

.divine-btn:hover .btn-divine-glow {
  opacity: 1;
  animation: divineGlowRotate 3s linear infinite;
}

/* 神谕智慧卡片 */
.oracle-wisdom-card {
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.08) 0%,
    rgba(138, 43, 226, 0.08) 50%,
    rgba(255, 215, 0, 0.08) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 30px rgba(255, 215, 0, 0.15),
    inset 0 0 20px rgba(255, 255, 255, 0.03);
  text-align: center;
}

.wisdom-header {
  font-size: 1.3rem;
  color: #ffd700;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.wisdom-value {
  font-size: 1.8rem;
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

.wisdom-desc {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.wisdom-note {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* 动画关键帧 */
@keyframes celestialDrift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-50px, -50px); }
}

@keyframes particleFloat {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-200px, -200px); }
}

@keyframes geometryRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes mistFlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes sanctumPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes ringRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes essencePulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes titleShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes blessingPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

@keyframes auraFlow {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 0.8; transform: translateX(-50%) scaleX(1.2); }
}

@keyframes borderShimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes blessingRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes ritualPulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes ritualRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes textPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes divineGlowRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 过渡动画 */
.divine-reveal-enter-active,
.divine-reveal-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.divine-reveal-enter-from,
.divine-reveal-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.divine-fade-enter-active,
.divine-fade-leave-active {
  transition: all 0.4s ease;
}

.divine-fade-enter-from,
.divine-fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sacred-text {
    font-size: 3rem;
  }
  
  .divine-features {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .divine-halo {
    width: 200px;
    height: 200px;
  }
  
  .ring-1 {
    width: 140px;
    height: 140px;
    top: 30px;
    left: 30px;
  }
  
  .ring-2 {
    width: 170px;
    height: 170px;
    top: 15px;
    left: 15px;
  }
  
  .ring-3 {
    width: 200px;
    height: 200px;
    top: 0;
    left: 0;
  }
  
  .divine-status {
    flex-direction: column;
    gap: 1rem;
  }
  
  .sanctuary-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style> 