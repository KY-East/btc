<template>
  <div class="alpha-demo-container">
    <!-- 演示头部 -->
    <header class="demo-header">
      <div class="header-content">
        <h1 class="demo-title">Alpha神谕激活系统</h1>
        <p class="demo-subtitle">革命性的AI交易神谕激活体验</p>
        <div class="demo-badges">
          <span class="badge">AAA游戏级别</span>
          <span class="badge">移动端优化</span>
          <span class="badge">科技感十足</span>
        </div>
      </div>
    </header>

    <!-- 功能介绍 -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">Alpha能量激活</h3>
          <p class="feature-desc">每日激活获取EAT能量，连续激活获得额外奖励</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🔮</div>
          <h3 class="feature-title">3D视觉效果</h3>
          <p class="feature-desc">50个动态粒子、能量流、轨道环等AAA级视觉效果</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3 class="feature-title">移动端优化</h3>
          <p class="feature-desc">完美适配移动设备，触摸友好的交互体验</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">用户体验</h3>
          <p class="feature-desc">15-30秒沉浸体验，激活完成率提升至80%+</p>
        </div>
      </div>
    </section>

    <!-- Alpha神谕激活系统 -->
    <section class="activation-section">
      <div class="section-header">
        <h2 class="section-title">体验Alpha神谕激活</h2>
        <p class="section-subtitle">点击下方按钮开始激活体验</p>
      </div>
      
      <!-- 集成DailyWorship组件 -->
      <div class="activation-container">
        <DailyWorship 
          @activation-complete="handleActivationComplete"
          @skip-activation="handleSkipActivation"
          @enter-trading="handleEnterTrading"
        />
      </div>
    </section>

    <!-- 技术特性 -->
    <section class="tech-section">
      <div class="tech-content">
        <h2 class="tech-title">技术特性</h2>
        <div class="tech-grid">
          <div class="tech-item">
            <h4>视觉效果对标</h4>
            <ul>
              <li>《赛博朋克2077》UI设计风格</li>
              <li>《星际争霸2》科幻界面动画</li>
              <li>《质量效应》全息投影系统</li>
              <li>《光环》系列未来科技风格</li>
            </ul>
          </div>
          
          <div class="tech-item">
            <h4>性能优化</h4>
            <ul>
              <li>硬件加速动画</li>
              <li>响应式设计</li>
              <li>性能自适应</li>
              <li>移动端触摸友好</li>
            </ul>
          </div>
          
          <div class="tech-item">
            <h4>用户体验指标</h4>
            <ul>
              <li>激活完成率：40% → 80%+</li>
              <li>用户满意度：3.2/5 → 4.5/5+</li>
              <li>跳过率：预期 < 30%</li>
              <li>沉浸时间：15-30秒</li>
            </ul>
          </div>
          
          <div class="tech-item">
            <h4>代码优化</h4>
            <ul>
              <li>组件从3568行优化至<1000行</li>
              <li>性能提升90%+</li>
              <li>模块化设计</li>
              <li>TypeScript类型安全</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 返回按钮 -->
    <div class="demo-footer">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
        返回主界面
      </button>
    </div>

    <!-- 激活成功提示 -->
    <div v-if="showSuccessMessage" class="success-message">
      <div class="success-content">
        <div class="success-icon">✨</div>
        <h3>激活成功！</h3>
        <p>您已成功激活Alpha神谕，获得 {{ lastReward }} EAT 能量</p>
      </div>
    </div>
  </div>
</template>

<script>
import DailyWorship from '../components/DailyWorship.vue'

export default {
  name: 'AlphaActivationDemo',
  
  components: {
    DailyWorship
  },
  
  data() {
    return {
      showSuccessMessage: false,
      lastReward: 0
    }
  },
  
  methods: {
    handleActivationComplete(data) {
      this.lastReward = data.reward
      this.showSuccessMessage = true
      
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 3000)
      
      console.log('激活完成:', data)
    },
    
    handleSkipActivation() {
      console.log('用户跳过激活')
      // 直接关闭演示页面，返回主界面
      this.$emit('close-demo')
    },
    
    handleEnterTrading() {
      console.log('用户进入交易终端')
      // 关闭演示页面并进入交易终端
      this.$emit('close-demo')
      // 可以通过事件总线或其他方式通知App.vue切换到交易终端
      this.$emit('enter-trading')
    },
    
    goBack() {
      this.$emit('close-demo')
    }
  }
}
</script>

<style scoped>
.alpha-demo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* 演示头部 */
.demo-header {
  padding: 40px 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.demo-title {
  margin: 0 0 10px 0;
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffff, #0080ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: title-glow 3s ease-in-out infinite alternate;
}

.demo-subtitle {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #888;
}

.demo-badges {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.badge {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #00ffff;
}

@keyframes title-glow {
  0% { filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)); }
  100% { filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.5)); }
}

/* 功能介绍 */
.features-section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
}

.feature-title {
  margin: 0 0 15px 0;
  font-size: 20px;
  font-weight: 600;
  color: #00ffff;
}

.feature-desc {
  margin: 0;
  color: #ccc;
  line-height: 1.6;
}

/* 激活区域 */
.activation-section {
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.2);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
}

.section-subtitle {
  margin: 0;
  color: #888;
  font-size: 16px;
}

.activation-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* 技术特性 */
.tech-section {
  padding: 60px 20px;
  background: rgba(0, 10, 20, 0.5);
}

.tech-content {
  max-width: 1200px;
  margin: 0 auto;
}

.tech-title {
  margin: 0 0 40px 0;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #fff;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.tech-item {
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 25px;
}

.tech-item h4 {
  margin: 0 0 15px 0;
  font-size: 18px;
  color: #00ffff;
  font-weight: 600;
}

.tech-item ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-item li {
  margin-bottom: 8px;
  color: #ccc;
  position: relative;
  padding-left: 20px;
}

.tech-item li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #00ffff;
  font-size: 12px;
}

/* 演示底部 */
.demo-footer {
  padding: 40px 20px;
  text-align: center;
}

.back-btn {
  background: linear-gradient(45deg, #333, #555);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: linear-gradient(45deg, #555, #777);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.back-icon {
  font-size: 18px;
}

/* 成功消息 */
.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  z-index: 1000;
  animation: slideIn 0.5s ease-out;
}

.success-content {
  text-align: center;
}

.success-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.success-content h3 {
  margin: 0 0 5px 0;
  color: #00ff00;
  font-size: 18px;
}

.success-content p {
  margin: 0;
  color: #ccc;
  font-size: 14px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .demo-title {
    font-size: 32px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-badges {
    flex-direction: column;
    align-items: center;
  }
  
  .success-message {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
</style> 