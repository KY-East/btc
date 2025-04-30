# EAT Whitepaper (V1.2) — Oracle Alpha Token

## 📅 Version
- V1.2
- Last Updated: 2025-04-30

---

## ☑️ 1. Project Overview

**Oracle Alpha** is a lightweight AI-driven trading oracle platform. Each day, users can log in and receive a free trading suggestion ("oracle") for one trending altcoin, powered by a multi-agent analysis system and Claude-style AI commentary.

**EAT (Oracle Alpha Token)** is the on-chain representation of Oracle Alpha's daily strategy performance. It enables users to financially engage with the platform's strategy performance without handing over their own assets.

---

## 🌍 2. EAT Definition & Purpose

**EAT is a token that tracks the net asset value (NAV) of Oracle Alpha's official self-managed strategy account.**

- ✅ It does **not** require API access to users' funds
- ✅ It does **not** perform delegated execution
- ✅ It does **not** guarantee profit

Users buy EAT to "bet on" Oracle Alpha's alpha-generating capability, knowing its price is backed by the platform's real-time NAV and supported by the team's buyback commitment.

---

## 🔄 3. Token Issuance & NAV Binding Mechanism

### 3.1 Initial Supply & Distribution
| Category       | Allocation | Notes                             |
|----------------|------------|-----------------------------------|
| Community Sale | 60%        | Via minting at NAV                |
| Team Vesting   | 20%        | 12-month linear unlock            |
| LP Reserves    | 10%        | DEX liquidity support             |
| DAO Treasury   | 10%        | Strategic reserves                |

### 3.2 NAV Calculation
- Calculated daily at UTC 00:00
- NAV_t = NAV_(t-1) * (1 + Daily Strategy Return)
- Publicly verifiable via a disclosed simulation or real wallet
- **验证机制**：策略钱包地址将公开可查，每日收益通过链上交易记录验证
- **滚动计算**：NAV累积计算，不会重置
- **延迟发布**：NAV计算后经过1小时审核期才公布，确保准确性
- **历史记录**：所有历史NAV数据将永久存储在链上以供查证

### 3.3 Minting Rules
- Users mint EAT at the **current NAV price**
- Example: NAV = $1.12 → 112 USDT mints 100 EAT
- Platform charges 1~3% minting fee

### 3.4 Controlled Access (Minting Limits)
- **EAT is not mintable at any time without constraint**
- Minting is **only available within controlled time windows**, to align with strategy reporting cycles
- Two supported modes:
  - **Daily Mode**: Each day, a limited number of EAT tokens are available for minting based on NAV, capped to 1~3% of circulating supply
  - **Weekly Mode**: E.g. every Monday, a 24h mint window opens, pegged to that day's NAV
- This restriction prevents inflation, creates anticipation, and preserves the value alignment between EAT and strategy NAV
- **铸造窗口预告**：提前24小时公布下一次铸造窗口时间
- **最低/最高铸造限额**：个人用户单次最低铸造100 USDT，最高10,000 USDT
- **阶梯式费率**：铸造量越大，手续费率递减(3%→1%)
- **排队机制**：高需求期间，铸造请求按提交顺序处理

### 3.5 Buyback Guarantee (Floor Price Protection)
- Oracle Alpha commits to using **self-managed strategy profits** for buyback
- If EAT market price < NAV, Oracle Alpha **initiates buybacks** using treasury
- This creates a price floor around NAV via natural arbitrage + team support
- Buyback may be routed through public DEX pools or internal LP vaults
- The platform may also choose to burn repurchased tokens or retain them as DAO reserves
- **回购资金来源明细**：
  - 铸造费：50%直接进入回购储备
  - 策略收益：20%分配给回购基金
  - 平台收入：15%分配给回购基金
- **回购执行流程**：价格低于阈值时自动触发，大额回购需团队多签批准
- **回购可视化**：所有回购交易公开透明展示在平台仪表盘
- **回购上限**：单日回购量不超过流通量的2%，避免市场操纵

---

## 💸 4. Why EAT Has Value

| Component       | Value Contribution                                      |
|----------------|----------------------------------------------------------|
| Strategy Alpha  | Real NAV performance from Oracle Alpha's daily strategies  |
| Minting Floor   | Price cannot fall far below NAV due to floor buys       |
| Team Skin-in-game | Team holds long-term vested EAT, incentivized to grow NAV |
| Limited Minting | New supply only at updated NAV price                    |

> **EAT = Alpha Tracking + Buyback Security + Long-Term Incentive Alignment**

---

## 📊 5. Market Behavior & Expectations

EAT price is designed to track NAV, but may temporarily deviate due to market forces:

- ⬆ Bull case: Market price > NAV → Users sell, or wait for new NAV mint
- ⬇ Bear case: Market price < NAV → Arbitrageurs + Oracle Alpha buyback kicks in

> Over time, the price will tend to revert to NAV due to economic pressure and buyback policy

---

## 🪜 6. Buyback & Treasury Policy

- Oracle Alpha uses a portion of strategy account profits for **daily/weekly buybacks**
- Buyback threshold: If EAT < NAV * 0.98
- Buyback funds allocated from platform profits (non-user funds)
- Optionally: Buyback tokens can be **burned** (supply deflation) or held (DAO reserves)
- DAO may govern long-term treasury allocation and supply curve adjustment

---

## 🚬 7. User Explanation (Public Narrative)

> "EAT is not a fund share, but a blockchain mirror of our strategy performance."
>
> "Every EAT is backed by our daily results. If we perform, EAT appreciates. If price drops below our performance (NAV), we buy it back."
>
> "You don't need to trust us, just track the NAV."

---

## 🌐 8. Similar Projects Reference

| Project               | Description                                                |
|----------------------|------------------------------------------------------------|
| Enzyme Finance       | On-chain portfolio manager, NAV transparent                |
| dHEDGE               | Manager vaults with trackable tokenized performance        |
| Ribbon Finance       | Structured products with NAV-based user allocations        |
| Gro Protocol Vaults  | Multi-strategy with principal protection mechanisms         |
| Index Coop / TokenSets | Basket index token with NAV mint/redeem pricing           |

EAT draws from these models but prioritizes simplicity, user incentives, and strong floor protection.

---

## 🚀 9. Roadmap Preview

- **Phase 1**: Daily oracle platform + NAV calculator + public strategy wallet
- **Phase 2**: EAT token live minting + internal floor buyback system
- **Phase 3**: On-chain NAV verifier + Telegram oracle bot + subscription tiering
- **Phase 4**: Multi-strategy support (e.g. EAT-MEME, EAT-STABLE)

---

## 📊 10. Closing Notes

EAT is not just a token. It's a confidence protocol around daily AI strategy, NAV-linked credibility, and a fair Web3-native way to participate in algorithmic alpha.

This paper is intended for internal understanding, partner communication, and DAO alignment. Not for public fundraising or regulatory solicitation.

---

## 11. 风险控制与合规

### 11.1 法律定位
- EAT代币定位为NAV表现追踪代币，而非证券或基金份额
- 用户购买EAT代表认可平台的策略表现，不构成投资合同
- 用户不将资金托管给平台，保持资产自主控制

### 11.2 免责条款
- EAT明确不保证收益，投资有风险
- 过往NAV表现不代表未来收益
- 用户应自行评估风险承受能力

### 11.3 风险缓释机制
- 极端市场情况下可启动铸造暂停机制
- 设置回购资金储备最低阈值
- 策略多样化以分散单一市场风险

### 11.4 KYC/AML合规
- 铸造大额EAT(超过5,000 USDT)需完成基础身份验证
- 遵循相关司法辖区的合规要求
- 保留可疑交易监控系统

---

## 12. 技术实现

### 12.1 区块链选择
- **主网部署**：Solana区块链
- **多链扩展计划**：
  - 第一阶段：Solana主网部署
  - 第二阶段：SUI生态系统整合
  - 第三阶段：TON区块链支持

### 12.2 代币技术规格
- **代币标准**：基于Solana的SPL Token标准
- **智能合约**：使用Rust编写的Solana程序
- **交易成本**：极低的Gas费用，有利于频繁回购操作
- **处理性能**：高TPS支持，铸造窗口期内可处理大量交易

### 12.3 核心技术组件
- **NAV喂价机制**：基于多签名的链下计算，链上验证
- **铸造控制逻辑**：时间窗口+供应量控制
- **回购自动化**：智能触发式回购程序
- **安全审计**：由Solana生态知名安全团队进行全面审计

### 12.4 选择Solana的优势
- 极低交易成本(有利于频繁回购操作)
- 高TPS支持(铸造窗口期内可处理大量交易)
- 活跃的DeFi生态(便于代币流通和DEX上线)
- 强大的开发工具和钱包支持 