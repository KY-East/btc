<template>
  <div class="trading-dashboard">
    <!-- 统一顶部导航 -->
    <TopNavigation 
      :page-title="currentPageTitle"
      :page-subtitle="currentPageSubtitle" 
      :show-back-button="showBackButton"
      :user-balance="userBalance"
      :user-name="userName"
      @go-back="handleGoBack"
      @go-home="goToHome"
      @go-to-profile="goToProfile"
      @go-to-settings="goToSettings"
      @logout="logout"
    />

    <!-- 主要内容区域 -->
    <div class="dashboard-main">
      <!-- Alpha神谕激活区域 -->
      <div v-if="showAlphaActivation" class="alpha-activation-section">
        <DailyWorship 
          @activation-complete="handleActivationComplete"
          @skip-activation="handleSkipActivation"
        />
        </div>
        
      <!-- 质押挖矿页面 -->
      <div v-else-if="currentTab === 'staking'" class="staking-section">
        <StakingMining />
        </div>

      <!-- 邀请好友页面 -->
      <div v-else-if="currentTab === 'invite'" class="invite-section">
        <InviteFriends />
          </div>
        
      <!-- 个人资料页面 -->
      <div v-else-if="currentTab === 'profile'" class="profile-section">
        <div class="profile-placeholder">
          <h2>个人中心</h2>
          <p>个人资料和设置页面开发中...</p>
          </div>
          </div>
        
      <!-- 资产页面 -->
      <div v-else-if="currentTab === 'portfolio'" class="portfolio-section">
        <div class="portfolio-placeholder">
          <h2>我的资产</h2>
          <p>资产管理页面开发中...</p>
          </div>
        </div>
        
      <!-- 主要功能卡片 -->
      <div v-else class="feature-cards">
        <!-- 今日神谕卡片 -->
        <div class="feature-card oracle-card" @click="navigateTo('oracle')">
          <div class="card-header">
            <div class="card-icon oracle">🔮</div>
            <h3>今日神谕</h3>
            <div class="status-badge active">在线</div>
          </div>
          <div class="card-content">
            <p class="oracle-preview">{{ todayOracle.preview }}</p>
            <div class="oracle-meta">
              <span class="confidence">置信度: {{ todayOracle.confidence }}%</span>
              <span class="timestamp">{{ todayOracle.time }}</span>
          </div>
              </div>
          <div class="card-action">
                <span>查看详情</span>
            <span class="arrow">→</span>
            </div>
          </div>
          
        <!-- AI解币实验室 -->
        <div class="feature-card ai-lab-card" @click="navigateTo('ai-lab')">
          <div class="card-header">
            <div class="card-icon ai">🧠</div>
            <h3>AI解币实验室</h3>
            <div class="cost-badge">2 Alpha</div>
            </div>
          <div class="card-content">
            <p>投入Alpha能量，启动AI深度分析</p>
            <div class="features-list">
              <span>• 全维度币种解析</span>
              <span>• 智能评分预测</span>
              <span>• 关键信号标记</span>
              </div>
              </div>
          <div class="card-action">
            <span>启动分析</span>
            <span class="arrow">→</span>
            </div>
          </div>
          
        <!-- 一键跟单 -->
        <div class="feature-card follow-card" @click="navigateTo('follow')">
          <div class="card-header">
            <div class="card-icon follow">🚀</div>
            <h3>一键跟单</h3>
            <div class="cost-badge">3 Alpha</div>
            </div>
          <div class="card-content">
            <p>科技执行舱自动交易</p>
            <div class="stats">
              <div class="stat">
                <span class="label">今日收益</span>
                <span class="value positive">+12.5%</span>
              </div>
              <div class="stat">
                <span class="label">跟单用户</span>
                <span class="value">1,247</span>
              </div>
                </div>
              </div>
          <div class="card-action">
            <span>开始跟单</span>
            <span class="arrow">→</span>
            </div>
          </div>
          
        <!-- 质押挖矿 -->
        <div class="feature-card staking-card" @click="navigateTo('staking')">
          <div class="card-header">
            <div class="card-icon staking">💎</div>
            <h3>质押挖矿</h3>
            <div class="apy-badge">年化25%</div>
            </div>
          <div class="card-content">
            <p>质押EAT获得被动收益和平台特权</p>
            <div class="staking-stats">
              <div class="stat">
                <span class="label">已质押</span>
                <span class="value">{{ userStaking.amount }} EAT</span>
              </div>
              <div class="stat">
                <span class="label">等级</span>
                <span class="value tier">{{ userStaking.tierName }}</span>
              </div>
                </div>
              </div>
          <div class="card-action">
            <span>{{ userStaking.amount > 0 ? '管理质押' : '开始质押' }}</span>
            <span class="arrow">→</span>
            </div>
          </div>
          
        <!-- 裂变邀请 -->
        <div class="feature-card invite-card" @click="navigateTo('invite')">
            <div class="card-header">
            <div class="card-icon invite">👥</div>
            <h3>核能裂变</h3>
            <div class="reward-badge">+{{ inviteReward }} EAT/人</div>
            </div>
          <div class="card-content">
            <p>邀请好友注册，获得丰厚EAT奖励</p>
            <div class="invite-stats">
              <div class="stat">
                <span class="label">已邀请</span>
                <span class="value">{{ userInvite.count }}人</span>
                  </div>
              <div class="stat">
                <span class="label">累计奖励</span>
                <span class="value positive">{{ userInvite.totalReward }} EAT</span>
                    </div>
                    </div>
                    </div>
          <div class="card-action">
            <span>邀请好友</span>
            <span class="arrow">→</span>
                  </div>
                </div>
                
        <!-- Alpha神谕激活 -->
        <div class="feature-card activation-card" @click="startAlphaActivation">
            <div class="card-header">
            <div class="card-icon activation">⚡</div>
            <h3>Alpha神谕激活</h3>
            <div class="reward-badge">+{{ dailyReward }} EAT</div>
            </div>
          <div class="card-content">
            <p>每日激活Alpha神谕获取EAT能量</p>
            <div class="activation-status">
              <div class="status-indicator" :class="activationStatus"></div>
              <span>{{ activationStatusText }}</span>
                  </div>
                  </div>
          <div class="card-action">
            <span>{{ canActivate ? '立即激活' : '已激活' }}</span>
            <span class="arrow">{{ canActivate ? '→' : '✓' }}</span>
                  </div>
                </div>
              </div>
              
      <!-- 快速操作栏 -->
      <div v-if="currentTab === 'home'" class="quick-actions">
        <button class="quick-btn" @click="navigateTo('staking')">
          <span class="btn-icon">💎</span>
          <span class="btn-text">质押挖矿</span>
                  </button>
        <button class="quick-btn" @click="navigateTo('invite')">
          <span class="btn-icon">👥</span>
          <span class="btn-text">邀请好友</span>
                </button>
        <button class="quick-btn" @click="navigateTo('exchange')">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">兑换Alpha</span>
                </button>
        <button class="quick-btn" @click="navigateTo('buy-eat')">
          <span class="btn-icon">💰</span>
          <span class="btn-text">购买EAT</span>
                </button>
              </div>
            </div>
            
    <!-- 底部导航 -->
    <nav class="bottom-nav">
      <div class="nav-item" :class="{ active: currentTab === 'home' }" @click="currentTab = 'home'">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">首页</span>
              </div>
      <div class="nav-item" :class="{ active: currentTab === 'staking' }" @click="currentTab = 'staking'">
        <span class="nav-icon">💎</span>
        <span class="nav-label">质押</span>
              </div>
      <div class="nav-item" :class="{ active: currentTab === 'invite' }" @click="currentTab = 'invite'">
        <span class="nav-icon">👥</span>
        <span class="nav-label">邀请</span>
            </div>
      <div class="nav-item" :class="{ active: currentTab === 'portfolio' }" @click="currentTab = 'portfolio'">
        <span class="nav-icon">💼</span>
        <span class="nav-label">资产</span>
          </div>
      <div class="nav-item" :class="{ active: currentTab === 'profile' }" @click="currentTab = 'profile'">
        <span class="nav-icon">👤</span>
        <span class="nav-label">我的</span>
        </div>
    </nav>
            </div>
          </template>

<script>
import DailyWorship from './DailyWorship.vue'
import StakingMining from './StakingMining.vue'
import InviteFriends from './InviteFriends.vue'
import TopNavigation from './TopNavigation.vue'

export default {
  name: 'TradingDashboard',
  components: {
    DailyWorship,
    StakingMining,
    InviteFriends,
    TopNavigation
  },
  
  data() {
    return {
      currentTab: 'home',
      showProfile: false,
      showAlphaActivation: false,
      
      // 用户数据
      userBalance: {
        eat: 125.50,
        alphaPoints: 340
      },
      userName: 'Crypto Trader',
      userEmail: 'trader@example.com',
      
      // 今日神谕数据
      todayOracle: {
        preview: 'BTC看涨，建议逢低买入',
        confidence: 85,
        time: '09:30'
      },
      
      // 激活状态
      canActivate: true,
      dailyReward: 5,
      activationStatus: 'ready', // ready, activated, cooldown
      
      // 质押数据
      userStaking: {
        amount: 0,
        tier: 'none',
        tierName: '未质押'
      },
      
      // 邀请数据
      inviteReward: 2,
      userInvite: {
        count: 0,
        totalReward: 0
      },
      
      // TopNavigation
      currentPageTitle: '交易仪表盘',
      currentPageSubtitle: '您的交易和投资中心',
      showBackButton: false,
      currentPage: 'home'
    }
  },
  
  computed: {
    userInitial() {
      return this.userName.charAt(0).toUpperCase()
    },
    
    activationStatusText() {
      switch (this.activationStatus) {
        case 'ready': return '准备激活'
        case 'activated': return '今日已激活'
        case 'cooldown': return '冷却中'
        default: return '准备激活'
      }
    },
    
    // 动态页面标题
    currentPageTitle() {
      const titles = {
        'home': 'EZ Trading',
        'staking': '质押挖矿',
        'invite': '邀请好友',
        'profile': '个人中心',
        'portfolio': '我的资产',
        'settings': '设置'
      }
      return titles[this.currentTab] || 'EZ Trading'
    },
    
    // 动态页面副标题
    currentPageSubtitle() {
      const subtitles = {
        'home': 'AI交易神谕终端',
        'staking': '质押EAT获得被动收益',
        'invite': '邀请好友获得EAT奖励',
        'profile': '管理您的账户信息',
        'portfolio': '查看您的投资组合',
        'settings': '个性化设置'
      }
      return subtitles[this.currentTab] || ''
    },
    
    // 是否显示返回按钮
    showBackButton() {
      return this.currentTab !== 'home'
    }
  },
  
  methods: {
    navigateTo(page) {
      console.log('导航到:', page)
      
      // 处理特殊页面导航
      if (page === 'staking') {
        this.currentTab = 'staking'
      } else if (page === 'invite') {
        this.currentTab = 'invite'
      } else if (page === 'portfolio') {
        this.currentTab = 'portfolio'
      } else if (page === 'profile') {
        this.currentTab = 'profile'
      } else {
        // 其他页面的处理逻辑
        console.log('导航到其他页面:', page)
      }
    },
    
    startAlphaActivation() {
      if (this.canActivate) {
        this.showAlphaActivation = true
      }
    },
    
    handleActivationComplete(result) {
      console.log('激活完成:', result)
      this.showAlphaActivation = false
      this.canActivate = false
      this.activationStatus = 'activated'
      this.userBalance.eat += result.reward
      
      // 显示成功提示
      this.$emit('show-toast', {
        type: 'success',
        message: `激活成功！获得 ${result.reward} EAT`
      })
    },
    
    handleSkipActivation() {
      this.showAlphaActivation = false
    },
    
    logout() {
      this.showProfile = false
      this.$emit('logout')
    },
    
    handleGoBack() {
      // 从任何子页面返回到首页
      this.currentTab = 'home'
    },
    
    goToHome() {
      console.log('首页按钮点击')
      this.currentTab = 'home'
    },
    
    goToProfile() {
      console.log('个人中心按钮点击')
      this.currentTab = 'profile'
    },
    
    goToSettings() {
      console.log('设置按钮点击')
      this.currentTab = 'settings'
    }
  }
}
</script>

<style scoped>
.trading-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* 主要内容区域 */
.dashboard-main {
  padding: 20px;
  padding-bottom: 100px; /* 为底部导航留空间 */
}

.alpha-activation-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

/* 占位页面样式 */
.profile-placeholder,
.portfolio-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.profile-placeholder h2,
.portfolio-placeholder h2 {
  margin: 0 0 15px 0;
  font-size: 24px;
  color: #00ffff;
}

.profile-placeholder p,
.portfolio-placeholder p {
  margin: 0;
  color: #ccc;
  font-size: 16px;
}

/* 功能卡片 */
.feature-cards {
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
}

.card-icon.oracle {
  background: linear-gradient(45deg, #8000ff, #4000ff);
}

.card-icon.ai {
  background: linear-gradient(45deg, #00ff80, #00ff40);
}

.card-icon.follow {
  background: linear-gradient(45deg, #ff6b6b, #ff4757);
}

.card-icon.activation {
  background: linear-gradient(45deg, #ffa500, #ff8c00);
}

.status-badge, .cost-badge, .reward-badge {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
}

.cost-badge {
  background: rgba(0, 255, 255, 0.2);
  color: #00ffff;
}

.reward-badge {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
}

.card-content {
  margin-bottom: 15px;
}

.card-content p {
  margin: 0 0 10px 0;
  color: #ccc;
  font-size: 14px;
}

.oracle-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
}

.confidence {
  color: #00ff00;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #aaa;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat .label {
  font-size: 10px;
  color: #888;
}

.stat .value {
  font-size: 14px;
  font-weight: 600;
}

.stat .value.positive {
  color: #00ff00;
}

.activation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator.ready {
  background: #00ff00;
  animation: pulse 2s infinite;
}

.status-indicator.activated {
  background: #888;
}

.card-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00ffff;
  font-size: 14px;
  font-weight: 500;
}

/* 快速操作栏 */
.quick-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.quick-btn {
    flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.quick-btn:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 10px;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  padding: 10px 0;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
}

.nav-item.active {
  color: #00ffff;
}

.nav-item.active .nav-icon {
  transform: scale(1.2);
}

.nav-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
}

/* 个人资料弹窗 */
.profile-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.profile-content {
  background: rgba(0, 20, 40, 0.95);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 300px;
  backdrop-filter: blur(20px);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 24px;
}

.profile-info h3 {
  margin: 0;
  font-size: 18px;
}

.profile-info p {
  margin: 4px 0 0 0;
  color: #888;
  font-size: 14px;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-action {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.profile-action:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
}

/* 动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 特殊卡片样式 */
.staking-card {
  border-color: rgba(255, 215, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%);
}

.staking-card:hover {
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
}

.invite-card {
  border-color: rgba(138, 43, 226, 0.3);
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05) 0%, rgba(75, 0, 130, 0.05) 100%);
}

.invite-card:hover {
  border-color: rgba(138, 43, 226, 0.5);
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.2);
}

.apy-badge {
  background: linear-gradient(45deg, #ffd700, #ffa500);
  color: #000;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
}

.staking-stats, .invite-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.value.tier {
  color: #ffd700;
  font-weight: 600;
}

/* 组件区域样式 */
.staking-section,
.invite-section {
  width: 100%;
  min-height: calc(100vh - 140px);
  padding-bottom: 20px;
}
</style> 