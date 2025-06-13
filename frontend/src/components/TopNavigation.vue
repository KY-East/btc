<template>
  <header class="top-navigation">
    <div class="nav-left">
      <!-- 返回按钮 -->
      <button 
        v-if="showBackButton" 
        class="nav-back-btn" 
        @click="goBack"
      >
        <span class="back-icon">←</span>
        <span class="back-text">返回</span>
      </button>
      
      <!-- Logo区域 -->
      <div v-else class="nav-logo" @click="goHome">
        <span class="logo-text">EZ Trading</span>
        <span class="alpha-badge">Alpha</span>
      </div>
    </div>
    
    <!-- 页面标题 -->
    <div class="nav-center">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</div>
    </div>
    
    <!-- 右侧用户信息 -->
    <div class="nav-right">
      <!-- 余额显示 -->
      <div class="balance-display">
        <div class="eat-balance">
          <span class="balance-icon">⚡</span>
          <span class="balance-amount">{{ userBalance.eat }}</span>
          <span class="balance-unit">EAT</span>
        </div>
        <div class="alpha-points">
          <span class="points-icon">🔮</span>
          <span class="points-amount">{{ userBalance.alphaPoints }}</span>
        </div>
      </div>
      
      <!-- 用户头像 -->
      <button class="user-avatar" @click="toggleUserMenu">
        <div class="avatar-image">{{ userInitial }}</div>
        <div v-if="showUserMenu" class="user-menu">
          <div class="menu-item" @click="goToProfile">
            <span class="menu-icon">👤</span>
            <span class="menu-text">个人中心</span>
          </div>
          <div class="menu-item" @click="goToSettings">
            <span class="menu-icon">⚙️</span>
            <span class="menu-text">设置</span>
          </div>
          <div class="menu-item danger" @click="logout">
            <span class="menu-icon">🚪</span>
            <span class="menu-text">退出登录</span>
          </div>
        </div>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopNavigation',
  
  props: {
    pageTitle: {
      type: String,
      default: 'EZ Trading'
    },
    pageSubtitle: {
      type: String,
      default: ''
    },
    showBackButton: {
      type: Boolean,
      default: false
    },
    userBalance: {
      type: Object,
      default: () => ({
        eat: 125.50,
        alphaPoints: 340
      })
    },
    userName: {
      type: String,
      default: 'Crypto Trader'
    }
  },
  
  emits: ['go-back', 'go-home', 'go-to-profile', 'go-to-settings', 'logout'],
  
  data() {
    return {
      showUserMenu: false
    }
  },
  
  computed: {
    userInitial() {
      return this.userName.charAt(0).toUpperCase()
    }
  },
  
  mounted() {
    // 点击其他地方关闭用户菜单
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  
  methods: {
    goBack() {
      this.$emit('go-back')
    },
    
    goHome() {
      this.$emit('go-home')
    },
    
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    
    goToProfile() {
      this.showUserMenu = false
      this.$emit('go-to-profile')
    },
    
    goToSettings() {
      this.showUserMenu = false
      this.$emit('go-to-settings')
    },
    
    logout() {
      this.showUserMenu = false
      this.$emit('logout')
    },
    
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showUserMenu = false
      }
    }
  }
}
</script>

<style scoped>
.top-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 60px;
}

/* 左侧导航 */
.nav-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.nav-back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  color: #00ffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.nav-back-btn:hover {
  background: rgba(0, 255, 255, 0.2);
  transform: translateX(-2px);
}

.back-icon {
  font-size: 16px;
  font-weight: bold;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.alpha-badge {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: #000;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
}

/* 中央标题 */
.nav-center {
  flex: 2;
  text-align: center;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(45deg, #00ffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* 右侧用户区域 */
.nav-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}

.balance-display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.eat-balance, .alpha-points {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
}

.eat-balance {
  color: #ffa500;
}

.alpha-points {
  color: #00ffff;
}

.balance-icon, .points-icon {
  font-size: 14px;
}

.balance-amount, .points-amount {
  font-weight: 600;
}

.balance-unit {
  opacity: 0.7;
}

/* 用户头像和菜单 */
.user-avatar {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}

.avatar-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.user-avatar:hover .avatar-image {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(0, 20, 40, 0.95);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 12px;
  padding: 8px 0;
  min-width: 160px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.menu-item:hover {
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
}

.menu-item.danger:hover {
  background: rgba(255, 100, 100, 0.1);
  color: #ff6464;
}

.menu-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .top-navigation {
    padding: 10px 16px;
  }
  
  .page-title {
    font-size: 16px;
  }
  
  .page-subtitle {
    font-size: 11px;
  }
  
  .balance-display {
    display: none; /* 移动端隐藏余额显示 */
  }
  
  .nav-back-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .back-text {
    display: none; /* 移动端只显示图标 */
  }
}

@media (max-width: 480px) {
  .nav-center {
    flex: 1;
  }
  
  .nav-left, .nav-right {
    flex: 0 0 auto;
  }
  
  .page-title {
    font-size: 14px;
  }
  
  .page-subtitle {
    display: none;
  }
}
</style> 