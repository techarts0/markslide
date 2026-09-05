/**
 * 针对教师、Sales、PM 的精选预置示例 Markdown 课件
 */

export interface PresetTemplate {
  id: string;
  name: string;
  role: string;
  theme: 'academic' | 'business' | 'tech-pm';
  markdown: string;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'teacher',
    name: '大学计算机与算法课件',
    role: '教师 / 培训讲师',
    theme: 'academic',
    markdown: `---
marp: true
theme: academic
paginate: true
header: '《数据结构与算法》第七讲'
footer: '计算机科学学院 · 2026'
---

<!-- _class: lead -->

# 二叉树与递归遍历
### 核心概念与算法推导

主讲人：林教授 · 计算机科学系

---

# 教学目标与重点

通过本节课学习，大家需要掌握：

> **核心定义**：
> 二叉树（Binary Tree）是每个节点最多只有两个子树的树结构。
> 通常称为“左子树”（Left subtree）与“右子树”（Right subtree）。

### 本节关键任务
1. 理解前序、中序、后序递归遍历的本质
2. 掌握二叉平衡树的时间复杂度证明
3. 掌握树的遍历流程与状态转化

---

# 递归遍历调用流程 (Mermaid)

\`\`\`mermaid
graph TD
    Root((根节点 1)) --> Left((左节点 2))
    Root --> Right((右节点 3))
    Left --> L1((叶子 4))
    Left --> L2((叶子 5))
    Right --> R1((叶子 6))
    
    style Root fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style Left fill:#f1f5f9,stroke:#64748b
    style Right fill:#f1f5f9,stroke:#64748b
\`\`\`

---

# 复杂度数学证明 (KaTeX)

在高度为 $h$ 的满二叉树中，第 $i$ 层节点数为 $2^{i-1}$。
因此总节点数 $N$ 的求和公式为：

$$N = \\sum_{i=1}^{h} 2^{i-1} = 2^h - 1$$

由此可得树高 $h$ 与节点数 $N$ 的对数关系：

$$h = \\log_2(N + 1) = \\mathcal{O}(\\log N)$$

这证明了在平衡状态下搜索时间仅需对数级复杂度。

---

# 随堂巩固与互动

<div class="card-grid">
  <div class="card">
    <h3>📝 思考题 1</h3>
    <p>如果中序遍历序列为 <code>[4, 2, 5, 1, 6, 3]</code>，前序遍历序列为 <code>[1, 2, 4, 5, 3, 6]</code>，请画出二叉树结构。</p>
  </div>
  <div class="card">
    <h3>⏱️ 课堂演练</h3>
    <p>点击上方工具栏 <b>倒计时(T)</b> 开启 3 分钟独立思考，稍后使用 <b>抽签(R)</b> 邀请同学板书解析！</p>
  </div>
</div>
`
  },
  {
    id: 'sales',
    name: '企业级 AI 知识库方案',
    role: '商业 Sales / 售前顾问',
    theme: 'business',
    markdown: `---
marp: true
theme: business
paginate: true
header: 'Enterprise AI Solution 2026'
footer: '智汇科技 · 商业机密'
---

<!-- _class: lead -->

# 智枢 Enterprise AI
## 构建企业下一代自动化知识生产力

面向制造业与金融业的自研端到端垂直大模型方案

---

# 传统企业的核心知识痛点

* **文档分散在各类孤岛**（本地文件、ERP、企业Wiki无法互联）
* **新员工入职培训周期长达 3 个月**，隐性知识经验流失严重
* **客户服务响应迟缓**，人工客服在复杂专业提问下差错率超 22%

> "83% 的企业管理者认为知识检索效率低下是当前人效瓶颈的核心根源。"
> —— Gartner 2025 企业洞察

---

# 智枢解决方案架构 (Mermaid)

\`\`\`mermaid
flowchart LR
    A[非结构化文档] --> B(智能分块 & 嵌入向量化)
    B --> C[(企业向量数据库)]
    C --> D[自适应检索混合重排]
    D --> E{大模型认知推理}
    E --> F[精准业务回答 + 溯源]
    
    style E fill:#0284c7,stroke:#0369a1,color:#fff
\`\`\`

---

# 客户实测成效与投资回报率 (ROI)

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 30px;">
  <div>
    <div class="metric">75%</div>
    <div class="metric-label">客服响应提速</div>
    <p style="font-size: 18px; color: #64748b;">工单平均处理时间从 12 分钟压缩至 3 分钟以内</p>
  </div>
  <div>
    <div class="metric">3.8x</div>
    <div class="metric-label">新员工上手速度</div>
    <p style="font-size: 18px; color: #64748b;">自主查阅业务问答助手即可覆盖 90% 日常疑惑</p>
  </div>
  <div>
    <div class="metric">280%</div>
    <div class="metric-label">首年预期 ROI</div>
    <p style="font-size: 18px; color: #64748b;">直接节省培训、客服人力与合规差错风险成本</p>
  </div>
</div>

---

# 商业落地计划与保障

* **7 天完成私有化轻量PoC验证**：即刻接入测试语料
* **金融级数据安全保障**：数据不出企业局域网，不参与公网训练
* **7x24 专家团队专属护航**：首年赠送无忧模型微调与运维升级

**开启合作：sales@enterprise-ai.com**
`
  },
  {
    id: 'pm',
    name: 'Q3核心系统重构里程碑',
    role: '项目经理 (PM) / 研发主管',
    theme: 'tech-pm',
    markdown: `---
marp: true
theme: tech-pm
paginate: true
header: '核心中台 Q3 迭代评审'
footer: '研发中台部 · 内部汇报'
---

<!-- _class: lead -->

# Q3 核心中台服务重构
### 进展同步、技术指标与上线推演

汇报人：技术中台 PM 组

---

# 阶段整体执行状态看板

<div class="panel">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
    <span><b>模块 1: 用户鉴权与 Session 微服务拆分</b></span>
    <span class="badge-done">已完成 100%</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
    <span><b>模块 2: 分布式网关 Rust 重写</b></span>
    <span class="badge-wip">进行中 85%</span>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span><b>模块 3: 老旧 Oracle 到分布式数据库迁移</b></span>
    <span class="badge-risk">有风险 50%</span>
  </div>
</div>

> **风险预警**：老系统存在多处未规范的存储过程，灰度切换已推迟 3 天，已安排 DBA 专项攻坚。

---

# 灰度发布流水线 (Mermaid)

\`\`\`mermaid
sequenceDiagram
    participant C as 客户端流量
    participant GW as 边缘网关 (V2)
    participant V1 as 老系统 (90%)
    participant V2 as 新微服务 (10%)
    
    C->>GW: 请求接入
    GW->>GW: 路由策略评估
    GW->>V2: 灰度命中流量
    GW->>V1: 其余基线流量
    V2-->>GW: 耗时 < 15ms (P99)
    GW-->>C: 快速响应
\`\`\`

---

# 核心压测数据改善一览

* **P99 响应延迟**：从原有 \`180ms\` 直降至 \`14.2ms\`
* **吞吐量 (QPS)**：单实例从 \`3,200\` 提升到 \`28,500+\`
* **机器资源成本**：CPU 与内存消耗同比下降 **43%**

\`\`\`bash
# 验证端点健康状态
curl -X GET https://gateway.internal/health -H "X-Canary: v2"
# {"status":"UP","latency_p99_ms":12.4,"node_id":"sg-04"}
\`\`\`

---

# 下一步交付排期与资源协调

1. **9月10日前**：完成存储过程转离线 Go 脚本的压测与数据对账
2. **9月15日晚**：进行全量 100% 流量热切
3. **协同事项**：需要运维团队配合在下周二前开通专线防火墙白名单
`
  }
];
