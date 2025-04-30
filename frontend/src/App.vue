<template>
  <div class="app">
    <header>
      <nav class="nav">
        <div class="logo">
          <img src="./assets/logo.svg" alt="Oracle Alpha Logo" />
          <h1>Oracle Alpha</h1>
        </div>
        <div class="nav-links">
          <a href="#features">核心功能</a>
          <a href="#solution">解决方案</a>
          <a href="#architecture">技术架构</a>
          <a href="#roadmap">发展路线</a>
        </div>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-content">
          <h1>Oracle Alpha</h1>
          <p class="subtitle">面向散户的AI交易神谕平台</p>
          <p>将复杂的市场分析简化为直观的交易决策</p>
          <p class="tagline">"Trade with answers, not questions."</p>
          <div class="cta-buttons">
            <button class="primary-btn">了解详情</button>
            <button class="secondary-btn" @click="showWhitepaper = true">查看白皮书</button>
          </div>
        </div>
        <div class="hero-image">
          <img src="./assets/hero-image.svg" alt="Oracle Alpha" />
        </div>
      </section>

      <section id="features" class="features">
        <h2>核心功能</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-icon">🔮</div>
            <h3>Alpha神谕</h3>
            <p>每日针对热点币种发布简明交易建议，由多智能体协作系统分析生成</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>神谕解读</h3>
            <p>提供一句话解释背后逻辑，增强决策透明度和可理解性</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>EAT代币系统</h3>
            <p>策略表现的代币化映射，与NAV挂钩，实现无托管资金的策略参与</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>极简用户体验</h3>
            <p>查看→判断→行动的三步式决策流程，降低用户决策负担</p>
          </div>
        </div>
      </section>

      <section id="solution" class="market-problems">
        <h2>市场痛点与解决方案</h2>
        <div class="problems-grid">
          <div class="problem-card">
            <h3>散户决策机制缺陷</h3>
            <ul>
              <li>决策非系统化，主要依赖KOL观点</li>
              <li>FOMO驱动交易行为</li>
              <li>信息过载导致分析瘫痪</li>
            </ul>
            <div class="solution">
              <h4>解决方案</h4>
              <p>提供每日神谕，简化决策过程，减轻分析负担</p>
            </div>
          </div>
          <div class="problem-card">
            <h3>现有工具局限性</h3>
            <ul>
              <li>交互复杂度高，不友好</li>
              <li>信息呈现过载，数据泛滥</li>
              <li>缺乏真正给出明确建议的产品</li>
            </ul>
            <div class="solution">
              <h4>解决方案</h4>
              <p>直接提供"买入/观望/减仓"的明确指示，简化交互</p>
            </div>
          </div>
          <div class="problem-card">
            <h3>策略参与门槛</h3>
            <ul>
              <li>参与机构级策略需要托管资金</li>
              <li>跟单系统缺乏透明度</li>
              <li>投资者难以灵活进出策略</li>
            </ul>
            <div class="solution">
              <h4>解决方案</h4>
              <p>通过EAT代币系统实现无托管参与，透明NAV计算</p>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" class="architecture">
        <h2>技术架构</h2>
        <div class="tech-stack">
          <div class="tech-column">
            <h3>前端架构</h3>
            <ul>
              <li>轻量级UI设计</li>
              <li>定时推送机制</li>
              <li>响应式移动端体验</li>
              <li>Vue 3 + Vite技术栈</li>
            </ul>
          </div>
          <div class="tech-column">
            <h3>后端架构</h3>
            <ul>
              <li>多智能体协作系统</li>
              <li>大语言模型集成（Claude API）</li>
              <li>决策融合算法</li>
              <li>Python分布式处理</li>
            </ul>
          </div>
          <div class="tech-column">
            <h3>区块链集成</h3>
            <ul>
              <li>Solana智能合约</li>
              <li>链上NAV验证机制</li>
              <li>多链扩展架构</li>
              <li>SPL代币标准</li>
            </ul>
          </div>
        </div>
        <div class="architecture-diagram">
          <img src="./assets/about-image.svg" alt="Oracle Alpha Architecture" />
        </div>
      </section>

      <section id="roadmap" class="roadmap">
        <h2>发展路线</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker">1</div>
            <div class="timeline-content">
              <h3>Alpha阶段（1-2个月）</h3>
              <ul>
                <li>神谕终端MVP版本上线</li>
                <li>策略账户透明展示</li>
                <li>NAV计算器和展示页面实现</li>
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker">2</div>
            <div class="timeline-content">
              <h3>Beta阶段（3-4个月）</h3>
              <ul>
                <li>EAT代币Solana合约部署</li>
                <li>铸造和回购机制实现</li>
                <li>初始用户社区建立</li>
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker">3</div>
            <div class="timeline-content">
              <h3>公开发布（5-6个月）</h3>
              <ul>
                <li>神谕订阅分层系统（基础/高级）</li>
                <li>Telegram机器人集成</li>
                <li>链上NAV验证机制上线</li>
              </ul>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker">4</div>
            <div class="timeline-content">
              <h3>生态扩展（7-12个月）</h3>
              <ul>
                <li>推出EAT-MEME（短周期策略）</li>
                <li>推出EAT-STABLE（低波动策略）</li>
                <li>多链支持（SUI、TON）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="competitive-edge">
        <h2>竞争优势</h2>
        <div class="edge-cards">
          <div class="edge-card">
            <h3>决策简化</h3>
            <p>不同于提供分析工具的平台，直接给出行动建议</p>
          </div>
          <div class="edge-card">
            <h3>无托管模式</h3>
            <p>不同于资金管理平台，不接管用户资金，降低信任门槛</p>
          </div>
          <div class="edge-card">
            <h3>透明策略</h3>
            <p>不同于信号服务，提供可验证的策略表现和NAV计算</p>
          </div>
        </div>
        <div class="quote-box">
          <blockquote>
            "优秀的AI产品应当是将复杂性隐藏在简单界面之后，而非增加用户的认知负担。"
          </blockquote>
        </div>
      </section>

      <section class="newsletter">
        <h2>加入项目内测名单</h2>
        <p>获取最新的项目进展和测试机会</p>
        <div class="signup-form">
          <input type="email" placeholder="输入你的邮箱" />
          <button class="primary-btn">订阅</button>
        </div>
        <div class="social-links">
          <a href="#" target="_blank">Twitter</a>
          <a href="#" target="_blank">Telegram</a>
          <a href="#" target="_blank">Discord</a>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="./assets/logo.svg" alt="Oracle Alpha Logo" />
          <p>Oracle Alpha - AI交易神谕平台</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>产品</h4>
            <a href="#features">核心功能</a>
            <a href="#solution">解决方案</a>
            <a href="#roadmap">发展路线</a>
          </div>
          <div class="footer-column">
            <h4>资源</h4>
            <a href="#">文档</a>
            <a href="#" @click.prevent="showWhitepaper = true">白皮书</a>
            <a href="#">GitHub</a>
          </div>
          <div class="footer-column">
            <h4>关于</h4>
            <a href="#">团队</a>
            <a href="#">联系我们</a>
            <a href="#">内部Wiki</a>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2025 Oracle Alpha. All Rights Reserved.</p>
      </div>
    </footer>

    <!-- 白皮书模态窗口 -->
    <div v-if="showWhitepaper" class="whitepaper-modal">
      <div class="whitepaper-content">
        <div class="whitepaper-header">
          <h2>EAT白皮书</h2>
          <button class="close-btn" @click="showWhitepaper = false">×</button>
        </div>
        <div class="whitepaper-body">
          <h1>EAT白皮书 (V1.2) — Oracle Alpha代币</h1>
          
          <section>
            <h2>📅 版本</h2>
            <ul>
              <li>V1.2</li>
              <li>最后更新: 2025-04-30</li>
            </ul>
          </section>
          
          <hr>
          
          <section>
            <h2>☑️ 1. 项目概述</h2>
            <p><strong>Oracle Alpha</strong>是一个轻量级AI驱动的交易神谕平台。每天，用户可以登录并获得一个免费的交易建议（"神谕"），针对一个热门的山寨币，由多智能体分析系统和Claude风格的AI解读提供支持。</p>
            <p><strong>EAT (Oracle Alpha Token)</strong>是Oracle Alpha日常策略表现的链上代表。它使用户能够在不交出自己资产的情况下，从财务上参与平台的策略表现。</p>
          </section>
          
          <hr>
          
          <section>
            <h2>🌍 2. EAT定义与目的</h2>
            <p><strong>EAT是一种追踪Oracle Alpha官方自管理策略账户净资产值(NAV)的代币。</strong></p>
            <ul>
              <li>✅ 它<strong>不</strong>需要访问用户资金的API</li>
              <li>✅ 它<strong>不</strong>执行委托交易</li>
              <li>✅ 它<strong>不</strong>保证盈利</li>
            </ul>
            <p>用户购买EAT是在"押注"Oracle Alpha产生超额收益的能力，他们知道其价格由平台的实时NAV支撑，并由团队的回购承诺提供支持。</p>
          </section>
          
          <hr>
          
          <section>
            <h2>🔄 3. 代币发行与NAV绑定机制</h2>
            
            <h3>3.1 初始供应与分配</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>分配比例</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>社区销售</td>
                    <td>60%</td>
                    <td>通过NAV价格铸造</td>
                  </tr>
                  <tr>
                    <td>团队锁定</td>
                    <td>20%</td>
                    <td>12个月线性解锁</td>
                  </tr>
                  <tr>
                    <td>LP储备</td>
                    <td>10%</td>
                    <td>DEX流动性支持</td>
                  </tr>
                  <tr>
                    <td>DAO国库</td>
                    <td>10%</td>
                    <td>战略储备</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3>3.2 NAV计算</h3>
            <ul>
              <li>每日UTC 00:00计算</li>
              <li>NAV_t = NAV_(t-1) * (1 + 日策略收益)</li>
              <li>通过公开的模拟或真实钱包可验证</li>
              <li><strong>验证机制</strong>：策略钱包地址将公开可查，每日收益通过链上交易记录验证</li>
              <li><strong>滚动计算</strong>：NAV累积计算，不会重置</li>
              <li><strong>延迟发布</strong>：NAV计算后经过1小时审核期才公布，确保准确性</li>
              <li><strong>历史记录</strong>：所有历史NAV数据将永久存储在链上以供查证</li>
            </ul>
            
            <h3>3.3 铸造规则</h3>
            <ul>
              <li>用户以<strong>当前NAV价格</strong>铸造EAT</li>
              <li>例如：NAV = $1.12 → 112 USDT铸造100 EAT</li>
              <li>平台收取1~3%铸造费</li>
            </ul>
            
            <h3>3.4 受控访问（铸造限制）</h3>
            <ul>
              <li><strong>EAT不能在任何时间无限制铸造</strong></li>
              <li>铸造<strong>仅在受控的时间窗口内可用</strong>，以与策略报告周期保持一致</li>
              <li>支持两种模式：
                <ul>
                  <li><strong>每日模式</strong>：每天，有限数量的EAT代币可基于NAV铸造，上限为流通供应的1~3%</li>
                  <li><strong>每周模式</strong>：例如，每周一开放24小时铸造窗口，与当天NAV挂钩</li>
                </ul>
              </li>
              <li>这一限制防止通胀，创造期待感，并保持EAT与策略NAV之间的价值一致性</li>
              <li><strong>铸造窗口预告</strong>：提前24小时公布下一次铸造窗口时间</li>
              <li><strong>最低/最高铸造限额</strong>：个人用户单次最低铸造100 USDT，最高10,000 USDT</li>
              <li><strong>阶梯式费率</strong>：铸造量越大，手续费率递减(3%→1%)</li>
              <li><strong>排队机制</strong>：高需求期间，铸造请求按提交顺序处理</li>
            </ul>
            
            <h3>3.5 回购保证（底价保护）</h3>
            <ul>
              <li>Oracle Alpha承诺使用<strong>自管理策略利润</strong>进行回购</li>
              <li>如果EAT市场价格 &lt; NAV，Oracle Alpha使用资金库<strong>启动回购</strong></li>
              <li>这通过自然套利+团队支持，在NAV周围创造价格底线</li>
              <li>回购可通过公共DEX池或内部LP保险库进行</li>
              <li>平台也可选择销毁回购的代币或将其保留为DAO储备</li>
              <li><strong>回购资金来源明细</strong>：
                <ul>
                  <li>铸造费：50%直接进入回购储备</li>
                  <li>策略收益：20%分配给回购基金</li>
                  <li>平台收入：15%分配给回购基金</li>
                </ul>
              </li>
              <li><strong>回购执行流程</strong>：价格低于阈值时自动触发，大额回购需团队多签批准</li>
              <li><strong>回购可视化</strong>：所有回购交易公开透明展示在平台仪表盘</li>
              <li><strong>回购上限</strong>：单日回购量不超过流通量的2%，避免市场操纵</li>
            </ul>
          </section>
          
          <hr>
          
          <section>
            <h2>💸 4. EAT为何有价值</h2>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>组成部分</th>
                    <th>价值贡献</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>策略超额收益</td>
                    <td>来自Oracle Alpha日常策略的真实NAV表现</td>
                  </tr>
                  <tr>
                    <td>铸造底价</td>
                    <td>由于底价买入，价格不会远低于NAV</td>
                  </tr>
                  <tr>
                    <td>团队利益一致</td>
                    <td>团队持有长期锁定的EAT，激励其增长NAV</td>
                  </tr>
                  <tr>
                    <td>有限铸造</td>
                    <td>新供应仅按更新的NAV价格</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <blockquote><strong>EAT = 超额收益追踪 + 回购安全 + 长期激励一致</strong></blockquote>
          </section>
          
          <hr>
          
          <section>
            <h2>📊 5. 市场行为与预期</h2>
            <p>EAT价格设计为追踪NAV，但可能由于市场力量而暂时偏离：</p>
            <ul>
              <li>⬆ 牛市情况：市场价格 &gt; NAV → 用户出售，或等待新NAV铸造</li>
              <li>⬇ 熊市情况：市场价格 &lt; NAV → 套利者+Oracle Alpha回购机制启动</li>
            </ul>
            <blockquote>随着时间推移，由于经济压力和回购政策，价格将趋向于回归NAV</blockquote>
          </section>
          
          <hr>
          
          <section>
            <h2>🪜 6. 回购与国库政策</h2>
            <ul>
              <li>Oracle Alpha使用策略账户利润的一部分进行<strong>每日/每周回购</strong></li>
              <li>回购阈值：如果EAT &lt; NAV * 0.98</li>
              <li>回购资金从平台利润分配（非用户资金）</li>
              <li>可选：回购的代币可以<strong>销毁</strong>（供应通缩）或持有（DAO储备）</li>
              <li>DAO可能管理长期国库分配和供应曲线调整</li>
            </ul>
          </section>
          
          <hr>
          
          <section>
            <h2>🚬 7. 用户解释（公共叙述）</h2>
            <blockquote>"EAT不是基金份额，而是我们策略表现的区块链镜像。"</blockquote>
            <blockquote>"每个EAT都由我们的日常结果支持。如果我们表现良好，EAT升值。如果价格低于我们的表现(NAV)，我们会回购。"</blockquote>
            <blockquote>"你不需要信任我们，只需追踪NAV。"</blockquote>
          </section>
          
          <hr>
          
          <section>
            <h2>🌐 8. 类似项目参考</h2>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Enzyme Finance</td>
                    <td>链上投资组合管理器，NAV透明</td>
                  </tr>
                  <tr>
                    <td>dHEDGE</td>
                    <td>管理者保险库，可追踪的代币化表现</td>
                  </tr>
                  <tr>
                    <td>Ribbon Finance</td>
                    <td>具有基于NAV的用户分配的结构化产品</td>
                  </tr>
                  <tr>
                    <td>Gro Protocol Vaults</td>
                    <td>多策略与本金保护机制</td>
                  </tr>
                  <tr>
                    <td>Index Coop / TokenSets</td>
                    <td>篮子指数代币，具有NAV铸造/赎回定价</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>EAT借鉴了这些模型，但优先考虑简单性、用户激励和强大的底价保护。</p>
          </section>
          
          <hr>
          
          <section>
            <h2>🚀 9. 路线图预览</h2>
            <ul>
              <li><strong>阶段1</strong>：日常神谕平台 + NAV计算器 + 公开策略钱包</li>
              <li><strong>阶段2</strong>：EAT代币实时铸造 + 内部底价回购系统</li>
              <li><strong>阶段3</strong>：链上NAV验证器 + Telegram神谕机器人 + 订阅分级</li>
              <li><strong>阶段4</strong>：多策略支持（例如EAT-MEME，EAT-STABLE）</li>
            </ul>
          </section>
          
          <hr>
          
          <section>
            <h2>📊 10. 结束语</h2>
            <p>EAT不仅仅是一个代币。它是围绕日常AI策略、NAV链接信誉和公平的Web3原生方式来参与算法超额收益的信心协议。</p>
            <p>本白皮书旨在内部理解、合作伙伴沟通和DAO对齐。不用于公开募资或监管招揽。</p>
          </section>
          
          <hr>
          
          <section>
            <h2>11. 风险控制与合规</h2>
            
            <h3>11.1 法律定位</h3>
            <ul>
              <li>EAT代币定位为NAV表现追踪代币，而非证券或基金份额</li>
              <li>用户购买EAT代表认可平台的策略表现，不构成投资合同</li>
              <li>用户不将资金托管给平台，保持资产自主控制</li>
            </ul>
            
            <h3>11.2 免责条款</h3>
            <ul>
              <li>EAT明确不保证收益，投资有风险</li>
              <li>过往NAV表现不代表未来收益</li>
              <li>用户应自行评估风险承受能力</li>
            </ul>
            
            <h3>11.3 风险缓释机制</h3>
            <ul>
              <li>极端市场情况下可启动铸造暂停机制</li>
              <li>设置回购资金储备最低阈值</li>
              <li>策略多样化以分散单一市场风险</li>
            </ul>
            
            <h3>11.4 KYC/AML合规</h3>
            <ul>
              <li>铸造大额EAT(超过5,000 USDT)需完成基础身份验证</li>
              <li>遵循相关司法辖区的合规要求</li>
              <li>保留可疑交易监控系统</li>
            </ul>
          </section>
          
          <hr>
          
          <section>
            <h2>12. 技术实现</h2>
            
            <h3>12.1 区块链选择</h3>
            <ul>
              <li><strong>主网部署</strong>：Solana区块链</li>
              <li><strong>多链扩展计划</strong>：
                <ul>
                  <li>第一阶段：Solana主网部署</li>
                  <li>第二阶段：SUI生态系统整合</li>
                  <li>第三阶段：TON区块链支持</li>
                </ul>
              </li>
            </ul>
            
            <h3>12.2 代币技术规格</h3>
            <ul>
              <li><strong>代币标准</strong>：基于Solana的SPL Token标准</li>
              <li><strong>智能合约</strong>：使用Rust编写的Solana程序</li>
              <li><strong>交易成本</strong>：极低的Gas费用，有利于频繁回购操作</li>
              <li><strong>处理性能</strong>：高TPS支持，铸造窗口期内可处理大量交易</li>
            </ul>
            
            <h3>12.3 核心技术组件</h3>
            <ul>
              <li><strong>NAV喂价机制</strong>：基于多签名的链下计算，链上验证</li>
              <li><strong>铸造控制逻辑</strong>：时间窗口+供应量控制</li>
              <li><strong>回购自动化</strong>：智能触发式回购程序</li>
              <li><strong>安全审计</strong>：由Solana生态知名安全团队进行全面审计</li>
            </ul>
            
            <h3>12.4 选择Solana的优势</h3>
            <ul>
              <li>极低交易成本(有利于频繁回购操作)</li>
              <li>高TPS支持(铸造窗口期内可处理大量交易)</li>
              <li>活跃的DeFi生态(便于代币流通和DEX上线)</li>
              <li>强大的开发工具和钱包支持</li>
            </ul>
          </section>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { whitepaper } from './assets/whitepaper.js';

export default {
  name: 'App',
  data() {
    return {
      showWhitepaper: false,
      whitepaper: whitepaper
    }
  },
  computed: {
    whitepaperHtml() {
      // 简单的Markdown转HTML处理，实际项目中应使用marked.js等库
      return this.whitepaper
        .replace(/# (.*)/g, '<h1>$1</h1>')
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/---/g, '<hr>')
        .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
        .replace(/\n- (.*)/g, '<br>• $1');
    }
  },
  methods: {
    // 可以在这里添加方法
  }
}
</script>

<style>
/* 基础样式会在main.css中定义，这里只添加组件特定样式 */
.app {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E3A8A;
}

.nav-links a {
  margin-left: 20px;
  color: #444;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  color: #1E3A8A;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem 5%;
  background: linear-gradient(135deg, #f5f7ff 0%, #e4ebff 100%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.hero-content .subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.tagline {
  font-style: italic;
  color: #666;
  font-size: 1.1rem;
  margin: 1rem 0;
}

.cta-buttons {
  margin-top: 2rem;
}

.primary-btn {
  background-color: #1E3A8A;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 1rem;
}

.secondary-btn {
  background-color: white;
  color: #1E3A8A;
  border: 2px solid #1E3A8A;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 500px;
}

.hero-image img {
  max-width: 100%;
}

section {
  padding: 5rem 5%;
}

.features, .market-problems, .architecture, .roadmap, .competitive-edge, .newsletter {
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #1E3A8A;
  margin-bottom: 3rem;
}

.feature-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 250px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1E3A8A;
}

/* 市场痛点部分 */
.problems-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.problem-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: left;
}

.problem-card h3 {
  color: #1E3A8A;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.problem-card ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.problem-card li {
  margin-bottom: 0.5rem;
}

.solution {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.solution h4 {
  color: #10B981;
  margin-bottom: 0.5rem;
}

/* 技术架构部分 */
.tech-stack {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tech-column {
  flex: 1;
  min-width: 250px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin: 0 1rem 2rem;
}

.tech-column h3 {
  color: #1E3A8A;
  margin-bottom: 1rem;
  text-align: left;
}

.tech-column ul {
  text-align: left;
  padding-left: 1.5rem;
}

.tech-column li {
  margin-bottom: 0.75rem;
}

.architecture-diagram {
  max-width: 700px;
  margin: 0 auto;
}

.architecture-diagram img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

/* 竞争优势部分 */
.edge-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.edge-card {
  background: #1E3A8A;
  color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 300px;
}

.edge-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.quote-box {
  max-width: 800px;
  margin: 3rem auto 0;
  padding: 2rem;
  background: #f5f7ff;
  border-radius: 8px;
  border-left: 5px solid #1E3A8A;
}

.quote-box blockquote {
  font-size: 1.25rem;
  font-style: italic;
  color: #1E3A8A;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 2px;
  background: #1E3A8A;
}

.timeline-item {
  position: relative;
  padding-left: 100px;
  margin-bottom: 3rem;
  text-align: left;
}

.timeline-marker {
  position: absolute;
  left: 42px;
  width: 20px;
  height: 20px;
  background: #1E3A8A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
}

.timeline-content h3 {
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.timeline-content ul {
  padding-left: 1.25rem;
}

.timeline-content li {
  margin-bottom: 0.5rem;
}

.newsletter {
  background: #f5f7ff;
  border-radius: 8px;
  margin: 0 5%;
  padding: 3rem;
}

.signup-form {
  display: flex;
  max-width: 500px;
  margin: 2rem auto;
}

.signup-form input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.signup-form button {
  border-radius: 0 4px 4px 0;
  margin-right: 0;
}

.social-links {
  margin-top: 1rem;
}

.social-links a {
  margin: 0 10px;
  color: #1E3A8A;
  text-decoration: none;
  font-weight: 500;
}

footer {
  background: #1E3A8A;
  color: white;
  padding: 3rem 5% 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.footer-logo img {
  height: 30px;
  margin-bottom: 1rem;
}

.footer-links {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.footer-column h4 {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.footer-column a {
  display: block;
  color: #ddd;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.footer-column a:hover {
  color: white;
}

.copyright {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }
  
  .hero-content {
    max-width: 100%;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .feature-cards, .problems-grid, .tech-stack, .edge-cards {
    gap: 1rem;
  }
  
  .feature-card, .problem-card, .tech-column, .edge-card {
    width: 100%;
    max-width: 350px;
  }
  
  .nav-links {
    display: none;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-logo {
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 1.5rem;
  }
}

/* 白皮书模态窗口样式 */
.whitepaper-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.whitepaper-content {
  background-color: white;
  width: 90%;
  max-width: 900px;
  height: 90vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.whitepaper-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1E3A8A;
  color: white;
}

.whitepaper-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.whitepaper-body {
  padding: 2rem;
  overflow-y: auto;
  line-height: 1.6;
  height: 100%;
}

.whitepaper-body h1 {
  font-size: 2rem;
  color: #1E3A8A;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.whitepaper-body h2 {
  font-size: 1.5rem;
  color: #1E3A8A;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.whitepaper-body h3 {
  font-size: 1.25rem;
  color: #2C5282;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.whitepaper-body p {
  margin-bottom: 1rem;
}

.whitepaper-body ul {
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 1.5rem;
}

.whitepaper-body li {
  margin-bottom: 0.5rem;
}

.whitepaper-body strong {
  font-weight: 600;
}

.whitepaper-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.whitepaper-body th {
  background-color: #EBF8FF;
  border: 1px solid #CBD5E0;
  padding: 0.75rem;
  font-weight: 600;
}

.whitepaper-body td {
  border: 1px solid #CBD5E0;
  padding: 0.75rem;
}

.whitepaper-body .table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.whitepaper-body blockquote {
  border-left: 4px solid #1E3A8A;
  padding: 0.5rem 0 0.5rem 1.5rem;
  margin: 1.5rem 0;
  background-color: #F7FAFC;
}

.whitepaper-body hr {
  border: none;
  height: 1px;
  background-color: #E2E8F0;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .whitepaper-content {
    width: 95%;
    height: 95vh;
  }
  
  .whitepaper-body {
    padding: 1rem;
  }
  
  .whitepaper-body table {
    display: block;
    overflow-x: auto;
  }
}
</style> 