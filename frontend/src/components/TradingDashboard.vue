<template>
  <div class="trading-dashboard">
    <!-- 顶部导航栏 -->
    <header class="dashboard-header">
      <div class="logo-section">
        <span class="logo-text">EZ Trading</span>
        <span class="version-tag">Alpha v1.0</span>
      </div>
      
      <nav class="main-nav">
        <div class="nav-item active">神谕</div>
        <div class="nav-item">市场</div>
        <div class="nav-item">分析</div>
        <div class="nav-item">跟单</div>
        <div class="nav-item">设置</div>
      </nav>
      
      <div class="user-section">
        <div class="wallet-info">
          <span class="wallet-icon">👛</span>
          <span class="wallet-address">{{ shortenAddress(wallet.address) }}</span>
        </div>
        
        <div class="eat-balance">
          <span class="eat-icon">₮</span>
          <span class="eat-amount">{{ wallet.eat.toFixed(2) }} EAT</span>
          <button v-if="!claimedToday" class="claim-btn" @click="claimDailyEAT">
            <span class="claim-icon">🎁</span>
          </button>
        </div>
      </div>
    </header>
    
    <!-- 主区域容器 -->
    <div class="dashboard-content">
      <!-- 侧边栏 -->
      <aside class="dashboard-sidebar">
        <!-- 今日神谕 -->
        <div 
          class="nav-link" 
          :class="{ 'active': activeNavItem === 'today-oracle' }"
          @click="handleNavClick('today-oracle')"
        >
          <div class="quantum-icon">
            <span class="icon-symbol">🔮</span>
            <div class="energy-ring"></div>
            <div class="energy-pulse"></div>
          </div>
            <span class="link-text">今日神谕</span>
          <div class="quantum-particles"></div>
          </div>
        
        <!-- 历史神谕 -->
        <div 
          class="nav-link" 
          :class="{ 'active': activeNavItem === 'history-oracle' }"
          @click="handleNavClick('history-oracle')"
        >
          <div class="quantum-icon">
            <span class="icon-symbol">📚</span>
            <div class="energy-ring purple"></div>
            <div class="energy-pulse purple"></div>
          </div>
            <span class="link-text">历史神谕</span>
          <div class="quantum-lock" title="消耗1 EAT解锁">
            <span class="lock-icon">🔒</span>
            <span class="eat-cost">1</span>
          </div>
          </div>
        
        <!-- AI解币 -->
        <div 
          class="nav-link" 
          :class="{ 'active': activeNavItem === 'ai-analysis' }"
          @click="handleNavClick('ai-analysis')"
        >
          <div class="quantum-icon">
            <span class="icon-symbol">🧠</span>
            <div class="energy-ring green"></div>
            <div class="energy-pulse green"></div>
          </div>
          <span class="link-text">AI解币</span>
          <div class="quantum-lock" title="消耗2 EAT解锁">
            <span class="lock-icon">🔒</span>
            <span class="eat-cost">2</span>
          </div>
        </div>
        
        <!-- 我想赚更多 -->
        <div 
          class="nav-link expandable"
          :class="{ 
            'active': activeNavItem.startsWith('earn-more'),
            'expanded': expandedMenus['earn-more']
          }"
        >
          <div class="nav-header" @click="toggleSubmenu('earn-more')">
            <div class="quantum-icon">
              <span class="icon-symbol">💰</span>
              <div class="energy-ring gold"></div>
              <div class="energy-pulse gold"></div>
          </div>
            <span class="link-text">我想赚更多</span>
            <span class="expand-icon" :class="{ 'rotated': expandedMenus['earn-more'] }">▼</span>
          </div>
          
          <!-- 子菜单 -->
          <div class="quantum-submenu" :class="{ 'expanded': expandedMenus['earn-more'] }">
            <div 
              class="submenu-item"
              :class="{ 'active': activeNavItem === 'earn-more-follow' }"
              @click.stop="handleNavClick('earn-more-follow')"
            >
              <div class="quantum-dot"></div>
              <span>一键跟单</span>
              <div class="quantum-lock" title="消耗3 EAT解锁">
                <span class="lock-icon mini">🔒</span>
                <span class="eat-cost mini">3</span>
              </div>
            </div>
            <div 
              class="submenu-item"
              :class="{ 'active': activeNavItem === 'earn-more-stake' }"
              @click.stop="handleNavClick('earn-more-stake')"
            >
              <div class="quantum-dot"></div>
              <span>质押挖矿</span>
              <div class="quantum-lock" title="需要50 EAT">
                <span class="lock-icon mini">🔒</span>
                <span class="eat-cost mini">50</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 获取更多EAT -->
        <div 
          class="nav-link expandable"
          :class="{ 
            'active': activeNavItem.startsWith('get-eat'),
            'expanded': expandedMenus['get-eat']
          }"
        >
          <div class="nav-header" @click="toggleSubmenu('get-eat')">
            <div class="quantum-icon">
              <span class="icon-symbol">⚡</span>
              <div class="energy-ring cyan"></div>
              <div class="energy-pulse cyan"></div>
          </div>
            <span class="link-text">获取更多EAT</span>
            <span class="expand-icon" :class="{ 'rotated': expandedMenus['get-eat'] }">▼</span>
          </div>
          
          <!-- 子菜单 -->
          <div class="quantum-submenu" :class="{ 'expanded': expandedMenus['get-eat'] }">
            <div 
              class="submenu-item"
              :class="{ 'active': activeNavItem === 'get-eat-daily' }"
              @click.stop="handleNavClick('get-eat-daily')"
            >
              <div class="quantum-dot cyan"></div>
              <span>每日朝拜</span>
            </div>
            <div 
              class="submenu-item"
              :class="{ 'active': activeNavItem === 'get-eat-invite' }"
              @click.stop="handleNavClick('get-eat-invite')"
            >
              <div class="quantum-dot cyan"></div>
              <span>邀请好友</span>
            </div>
            <div 
              class="submenu-item"
              :class="{ 'active': activeNavItem === 'get-eat-buy' }"
              @click.stop="handleNavClick('get-eat-buy')"
            >
              <div class="quantum-dot cyan"></div>
              <span>购买EAT</span>
            </div>
          </div>
        </div>
        
        <!-- AI助手悬浮按钮 -->
        <div class="ai-assistant-btn" @click="openAiAssistant()">
          <div class="assistant-icon">
            <div class="ai-face"></div>
            <div class="energy-ring assistant"></div>
          </div>
          <span class="assistant-label">智能顾问</span>
        </div>
      </aside>
      
      <!-- 主内容区 -->
      <main class="main-content">
        <div class="content-header">
          <h1 class="page-title">
            <template v-if="activeNavItem === 'today-oracle'">今日神谕</template>
            <template v-else-if="activeNavItem === 'history-oracle'">历史神谕</template>
            <template v-else-if="activeNavItem === 'ai-analysis'">AI解币</template>
            <template v-else-if="activeNavItem === 'earn-more-follow'">一键跟单</template>
            <template v-else-if="activeNavItem === 'earn-more-stake'">质押挖矿</template>
            <template v-else-if="activeNavItem === 'get-eat-daily'">每日朝拜</template>
            <template v-else-if="activeNavItem === 'get-eat-invite'">邀请好友</template>
            <template v-else-if="activeNavItem === 'get-eat-buy'">购买EAT</template>
            <span class="date-tag">{{ formattedDate }}</span>
          </h1>
          <div class="action-buttons">
            <button class="action-btn refresh-btn">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">刷新</span>
            </button>
            <button class="action-btn share-btn">
              <span class="btn-icon">📤</span>
              <span class="btn-text">分享</span>
            </button>
          </div>
        </div>
        
        <!-- 今日神谕页面 -->
        <div v-if="activeNavItem === 'today-oracle'" class="oracle-display">
          <div class="quantum-oracle-card">
            <div class="oracle-header">
              <div class="oracle-title">BTC/USDT 趋势分析</div>
              <div class="oracle-timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
            </div>
            <div class="oracle-content">
              <div class="hologram-wrapper">
                <div class="hologram-effect"></div>
                <div class="oracle-symbol">BTC/USDT</div>
                <div class="oracle-prediction up">看涨信号</div>
              </div>
              <div class="oracle-line"></div>
              <div class="oracle-description">
                比特币突破关键阻力位$56,800，交易量持续放大，预计短期内将测试$58,500-$60,000区间
              </div>
              <div class="quantum-confidence">
                <div class="confidence-label">AI置信度</div>
                <div class="confidence-bar">
                  <div class="confidence-value" style="width: 78%"></div>
                  <div class="quantum-particles-flow"></div>
                </div>
                <div class="confidence-percentage">78%</div>
              </div>
            </div>
            <div class="oracle-actions">
              <button class="oracle-action-btn" @click="openTradingModal('BTC/USDT', 'buy')">
                <span class="action-icon">📊</span>
                <span>查看详情</span>
              </button>
              <button class="oracle-action-btn" @click="openTradingModal('BTC/USDT', 'sell')">
                <span class="action-icon">🔄</span>
                <span>跟单交易</span>
              </button>
            </div>
          </div>
          
          <div class="quantum-oracle-card">
            <div class="oracle-header">
              <div class="oracle-title">ETH/USDT 技术分析</div>
              <div class="oracle-timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
            </div>
            <div class="oracle-content">
              <div class="hologram-wrapper">
                <div class="hologram-effect"></div>
                <div class="oracle-symbol">ETH/USDT</div>
                <div class="oracle-prediction sideways">横盘整理</div>
              </div>
              <div class="oracle-line"></div>
              <div class="oracle-description">
                以太坊将在$3,050-$3,150区间内横盘整理，交易量缩减，等待ETF审批新消息
              </div>
              <div class="quantum-confidence">
                <div class="confidence-label">AI置信度</div>
                <div class="confidence-bar">
                  <div class="confidence-value" style="width: 65%"></div>
                  <div class="quantum-particles-flow"></div>
                </div>
                <div class="confidence-percentage">65%</div>
              </div>
            </div>
            <div class="oracle-actions">
              <button class="oracle-action-btn" @click="openTradingModal('ETH/USDT', 'buy')">
                <span class="action-icon">📊</span>
                <span>查看详情</span>
              </button>
              <button class="oracle-action-btn" @click="openTradingModal('ETH/USDT', 'sell')">
                <span class="action-icon">🔄</span>
                <span>跟单交易</span>
              </button>
            </div>
          </div>
          
          <div class="quantum-oracle-card">
            <div class="oracle-header">
              <div class="oracle-title">LINK/USDT 趋势预测</div>
              <div class="oracle-timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
            </div>
            <div class="oracle-content">
              <div class="hologram-wrapper">
                <div class="hologram-effect"></div>
                <div class="oracle-symbol">LINK/USDT</div>
                <div class="oracle-prediction sideways">震荡整理</div>
              </div>
              <div class="oracle-line"></div>
              <div class="oracle-description">
                LINK价格缓慢回调，技术指标金叉，后市可能继续走强
              </div>
              <div class="quantum-confidence">
                <div class="confidence-label">AI置信度</div>
                <div class="confidence-bar">
                  <div class="confidence-value" style="width: 83%"></div>
                  <div class="quantum-particles-flow"></div>
                </div>
                <div class="confidence-percentage">83%</div>
              </div>
            </div>
            <div class="oracle-actions">
              <button class="oracle-action-btn" @click="openTradingModal('LINK/USDT', 'buy')">
                <span class="action-icon">📊</span>
                <span>查看详情</span>
              </button>
              <button class="oracle-action-btn" @click="openTradingModal('LINK/USDT', 'sell')">
                <span class="action-icon">🔄</span>
                <span>跟单交易</span>
              </button>
            </div>
          </div>
          
          <div class="quantum-oracle-card">
            <div class="oracle-header">
              <div class="oracle-title">DOGE/USDT 市场情绪</div>
              <div class="oracle-timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
            </div>
            <div class="oracle-content">
              <div class="hologram-wrapper">
                <div class="hologram-effect"></div>
                <div class="oracle-symbol">DOGE/USDT</div>
                <div class="oracle-prediction down">看跌警报</div>
              </div>
              <div class="oracle-line"></div>
              <div class="oracle-description">
                DOGE价格三角形收敛，技术指标金叉，但资金正缓慢流出，建议观望
              </div>
              <div class="quantum-confidence">
                <div class="confidence-label">AI置信度</div>
                <div class="confidence-bar">
                  <div class="confidence-value" style="width: 71%"></div>
                  <div class="quantum-particles-flow"></div>
                </div>
                <div class="confidence-percentage">71%</div>
              </div>
            </div>
            <div class="oracle-actions">
              <button class="oracle-action-btn" @click="openTradingModal('DOGE/USDT', 'buy')">
                <span class="action-icon">📊</span>
                <span>查看详情</span>
              </button>
              <button class="oracle-action-btn" @click="openTradingModal('DOGE/USDT', 'sell')">
                <span class="action-icon">🔄</span>
                <span>跟单交易</span>
              </button>
            </div>
          </div>
          
          <div class="quantum-oracle-card">
            <div class="oracle-header">
              <div class="oracle-title">AVAX/USDT 技术预测</div>
              <div class="oracle-timestamp">{{ new Date().toLocaleTimeString('zh-CN') }}</div>
            </div>
            <div class="oracle-content">
              <div class="hologram-wrapper">
                <div class="hologram-effect"></div>
                <div class="oracle-symbol">AVAX/USDT</div>
                <div class="oracle-prediction up">看多信号</div>
              </div>
              <div class="oracle-line"></div>
              <div class="oracle-description">
                AVAX价格测试支撑，交易量放大，后市可能继续走强
              </div>
              <div class="quantum-confidence">
                <div class="confidence-label">AI置信度</div>
                <div class="confidence-bar">
                  <div class="confidence-value" style="width: 62%"></div>
                  <div class="quantum-particles-flow"></div>
                </div>
                <div class="confidence-percentage">62%</div>
              </div>
            </div>
            <div class="oracle-actions">
              <button class="oracle-action-btn" @click="openTradingModal('AVAX/USDT', 'buy')">
                <span class="action-icon">📊</span>
                <span>查看详情</span>
              </button>
              <button class="oracle-action-btn" @click="openTradingModal('AVAX/USDT', 'sell')">
                <span class="action-icon">🔄</span>
                <span>跟单交易</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 历史神谕页面 -->
        <div v-else-if="activeNavItem === 'history-oracle'" class="history-oracle-container">
          <div class="quantum-info-card">
            <div class="card-header">
              <div class="header-title">历史神谕</div>
              <div class="lock-status">已解锁</div>
            </div>
            
            <div class="quantum-time-tunnel">
              <div class="tunnel-effect"></div>
              <div class="time-axis">
                <!-- 第一天：BTC -->
                <div class="time-node">
                  <div class="node-date">
                    <div class="date-box">05/15</div>
                    <div class="energy-connector"></div>
                  </div>
                  
                  <div class="node-content">
                    <div class="content-header">
                      <div class="history-pair">BTC/USDT</div>
                      <div class="node-accuracy high">87%</div>
                    </div>
                    
                    <div class="prediction-box">
                      <div class="history-prediction up">看空</div>
                      <div class="history-result success">✓ 命中</div>
                      <div class="quantum-particles-small"></div>
                    </div>
                    
                    <div class="history-detail">
                      <p>BTC价格测试支撑，链上活跃度增加，后市可能继续走强。</p>
                      <button class="detail-btn">完整分析</button>
                    </div>
                  </div>
                </div>
                
                <!-- 第二天：ETH -->
                <div class="time-node">
                  <div class="node-date">
                    <div class="date-box">05/14</div>
                    <div class="energy-connector"></div>
                  </div>
                  
                  <div class="node-content">
                    <div class="content-header">
                      <div class="history-pair">ETH/USDT</div>
                      <div class="node-accuracy medium">76%</div>
                    </div>
                    
                    <div class="prediction-box">
                      <div class="history-prediction up">看多</div>
                      <div class="history-result success">✓ 命中</div>
                      <div class="quantum-particles-small"></div>
                    </div>
                    
                    <div class="history-detail">
                      <p>ETH价格快速反弹，大户资金流入，后市可能继续走强。</p>
                      <button class="detail-btn">完整分析</button>
                    </div>
                  </div>
                </div>
                
                <!-- 第三天：DOGE -->
                <div class="time-node">
                  <div class="node-date">
                    <div class="date-box">05/13</div>
                    <div class="energy-connector"></div>
                  </div>
                  
                  <div class="node-content">
                    <div class="content-header">
                      <div class="history-pair">DOGE/USDT</div>
                      <div class="node-accuracy high">82%</div>
                    </div>
                    
                    <div class="prediction-box">
                      <div class="history-prediction sideways">震荡</div>
                      <div class="history-result success">✓ 命中</div>
                      <div class="quantum-particles-small"></div>
                    </div>
                    
                    <div class="history-detail">
                      <p>DOGE价格突破阻力位，社交媒体情绪转正，后市可能继续走强。</p>
                      <button class="detail-btn">完整分析</button>
                    </div>
                  </div>
                </div>
                
                <!-- 第四天：BTC -->
                <div class="time-node">
                  <div class="node-date">
                    <div class="date-box">05/12</div>
                    <div class="energy-connector"></div>
                  </div>
                  
                  <div class="node-content">
                    <div class="content-header">
                      <div class="history-pair">BTC/USDT</div>
                      <div class="node-accuracy medium">73%</div>
                    </div>
                    
                    <div class="prediction-box">
                      <div class="history-prediction sideways">震荡</div>
                      <div class="history-result success">✓ 命中</div>
                      <div class="quantum-particles-small"></div>
                    </div>
                    
                    <div class="history-detail">
                      <p>BTC价格横盘整理，社交媒体情绪转正，后市可能继续走强。</p>
                      <button class="detail-btn">完整分析</button>
                    </div>
                  </div>
                </div>
                
                <!-- 第五天：LINK -->
                <div class="time-node">
                  <div class="node-date">
                    <div class="date-box">05/11</div>
                    <div class="energy-connector"></div>
                  </div>
                  
                  <div class="node-content">
                    <div class="content-header">
                      <div class="history-pair">LINK/USDT</div>
                      <div class="node-accuracy high">85%</div>
                    </div>
                    
                    <div class="prediction-box">
                      <div class="history-prediction up">看多</div>
                      <div class="history-result fail">✗ 未中</div>
                      <div class="quantum-particles-small"></div>
                    </div>
                    
                    <div class="history-detail">
                      <p>LINK突破重要阻力位，但市场情绪转向谨慎，后续可能出现回调。</p>
                      <button class="detail-btn">完整分析</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="time-navigation">
              <button class="time-nav-btn"><span class="nav-icon">◀</span> 更早记录</button>
              <div class="time-filter">
                <span class="filter-label">筛选:</span>
                <button class="filter-btn active">全部</button>
                <button class="filter-btn">命中</button>
                <button class="filter-btn">未中</button>
              </div>
              <div class="accuracy-summary">
                <div class="summary-label">总体准确率:</div>
                <div class="summary-value">76.4%</div>
                <div class="trend-indicator positive">↑ 2.1%</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- AI解币页面 -->
        <div v-else-if="activeNavItem === 'ai-analysis'" class="ai-analysis-container">
          <div class="quantum-lab-card">
            <div class="card-header">
              <div class="header-title">AI解币实验室</div>
              <div class="lab-status">量子引擎已激活</div>
            </div>
            
            <div class="quantum-lab-controls">
              <div class="control-section">
                <div class="section-title">分析维度</div>
                <div class="dimension-toggles">
                  <div class="dimension-toggle active">
                    <div class="toggle-icon technical"></div>
                    <div class="toggle-label">技术面</div>
                  </div>
                  <div class="dimension-toggle active">
                    <div class="toggle-icon market"></div>
                    <div class="toggle-label">市场面</div>
                  </div>
                  <div class="dimension-toggle active">
                    <div class="toggle-icon onchain"></div>
                    <div class="toggle-label">链上数据</div>
                  </div>
                  <div class="dimension-toggle">
                    <div class="toggle-icon social"></div>
                    <div class="toggle-label">社交情绪</div>
                  </div>
                  <div class="dimension-toggle">
                    <div class="toggle-icon institutional"></div>
                    <div class="toggle-label">机构持仓</div>
                  </div>
                </div>
              </div>
              
              <div class="coin-input-section">
                <div class="input-label">输入币种代码或名称</div>
                <div class="quantum-input-wrapper">
                  <div class="input-icon">⚛</div>
                  <input 
                    type="text" 
                    class="quantum-input" 
                    v-model="coinAnalysisInput"
                    placeholder="例如: BTC, ETH, SOL, PEPE..."
                    @keyup.enter="generateCoinAnalysis"
                  />
                  <button class="quantum-action-button" @click="generateCoinAnalysis">
                    <span class="btn-text">开始分析</span>
                    <div class="btn-energy"></div>
                  </button>
                </div>
                <div class="input-note">支持CMC和PumpFun上的所有代币</div>
              </div>
              
              <div class="quick-coins">
                <div class="section-title">热门币种</div>
                <div class="coin-options">
                  <div class="coin-option" @click="coinAnalysisInput = 'BTC'; generateCoinAnalysis()">
                    <div class="coin-icon btc"></div>
                    <div class="coin-name">比特币</div>
                  </div>
                  <div class="coin-option" @click="coinAnalysisInput = 'ETH'; generateCoinAnalysis()">
                    <div class="coin-icon eth"></div>
                    <div class="coin-name">以太坊</div>
                  </div>
                  <div class="coin-option" @click="coinAnalysisInput = 'SOL'; generateCoinAnalysis()">
                    <div class="coin-icon sol"></div>
                    <div class="coin-name">索拉纳</div>
                  </div>
                  <div class="coin-option" @click="coinAnalysisInput = 'DOGE'; generateCoinAnalysis()">
                    <div class="coin-icon doge"></div>
                    <div class="coin-name">狗狗币</div>
                  </div>
                  <div class="coin-option" @click="coinAnalysisInput = 'PEPE'; generateCoinAnalysis()">
                    <div class="coin-icon pepe"></div>
                    <div class="coin-name">佩佩蛙</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="isAnalysisLoading" class="analysis-loading">
              <div class="quantum-loader"></div>
              <div class="quantum-particles-large"></div>
              <div class="loading-text">AI量子引擎分析中...</div>
              <div class="processing-steps">
                <div class="step">收集链上数据<span class="check">✓</span></div>
                <div class="step">分析技术指标<span class="check">✓</span></div>
                <div class="step active">生成AI模型<span class="dots"><span>.</span><span>.</span><span>.</span></span></div>
                <div class="step">评估投资风险</div>
                <div class="step">量子校准结果</div>
              </div>
            </div>
            
            <div v-else-if="coinAnalysisResult" class="analysis-result">
              <div class="result-header">
                <div class="analyzed-coin">{{ coinAnalysisInput.toUpperCase() }}</div>
                <div class="analysis-timestamp">{{ new Date().toLocaleString('zh-CN') }}</div>
              </div>
              
              <div class="result-grid">
                <div class="result-section">
                  <div class="section-title">
                    <div class="section-icon market"></div>
                    <span>市场分析</span>
                  </div>
                  <div class="section-content">{{ coinAnalysisResult.market }}</div>
                </div>
                
                <div class="result-section">
                  <div class="section-title">
                    <div class="section-icon technical"></div>
                    <span>技术面</span>
                  </div>
                  <div class="section-content">{{ coinAnalysisResult.technical }}</div>
                </div>
                
                <div class="result-section">
                  <div class="section-title">
                    <div class="section-icon advice"></div>
                    <span>投资建议</span>
                  </div>
                  <div class="section-content">{{ coinAnalysisResult.advice }}</div>
                </div>
                
                <div class="result-section">
                  <div class="section-title">
                    <div class="section-icon risk"></div>
                    <span>风险提示</span>
                  </div>
                  <div class="section-content risk">{{ coinAnalysisResult.risk }}</div>
                </div>
              </div>
              
              <div class="result-actions">
                <button class="result-action-btn">
                  <span class="action-icon">💾</span>
                  <span>保存分析</span>
                </button>
                <button class="result-action-btn">
                  <span class="action-icon">📤</span>
                  <span>分享</span>
                </button>
                <button class="result-action-btn" @click="coinAnalysisInput = ''; coinAnalysisResult = null">
                  <span class="action-icon">🔄</span>
                  <span>新分析</span>
                </button>
              </div>
            </div>
            
            <div v-else class="empty-analysis">
              <div class="empty-illustration">
                <div class="ai-brain-icon"></div>
                <div class="energy-waves"></div>
              </div>
              <div class="empty-title">量子AI分析引擎已准备就绪</div>
              <div class="empty-description">
                输入任意币种代码或从热门币种中选择，AI将为您提供多维度专业分析
              </div>
            </div>
          </div>
        </div>
        
        <!-- 其他页面内容 -->
        <div v-else class="demo-page-container">
          <!-- 一键跟单页面 -->
          <template v-if="activeNavItem === 'earn-more-follow'">
            <FollowTrading />
          </template>
          
          <!-- 质押挖矿页面 -->
          <template v-else-if="activeNavItem === 'earn-more-stake'">
            <StakingMining />
          </template>
          
                  <!-- 邀请好友页面 -->
        <template v-else-if="activeNavItem === 'get-eat-invite'">
          <InviteFriends />
        </template>
        
        <!-- 每日朝拜页面 -->
        <template v-else-if="activeNavItem === 'get-eat-daily'">
          <DailyWorship />
        </template>
        
        <!-- 购买EAT页面 -->
        <template v-else-if="activeNavItem === 'get-eat-buy'">
          <BuyEAT />
        </template>
          
          <!-- 其他功能仍使用简单Demo显示 -->
          <template v-else>
            <div class="quantum-info-card">
              <div class="card-header">
                <div class="header-title">
                  <template v-if="activeNavItem === 'get-eat-daily'">每日朝拜</template>
                  <template v-else-if="activeNavItem === 'get-eat-invite'">邀请好友</template>
                  <template v-else-if="activeNavItem === 'get-eat-buy'">购买EAT</template>
                </div>
                <div class="feature-status">
                  <template v-if="activeNavItem === 'get-eat-daily'">已启用</template>
                  <template v-else>锁定功能</template>
                </div>
              </div>
              
              <div class="demo-content">
                <div class="demo-icon">
                  <template v-if="activeNavItem === 'get-eat-daily'">⚡</template>
                  <template v-else-if="activeNavItem === 'get-eat-invite'">👥</template>
                  <template v-else-if="activeNavItem === 'get-eat-buy'">💵</template>
                </div>
                <div class="demo-title">
                  <template v-if="activeNavItem === 'get-eat-daily'">每日能量充能</template>
                  <template v-else-if="activeNavItem === 'get-eat-invite'">邀请传送门</template>
                  <template v-else-if="activeNavItem === 'get-eat-buy'">能量币交易所</template>
                </div>
                <div class="demo-description">
                  <template v-if="activeNavItem === 'get-eat-daily'">通过每日朝拜AI神像获取免费EAT能量币</template>
                  <template v-else-if="activeNavItem === 'get-eat-invite'">邀请好友加入获得额外能量币奖励和平台特权</template>
                  <template v-else-if="activeNavItem === 'get-eat-buy'">从多种去中心化交易所购买EAT能量币</template>
                </div>
                
                <button v-if="activeNavItem === 'get-eat-daily'" class="quantum-action-button large">
                  <span class="btn-text">开始朝拜 (已完成今日朝拜)</span>
                </button>
                <button v-else class="quantum-locked-button">
                  <span class="lock-icon">🔒</span>
                  <span class="btn-text">解锁此功能</span>
                  <span class="eat-cost">{{ getEatCost() }} EAT</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </main>
      
      <!-- 右侧面板 -->
      <aside class="right-panel">
        <div class="panel-section">
          <div class="section-title">NAV参考</div>
          <div class="nav-card">
            <div class="nav-value">{{ navValue }} USD</div>
            <div class="nav-label">当前EAT参考价</div>
            <div class="nav-trend positive">+2.3% (24h)</div>
          </div>
        </div>
        
        <div class="panel-section">
          <div class="section-title">EAT统计</div>
          <div class="eat-stat-item">
            <div class="stat-label">已燃烧总量</div>
            <div class="stat-value">12,450 EAT</div>
          </div>
          <div class="eat-stat-item">
            <div class="stat-label">流通总量</div>
            <div class="stat-value">87,550 EAT</div>
          </div>
          <div class="eat-stat-item">
            <div class="stat-label">今日铸造</div>
            <div class="stat-value">1,200 EAT</div>
          </div>
        </div>
        
        <div class="panel-section">
          <div class="section-title">神谕绩效</div>
          <div class="performance-item positive">
            <div class="performance-label">7日胜率</div>
            <div class="performance-value">71.4%</div>
          </div>
          <div class="performance-item positive">
            <div class="performance-label">30日收益</div>
            <div class="performance-value">+23.8%</div>
          </div>
        </div>
      </aside>
    </div>
    
    <!-- 页脚信息 -->
    <footer class="dashboard-footer">
      <div class="footer-links">
        <a href="#" class="footer-link">白皮书</a>
        <a href="#" class="footer-link">使用教程</a>
        <a href="#" class="footer-link">关于我们</a>
      </div>
      <div class="footer-copyright">© 2025 EZ Trading. All rights reserved.</div>
    </footer>

    <!-- 跟单交易模态框 -->
    <div v-if="showTradingModal" class="quantum-modal-overlay" @click="closeTradingModal">
      <div class="quantum-modal" @click.stop>
        <div v-if="!orderSuccess" class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">量子跟单交易</h2>
            <button class="close-modal-btn" @click="closeTradingModal">×</button>
          </div>
          
          <div class="order-details">
            <div class="order-symbol">{{ selectedSymbol }}</div>
            <div class="order-action" :class="selectedAction === 'buy' ? 'buy' : 'sell'">
              {{ selectedAction === 'buy' ? '做多' : '做空' }}
            </div>
            
            <div class="parameter-section">
              <div class="parameter-row">
                <div class="parameter-label">滑点容差</div>
                <div class="parameter-value-control">
                  <button class="adjust-btn" @click="slippageTolerance > 0.1 ? slippageTolerance -= 0.1 : null">-</button>
                  <div class="parameter-value">{{ slippageTolerance.toFixed(1) }}%</div>
                  <button class="adjust-btn" @click="slippageTolerance += 0.1">+</button>
                </div>
              </div>
              
              <div class="parameter-row">
                <div class="parameter-label">杠杆倍数</div>
                <div class="parameter-value-control">
                  <button class="adjust-btn" @click="leverage > 1 ? leverage -= 1 : null">-</button>
                  <div class="parameter-value">{{ leverage }}×</div>
                  <button class="adjust-btn" @click="leverage < 10 ? leverage += 1 : null">+</button>
                </div>
              </div>
            </div>
            
            <div class="summary-section">
              <div class="summary-row">
                <div class="summary-label">预计每日收益</div>
                <div class="summary-value positive">+{{ (2.5 * leverage).toFixed(1) }}%</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">预计风险等级</div>
                <div class="summary-value" :class="leverage <= 3 ? 'low' : leverage <= 7 ? 'medium' : 'high'">
                  {{ leverage <= 3 ? '低' : leverage <= 7 ? '中' : '高' }}
                </div>
              </div>
              <div class="summary-row">
                <div class="summary-label">消耗EAT</div>
                <div class="summary-value">3.0</div>
              </div>
            </div>
            
            <div class="order-warning" v-if="leverage > 5">
              <div class="warning-icon">⚠️</div>
              <div class="warning-text">高杠杆操作有较大亏损风险，请谨慎决策</div>
            </div>
            
            <div class="modal-actions">
              <button 
                class="order-submit-btn" 
                :class="{ 'processing': isProcessingOrder }"
                :disabled="isProcessingOrder"
                @click="submitOrder"
              >
                <span v-if="!isProcessingOrder">确认跟单</span>
                <span v-else class="processing-text">处理中<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span></span>
              </button>
              <button class="order-cancel-btn" @click="closeTradingModal" :disabled="isProcessingOrder">取消</button>
            </div>
          </div>
        </div>
        
        <div v-else class="modal-content success-content">
          <div class="success-icon">✓</div>
          <h2 class="success-title">跟单成功</h2>
          <div class="success-message">您的{{ selectedSymbol }}{{ selectedAction === 'buy' ? '做多' : '做空' }}订单已成功提交</div>
          <div class="success-details">
            <div class="detail-item">
              <div class="detail-label">交易对</div>
              <div class="detail-value">{{ selectedSymbol }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">方向</div>
              <div class="detail-value" :class="selectedAction === 'buy' ? 'buy' : 'sell'">
                {{ selectedAction === 'buy' ? '做多' : '做空' }}
              </div>
            </div>
            <div class="detail-item">
              <div class="detail-label">杠杆</div>
              <div class="detail-value">{{ leverage }}×</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">消耗EAT</div>
              <div class="detail-value">3.0</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">订单ID</div>
              <div class="detail-value order-id">{{ 'QO-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0') }}</div>
            </div>
          </div>
          
          <button class="success-close-btn" @click="closeTradingModal">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
  import FollowTrading from './FollowTrading.vue'; // 导入一键跟单组件
  import StakingMining from './StakingMining.vue'; // 导入质押挖矿组件
  import InviteFriends from './InviteFriends.vue'; // 导入邀请好友组件
  import DailyWorship from './DailyWorship.vue'; // 导入每日朝拜组件
  import BuyEAT from './BuyEAT.vue'; // 导入购买EAT组件

// 模拟数据
const claimedToday = ref(false);
const navValue = ref('1.28');
const showTradingModal = ref(false);
const selectedSymbol = ref('');
const selectedAction = ref('');
const slippageTolerance = ref(0.5);
const leverage = ref(1);
const orderSuccess = ref(false);
const isProcessingOrder = ref(false);
const activeNavItem = ref('today-oracle');
const expandedMenus = ref({
  'earn-more': false,
  'get-eat': false
});

// AI解币相关
const coinAnalysisInput = ref('');
const isAnalysisLoading = ref(false);
const coinAnalysisResult = ref(null);

const wallet = ref({
  address: '0x7F9b8E35A3D0a4c818FAba9673BE5b106f65f774',
  eat: 12.5
});

// 计算属性
const formattedDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });
});

// 方法
function shortenAddress(address) {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

// 生成随机分析内容
function generateRandomAnalysis() {
  const coinArray = ['BTC', 'ETH', 'SOL', 'DOGE', 'LINK', 'AVAX'];
  const actionArray = ['突破阻力位', '测试支撑', '横盘整理', '快速反弹', '缓慢回调', '三角形收敛'];
  const factorArray = ['交易量放大', '链上活跃度增加', '社交媒体情绪转正', '大户资金流入', '技术指标金叉'];
  
  const coin = coinArray[Math.floor(Math.random() * coinArray.length)];
  const action = actionArray[Math.floor(Math.random() * actionArray.length)];
  const factor = factorArray[Math.floor(Math.random() * factorArray.length)];
  
  return `${coin}价格${action}，${factor}，后市可能继续走强。`;
}

function claimDailyEAT() {
  // 实际项目中需要链上交互
  wallet.value.eat += 1;
  claimedToday.value = true;
  alert('已成功领取 1 EAT！');
}

// 处理导航点击
function handleNavClick(navId) {
  activeNavItem.value = navId;
}

// 切换子菜单展开状态
function toggleSubmenu(menuId) {
  expandedMenus.value[menuId] = !expandedMenus.value[menuId];
}

// 打开AI助手
function openAiAssistant() {
  // 实现打开AI助手功能的逻辑
  alert('AI助手功能即将上线');
}

// 格式化过去日期
function formatPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
}

// 随机准确率样式
function getRandomAccuracy() {
  const rand = Math.random();
  if (rand > 0.7) return 'high';
  if (rand > 0.4) return 'medium';
  return 'low';
}

// 随机预测样式
function getRandomPrediction() {
  return ['buy', 'sell', 'hold'][Math.floor(Math.random() * 3)];
}

// 随机结果样式
function getRandomResult() {
  return Math.random() > 0.5 ? 'success' : 'fail';
}

// 获取功能所需EAT数量
function getEatCost() {
  switch (activeNavItem) {
    case 'earn-more-follow': return 3;
    case 'earn-more-stake': return 50;
    case 'get-eat-invite': return 2;
    case 'get-eat-buy': return 0;
    default: return 1;
  }
}

// 生成币种分析
function generateCoinAnalysis() {
  if (!coinAnalysisInput.value) {
    alert('请输入币种名称或代码');
    return;
  }
  
  isAnalysisLoading.value = true;
  coinAnalysisResult.value = null;
  
  // 模拟API请求延迟
  setTimeout(() => {
    // 生成模拟分析结果
    coinAnalysisResult.value = {
      market: `${coinAnalysisInput.value.toUpperCase()}近期市场表现活跃，24小时交易量较上周增长37%。当前市值排名第${Math.floor(Math.random() * 200) + 1}位，市场情绪指标呈${Math.random() > 0.5 ? '正面' : '中性'}。`,
      technical: `从技术面看，${coinAnalysisInput.value.toUpperCase()}当前处于${Math.random() > 0.6 ? '上升' : '盘整'}趋势，MACD指标显示${Math.random() > 0.5 ? '金叉形成' : '即将金叉'}，RSI为${Math.floor(Math.random() * 30) + 40}，${Math.random() > 0.5 ? '未' : '已'}突破主要阻力位。`,
      advice: `基于当前分析，建议${Math.random() > 0.6 ? '适量买入并设置止损' : Math.random() > 0.5 ? '观望等待更明确信号' : '小仓位试探性操作'}。目标价位${Math.floor(Math.random() * 20) + 10}%上方，止损位设置在${Math.floor(Math.random() * 5) + 5}%下方。`,
      risk: `风险提示：加密货币市场波动剧烈，${coinAnalysisInput.value.toUpperCase()}历史波动率达${Math.floor(Math.random() * 100) + 50}%。投资需注意资金管理，不建议投入超过总资产${Math.floor(Math.random() * 5) + 5}%的资金。`
    };
    
    isAnalysisLoading.value = false;
  }, 2000);
}

// 打开跟单交易模态框
function openTradingModal(symbol, action) {
  selectedSymbol.value = symbol;
  selectedAction.value = action;
  showTradingModal.value = true;
}

// 关闭跟单交易模态框
function closeTradingModal() {
  showTradingModal.value = false;
  setTimeout(() => {
    orderSuccess.value = false;
    isProcessingOrder.value = false;
  }, 300);
}

// 提交跟单订单
function submitOrder() {
  if (wallet.value.eat < 3) {
    alert('EAT余额不足！跟单需要消耗3 EAT');
    return;
  }
  
  isProcessingOrder.value = true;
  
  // 模拟交易处理
  setTimeout(() => {
    wallet.value.eat -= 3;
    orderSuccess.value = true;
    isProcessingOrder.value = false;
  }, 2500);
}
</script>

<style scoped>
/* 基础样式 */
.trading-dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #0a0a1a;
  color: #fff;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 顶部导航栏 */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(15, 20, 40, 0.8);
  border-bottom: 1px solid rgba(0, 200, 255, 0.2);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px #0ff;
}

.version-tag {
  font-size: 0.7rem;
  background: rgba(0, 150, 255, 0.2);
  color: #0cf;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  font-size: 0.9rem;
  color: #aaa;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #fff;
  background: rgba(0, 150, 255, 0.1);
}

.nav-item.active {
  color: #0ff;
  background: rgba(0, 150, 255, 0.15);
  font-weight: bold;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(20, 30, 60, 0.5);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}

.wallet-icon {
  font-size: 0.9rem;
}

.wallet-address {
  color: #aaa;
}

.eat-balance {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 40, 30, 0.4);
  padding: 4px 12px;
  border-radius: 6px;
}

.eat-icon {
  color: #0fa;
  font-weight: bold;
}

.eat-amount {
  color: #0fa;
  font-weight: bold;
}

.claim-btn {
  background: rgba(0, 150, 100, 0.3);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.claim-btn:hover {
  background: rgba(0, 200, 150, 0.4);
  transform: scale(1.1);
}

.claim-icon {
  font-size: 0.7rem;
}

/* 主区域 */
.dashboard-content {
  display: flex;
  flex: 1;
}

/* 侧边栏 */
.dashboard-sidebar {
  width: 240px;
  background: rgba(7, 11, 30, 0.85);
  border-right: 1px solid rgba(0, 150, 255, 0.15);
  padding: 24px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  margin: 2px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #ddd;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 100, 255, 0.1), rgba(0, 20, 50, 0));
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}

.nav-link:hover {
  transform: translateY(-1px);
  background: rgba(0, 150, 255, 0.08);
  box-shadow: 0 4px 15px rgba(0, 100, 255, 0.15);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.active {
  background: rgba(0, 100, 200, 0.15);
  color: #80e0ff;
  box-shadow: 
    0 0 15px rgba(0, 150, 255, 0.2),
    inset 0 0 5px rgba(0, 200, 255, 0.3);
}

/* 量子图标样式 */
.quantum-icon {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-symbol {
  font-size: 18px;
  z-index: 3;
}

.energy-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(0, 200, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.3);
  animation: rotate 10s linear infinite;
  z-index: 1;
}

.energy-ring::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #00ffff;
  border-radius: 50%;
  box-shadow: 0 0 6px #00ffff;
}

.energy-ring.purple {
  border-color: rgba(200, 100, 255, 0.5);
  box-shadow: 0 0 10px rgba(150, 50, 255, 0.3);
}

.energy-ring.purple::before {
  background: #d580ff;
  box-shadow: 0 0 6px #d580ff;
}

.energy-ring.green {
  border-color: rgba(100, 255, 150, 0.5);
  box-shadow: 0 0 10px rgba(50, 255, 100, 0.3);
}

.energy-ring.green::before {
  background: #50ffb0;
  box-shadow: 0 0 6px #50ffb0;
}

.energy-ring.gold {
  border-color: rgba(255, 200, 50, 0.5);
  box-shadow: 0 0 10px rgba(255, 150, 0, 0.3);
}

.energy-ring.gold::before {
  background: #ffcc00;
  box-shadow: 0 0 6px #ffcc00;
}

.energy-ring.cyan {
  border-color: rgba(0, 255, 220, 0.5);
  box-shadow: 0 0 10px rgba(0, 200, 180, 0.3);
}

.energy-ring.cyan::before {
  background: #00ffcc;
  box-shadow: 0 0 6px #00ffcc;
}

.energy-pulse {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, rgba(0, 150, 255, 0.1) 50%, transparent 70%);
  animation: pulse 2s ease-in-out infinite;
  z-index: 1;
}

.energy-pulse.purple {
  background: radial-gradient(circle, rgba(200, 100, 255, 0.3) 0%, rgba(150, 50, 255, 0.1) 50%, transparent 70%);
}

.energy-pulse.green {
  background: radial-gradient(circle, rgba(100, 255, 150, 0.3) 0%, rgba(50, 255, 100, 0.1) 50%, transparent 70%);
}

.energy-pulse.gold {
  background: radial-gradient(circle, rgba(255, 200, 50, 0.3) 0%, rgba(255, 150, 0, 0.1) 50%, transparent 70%);
}

.energy-pulse.cyan {
  background: radial-gradient(circle, rgba(0, 255, 220, 0.3) 0%, rgba(0, 200, 180, 0.1) 50%, transparent 70%);
}

/* 量子粒子效果 */
.quantum-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-link:hover .quantum-particles {
  opacity: 1;
}

.nav-link.active .quantum-particles {
  opacity: 1;
}

/* 量子锁样式 */
.quantum-lock {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-left: auto;
  background: rgba(20, 30, 60, 0.6);
  padding: 3px 7px;
  border-radius: 12px;
  border: 1px solid rgba(100, 150, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 100, 255, 0.15);
}

.lock-icon {
  font-size: 12px;
}

.lock-icon.mini {
  font-size: 10px;
}

.eat-cost {
  font-size: 12px;
  color: #00ffcc;
  font-weight: bold;
}

.eat-cost.mini {
  font-size: 10px;
}

/* 可展开菜单样式 */
.nav-link.expandable {
  padding: 0;
  flex-direction: column;
  align-items: stretch;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  cursor: pointer;
}

.nav-link.expandable .link-text {
  flex: 1;
}

.expand-icon {
  font-size: 10px;
  color: rgba(0, 200, 255, 0.7);
  transition: transform 0.3s;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.quantum-submenu {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.quantum-submenu.expanded {
  max-height: 200px;
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px 10px 40px;
  margin: 2px 0;
  font-size: 0.85rem;
  color: #bbb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.submenu-item:hover {
  background: rgba(0, 150, 255, 0.08);
  color: #fff;
}

.submenu-item.active {
  background: rgba(0, 80, 150, 0.2);
  color: #80e0ff;
}

.quantum-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00c8ff;
  box-shadow: 0 0 5px rgba(0, 200, 255, 0.8);
}

/* AI助手按钮样式 */
.ai-assistant-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.ai-assistant-btn:hover {
  transform: translateY(-3px);
}

.assistant-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 100, 200, 0.2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 0 15px rgba(0, 150, 255, 0.3),
    inset 0 0 10px rgba(0, 200, 255, 0.2);
}

.ai-face {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 200, 255, 0.9) 0%, rgba(0, 150, 255, 0.6) 100%);
  position: relative;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.ai-face::before,
.ai-face::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(0, 50, 100, 0.9);
  border-radius: 50%;
  top: 7px;
}

.ai-face::before {
  left: 6px;
}

.ai-face::after {
  right: 6px;
}

.energy-ring.assistant {
  border: 1px dashed rgba(0, 255, 255, 0.5);
  animation: rotate 10s linear infinite reverse;
}

.assistant-label {
  font-size: 0.7rem;
  color: rgba(0, 200, 255, 0.7);
  text-shadow: 0 0 5px rgba(0, 150, 255, 0.5);
}

/* 动画定义 */
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.7; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(0.9); }
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-tag {
  font-size: 0.9rem;
  color: #aaa;
  font-weight: normal;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: rgba(0, 100, 200, 0.2);
  border: 1px solid rgba(0, 150, 255, 0.3);
  color: #0cf;
  border-radius: 6px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: rgba(0, 150, 255, 0.3);
}

.btn-icon {
  font-size: 0.9rem;
}

/* 占位内容样式 */
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: rgba(20, 30, 50, 0.3);
  border-radius: 8px;
  border: 1px dashed rgba(0, 150, 255, 0.2);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 200, 255, 0.1);
  border-radius: 50%;
  border-top-color: #0cf;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #8af;
  font-size: 0.9rem;
}

/* 右侧面板 */
.right-panel {
  width: 250px;
  background: rgba(15, 20, 35, 0.7);
  border-left: 1px solid rgba(0, 150, 255, 0.15);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.panel-section {
  display: flex;
  flex-direction: column;
}

.nav-card {
  background: linear-gradient(135deg, rgba(0, 40, 80, 0.6), rgba(0, 20, 40, 0.6));
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  text-align: center;
  border: 1px solid rgba(0, 150, 255, 0.2);
}

.nav-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.nav-label {
  font-size: 0.8rem;
  color: #8af;
  margin: 5px 0;
}

.nav-trend {
  font-size: 0.9rem;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
}

.nav-trend.positive {
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
}

.nav-trend.negative {
  background: rgba(255, 50, 50, 0.2);
  color: #f66;
}

.eat-stat-item, .performance-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.1);
}

.stat-label, .performance-label {
  font-size: 0.85rem;
  color: #aaa;
}

.stat-value {
  font-size: 0.9rem;
  color: #fff;
  font-weight: bold;
}

.performance-value {
  font-size: 0.9rem;
  font-weight: bold;
}

.performance-item.positive .performance-value {
  color: #0fa;
}

.performance-item.negative .performance-value {
  color: #f66;
}

/* 页脚 */
.dashboard-footer {
  padding: 15px 20px;
  background: rgba(10, 15, 30, 0.8);
  border-top: 1px solid rgba(0, 150, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-link {
  color: #8af;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #0cf;
}

.footer-copyright {
  color: #666;
  font-size: 0.8rem;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .right-panel {
    width: 220px;
  }
}

@media (max-width: 992px) {
  .dashboard-sidebar {
    width: 180px;
  }
  
  .main-nav {
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    flex-direction: column;
  }
  
  .dashboard-sidebar, .right-panel {
    width: 100%;
    border: none;
  }
  
  .right-panel {
    order: -1;
    padding: 15px;
  }
  
  .nav-section {
    margin-bottom: 0;
  }
  
  .user-section {
    display: none;
  }
  
  .main-nav {
    flex: 1;
    justify-content: space-between;
  }
  
  .oracle-display {
    grid-template-columns: 1fr;
    padding: 0 15px;
  }
  
  .dashboard-header {
    padding: 10px;
    flex-wrap: wrap;
  }
  
  .main-content {
    padding: 15px 0;
  }
}

/* 量子神谕展示区 */
.oracle-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

/* 添加移动端适配的媒体查询 */
@media (max-width: 768px) {
  .oracle-display {
    grid-template-columns: 1fr;
    padding: 0 15px;
  }
  
  .dashboard-header {
    padding: 10px;
    flex-wrap: wrap;
  }
  
  .dashboard-content {
    margin-top: 10px;
  }
  
  .main-content {
    padding: 15px 0;
  }
}

.quantum-oracle-card {
  background: rgba(15, 25, 50, 0.7);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s;
  border: 1px solid rgba(0, 180, 255, 0.3);
  box-shadow: 
    0 0 25px rgba(0, 100, 255, 0.15),
    inset 0 0 15px rgba(0, 150, 255, 0.1);
}

.quantum-oracle-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent 40%,
    rgba(0, 200, 255, 0.1) 50%,
    transparent 60%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: hologram-scan 8s linear infinite;
  pointer-events: none;
  z-index: 1;
}

.quantum-oracle-card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 10px 30px rgba(0, 150, 255, 0.2),
    inset 0 0 20px rgba(0, 200, 255, 0.15);
}

.oracle-header {
  background: rgba(10, 20, 40, 0.8);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 150, 255, 0.3);
}

.oracle-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #0cf;
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
}

.oracle-timestamp {
  font-size: 0.8rem;
  color: rgba(150, 200, 255, 0.7);
  background: rgba(0, 50, 100, 0.3);
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 100, 200, 0.3);
}

.oracle-content {
  padding: 20px;
  position: relative;
  z-index: 2;
}

.oracle-symbol {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
}

.oracle-prediction {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.oracle-prediction::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  z-index: -1;
}

.oracle-prediction.up {
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
  border: 1px solid rgba(0, 255, 150, 0.3);
  box-shadow: 0 0 15px rgba(0, 200, 100, 0.2);
}

.oracle-prediction.down {
  background: rgba(255, 50, 50, 0.2);
  color: #f88;
  border: 1px solid rgba(255, 100, 100, 0.3);
  box-shadow: 0 0 15px rgba(255, 50, 50, 0.2);
}

.oracle-prediction.sideways {
  background: rgba(200, 150, 0, 0.2);
  color: #fc3;
  border: 1px solid rgba(255, 200, 0, 0.3);
  box-shadow: 0 0 15px rgba(200, 150, 0, 0.2);
}

.oracle-line {
  height: 1px;
  background: linear-gradient(to right, 
    transparent 0%, 
    rgba(0, 150, 255, 0.5) 50%, 
    transparent 100%
  );
  margin: 15px 0;
  position: relative;
}

.oracle-line::before {
  content: '';
  position: absolute;
  width: 30%;
  height: 1px;
  background: rgba(0, 200, 255, 0.8);
  top: 0;
  left: 35%;
  box-shadow: 0 0 8px rgba(0, 200, 255, 0.8);
  animation: pulse-line 3s ease-in-out infinite;
}

.oracle-description {
  font-size: 0.95rem;
  color: #ddd;
  line-height: 1.5;
  margin-bottom: 20px;
}

.quantum-confidence {
  margin-top: 15px;
}

.confidence-label {
  font-size: 0.85rem;
  color: #8af;
  margin-bottom: 5px;
}

.confidence-bar {
  height: 8px;
  background: rgba(10, 20, 40, 0.5);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.confidence-value {
  height: 100%;
  background: linear-gradient(90deg, #0088ff, #00ddff);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
  position: relative;
  animation: confidence-pulse 2s ease-in-out infinite;
}

.confidence-percentage {
  font-size: 0.8rem;
  color: #0df;
  text-align: right;
  margin-top: 5px;
  font-weight: bold;
}

.oracle-actions {
  display: flex;
  gap: 10px;
  padding: 10px 20px 20px;
  justify-content: flex-end;
}

.oracle-action-btn {
  background: rgba(0, 80, 150, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.4);
  color: #0cf;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.oracle-action-btn:hover {
  background: rgba(0, 100, 200, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 120, 255, 0.3);
}

.action-icon {
  font-size: 0.95rem;
}

/* 额外动画定义 */
@keyframes hologram-scan {
  0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
  20% { opacity: 0.5; }
  40% { opacity: 0; }
  60% { opacity: 0.5; }
  80% { opacity: 0; }
  100% { transform: translate(50%, 50%) rotate(45deg); opacity: 0; }
}

@keyframes pulse-line {
  0% { opacity: 0.5; box-shadow: 0 0 5px rgba(0, 200, 255, 0.5); }
  50% { opacity: 1; box-shadow: 0 0 15px rgba(0, 200, 255, 1); }
  100% { opacity: 0.5; box-shadow: 0 0 5px rgba(0, 200, 255, 0.5); }
}

@keyframes confidence-pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

/* 量子模态框样式 */
.quantum-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 15, 30, 0.85);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in;
}

.quantum-modal {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 20px;
  background: rgba(10, 25, 50, 0.9);
  border: 2px solid rgba(0, 180, 255, 0.5);
  border-radius: 15px;
  box-shadow: 
    0 0 50px rgba(0, 150, 255, 0.4),
    inset 0 0 25px rgba(0, 100, 200, 0.2);
  overflow: hidden;
  animation: modalSlideIn 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.quantum-modal::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    135deg,
    transparent 0%,
    transparent 40%,
    rgba(0, 200, 255, 0.1) 50%,
    transparent 60%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: hologram-scan 15s linear infinite;
  pointer-events: none;
  z-index: 0;
}

.modal-content {
  position: relative;
  z-index: 1;
  padding: 25px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 150, 255, 0.3);
}

.modal-title {
  color: #00e0ff;
  font-size: 22px;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.close-modal-btn {
  background: none;
  border: none;
  color: #8ae;
  font-size: 28px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-modal-btn:hover {
  background: rgba(0, 100, 200, 0.2);
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-symbol {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 0 0 15px rgba(0, 150, 255, 0.6);
}

.order-action {
  font-size: 20px;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 30px;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.order-action::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
}

.order-action.buy {
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
  border: 1px solid rgba(0, 255, 150, 0.3);
  box-shadow: 0 0 15px rgba(0, 200, 100, 0.3);
}

.order-action.sell {
  background: rgba(255, 50, 50, 0.2);
  color: #f88;
  border: 1px solid rgba(255, 100, 100, 0.3);
  box-shadow: 0 0 15px rgba(255, 50, 50, 0.3);
}

.parameter-section {
  background: rgba(15, 30, 60, 0.4);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 150, 255, 0.25);
}

.parameter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.parameter-row:last-child {
  margin-bottom: 0;
}

.parameter-label {
  color: #8ae;
  font-size: 16px;
}

.parameter-value-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.parameter-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  min-width: 50px;
  text-align: center;
}

.adjust-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(0, 150, 255, 0.4);
  background: rgba(0, 80, 150, 0.3);
  color: #8ae;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.adjust-btn:hover {
  background: rgba(0, 100, 200, 0.4);
  color: #00e0ff;
  border-color: rgba(0, 200, 255, 0.6);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.4);
}

.summary-section {
  background: rgba(15, 30, 60, 0.4);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 150, 255, 0.25);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.summary-label {
  color: #8ae;
  font-size: 15px;
}

.summary-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.summary-value.positive {
  color: #0fa;
}

.summary-value.negative {
  color: #f88;
}

.summary-value.low {
  color: #0fa;
}

.summary-value.medium {
  color: #fc0;
}

.summary-value.high {
  color: #f88;
}

.order-warning {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 100, 50, 0.1);
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 100, 50, 0.3);
}

.warning-icon {
  font-size: 18px;
}

.warning-text {
  font-size: 14px;
  color: #f88;
}

.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.order-submit-btn {
  flex: 2;
  background: rgba(0, 100, 180, 0.6);
  color: #fff;
  border: 2px solid rgba(0, 180, 255, 0.5);
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  text-shadow: 0 0 10px rgba(0, 180, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.order-submit-btn::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 200, 255, 0.3) 0%,
    rgba(0, 100, 200, 0.1) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  transform: rotate(30deg);
  mix-blend-mode: screen;
}

.order-submit-btn:hover {
  background: rgba(0, 130, 220, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 150, 255, 0.4);
}

.order-submit-btn:hover::before {
  opacity: 1;
  animation: rotate-glow 3s linear infinite;
}

.order-submit-btn:active {
  transform: translateY(1px);
}

.order-submit-btn.processing {
  background: rgba(30, 60, 100, 0.6);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.processing-text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-1, .dot-2, .dot-3 {
  animation: dotPulse 1.5s infinite;
  animation-fill-mode: both;
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.5s;
}

.dot-3 {
  animation-delay: 1s;
}

.order-cancel-btn {
  flex: 1;
  background: rgba(50, 50, 70, 0.4);
  color: #aaa;
  border: 1px solid rgba(100, 100, 150, 0.3);
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.order-cancel-btn:hover {
  background: rgba(70, 70, 90, 0.5);
  color: #fff;
}

.order-cancel-btn:active {
  transform: translateY(1px);
}

.order-cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 成功状态样式 */
.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 25px;
}

.success-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 2px solid rgba(0, 220, 120, 0.4);
  text-shadow: 0 0 10px rgba(0, 200, 100, 0.8);
  box-shadow: 0 0 30px rgba(0, 200, 100, 0.4);
  animation: successPulse 2s infinite;
}

.success-title {
  color: #0fa;
  font-size: 24px;
  margin: 0 0 10px;
  text-shadow: 0 0 15px rgba(0, 200, 100, 0.6);
}

.success-message {
  color: #eee;
  font-size: 16px;
  margin-bottom: 25px;
}

.success-details {
  width: 100%;
  background: rgba(15, 30, 60, 0.4);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 150, 255, 0.25);
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 150, 255, 0.15);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #8ae;
  font-size: 15px;
}

.detail-value {
  font-size: 15px;
  font-weight: bold;
  color: #fff;
}

.detail-value.buy {
  color: #0fa;
}

.detail-value.sell {
  color: #f88;
}

.detail-value.order-id {
  font-family: monospace;
  letter-spacing: 1px;
}

.success-close-btn {
  background: rgba(0, 180, 120, 0.3);
  color: #0fa;
  border: 2px solid rgba(0, 200, 120, 0.4);
  border-radius: 10px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.success-close-btn::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 220, 120, 0.3) 0%,
    rgba(0, 180, 100, 0.1) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  transform: rotate(30deg);
}

.success-close-btn:hover {
  background: rgba(0, 200, 130, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 180, 100, 0.4);
}

.success-close-btn:hover::before {
  opacity: 1;
  animation: rotate-glow 3s linear infinite;
}

/* 动画定义 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes rotate-glow {
  0% { transform: rotate(30deg); }
  100% { transform: rotate(390deg); }
}

@keyframes dotPulse {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}

@keyframes successPulse {
  0% { box-shadow: 0 0 20px rgba(0, 200, 100, 0.4); }
  50% { box-shadow: 0 0 30px rgba(0, 220, 120, 0.6); }
  100% { box-shadow: 0 0 20px rgba(0, 200, 100, 0.4); }
}

/* 全息投影效果 */
.hologram-wrapper {
  position: relative;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.hologram-effect {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 200, 255, 0.15) 0%,
    rgba(0, 150, 255, 0.1) 30%,
    rgba(0, 100, 200, 0.05) 60%,
    transparent 80%
  );
  pointer-events: none;
  opacity: 0.7;
  animation: hologram-rotate 10s linear infinite;
  z-index: 0;
}

.hologram-wrapper .oracle-symbol {
  position: relative;
  z-index: 2;
  text-shadow: 
    0 0 15px rgba(0, 200, 255, 0.7),
    0 0 30px rgba(0, 150, 255, 0.5);
  font-size: 1.8rem;
}

.quantum-particles-flow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.7;
}

.quantum-particles-flow::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(0, 200, 255, 0.5) 50%, 
    transparent 100%
  );
  animation: particle-flow 2s linear infinite;
}

/* 历史神谕时间轴样式 */
.quantum-time-tunnel {
  position: relative;
  padding: 20px 0;
  overflow: hidden;
}

.tunnel-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 100, 200, 0.1) 0%,
    rgba(0, 50, 150, 0.05) 40%,
    transparent 70%
  );
  z-index: 0;
  animation: tunnel-pulse 8s ease-in-out infinite;
}

.time-axis {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
}

.time-node {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.node-date {
  width: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.date-box {
  background: rgba(10, 30, 60, 0.7);
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #80e0ff;
  font-weight: bold;
  text-align: center;
  border: 1px solid rgba(0, 150, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 150, 255, 0.2);
  z-index: 2;
}

.energy-connector {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(0, 150, 255, 0.8) 0%, 
    rgba(100, 200, 255, 0.3) 100%
  );
  position: relative;
  overflow: hidden;
}

.energy-connector::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(0, 200, 255, 0.8) 50%,
    transparent 100%
  );
  animation: energy-flow 2s linear infinite;
}

.node-content {
  flex: 1;
  background: rgba(15, 25, 50, 0.6);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 150, 255, 0.3);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 20px rgba(0, 100, 255, 0.15),
    inset 0 0 10px rgba(0, 150, 255, 0.1);
  transition: all 0.3s;
}

.node-content:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 5px 25px rgba(0, 150, 255, 0.2),
    inset 0 0 15px rgba(0, 150, 255, 0.2);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.history-pair {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
}

.node-accuracy {
  font-size: 0.9rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 20px;
}

.node-accuracy.high {
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
  border: 1px solid rgba(0, 220, 120, 0.3);
}

.node-accuracy.medium {
  background: rgba(200, 150, 0, 0.2);
  color: #fc3;
  border: 1px solid rgba(220, 180, 0, 0.3);
}

.node-accuracy.low {
  background: rgba(200, 50, 50, 0.2);
  color: #f88;
  border: 1px solid rgba(220, 80, 80, 0.3);
}

.prediction-box {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
  position: relative;
}

.quantum-particles-small {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  opacity: 0.5;
  pointer-events: none;
}

.history-detail {
  margin-top: 15px;
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.5;
}

.detail-btn {
  margin-top: 10px;
  background: rgba(0, 80, 150, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.4);
  color: #0cf;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.detail-btn:hover {
  background: rgba(0, 100, 180, 0.4);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.3);
}

.time-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px;
  background: rgba(10, 20, 40, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(0, 150, 255, 0.2);
}

.time-nav-btn {
  background: rgba(0, 80, 150, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.4);
  color: #0cf;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.time-nav-btn:hover {
  background: rgba(0, 100, 200, 0.4);
  transform: translateY(-2px);
}

.time-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 0.9rem;
  color: #8af;
}

.filter-btn {
  background: rgba(10, 30, 60, 0.5);
  border: 1px solid rgba(0, 120, 200, 0.3);
  color: #8af;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: rgba(0, 80, 150, 0.4);
  color: #0cf;
}

.filter-btn.active {
  background: rgba(0, 100, 200, 0.4);
  color: #0cf;
  border-color: rgba(0, 180, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.2);
}

.accuracy-summary {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-label {
  font-size: 0.9rem;
  color: #8af;
}

.summary-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #0df;
}

.trend-indicator {
  font-size: 0.9rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.trend-indicator.positive {
  background: rgba(0, 200, 100, 0.2);
  color: #0fa;
}

.trend-indicator.negative {
  background: rgba(200, 50, 50, 0.2);
  color: #f88;
}

/* 添加动画 */
@keyframes hologram-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes particle-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes tunnel-pulse {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(1); }
}

@keyframes energy-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* AI解币页面 */
.ai-analysis-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.quantum-lab-card {
  background: rgba(15, 25, 50, 0.7);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s;
  border: 1px solid rgba(0, 180, 255, 0.3);
  box-shadow: 
    0 0 25px rgba(0, 100, 255, 0.15),
    inset 0 0 15px rgba(0, 150, 255, 0.1);
}

.quantum-lab-controls {
  padding: 20px;
}

.control-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0ff;
  margin-bottom: 10px;
}

.dimension-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dimension-toggle {
  background: rgba(10, 30, 60, 0.5);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.dimension-toggle.active {
  background: rgba(0, 150, 255, 0.2);
  color: #0ff;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
}

.toggle-icon {
  font-size: 1.2rem;
  margin-right: 5px;
}

.toggle-label {
  font-size: 0.9rem;
}

.coin-input-section {
  margin-top: 20px;
}

.input-label {
  font-size: 1rem;
  color: #8af;
  margin-bottom: 5px;
}

.quantum-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(10, 30, 60, 0.5);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 10px;
  padding: 5px 10px;
}

.input-icon {
  font-size: 1.2rem;
}

.quantum-input {
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
}

.quantum-action-button {
  background: rgba(0, 150, 255, 0.3);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.quantum-action-button:hover {
  background: rgba(0, 180, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 150, 255, 0.3);
}

.btn-text {
  font-size: 0.9rem;
  color: #0ff;
}

.btn-energy {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, rgba(0, 150, 255, 0.1) 50%, transparent 70%);
  animation: pulse 2s ease-in-out infinite;
}

.input-note {
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 5px;
}

.quick-coins {
  margin-top: 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0ff;
  margin-bottom: 10px;
}

.coin-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.coin-option {
  background: rgba(10, 30, 60, 0.5);
  border: 1px solid rgba(0, 150, 255, 0.3);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.coin-option:hover {
  background: rgba(0, 150, 255, 0.1);
  color: #0ff;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
}

.coin-icon {
  font-size: 1.2rem;
  margin-right: 5px;
}

.coin-name {
  font-size: 0.9rem;
}

.analysis-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  background: rgba(10, 30, 60, 0.5);
  border: 1px dashed rgba(0, 150, 255, 0.3);
}

.quantum-loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 200, 255, 0.1);
  border-radius: 50%;
  border-top-color: #0cf;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.quantum-particles-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.1) 0%, rgba(0, 150, 255, 0.05) 50%, transparent 70%);
  animation: pulse 2s ease-in-out infinite;
}

.loading-text {
  color: #8af;
  font-size: 0.9rem;
}

.processing-steps {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #aaa;
}

.step {
  display: flex;
  align-items: center;
  gap: 5px;
}

.step .check {
  font-size: 1.2rem;
  color: #0fa;
}

.step.active .dots {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.analysis-result {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(10, 30, 60, 0.5);
  border: 1px solid rgba(0, 150, 255, 0.3);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.analyzed-coin {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0ff;
}

.analysis-timestamp {
  font-size: 0.9rem;
  color: rgba(150, 200, 255, 0.7);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.result-section {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #0ff;
  margin-bottom: 5px;
}

.section-icon {
  font-size: 1.2rem;
  margin-right: 5px;
}

.section-content {
  font-size: 0.9rem;
  color: #ddd;
}

.risk {
  font-size: 0.9rem;
  color: #f88;
  margin-top: 5px;
}

.result-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.result-action-btn {
  background: rgba(0, 150, 255, 0.3);
  border: 1px solid rgba(0, 200, 255, 0.4);
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-action-btn:hover {
  background: rgba(0, 180, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 150, 255, 0.3);
}

.empty-analysis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  background: rgba(10, 30, 60, 0.5);
  border: 1px dashed rgba(0, 150, 255, 0.3);
}

.empty-illustration {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
}

.empty-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0ff;
}

.empty-description {
  font-size: 0.9rem;
  color: #aaa;
  text-align: center;
}

.ai-brain-icon {
  width: 60px;
  height: 60px;
  background: rgba(0, 150, 255, 0.2);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.4);
}

.ai-brain-icon::before {
  content: '🧠';
  font-size: 30px;
}

.energy-waves {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed rgba(0, 200, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 10s linear infinite;
}

.energy-waves::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  border: 1px solid rgba(0, 150, 255, 0.3);
  animation: rotate 15s linear infinite reverse;
}

/* 修复图标样式 */
.section-icon.market::before {
  content: '📊';
}

.section-icon.technical::before {
  content: '📈';
}

.section-icon.onchain::before {
  content: '⛓️';
}

.section-icon.social::before {
  content: '👥';
}

.section-icon.institutional::before {
  content: '🏢';
}

.section-icon.advice::before {
  content: '💡';
}

.section-icon.risk::before {
  content: '⚠️';
}

.coin-icon.btc::before {
  content: '₿';
}

.coin-icon.eth::before {
  content: 'Ξ';
}

.coin-icon.sol::before {
  content: '◎';
}

.coin-icon.doge::before {
  content: 'Ð';
}

.coin-icon.pepe::before {
  content: '🐸';
}

.toggle-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}

.toggle-icon.technical::before {
  content: '📈';
}

.toggle-icon.market::before {
  content: '📊';
}

.toggle-icon.onchain::before {
  content: '⛓️';
}

.toggle-icon.social::before {
  content: '👥';
}

.toggle-icon.institutional::before {
  content: '🏢';
}

.section-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  margin-right: 5px;
}
</style> 