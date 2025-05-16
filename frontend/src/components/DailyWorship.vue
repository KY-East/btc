<template>
  <div class="daily-worship-container">
    <div class="shrine-card">
      <div class="card-header">
        <div class="header-title">能量朝拜仪式</div>
        <div class="ritual-status" :class="{ 'active': !hasWorshipped }">{{ hasWorshipped ? '今日已完成' : '可领取' }}</div>
      </div>
      
      <div class="shrine-content">
        <div class="shrine-visual">
          <div class="shrine-core" :class="{ 'active': !hasWorshipped }" @click="performWorship">
            <div class="core-symbol">⚛</div>
            <div class="core-rings" v-if="!hasWorshipped">
              <div class="ring ring1"></div>
              <div class="ring ring2"></div>
              <div class="ring ring3"></div>
            </div>
            <div class="core-particles"></div>
          </div>
          
          <div class="worship-prompt" v-if="!hasWorshipped">
            <div class="prompt-text">点击核心进行能量朝拜</div>
            <div class="prompt-arrow">⬆</div>
          </div>
          
          <div class="worship-complete" v-else>
            <div class="complete-text">今日能量已获取</div>
            <div class="next-available">
              下次朝拜: <span class="time-value">{{ nextWorshipTime }}</span>
            </div>
          </div>
        </div>
        
        <div class="reward-display">
          <div class="reward-title">每日能量奖励</div>
          <div class="reward-value">
            <span class="value">1.0</span>
            <span class="token">EAT</span>
          </div>
          <div class="reward-note">连续朝拜 {{ consecutiveDays }} 天</div>
          
          <div class="streak-bonus" v-if="consecutiveDays >= 7">
            <div class="bonus-label">7日连续朝拜奖励</div>
            <div class="bonus-value">+0.5 EAT</div>
          </div>
        </div>
      </div>
      
      <div class="ritual-stats">
        <div class="stat-item">
          <div class="stat-value">{{ totalEarned }}</div>
          <div class="stat-label">总计获得EAT</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ consecutiveDays }}</div>
          <div class="stat-label">连续朝拜天数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ maxStreakDays }}</div>
          <div class="stat-label">最长连续天数</div>
        </div>
      </div>
    </div>
    
    <div class="calendar-card">
      <div class="card-header">
        <div class="header-title">朝拜日历</div>
        <div class="month-nav">
          <button class="month-btn" @click="previousMonth">◀</button>
          <div class="current-month">{{ currentMonthDisplay }}</div>
          <button class="month-btn" @click="nextMonth">▶</button>
        </div>
      </div>
      
      <div class="calendar-grid">
        <div class="weekday-header" v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">
          {{ day }}
        </div>
        
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="calendar-day"
          :class="{
            'empty': !day.date,
            'completed': day.worshipped,
            'today': day.isToday,
            'future': day.isFuture
          }"
        >
          <template v-if="day.date">
            <div class="day-number">{{ day.date.getDate() }}</div>
            <div class="day-indicator" v-if="day.worshipped">✓</div>
          </template>
        </div>
      </div>
      
      <div class="calendar-footer">
        <div class="legend-item">
          <div class="legend-color completed"></div>
          <div class="legend-text">已朝拜</div>
        </div>
        <div class="legend-item">
          <div class="legend-color today"></div>
          <div class="legend-text">今日</div>
        </div>
        <div class="legend-item">
          <div class="legend-color missed"></div>
          <div class="legend-text">未朝拜</div>
        </div>
      </div>
    </div>
    
    <div class="bonus-tiers-card">
      <div class="card-header">
        <div class="header-title">连续朝拜奖励</div>
      </div>
      
      <div class="tiers-display">
        <div 
          v-for="(tier, index) in bonusTiers" 
          :key="index"
          class="tier-item"
          :class="{ 'achieved': consecutiveDays >= tier.days }"
        >
          <div class="tier-days">{{ tier.days }}天</div>
          <div class="tier-connector" v-if="index < bonusTiers.length - 1"></div>
          <div class="tier-bonus">+{{ tier.bonus }} EAT</div>
          <div class="tier-icon" :class="{ 'unlocked': consecutiveDays >= tier.days }">
            <span v-if="consecutiveDays >= tier.days">✓</span>
          </div>
        </div>
      </div>
      
      <div class="bonus-note">
        连续朝拜可获得额外奖励，中断后重新计算
      </div>
    </div>
    
    <!-- 朝拜动画弹窗 -->
    <div class="worship-modal" v-if="showWorshipAnimation">
      <div class="modal-content">
        <div class="animation-container">
          <div class="energy-burst"></div>
          <div class="reward-symbol">+1 EAT</div>
          <div class="streak-bonus" v-if="earnedStreakBonus">+0.5 EAT 连续奖励</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyWorship',
  data() {
    return {
      hasWorshipped: false,
      consecutiveDays: 12,
      maxStreakDays: 21,
      totalEarned: 45.5,
      showWorshipAnimation: false,
      earnedStreakBonus: false,
      currentMonth: new Date(),
      
      // 模拟数据 - 本月已朝拜的日期
      worshippedDates: [
        new Date(2024, 5, 1),
        new Date(2024, 5, 2),
        new Date(2024, 5, 3),
        new Date(2024, 5, 4),
        new Date(2024, 5, 5),
        new Date(2024, 5, 6),
        new Date(2024, 5, 7),
        new Date(2024, 5, 8),
        new Date(2024, 5, 9),
        new Date(2024, 5, 10),
        new Date(2024, 5, 11),
        new Date(2024, 5, 12),
        new Date(2024, 5, 13),
        new Date(2024, 5, 14),
      ],
      
      bonusTiers: [
        { days: 3, bonus: 0.2 },
        { days: 7, bonus: 0.5 },
        { days: 14, bonus: 1.0 },
        { days: 30, bonus: 2.0 },
        { days: 60, bonus: 5.0 },
      ]
    }
  },
  
  computed: {
    nextWorshipTime() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const now = new Date();
      const timeRemaining = tomorrow - now;
      
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      
      return `${hours}小时${minutes}分钟后`;
    },
    
    currentMonthDisplay() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth() + 1;
      return `${year}年${month}月`;
    },
    
    calendarDays() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth();
      
      // 本月第一天
      const firstDay = new Date(year, month, 1);
      // 本月最后一天
      const lastDay = new Date(year, month + 1, 0);
      
      // 本月第一天是星期几（0是周日，6是周六）
      const firstDayOfWeek = firstDay.getDay();
      
      // 本月天数
      const daysInMonth = lastDay.getDate();
      
      // 日历日期数组
      const days = [];
      
      // 添加上个月的占位天数
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({ date: null });
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // 添加本月所有天数
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        
        // 检查是否已朝拜
        const worshipped = this.worshippedDates.some(worshippedDate => 
          worshippedDate.getFullYear() === date.getFullYear() &&
          worshippedDate.getMonth() === date.getMonth() &&
          worshippedDate.getDate() === date.getDate()
        );
        
        // 检查是否是今天
        const isToday = date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate();
        
        // 检查是否是未来日期
        const isFuture = date > today;
        
        days.push({ 
          date, 
          worshipped, 
          isToday,
          isFuture
        });
      }
      
      return days;
    }
  },
  
  methods: {
    performWorship() {
      if (this.hasWorshipped) return;
      
      this.showWorshipAnimation = true;
      
      // 检查是否获得连续奖励
      this.earnedStreakBonus = this.consecutiveDays % 7 === 0;
      
      setTimeout(() => {
        this.hasWorshipped = true;
        this.showWorshipAnimation = false;
        
        // 更新数据
        this.totalEarned += this.earnedStreakBonus ? 1.5 : 1.0;
        
        // 更新朝拜记录
        const today = new Date();
        this.worshippedDates.push(today);
      }, 3000);
    },
    
    previousMonth() {
      const newMonth = new Date(this.currentMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      this.currentMonth = newMonth;
    },
    
    nextMonth() {
      const newMonth = new Date(this.currentMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      this.currentMonth = newMonth;
    }
  }
}
</script>

<style scoped>
.daily-worship-container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #e6e6ff;
}

/* 卡片通用样式 */
.shrine-card,
.calendar-card,
.bonus-tiers-card {
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

.ritual-status {
  font-size: 14px;
  padding: 4px 10px;
  background: rgba(100, 100, 140, 0.2);
  border-radius: 20px;
  color: rgba(200, 200, 255, 0.7);
}

.ritual-status.active {
  background: rgba(56, 168, 255, 0.2);
  color: #38a8ff;
  animation: pulse 2s infinite;
}

/* 神龛内容区 */
.shrine-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.shrine-visual {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
}

.shrine-core {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, #244170 0%, #142548 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.shrine-core.active {
  box-shadow: 0 0 30px rgba(56, 114, 255, 0.4);
  animation: pulse 2s infinite;
}

.shrine-core.active:hover {
  transform: scale(1.05);
}

.core-symbol {
  font-size: 48px;
  color: #4a88db;
  z-index: 2;
}

.core-rings {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(56, 114, 255, 0.5);
  transform: translate(-50%, -50%);
}

.ring1 {
  width: 130%;
  height: 130%;
  animation: rotate 10s linear infinite;
}

.ring2 {
  width: 160%;
  height: 160%;
  animation: rotate 15s linear infinite reverse;
}

.ring3 {
  width: 190%;
  height: 190%;
  animation: rotate 20s linear infinite;
}

.core-particles {
  position: absolute;
  width: 200%;
  height: 200%;
  background-image: radial-gradient(circle, rgba(56, 114, 255, 0.3) 1px, transparent 1px);
  background-size: 16px 16px;
  animation: rotate 30s linear infinite;
  opacity: 0.3;
}

.worship-prompt {
  margin-top: 20px;
  text-align: center;
  animation: float 2s ease-in-out infinite;
}

.prompt-text {
  font-size: 16px;
  color: #38a8ff;
  margin-bottom: 5px;
}

.prompt-arrow {
  font-size: 20px;
  color: #38a8ff;
}

.worship-complete {
  margin-top: 20px;
  text-align: center;
}

.complete-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.next-available {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.time-value {
  color: #ffac2f;
}

.reward-display {
  width: 160px;
  background: rgba(16, 20, 40, 0.7);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.reward-title {
  font-size: 16px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.7);
}

.reward-value {
  margin-bottom: 10px;
}

.reward-value .value {
  font-size: 32px;
  font-weight: 700;
  color: #ffac2f;
}

.reward-value .token {
  font-size: 18px;
  color: rgba(255, 172, 47, 0.7);
  margin-left: 5px;
}

.reward-note {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.streak-bonus {
  margin-top: 15px;
  padding: 8px 12px;
  background: rgba(255, 172, 47, 0.15);
  border-radius: 8px;
  width: 100%;
}

.bonus-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.bonus-value {
  font-size: 18px;
  font-weight: 600;
  color: #ffac2f;
}

/* 朝拜统计 */
.ritual-stats {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background: rgba(16, 20, 40, 0.5);
  border-radius: 10px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #38a8ff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* 日历卡片样式 */
.month-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.month-btn {
  background: rgba(56, 114, 255, 0.1);
  border: none;
  color: #38a8ff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.month-btn:hover {
  background: rgba(56, 114, 255, 0.2);
}

.current-month {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 15px;
}

.weekday-header {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding: 5px 0;
}

.calendar-day {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(16, 20, 40, 0.5);
  position: relative;
}

.calendar-day.empty {
  background: transparent;
}

.calendar-day.completed {
  background: rgba(56, 114, 255, 0.15);
}

.calendar-day.today {
  background: rgba(255, 172, 47, 0.15);
  border: 1px solid rgba(255, 172, 47, 0.5);
}

.calendar-day.future {
  opacity: 0.5;
}

.day-number {
  font-size: 14px;
  font-weight: 600;
}

.day-indicator {
  font-size: 14px;
  color: #38a8ff;
  margin-top: 2px;
}

.calendar-footer {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.completed {
  background: rgba(56, 114, 255, 0.15);
}

.legend-color.today {
  background: rgba(255, 172, 47, 0.15);
}

.legend-color.missed {
  background: rgba(255, 255, 255, 0.1);
}

.legend-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 奖励等级卡片样式 */
.tiers-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.tier-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 18%;
  opacity: 0.7;
}

.tier-connector {
  position: absolute;
  top: 15px;
  right: -60%;
  width: 120%;
  height: 2px;
  background: rgba(64, 110, 215, 0.3);
  z-index: 0;
}

.tier-days {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  z-index: 1;
}

.tier-bonus {
  font-size: 14px;
  color: #ffac2f;
}

.tier-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 12px;
  color: transparent;
}

.tier-icon.unlocked {
  background: rgba(56, 168, 255, 0.3);
  color: #fff;
}

.tier-item.achieved {
  opacity: 1;
}

.bonus-note {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* 朝拜动画弹窗 */
.worship-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animation-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.energy-burst {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 172, 47, 0.8) 0%, rgba(255, 172, 47, 0) 70%);
  border-radius: 50%;
  animation: burst 3s ease-out;
  position: absolute;
}

.reward-symbol {
  font-size: 36px;
  font-weight: 700;
  color: #ffac2f;
  animation: float-up 3s ease-out;
  margin-bottom: 15px;
}

.streak-bonus {
  font-size: 24px;
  color: #ffac2f;
  animation: fade-in 1s ease-in-out 1s forwards;
  opacity: 0;
}

/* 动画效果 */
@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

@keyframes rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes burst {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes float-up {
  0% { transform: translateY(50px); opacity: 0; }
  30% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-30px); opacity: 0; }
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style> 