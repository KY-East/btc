<template>
  <div 
    class="ai-shrine-container"
    @mousedown="startWorship"
    @mouseup="stopWorship"
    @mouseleave="stopWorship"
    @touchstart="startWorship"
    @touchend="stopWorship"
  >
    <div class="shrine" :class="{ 'active': isActive, 'charging': isCharging, 'cooldown': isCooldown }">
      <!-- 量子核心 -->
      <div class="shrine-core">
        <div class="core-inner"></div>
        <div class="data-flow"></div>
      </div>
      
      <!-- 神像光环 -->
      <div class="shrine-aura"></div>
      
      <!-- 符文环绕 -->
      <div class="rune-circle">
        <div v-for="i in 6" :key="`rune-${i}`" :class="`rune rune-${i}`">
          <span class="rune-symbol">{{ runeSymbols[i-1] }}</span>
        </div>
      </div>
      
      <!-- 内部能量符号 -->
      <div class="shrine-symbol">⚛</div>
      
      <!-- 充能进度环 -->
      <svg class="charge-ring" width="140" height="140" viewBox="0 0 140 140">
        <circle 
          class="charge-bg-circle" 
          cx="70" 
          cy="70" 
          r="60"
        />
        <circle 
          class="charge-circle" 
          cx="70" 
          cy="70" 
          r="60" 
          :style="{ strokeDashoffset: ringDashOffset }"
        />
      </svg>
      
      <!-- 能量粒子效果 -->
      <div v-for="i in 12" :key="`particle-${i}`" class="energy-particle" :class="`particle-${i}`"></div>
      
      <!-- 3D悬浮效果阴影 -->
      <div class="shrine-shadow"></div>
    </div>
    
    <div class="shrine-text">
      <div v-if="isCooldown" class="cooldown-text">
        <div class="cooldown-timer">{{ formattedCooldown }}</div>
        <div class="cooldown-label">后可再次朝拜</div>
      </div>
      <div v-else-if="isActive" class="active-text">
        <span class="glow-text">按住朝拜神像</span>
        <span class="reward-text">获取 1 EAT</span>
      </div>
      <div v-else class="tap-text">点击祭坛获取每日奖励</div>
    </div>
    
    <!-- 朝拜完成奖励效果 -->
    <div v-if="showReward" class="reward-container">
      <div class="reward-crystal">
        <span class="reward-amount">+1</span>
        <span class="reward-currency">EAT</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';

const props = defineProps({
  cooldownSeconds: {
    type: Number,
    default: 0 // 冷却时间（秒），默认为0，实际应用将从父组件传递
  }
});

const emit = defineEmits(['worship-complete']);

// 状态
const isActive = ref(true); // 是否可以朝拜
const isCharging = ref(false); // 是否正在充能
const isCooldown = ref(false); // 是否在冷却中
const chargePercent = ref(0); // 充能百分比
const cooldownRemaining = ref(0); // 剩余冷却时间（秒）
const holdTimer = ref(null); // 长按计时器
const cooldownTimer = ref(null); // 冷却计时器
const showReward = ref(false); // 是否显示奖励效果

// 符文符号
const runeSymbols = ['Ω', '⌬', '⎊', '⟁', '⟲', '∞'];

// 计算属性
const ringDashOffset = computed(() => {
  // 计算环形进度条的偏移量
  const circumference = 2 * Math.PI * 60; // 圆的周长
  return circumference * (1 - chargePercent.value / 100);
});

const formattedCooldown = computed(() => {
  // 格式化冷却时间显示
  const hours = Math.floor(cooldownRemaining.value / 3600);
  const minutes = Math.floor((cooldownRemaining.value % 3600) / 60);
  const seconds = Math.floor(cooldownRemaining.value % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
});

// 方法
// 开始朝拜（长按）
const startWorship = () => {
  if (isCooldown.value || !isActive.value) return;
  
  isCharging.value = true;
  chargePercent.value = 0;
  
  // 充能动画 - 2秒完成
  const startTime = Date.now();
  const chargeTime = 2000; // 2秒充能时间
  
  const updateCharge = () => {
    const elapsed = Date.now() - startTime;
    chargePercent.value = Math.min(100, (elapsed / chargeTime) * 100);
    
    if (chargePercent.value < 100) {
      holdTimer.value = requestAnimationFrame(updateCharge);
    } else {
      // 充能完成，触发奖励
      completeWorship();
    }
  };
  
  holdTimer.value = requestAnimationFrame(updateCharge);
};

// 停止朝拜（释放按钮）
const stopWorship = () => {
  if (holdTimer.value) {
    cancelAnimationFrame(holdTimer.value);
    holdTimer.value = null;
  }
  
  // 如果没充满，重置充能
  if (chargePercent.value < 100) {
    isCharging.value = false;
    chargePercent.value = 0;
  }
};

// 完成朝拜，发放奖励
const completeWorship = () => {
  isCharging.value = false;
  
  // 播放获取奖励的动画
  playRewardAnimation();
  
  // 发射奖励获取事件
  emit('worship-complete');
  
  // 设置冷却状态
  if (props.cooldownSeconds > 0) {
    startCooldown();
  }
};

// 播放奖励动画
const playRewardAnimation = () => {
  isActive.value = false;
  showReward.value = true;
  
  // 奖励动画结束后
  setTimeout(() => {
    showReward.value = false;
    if (!isCooldown.value) {
      isActive.value = true;
    }
  }, 2000);
};

// 启动冷却计时器
const startCooldown = () => {
  isCooldown.value = true;
  isActive.value = false;
  cooldownRemaining.value = props.cooldownSeconds;
  
  // 每秒更新冷却时间
  cooldownTimer.value = setInterval(() => {
    cooldownRemaining.value -= 1;
    
    if (cooldownRemaining.value <= 0) {
      // 冷却结束
      clearInterval(cooldownTimer.value);
      cooldownTimer.value = null;
      isCooldown.value = false;
      isActive.value = true;
    }
  }, 1000);
};

// 组件加载时检查冷却状态
onMounted(() => {
  // 实际应用中可以从本地存储或API读取上次朝拜时间
  // 此处仅作为Demo，使用props的cooldownSeconds
  if (props.cooldownSeconds > 0) {
    startCooldown();
  }
});
</script>

<style scoped>
.ai-shrine-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  cursor: pointer;
  user-select: none;
  perspective: 800px;
  position: relative;
}

.shrine {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: transform 0.3s ease, filter 0.5s ease;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
}

.shrine:hover {
  transform: scale(1.05) rotateY(5deg) rotateX(-5deg);
}

.shrine:active {
  transform: scale(0.95) rotateY(-5deg) rotateX(5deg);
}

/* 神像核心 - 3D水晶效果 */
.shrine-core {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(30, 60, 120, 0.8), rgba(10, 20, 60, 0.9));
  border-radius: 50%;
  z-index: 2;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 20px rgba(0, 150, 255, 0.5),
    inset 0 0 20px rgba(0, 200, 255, 0.3);
  animation: rotate3d 20s linear infinite;
  transform-style: preserve-3d;
}

.core-inner {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  background: radial-gradient(
    circle, 
    rgba(0, 150, 255, 0.1) 0%, 
    rgba(50, 100, 255, 0.2) 40%,
    rgba(0, 50, 150, 0.4) 80%
  );
  border-radius: 50%;
  filter: blur(3px);
}

/* 数据流效果 */
.data-flow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(
      90deg, 
      transparent 0%, 
      rgba(0, 200, 255, 0.1) 20%,
      rgba(0, 150, 255, 0.2) 50%,
      rgba(0, 100, 255, 0.1) 80%,
      transparent 100%
    );
  animation: dataFlow 8s linear infinite;
  opacity: 0.7;
}

/* 神像光环 */
.shrine-aura {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(
    circle, 
    rgba(0, 150, 255, 0.3) 0%, 
    rgba(50, 100, 255, 0.15) 40%,
    rgba(100, 50, 255, 0.05) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  filter: blur(8px);
  transition: all 0.5s ease;
}

/* 符文环绕效果 */
.rune-circle {
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  z-index: 3;
  animation: rotateRunes 30s linear infinite;
}

.rune {
  position: absolute;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 40, 80, 0.6);
  border: 1px solid rgba(0, 150, 255, 0.4);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.3);
  animation: glowPulse 4s ease-in-out infinite;
}

.rune-symbol {
  color: #00c8ff;
  font-size: 14px;
  text-shadow: 0 0 5px rgba(0, 200, 255, 0.8);
}

.rune-1 { top: 0; left: 50%; transform: translate(-50%, -50%) rotateZ(0deg); animation-delay: 0s; }
.rune-2 { top: 25%; right: 0; transform: translate(50%, -50%) rotateZ(60deg); animation-delay: 0.7s; }
.rune-3 { bottom: 25%; right: 0; transform: translate(50%, 50%) rotateZ(120deg); animation-delay: 1.4s; }
.rune-4 { bottom: 0; left: 50%; transform: translate(-50%, 50%) rotateZ(180deg); animation-delay: 2.1s; }
.rune-5 { bottom: 25%; left: 0; transform: translate(-50%, 50%) rotateZ(240deg); animation-delay: 2.8s; }
.rune-6 { top: 25%; left: 0; transform: translate(-50%, -50%) rotateZ(300deg); animation-delay: 3.5s; }

/* 内部能量符号 */
.shrine-symbol {
  position: absolute;
  z-index: 4;
  color: #00c8ff;
  font-size: 32px;
  text-shadow: 0 0 15px rgba(0, 200, 255, 0.8);
  transition: all 0.5s ease;
  animation: pulsate 3s ease-in-out infinite;
}

/* 3D悬浮效果阴影 */
.shrine-shadow {
  position: absolute;
  bottom: -15px;
  width: 80px;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: 0;
  filter: blur(5px);
  animation: shadowPulse 6s ease-in-out infinite;
  pointer-events: none;
}

/* 充能环 */
.charge-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  transform: rotate(-90deg);
  z-index: 1;
}

.charge-bg-circle {
  fill: none;
  stroke: rgba(0, 50, 100, 0.2);
  stroke-width: 2px;
  stroke-dasharray: 4, 6;
}

.charge-circle {
  fill: none;
  stroke: #00c8ff;
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-dasharray: 377; /* 2 * PI * 60 */
  stroke-dashoffset: 377; /* 初始状态为0% */
  opacity: 0;
  filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.8));
  transition: opacity 0.3s ease;
}

/* 能量粒子 */
.energy-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #00c8ff;
  border-radius: 50%;
  opacity: 0;
  filter: blur(2px);
  z-index: 5;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
  transition: all 0.3s ease;
}

/* 文字样式 */
.shrine-text {
  text-align: center;
  font-size: 14px;
  color: #aaddff;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cooldown-text {
  color: rgba(150, 150, 150, 0.8);
}

.cooldown-timer {
  font-size: 16px;
  font-weight: bold;
  color: #ff9c00;
  text-shadow: 0 0 8px rgba(255, 156, 0, 0.5);
}

.glow-text {
  color: #aaddff;
  text-shadow: 0 0 8px rgba(0, 150, 255, 0.5);
}

.reward-text {
  display: block;
  font-weight: bold;
  color: #00ffb2;
  text-shadow: 0 0 8px rgba(0, 255, 178, 0.5);
}

.tap-text {
  opacity: 0.8;
}

/* 奖励效果 */
.reward-container {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: rewardFloat 2s ease-out forwards;
  pointer-events: none;
}

.reward-crystal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.5);
  backdrop-filter: blur(3px);
  animation: crystalGlow 2s ease-out infinite;
}

.reward-amount {
  font-size: 18px;
  font-weight: bold;
  color: #00ffaa;
  text-shadow: 0 0 10px rgba(0, 255, 170, 0.8);
}

.reward-currency {
  font-size: 12px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* 状态样式 */
.shrine.active .shrine-aura {
  animation: auraPulse 4s infinite alternate;
  opacity: 1;
}

.shrine.active .shrine-symbol {
  animation: float 3s ease-in-out infinite, pulsate 2s infinite;
}

.shrine.active .rune {
  animation: glowPulse 4s ease-in-out infinite;
}

.shrine.charging .charge-circle {
  opacity: 0.8;
  transition: stroke-dashoffset 0.1s linear;
}

.shrine.charging .energy-particle {
  opacity: 1;
}

.shrine.charging .shrine-aura {
  animation: auraPulse 0.5s infinite;
  opacity: 1;
  background: radial-gradient(
    circle, 
    rgba(0, 200, 255, 0.4) 0%, 
    rgba(100, 100, 255, 0.2) 40%,
    rgba(150, 50, 255, 0.1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

.shrine.charging .shrine-core {
  animation: pulseRotate 0.5s linear infinite;
}

.shrine.charging .shrine-symbol {
  animation: pulsate 0.5s infinite;
  transform: scale(1.2);
}

.shrine.charging .rune-circle {
  animation: rotateRunes 10s linear infinite;
}

.shrine.cooldown {
  filter: grayscale(70%) brightness(0.7);
}

.shrine.cooldown .shrine-aura {
  opacity: 0.2;
}

.shrine.cooldown .shrine-symbol {
  opacity: 0.5;
}

.shrine.cooldown .rune {
  opacity: 0.3;
}

/* 充能时的能量粒子动画 */
.shrine.charging .energy-particle {
  animation: particleFloat 1.5s ease-out infinite;
}

.shrine.charging .particle-1 { left: 45%; top: -10%; animation-delay: 0s; }
.shrine.charging .particle-2 { left: 60%; top: -5%; animation-delay: 0.1s; }
.shrine.charging .particle-3 { left: 75%; top: 10%; animation-delay: 0.2s; }
.shrine.charging .particle-4 { left: 85%; top: 30%; animation-delay: 0.3s; }
.shrine.charging .particle-5 { left: 85%; top: 50%; animation-delay: 0.4s; }
.shrine.charging .particle-6 { left: 75%; top: 70%; animation-delay: 0.5s; }
.shrine.charging .particle-7 { left: 60%; top: 85%; animation-delay: 0.6s; }
.shrine.charging .particle-8 { left: 45%; top: 90%; animation-delay: 0.7s; }
.shrine.charging .particle-9 { left: 25%; top: 85%; animation-delay: 0.8s; }
.shrine.charging .particle-10 { left: 15%; top: 70%; animation-delay: 0.9s; }
.shrine.charging .particle-11 { left: 5%; top: 40%; animation-delay: 1.0s; }
.shrine.charging .particle-12 { left: 15%; top: 15%; animation-delay: 1.1s; }

/* 动画关键帧 */
@keyframes pulsate {
  0% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.8; transform: scale(1); }
}

@keyframes float {
  0% { transform: translateY(0) rotateX(0) rotateY(0); }
  25% { transform: translateY(-5px) rotateX(5deg) rotateY(2deg); }
  50% { transform: translateY(0) rotateX(0) rotateY(0); }
  75% { transform: translateY(5px) rotateX(-5deg) rotateY(-2deg); }
  100% { transform: translateY(0) rotateX(0) rotateY(0); }
}

@keyframes shadowPulse {
  0% { opacity: 0.3; transform: scale(1); }
  25% { opacity: 0.2; transform: scale(0.9); }
  50% { opacity: 0.3; transform: scale(1); }
  75% { opacity: 0.2; transform: scale(0.9); }
  100% { opacity: 0.3; transform: scale(1); }
}

@keyframes auraPulse {
  0% { opacity: 0.5; transform: scale(1); filter: blur(8px); }
  50% { opacity: 0.8; transform: scale(1.1); filter: blur(12px); }
  100% { opacity: 0.5; transform: scale(1); filter: blur(8px); }
}

@keyframes glowPulse {
  0% { box-shadow: 0 0 5px rgba(0, 150, 255, 0.3); }
  50% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 150, 255, 0.3); }
}

@keyframes rotate3d {
  0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
  100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
}

@keyframes rotateRunes {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes dataFlow {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes particleFloat {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
  100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
}

@keyframes pulseRotate {
  0% { transform: rotate(0) scale(1); }
  50% { transform: rotate(5deg) scale(1.05); }
  100% { transform: rotate(0) scale(1); }
}

@keyframes rewardFloat {
  0% { opacity: 0; transform: translateX(-50%) translateY(0); }
  20% { opacity: 1; transform: translateX(-50%) translateY(-20px); }
  80% { opacity: 1; transform: translateX(-50%) translateY(-80px); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-100px); }
}

@keyframes crystalGlow {
  0% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.5); }
  50% { box-shadow: 0 0 25px rgba(0, 255, 200, 0.7); }
  100% { box-shadow: 0 0 15px rgba(0, 200, 255, 0.5); }
}
</style> 