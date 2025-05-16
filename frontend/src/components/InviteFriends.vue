<template>
  <div class="invite-friends-container">
    <!-- 个人邀请状态区 -->
    <div class="invite-status-card">
      <div class="card-header">
        <div class="header-title">核能裂变计划</div>
        <div class="energy-status">已激活</div>
      </div>
      
      <div class="current-level-display">
        <div class="level-icon" :class="currentLevelClass">
          <div class="level-effect"></div>
          <div class="level-symbol">{{ currentLevelSymbol }}</div>
        </div>
        <div class="level-info">
          <div class="level-name">{{ currentLevel }}级</div>
          <div class="level-progress">
            <div class="progress-text">已邀请 <span class="highlight">{{ invitedCount }}</span> 人</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
              <div class="progress-energy"></div>
            </div>
            <div class="progress-target">距离 {{ nextLevel }}级 还需邀请 {{ remainingInvites }} 人</div>
          </div>
        </div>
      </div>
      
      <div class="total-rewards">
        <div class="rewards-label">累计获得EAT</div>
        <div class="rewards-value">{{ totalEarned }} <span class="token-name">EAT</span></div>
        <div class="rewards-particles"></div>
      </div>
    </div>
    
    <!-- 邀请链接/二维码区 -->
    <div class="invite-code-card">
      <div class="invite-code-section">
        <div class="section-label">我的邀请链接</div>
        <div class="code-display">
          <div class="code-value">{{ inviteCode }}</div>
          <button class="copy-btn" @click="copyInviteCode">
            <span class="btn-icon">📋</span>
            <span class="btn-text">复制</span>
          </button>
        </div>
        <div class="link-note">分享链接给好友，好友注册即可获得奖励</div>
      </div>
      
      <div class="qr-section">
        <div class="qr-wrapper">
          <div class="qr-placeholder"></div>
          <div class="qr-energy-frame"></div>
        </div>
        <button class="action-btn" @click="generatePoster">
          <span class="btn-icon">🖼️</span>
          <span class="btn-text">生成海报</span>
        </button>
      </div>
    </div>
    
    <!-- 等级权益展示区 -->
    <div class="level-benefits-card">
      <div class="card-header">
        <div class="header-title">核能等级特权</div>
        <button class="more-btn" @click="toggleBenefitDetails">
          <span class="btn-text">{{ showBenefitDetails ? '收起' : '详情' }}</span>
          <span class="btn-icon">{{ showBenefitDetails ? '▲' : '▼' }}</span>
        </button>
      </div>
      
      <div class="levels-overview">
        <div class="level-item" 
          v-for="(level, index) in levels" 
          :key="index"
          :class="{ 'active': currentLevelIndex >= index, 'current': currentLevelIndex === index }">
          <div class="level-icon" :class="'level-' + level.name.toLowerCase()">
            <div class="icon-symbol">{{ level.symbol }}</div>
            <div class="icon-effect" :class="'effect-' + level.name.toLowerCase()"></div>
          </div>
          <div class="level-name">{{ level.name }}级</div>
          <div class="required-invites">{{ level.requirement }}人</div>
        </div>
      </div>
      
      <div class="benefit-details" v-if="showBenefitDetails">
        <div class="benefit-item" v-for="(level, index) in levels" :key="'benefit-' + index">
          <div class="benefit-header">
            <div class="level-name">{{ level.name }}级 ({{ level.requirement }}人)</div>
            <div class="level-status" :class="{ 'achieved': currentLevelIndex >= index }">
              {{ currentLevelIndex >= index ? '已解锁' : '未解锁' }}
            </div>
          </div>
          <div class="benefit-list">
            <div class="benefit-point" v-for="(benefit, bIndex) in level.benefits" :key="bIndex">
              <div class="point-icon"></div>
              <div class="point-text">{{ benefit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 邀请记录区 -->
    <div class="invite-records-card">
      <div class="card-header">
        <div class="header-title">邀请记录</div>
        <div class="record-count">共 {{ inviteRecords.length }} 条</div>
      </div>
      
      <div class="records-table">
        <div class="table-header">
          <div class="header-cell user">用户</div>
          <div class="header-cell time">时间</div>
          <div class="header-cell reward">奖励</div>
          <div class="header-cell level">级别</div>
        </div>
        
        <div class="table-body">
          <div class="record-item" v-for="(record, index) in inviteRecords" :key="index">
            <div class="cell user">
              <div class="user-avatar"></div>
              <div class="user-info">
                <div class="username">{{ record.username }}</div>
                <div class="wallet">{{ record.wallet }}</div>
              </div>
            </div>
            <div class="cell time">{{ record.time }}</div>
            <div class="cell reward">{{ record.reward }} EAT</div>
            <div class="cell level">{{ record.level }}</div>
          </div>
        </div>
      </div>
      
      <div class="table-footer" v-if="inviteRecords.length > 0">
        <button class="load-more-btn" @click="loadMoreRecords">
          <span class="btn-text">查看更多</span>
          <span class="btn-icon">▼</span>
        </button>
      </div>
      
      <div class="no-records" v-else>
        <div class="empty-icon"></div>
        <div class="empty-text">暂无邀请记录，赶快分享邀请链接吧！</div>
      </div>
    </div>
    
    <!-- 排行榜区域 -->
    <div class="leaderboard-card">
      <div class="card-header">
        <div class="header-title">裂变能量排行</div>
        <div class="ranking-period">
          <button class="period-btn active">日榜</button>
          <button class="period-btn">周榜</button>
          <button class="period-btn">总榜</button>
        </div>
      </div>
      
      <div class="leaderboard-top3">
        <div class="top-user second">
          <div class="position-icon">2</div>
          <div class="user-avatar"></div>
          <div class="user-name">用户8264</div>
          <div class="invite-count">32人</div>
        </div>
        
        <div class="top-user first">
          <div class="position-icon">1</div>
          <div class="crown-effect"></div>
          <div class="user-avatar"></div>
          <div class="user-name">用户1024</div>
          <div class="invite-count">56人</div>
        </div>
        
        <div class="top-user third">
          <div class="position-icon">3</div>
          <div class="user-avatar"></div>
          <div class="user-name">用户7722</div>
          <div class="invite-count">28人</div>
        </div>
      </div>
      
      <div class="leaderboard-list">
        <div class="list-item" v-for="(user, index) in topUsers" :key="index">
          <div class="position">{{ index + 4 }}</div>
          <div class="user-info">
            <div class="user-avatar"></div>
            <div class="user-name">{{ user.name }}</div>
          </div>
          <div class="invite-count">{{ user.count }}人</div>
        </div>
      </div>
      
      <div class="my-ranking">
        <div class="position">{{ myRanking.position }}</div>
        <div class="user-info">
          <div class="my-avatar"></div>
          <div class="label">我的排名</div>
        </div>
        <div class="invite-count">{{ myRanking.count }}人</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InviteFriends',
  data() {
    return {
      inviteCode: 'EZTENERGY7788',
      invitedCount: 12,
      totalEarned: 78.5,
      showBenefitDetails: false,
      
      levels: [
        { 
          name: '夸克', 
          symbol: '⚛',
          requirement: 1, 
          benefits: ['基础邀请权限', '每个邀请奖励5 EAT', '二级邀请奖励2 EAT'] 
        },
        { 
          name: '原子', 
          symbol: '⚛',
          requirement: 6, 
          benefits: ['每日EAT领取量翻倍', '获得专属头像框', '邀请奖励增加到6 EAT/人'] 
        },
        { 
          name: '分子', 
          symbol: '⚛',
          requirement: 21, 
          benefits: ['NAV增长5%额外分成', '核能特效徽章', '解锁高级分析功能'] 
        },
        { 
          name: '裂变', 
          symbol: '⚛',
          requirement: 51, 
          benefits: ['每日自动获得0.5 EAT', '专属VIP客服', '平台新功能提前体验'] 
        },
        { 
          name: '聚变', 
          symbol: '⚛',
          requirement: 101, 
          benefits: ['获得平台治理投票权', '实物周边礼包', '社区活动优先参与权'] 
        }
      ],
      
      inviteRecords: [
        { username: '用户7629', wallet: '0x78...3F', time: '2小时前', reward: 5, level: '直接' },
        { username: '用户2845', wallet: '0x94...2A', time: '6小时前', reward: 2, level: '二级' },
        { username: '用户9012', wallet: '0x32...8C', time: '1天前', reward: 5, level: '直接' },
        { username: '用户3457', wallet: '0x67...1D', time: '2天前', reward: 0.5, level: '三级' },
        { username: '用户6280', wallet: '0x41...9E', time: '3天前', reward: 5, level: '直接' }
      ],
      
      topUsers: [
        { name: '用户4399', count: 26 },
        { name: '用户8848', count: 24 },
        { name: '用户1357', count: 21 },
        { name: '用户2468', count: 20 },
        { name: '用户9527', count: 19 }
      ],
      
      myRanking: { position: 12, count: 12 }
    }
  },
  
  computed: {
    currentLevelIndex() {
      for (let i = this.levels.length - 1; i >= 0; i--) {
        if (this.invitedCount >= this.levels[i].requirement) {
          return i;
        }
      }
      return 0;
    },
    
    currentLevel() {
      return this.levels[this.currentLevelIndex].name;
    },
    
    currentLevelSymbol() {
      return this.levels[this.currentLevelIndex].symbol;
    },
    
    currentLevelClass() {
      return 'level-' + this.currentLevel.toLowerCase();
    },
    
    nextLevel() {
      return this.currentLevelIndex < this.levels.length - 1 
        ? this.levels[this.currentLevelIndex + 1].name 
        : this.currentLevel;
    },
    
    nextLevelRequirement() {
      return this.currentLevelIndex < this.levels.length - 1 
        ? this.levels[this.currentLevelIndex + 1].requirement 
        : this.levels[this.currentLevelIndex].requirement;
    },
    
    remainingInvites() {
      return this.currentLevelIndex < this.levels.length - 1 
        ? this.nextLevelRequirement - this.invitedCount 
        : 0;
    },
    
    progressPercentage() {
      if (this.currentLevelIndex >= this.levels.length - 1) {
        return 100;
      }
      
      const currentMin = this.levels[this.currentLevelIndex].requirement;
      const nextMin = this.nextLevelRequirement;
      const range = nextMin - currentMin;
      const progress = this.invitedCount - currentMin;
      
      return Math.min(100, Math.floor((progress / range) * 100));
    }
  },
  
  methods: {
    copyInviteCode() {
      navigator.clipboard.writeText(this.inviteCode)
        .then(() => {
          // 可以添加复制成功的提示
          console.log('邀请码已复制');
        })
        .catch(err => {
          console.error('复制失败: ', err);
        });
    },
    
    generatePoster() {
      // 生成海报的逻辑，可以使用html2canvas等库
      console.log('生成邀请海报');
    },
    
    toggleBenefitDetails() {
      this.showBenefitDetails = !this.showBenefitDetails;
    },
    
    loadMoreRecords() {
      // 加载更多邀请记录
      console.log('加载更多记录');
    }
  }
}
</script>

<style scoped>
.invite-friends-container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #e6e6ff;
}

/* 卡片通用样式 */
.invite-status-card,
.invite-code-card,
.level-benefits-card,
.invite-records-card,
.leaderboard-card {
  background: rgba(22, 28, 47, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(64, 110, 215, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px rgba(56, 114, 255, 0.1);
  overflow: hidden;
  padding: 20px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(64, 110, 215, 0.3);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.energy-status {
  font-size: 14px;
  padding: 4px 10px;
  background: rgba(56, 168, 255, 0.2);
  border-radius: 20px;
  color: #38a8ff;
}

/* 当前等级显示区样式 */
.current-level-display {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.level-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: relative;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.level-夸克 {
  background: linear-gradient(135deg, #3b4b9b, #2a2c5e);
}

.level-原子 {
  background: linear-gradient(135deg, #3483b8, #225883);
}

.level-分子 {
  background: linear-gradient(135deg, #24a085, #176954);
}

.level-裂变 {
  background: linear-gradient(135deg, #e67e22, #a25516);
}

.level-聚变 {
  background: linear-gradient(135deg, #e74c3c, #a33228);
}

.level-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  animation: pulse 2s infinite;
}

.level-symbol {
  font-size: 28px;
  color: #fff;
  z-index: 1;
}

.level-info {
  flex: 1;
}

.level-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.level-progress {
  width: 100%;
}

.progress-text {
  font-size: 14px;
  margin-bottom: 5px;
}

.highlight {
  color: #38a8ff;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #38a8ff, #2973e8);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-energy {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 168, 255, 0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

.progress-target {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.total-rewards {
  background: rgba(16, 20, 40, 0.7);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.rewards-label {
  font-size: 14px;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.7);
}

.rewards-value {
  font-size: 24px;
  font-weight: 700;
  color: #ffac2f;
}

.token-name {
  font-size: 16px;
  font-weight: normal;
}

.rewards-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255, 172, 47, 0.2) 1px, transparent 1px);
  background-size: 16px 16px;
  pointer-events: none;
  opacity: 0.3;
}

/* 邀请链接区样式 */
.invite-code-card {
  display: flex;
  justify-content: space-between;
}

.invite-code-section {
  flex: 1;
  padding-right: 20px;
}

.section-label {
  font-size: 16px;
  margin-bottom: 10px;
}

.code-display {
  display: flex;
  align-items: center;
  background: rgba(16, 20, 40, 0.7);
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.code-value {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  letter-spacing: 1px;
  color: #ffac2f;
}

.copy-btn {
  background: rgba(56, 168, 255, 0.2);
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  color: #38a8ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(56, 168, 255, 0.3);
}

.link-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-wrapper {
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 10px;
}

.qr-placeholder {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
}

.qr-energy-frame {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 1px solid rgba(56, 168, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(56, 168, 255, 0.3);
  pointer-events: none;
}

.action-btn {
  background: rgba(16, 20, 40, 0.7);
  border: 1px solid rgba(56, 168, 255, 0.3);
  border-radius: 6px;
  padding: 6px 12px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(16, 20, 40, 0.9);
  border-color: rgba(56, 168, 255, 0.5);
}

/* 等级权益展示区样式 */
.levels-overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.level-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 18%;
  opacity: 0.6;
  transition: all 0.3s;
}

.level-item::after {
  content: '';
  position: absolute;
  top: 15px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: rgba(64, 110, 215, 0.3);
  z-index: 0;
}

.level-item:last-child::after {
  display: none;
}

.level-item.active {
  opacity: 1;
}

.level-item.current {
  transform: scale(1.1);
}

.level-item.active .icon-effect {
  animation: pulse 2s infinite;
}

.level-item .level-icon {
  margin-right: 0;
  margin-bottom: 10px;
  width: 40px;
  height: 40px;
  z-index: 1;
}

.level-item .icon-symbol {
  font-size: 18px;
}

.level-item .level-name {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: center;
}

.required-invites {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.benefit-details {
  margin-top: 20px;
  border-top: 1px dashed rgba(64, 110, 215, 0.3);
  padding-top: 15px;
}

.benefit-item {
  margin-bottom: 15px;
}

.benefit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.benefit-header .level-name {
  font-size: 16px;
  margin-bottom: 0;
}

.level-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.level-status.achieved {
  background: rgba(56, 168, 255, 0.2);
  color: #38a8ff;
}

.benefit-list {
  padding-left: 10px;
}

.benefit-point {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.point-icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38a8ff;
  margin-right: 10px;
}

.point-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 邀请记录区样式 */
.records-table {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  background: rgba(16, 20, 40, 0.5);
}

.table-header {
  display: flex;
  background: rgba(16, 20, 40, 0.8);
  padding: 10px 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.header-cell, .cell {
  text-align: left;
}

.header-cell.user, .cell.user {
  flex: 2;
}

.header-cell.time, .cell.time,
.header-cell.reward, .cell.reward,
.header-cell.level, .cell.level {
  flex: 1;
}

.table-body {
  max-height: 300px;
  overflow-y: auto;
}

.record-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.record-item:last-child {
  border-bottom: none;
}

.cell.user {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(56, 168, 255, 0.2);
  margin-right: 10px;
}

.user-info .username {
  font-size: 14px;
  margin-bottom: 2px;
}

.user-info .wallet {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.cell.reward {
  color: #ffac2f;
  font-weight: 600;
}

.table-footer {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.load-more-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.load-more-btn:hover {
  color: #fff;
}

.no-records {
  text-align: center;
  padding: 30px 0;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  margin: 0 auto 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

/* 排行榜区域样式 */
.ranking-period {
  display: flex;
  gap: 8px;
}

.period-btn {
  background: rgba(16, 20, 40, 0.5);
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.period-btn.active {
  background: rgba(56, 168, 255, 0.2);
  color: #38a8ff;
}

.leaderboard-top3 {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 30px;
  padding: 0 10%;
}

.top-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 33.33%;
}

.top-user.first {
  transform: scale(1.2);
  z-index: 2;
}

.position-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffac2f;
  color: #000;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

.top-user.first .position-icon {
  background: linear-gradient(135deg, #ffac2f, #ff7730);
}

.top-user.second .position-icon {
  background: linear-gradient(135deg, #e0e0e0, #b0b0b0);
}

.top-user.third .position-icon {
  background: linear-gradient(135deg, #cd7f32, #8c5523);
}

.crown-effect {
  position: absolute;
  top: -20px;
  width: 32px;
  height: 16px;
  background: linear-gradient(135deg, #ffac2f, #ff7730);
  clip-path: polygon(50% 0%, 100% 100%, 85% 100%, 50% 30%, 15% 100%, 0% 100%);
}

.top-user .user-avatar {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
}

.top-user.first .user-avatar {
  width: 60px;
  height: 60px;
  border: 2px solid #ffac2f;
}

.top-user .user-name {
  font-size: 14px;
  margin-bottom: 5px;
  color: #fff;
}

.top-user .invite-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.top-user.first .invite-count {
  color: #ffac2f;
  font-weight: 600;
}

.leaderboard-list {
  margin-bottom: 20px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.list-item:last-child {
  border-bottom: none;
}

.list-item .position {
  width: 30px;
  text-align: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.list-item .user-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.list-item .user-avatar {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.list-item .user-name {
  font-size: 14px;
}

.list-item .invite-count {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.my-ranking {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: rgba(56, 168, 255, 0.1);
  border-radius: 8px;
  margin-top: 15px;
}

.my-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(56, 168, 255, 0.3);
  margin-right: 10px;
}

.my-ranking .position {
  width: 30px;
  text-align: center;
  font-weight: 600;
  color: #38a8ff;
}

.my-ranking .label {
  font-size: 14px;
  color: #38a8ff;
}

/* 动画效果 */
@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style> 