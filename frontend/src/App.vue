<template>
  <div id="app">
    <ParticleBg />
    <HomeHero 
      ref="homeHeroRef" 
      v-if="step < 2" 
      @enter-trading="enterTrading" 
    />
    <TradingDashboard v-else />
    
    <div class="sound-control">
      <button class="sound-btn" @click="toggleSound">
        <span v-if="soundEnabled">🔊</span>
        <span v-else>🔇</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import ParticleBg from './components/ParticleBg.vue';
import HomeHero from './components/HomeHero.vue';
import TradingDashboard from './components/TradingDashboard.vue';

const step = ref(2); // 0:未连接钱包 1:已连接神谕 2:进入EZ Trading
const soundEnabled = ref(true); // 音效状态
const homeHeroRef = ref(null); // HomeHero组件引用

function enterTrading() {
  step.value = 2;
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value;
  // 实际应用中这里可以触发背景音乐的播放/暂停
}

watch(() => homeHeroRef.value?.step, (newStep) => {
  if (newStep !== undefined) {
    step.value = newStep;
  }
});

onMounted(() => {
  const savedStep = localStorage.getItem('eztrading_step');
  if (savedStep) {
    step.value = parseInt(savedStep, 10);
  }
  
  watch(step, (newStep) => {
    localStorage.setItem('eztrading_step', newStep.toString());
  });
});
</script>

<style>
body, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  background: #0d0d1a;
  overflow-x: hidden;
}

.sound-control {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
}

.sound-btn {
  background: rgba(20, 40, 80, 0.7);
  border: 1px solid rgba(100, 180, 255, 0.4);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  opacity: 0.6;
}

.sound-btn:hover {
  opacity: 1;
  background: rgba(30, 60, 100, 0.8);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.3);
}
</style> 