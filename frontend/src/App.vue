<template>
  <div id="app">
    <ParticleBg v-if="!showQuantumDemo && !showAlphaDemo && !showInvestorPitch" />
    
    <!-- 融资展示页面 -->
    <InvestorPitch 
      v-if="showInvestorPitch"
      @close="showInvestorPitch = false"
    />
    
    <!-- Alpha激活演示页面 -->
    <AlphaActivationDemo 
      v-else-if="showAlphaDemo" 
      @close-demo="closeAlphaDemo" 
      @enter-trading="enterTradingFromAlpha"
    />
    
    <!-- 量子激活演示页面 -->
    <QuantumDemo 
      v-else-if="showQuantumDemo" 
      @back-to-main="() => showQuantumDemo = false" 
    />
    
    <!-- 原有的主应用流程 -->
    <template v-else>
      <HomeHero 
        ref="homeHeroRef" 
        v-if="step < 2" 
        @enter-trading="enterTrading" 
      />
      <TradingDashboard v-else />
    </template>
    
    <!-- 控制面板 -->
    <div class="app-controls" v-if="!showAlphaDemo && !showInvestorPitch">
      <!-- 融资展示按钮 -->
      <button 
        class="demo-btn investor-btn" 
        @click="showInvestorPitch = true"
        :class="{ active: showInvestorPitch }"
      >
        <span class="demo-icon">💼</span>
        <span class="demo-text">融资展示</span>
      </button>
      
      <!-- Alpha演示切换按钮 -->
      <button 
        class="demo-btn alpha-btn" 
        @click="toggleAlphaDemo"
        :class="{ active: showAlphaDemo }"
      >
        <span class="demo-icon">🚀</span>
        <span class="demo-text">Alpha激活演示</span>
      </button>
      
      <!-- 量子演示切换按钮 -->
      <button 
        class="demo-btn quantum-btn" 
        @click="toggleQuantumDemo"
        :class="{ active: showQuantumDemo }"
      >
        <span class="demo-icon">⚛️</span>
        <span class="demo-text">量子演示</span>
      </button>
      
      <!-- 音效控制 -->
      <button class="sound-btn" @click="toggleSound">
        <span v-if="soundEnabled">🔊</span>
        <span v-else>🔇</span>
      </button>
    </div>
    
    <!-- 演示说明弹窗 -->
    <div v-if="showDemoInfo" class="demo-info-modal" @click="showDemoInfo = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>🚀 Alpha神谕激活系统演示</h3>
          <button @click="showDemoInfo = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">🎮</span>
              <div class="feature-text">
                <strong>AAA游戏级视觉效果</strong>
                <p>对标《赛博朋克2077》的UI设计水准</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <div class="feature-text">
                <strong>硬件加速动画</strong>
                <p>60fps流畅动画，完美移动端适配</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔬</span>
              <div class="feature-text">
                <strong>Alpha神谕科技主题</strong>
                <p>AI Oracle、能量同步等专业概念</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎯</span>
              <div class="feature-text">
                <strong>可选跳过机制</strong>
                <p>用户可选择直接进入交易终端</p>
              </div>
            </div>
          </div>
          <div class="demo-actions">
            <button @click="startAlphaDemo" class="start-demo-btn">体验Alpha激活</button>
            <button @click="startQuantumDemo" class="start-demo-btn quantum">体验量子演示</button>
            <button @click="showDemoInfo = false" class="cancel-btn">稍后再说</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import ParticleBg from './components/ParticleBg.vue';
import HomeHero from './components/HomeHero.vue';
import TradingDashboard from './components/TradingDashboard.vue';
import QuantumDemo from './views/QuantumDemo.vue';
import AlphaActivationDemo from './views/AlphaActivationDemo.vue';
import InvestorPitch from './views/InvestorPitch.vue';

const step = ref(0); // 0:未连接钱包 1:已连接神谕 2:进入EZ Trading
const soundEnabled = ref(true); // 音效状态
const homeHeroRef = ref(null); // HomeHero组件引用
const currentView = ref('main'); // 'main' | 'quantum-demo'
const showDemoInfo = ref(false); // 演示说明弹窗
const showQuantumDemo = ref(false);
const showAlphaDemo = ref(false);
const showInvestorPitch = ref(false);
const showIntroModal = ref(false);

function enterTrading() {
  step.value = 2;
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value;
  // 实际应用中这里可以触发背景音乐的播放/暂停
}

function toggleQuantumDemo() {
  showQuantumDemo.value = !showQuantumDemo.value;
  if (showQuantumDemo.value) {
    showAlphaDemo.value = false;
  }
}

function toggleAlphaDemo() {
  showAlphaDemo.value = !showAlphaDemo.value;
  if (showAlphaDemo.value) {
    showQuantumDemo.value = false;
  }
}

function closeAlphaDemo() {
  showAlphaDemo.value = false;
}

function backToMain() {
  currentView.value = 'main';
  localStorage.setItem('eztrading_current_view', 'main');
}

function startAlphaDemo() {
  showDemoInfo.value = false;
  showAlphaDemo.value = true;
}

function startQuantumDemo() {
  showDemoInfo.value = false;
  showQuantumDemo.value = true;
}

function enterTradingFromAlpha() {
  // 关闭Alpha演示页面，进入交易终端
  showAlphaDemo.value = false;
  step.value = 2;
}

// 键盘快捷键
function handleKeyPress(event) {
  // 按Q键快速切换到Alpha演示
  if (event.key.toLowerCase() === 'q' && event.ctrlKey) {
    event.preventDefault();
    toggleAlphaDemo();
  }
  // 按W键快速切换到量子演示
  if (event.key.toLowerCase() === 'w' && event.ctrlKey) {
    event.preventDefault();
    toggleQuantumDemo();
  }
  // 按ESC键返回主应用
  if (event.key === 'Escape') {
    if (showAlphaDemo.value) {
      closeAlphaDemo();
    } else if (showQuantumDemo.value) {
      showQuantumDemo.value = false;
    }
  }
}

watch(() => homeHeroRef.value?.step, (newStep) => {
  if (newStep !== undefined) {
    step.value = newStep;
  }
});

onMounted(() => {
  // 恢复保存的状态
  const savedStep = localStorage.getItem('eztrading_step');
  if (savedStep) {
    step.value = parseInt(savedStep, 10);
  }
  
  const savedView = localStorage.getItem('eztrading_current_view');
  if (savedView) {
    currentView.value = savedView;
  }
  
  // 首次访问显示演示说明
  const hasSeenDemo = localStorage.getItem('eztrading_demo_seen');
  if (!hasSeenDemo) {
    setTimeout(() => {
      showDemoInfo.value = true;
      localStorage.setItem('eztrading_demo_seen', 'true');
    }, 2000);
  }
  
  // 监听状态变化并保存
  watch(step, (newStep) => {
    localStorage.setItem('eztrading_step', newStep.toString());
  });
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeyPress);
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

/* 应用控制面板 */
.app-controls {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  padding: 10px 15px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  opacity: 0.8;
  backdrop-filter: blur(10px);
  position: relative;
}

.demo-btn:hover {
  opacity: 1;
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  transform: translateY(-2px);
}

.demo-btn.active {
  background: rgba(255, 100, 100, 0.1);
  border-color: rgba(255, 100, 100, 0.3);
  color: #ff6464;
}

.demo-btn.active:hover {
  background: rgba(255, 100, 100, 0.2);
  box-shadow: 0 0 15px rgba(255, 100, 100, 0.3);
}

/* Alpha按钮特殊样式 */
.demo-btn.alpha-btn {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
  color: #00ffff;
}

.demo-btn.alpha-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.demo-btn.alpha-btn.active {
  background: rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
  color: #fff;
}

/* 量子按钮特殊样式 */
.demo-btn.quantum-btn {
  background: rgba(255, 0, 255, 0.1);
  border-color: rgba(255, 0, 255, 0.3);
  color: #ff00ff;
}

.demo-btn.quantum-btn:hover {
  background: rgba(255, 0, 255, 0.2);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
}

.demo-btn.quantum-btn.active {
  background: rgba(255, 0, 255, 0.3);
  border-color: rgba(255, 0, 255, 0.5);
  color: #fff;
}

.demo-icon {
  font-size: 14px;
}

.demo-text {
  font-weight: 500;
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

/* 演示说明弹窗 */
.demo-info-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(135deg, rgba(0, 20, 40, 0.95) 0%, rgba(0, 10, 30, 0.95) 100%);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.modal-header h3 {
  margin: 0;
  color: #00ffff;
  font-size: 20px;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 107, 107, 0.1);
  color: #ff4757;
}

.modal-body {
  color: #fff;
}

.feature-list {
  margin-bottom: 25px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(0, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 255, 0.1);
}

.feature-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.feature-text strong {
  display: block;
  color: #00ffff;
  font-size: 14px;
  margin-bottom: 5px;
}

.feature-text p {
  margin: 0;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
}

.demo-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.start-demo-btn {
  background: linear-gradient(135deg, #00ffff, #0080ff);
  border: none;
  color: #000;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
}

.start-demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 255, 255, 0.4);
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .app-controls {
    bottom: 15px;
    left: 15px;
  }
  
  .demo-btn {
    padding: 8px 12px;
    font-size: 11px;
  }
  
  .modal-content {
    padding: 20px;
    margin: 20px;
  }
  
  .modal-header h3 {
    font-size: 18px;
  }
  
  .feature-item {
    padding: 12px;
  }
  
  .demo-actions {
    flex-direction: column;
  }
  
  .start-demo-btn,
  .cancel-btn {
    width: 100%;
  }
}

/* 键盘快捷键提示 */
.demo-btn.alpha-btn::after {
  content: "Ctrl+Q";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.demo-btn.quantum-btn::after {
  content: "Ctrl+W";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.demo-btn:hover::after {
  opacity: 1;
}

/* 演示按钮样式 */
.start-demo-btn.quantum {
  background: linear-gradient(135deg, #ff00ff, #8000ff);
  color: #fff;
}

.start-demo-btn.quantum:hover {
  box-shadow: 0 6px 20px rgba(255, 0, 255, 0.4);
}
</style> 