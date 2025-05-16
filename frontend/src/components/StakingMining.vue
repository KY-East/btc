<template>
  <div class="staking-mining-container">
    <!-- 质押挖矿主卡片 -->
    <div class="quantum-card main-card">
      <div class="card-header">
        <div class="header-title">量子能量矿池</div>
        <div class="header-tag">Alpha</div>
      </div>
      
      <div class="content-section">
        <div class="quantum-description">
          <div class="description-icon">
            <div class="icon-glow green"></div>
            <span>💎</span>
          </div>
          <div class="description-text">
            <p class="main-text">质押挖矿是EZ Trading的高级功能，让您通过质押EAT获得持续收益</p>
            <p class="sub-text">解锁后，您可以参与各种挖矿池，获得被动收入并享有平台特权</p>
          </div>
        </div>
        
        <!-- 能量池卡片 -->
        <div class="mining-pools">
          <div class="pool-card">
            <div class="pool-header">
              <div class="pool-name">基础能量池</div>
              <div class="pool-tag">低风险</div>
            </div>
            
            <div class="pool-stats">
              <div class="stat-item">
                <div class="stat-value">8.5%</div>
                <div class="stat-label">年化收益率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">1天</div>
                <div class="stat-label">解锁期</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">50 EAT</div>
                <div class="stat-label">最低质押</div>
              </div>
            </div>
            
            <div class="pool-features">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">每日自动收益</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">平台手续费减免5%</div>
              </div>
            </div>
            
            <button class="pool-action-button" disabled>
              <span class="action-text">质押EAT</span>
            </button>
          </div>
          
          <div class="pool-card">
            <div class="pool-header">
              <div class="pool-name">高级能量池</div>
              <div class="pool-tag medium">中等风险</div>
            </div>
            
            <div class="pool-stats">
              <div class="stat-item">
                <div class="stat-value">15.2%</div>
                <div class="stat-label">年化收益率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">7天</div>
                <div class="stat-label">解锁期</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">200 EAT</div>
                <div class="stat-label">最低质押</div>
              </div>
            </div>
            
            <div class="pool-features">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">每日自动收益</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">平台手续费减免15%</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">神谕解锁费用减半</div>
              </div>
            </div>
            
            <button class="pool-action-button" disabled>
              <span class="action-text">质押EAT</span>
            </button>
          </div>
          
          <div class="pool-card">
            <div class="pool-header">
              <div class="pool-name">量子超导池</div>
              <div class="pool-tag high">高风险</div>
            </div>
            
            <div class="pool-stats">
              <div class="stat-item">
                <div class="stat-value">32.8%</div>
                <div class="stat-label">年化收益率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">30天</div>
                <div class="stat-label">解锁期</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">500 EAT</div>
                <div class="stat-label">最低质押</div>
              </div>
            </div>
            
            <div class="pool-features">
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">每日自动收益</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">平台手续费减免30%</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">神谕解锁费用全免</div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div class="feature-text">专属高级跟单设置</div>
              </div>
            </div>
            
            <button class="pool-action-button" disabled>
              <span class="action-text">质押EAT</span>
            </button>
          </div>
        </div>
        
        <!-- 解锁信息 -->
        <div class="unlock-info">
          <div class="lock-icon">🔒</div>
          <div class="unlock-message">解锁质押挖矿需要消耗 <span class="eat-amount">50 EAT</span></div>
          <div class="benefits">
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">获得EAT被动收益</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">享受平台费用折扣</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">优先获取稀有神谕</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-check">✓</div>
              <div class="benefit-text">平台治理投票权重</div>
            </div>
          </div>
          <button class="quantum-unlock-button">
            解锁质押挖矿
          </button>
        </div>
      </div>
    </div>
    
    <!-- 质押挖矿统计卡片 -->
    <div class="quantum-card stats-card">
      <div class="card-header">
        <div class="header-title">质押统计数据</div>
        <div class="locked-tag">未解锁</div>
      </div>
      
      <div class="locked-content">
        <div class="quantum-lock-visual">
          <div class="lock-circle"></div>
          <div class="lock-body"></div>
          <div class="lock-energy green"></div>
        </div>
        <div class="locked-text">解锁后查看质押统计数据</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 没有需要的响应式数据，组件仅展示UI
</script>

<style scoped>
.staking-mining-container {
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
  border-left: 3px solid #0fa;
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

.icon-glow.green {
  background: radial-gradient(circle, rgba(0, 200, 100, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
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

.mining-pools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 10px;
}

.pool-card {
  background: rgba(15, 25, 50, 0.6);
  border-radius: 10px;
  border: 1px solid rgba(0, 100, 200, 0.2);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s;
}

.pool-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 100, 255, 0.2);
}

.pool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.1);
}

.pool-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.pool-tag {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(0, 150, 100, 0.2);
  color: #0fa;
}

.pool-tag.medium {
  background: rgba(150, 150, 0, 0.2);
  color: #ff0;
}

.pool-tag.high {
  background: rgba(150, 50, 50, 0.2);
  color: #f77;
}

.pool-stats {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.4);
}

.stat-label {
  font-size: 0.75rem;
  color: #99a;
}

.pool-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 5px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
  font-size: 0.7rem;
  font-weight: bold;
}

.feature-text {
  font-size: 0.85rem;
  color: #aac;
}

.pool-action-button {
  margin-top: 10px;
  padding: 8px;
  background: linear-gradient(90deg, #024a7a, #059de6);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: not-allowed;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
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
  margin-top: 10px;
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

.stats-card {
  min-height: 200px;
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

.lock-energy.green {
  background: radial-gradient(circle, rgba(0, 255, 100, 0.9) 0%, rgba(0, 150, 50, 0.2) 70%);
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