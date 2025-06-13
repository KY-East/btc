<template>
  <div class="alpha-demo-page">
    <QuantumActivation 
      @activation-complete="handleActivationComplete"
      @skip-activation="handleSkipActivation"
    />
    
    <!-- 演示控制面板 -->
    <div class="demo-controls" v-if="showControls">
      <div class="controls-header">
        <h3>演示控制面板</h3>
        <button @click="showControls = false" class="close-btn">×</button>
      </div>
      
      <div class="control-group">
        <label>重置激活状态：</label>
        <button @click="resetActivation" class="control-btn">重置</button>
      </div>
      
      <div class="control-group">
        <label>切换移动端视图：</label>
        <button @click="toggleMobileView" class="control-btn">
          {{ isMobileView ? '桌面端' : '移动端' }}
        </button>
      </div>
      
      <div class="control-group">
        <label>性能模式：</label>
        <select v-model="performanceMode" @change="updatePerformance" class="control-select">
          <option value="high">高性能</option>
          <option value="medium">中等性能</option>
          <option value="low">低性能</option>
        </select>
      </div>
      
      <div class="demo-info">
        <h4>设计亮点：</h4>
        <ul>
          <li>🎮 AAA游戏级视觉效果</li>
          <li>⚡ 硬件加速动画</li>
          <li>📱 完美移动端适配</li>
          <li>🔬 Alpha神谕科技主题</li>
          <li>🎯 可选跳过机制</li>
        </ul>
      </div>
    </div>
    
    <!-- 控制面板切换按钮 -->
    <button 
      v-if="!showControls" 
      @click="showControls = true" 
      class="demo-toggle"
    >
      演示控制
    </button>
    
    <!-- 激活结果提示 -->
    <div v-if="activationResult" class="result-toast">
      <div class="toast-content">
        <h4>激活成功！</h4>
        <p>获得 {{ activationResult.reward }} EAT</p>
        <p>连续 {{ activationResult.streak }} 天</p>
      </div>
    </div>
  </div>
</template>

<script>
import QuantumActivation from '../components/QuantumActivation.vue'

export default {
  name: 'QuantumDemo',
  components: {
    QuantumActivation
  },
  
  data() {
    return {
      showControls: false,
      isMobileView: false,
      performanceMode: 'high',
      activationResult: null
    }
  },
  
  methods: {
    handleActivationComplete(result) {
      console.log('激活完成:', result)
      this.activationResult = result
      
      // 3秒后隐藏结果提示
      setTimeout(() => {
        this.activationResult = null
      }, 3000)
    },
    
    handleSkipActivation() {
      console.log('跳过激活')
      // 这里可以跳转到交易终端
      this.$router.push('/trading-dashboard')
    },
    
    resetActivation() {
      // 清除本地存储的激活状态
      localStorage.removeItem('lastAlphaActivation')
      // 重新加载页面以重置组件状态
      window.location.reload()
    },
    
    toggleMobileView() {
      this.isMobileView = !this.isMobileView
      
      if (this.isMobileView) {
        document.body.style.width = '375px'
        document.body.style.height = '667px'
        document.body.style.margin = '20px auto'
        document.body.style.border = '2px solid #333'
        document.body.style.borderRadius = '20px'
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.margin = ''
        document.body.style.border = ''
        document.body.style.borderRadius = ''
        document.body.style.overflow = ''
      }
    },
    
    updatePerformance() {
      const root = document.documentElement
      
      switch (this.performanceMode) {
        case 'high':
          root.style.setProperty('--particle-count', '50')
          root.style.setProperty('--animation-duration', '3s')
          break
        case 'medium':
          root.style.setProperty('--particle-count', '25')
          root.style.setProperty('--animation-duration', '2s')
          break
        case 'low':
          root.style.setProperty('--particle-count', '10')
          root.style.setProperty('--animation-duration', '1s')
          break
      }
    }
  },
  
  mounted() {
    // 设置初始性能模式
    this.updatePerformance()
  },
  
  beforeUnmount() {
    // 清理样式
    if (this.isMobileView) {
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.margin = ''
      document.body.style.border = ''
      document.body.style.borderRadius = ''
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.alpha-demo-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 演示控制面板 */
.demo-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  font-family: 'Courier New', monospace;
  z-index: 2000;
  backdrop-filter: blur(10px);
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.controls-header h3 {
  margin: 0;
  color: #00ffff;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ff4757;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  color: #aaa;
  font-size: 12px;
}

.control-btn {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  color: #00ffff;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  border-color: rgba(0, 255, 255, 0.5);
}

.control-select {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  color: #00ffff;
  padding: 8px;
  font-size: 12px;
  width: 100%;
}

.control-select option {
  background: #000;
  color: #00ffff;
}

.demo-info {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
}

.demo-info h4 {
  margin: 0 0 10px 0;
  color: #8000ff;
  font-size: 14px;
}

.demo-info ul {
  margin: 0;
  padding-left: 20px;
  font-size: 11px;
  color: #ccc;
}

.demo-info li {
  margin-bottom: 5px;
}

/* 控制面板切换按钮 */
.demo-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  color: #00ffff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 12px;
  z-index: 2000;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.demo-toggle:hover {
  background: rgba(0, 255, 255, 0.2);
  border-color: rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* 激活结果提示 */
.result-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  color: #00ff00;
  text-align: center;
  z-index: 3000;
  backdrop-filter: blur(10px);
  animation: toastAppear 0.5s ease-out;
}

@keyframes toastAppear {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.toast-content h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.toast-content p {
  margin: 5px 0;
  font-size: 14px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .demo-controls {
    width: calc(100vw - 40px);
    max-width: 300px;
  }
  
  .demo-toggle {
    padding: 8px 16px;
    font-size: 11px;
  }
  
  .result-toast {
    width: calc(100vw - 40px);
    max-width: 300px;
  }
}

/* 性能模式CSS变量 */
:root {
  --particle-count: 50;
  --animation-duration: 3s;
}
</style> 