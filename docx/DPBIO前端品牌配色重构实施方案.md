# DPBIO 前端品牌配色重构实施方案

版本：1.0  
日期：2026-09-05  
适用范围：`D:\Desktop\DPRemote` 项目中的 `ui/` 前端与 Manager 品牌配置  
设计依据：`达普品牌形象视觉识别手册_20250409_RGB.pdf`、`logo.png`、现有 OpenRemote UI 架构与 `ui/AGENTS.md`

## 1. 结论与目标

本次重构应采用“保留产品骨架，替换视觉语言”的方式。现有前端是基于 Lit、Vaadin 和 Lumo 构建的高密度企业级管理界面，已有成熟的信息架构、权限体系、路由、表单、表格、地图和仪表盘能力。最稳妥且效果最好的路径不是重做页面，也不是再引入一套组件库，而是继续以 Vaadin/Lumo 为基础，将 DPBIO 的品牌色、字体、Logo、状态色、图表色和表面层级沉淀为统一的设计令牌，再逐步消除绕过令牌的硬编码颜色。

最终界面应该让用户感受到：专业、可信、精密、清晰、具有生命科学仪器公司的技术气质。视觉上应克制、稳定、有秩序，不做营销落地页式的夸张造型，不使用泛滥的渐变、玻璃拟态、发光、悬浮装饰和模板化卡片阵列。

本方案只改变视觉呈现，不改变原有功能、业务流程、数据结构、权限判断、接口契约、路由、导航命名、表单字段、字段顺序和交互结果。

## 2. 设计方向

### 2.1 Design Read

面向楼宇、设备和物联网运营人员的企业级管理前端，采用可信、克制、工程化的 DPBIO 品牌语言，在保留信息架构和交互行为的前提下进行定向视觉演进。

设计参数：

| 维度 | 建议值 | 解释 |
| --- | ---: | --- |
| 设计变化幅度 | 4/10 | 明显品牌化，但不重排现有页面结构 |
| 动效强度 | 3/10 | 只保留状态反馈和层级切换所需动效 |
| 信息密度 | 7/10 | 保持企业管理系统的高效浏览和操作密度 |

### 2.2 视觉气质关键词

- 精密：清晰的网格、间距、对齐和数据层级。
- 可信：高对比度文字、稳定的深蓝主色、明确的状态反馈。
- 科技：用 DPBIO 蓝色体系和少量品牌三角图形表达，不靠霓虹和炫光。
- 生命科学：适度使用浅蓝、青色和绿色，但不把界面做成通用医疗模板。
- 克制：装饰只用于少数品牌锚点，内容区以效率和可读性为先。

## 3. 品牌手册提炼

### 3.1 Logo 规则

品牌标志由图形与 DPBIO 字标组成。图形体现合作、循环、创新和科技感。Logo 的标准组合关系不可拆分、挪位、压缩、拉伸或改变字距。

必须遵守以下规则：

- Logo 四周保留至少一个手册定义的 `d` 保护空间。
- 数字场景最小显示尺寸不得低于手册规定的 14 px。实际产品头部建议彩色横版 Logo 高度为 24 至 28 px，移动端图形标建议为 28 px，并在现有 50 px 头部中保持视觉居中。
- 白色或非常浅的纯色背景使用标准彩色 Logo。
- 深蓝、品牌蓝或其他深色背景使用官方反白 Logo。
- 不在复杂照片、高对比纹理、青色或蓝色干扰背景上直接放置彩色 Logo。
- 禁止对 Logo 使用渐变、描边、投影、外发光、透明叠色或任意改色。
- 桌面横版、移动端图形标、反白版和 favicon 应分别使用官方源文件，不以 CSS 裁切一个文件代替所有版本。

### 3.2 标准色

| 名称 | RGB | HEX | 建议用途 |
| --- | --- | --- | --- |
| 达普蓝 | 2 / 21 / 193 | `#0215C1` | 主操作、选中态、品牌标题、关键链接 |
| 达普浅蓝 | 3 / 149 / 255 | `#0395FF` | 焦点环、信息提示、辅助高亮、深色主题主操作 |

### 3.3 辅助色

| HEX | 建议语义 |
| --- | --- |
| `#00C8FF` | 青色数据系列、图表辅助高亮 |
| `#0032BE` | 主按钮悬停、较深的交互蓝 |
| `#8CC800` | 成功、在线、正常状态 |
| `#D2D2D2` | 标准边框、分割线 |
| `#00AAFF` | 信息类图标、次级数据系列 |
| `#000064` | 深色表面、深色文字、主按钮按下态 |
| `#FFBE00` | 警告、待处理、需要关注 |
| `#969696` | 禁用元素、非关键说明、强分割线 |
| `#0082FF` | 信息状态、图表蓝色层级 |
| `#000046` | 最深背景、深色主题画布、强标题 |
| `#E60050` | 错误、危险、离线、破坏性操作 |
| `#4B4B4B` | 浅色主题正文文字 |

这些辅助色不能被当成等权重的“彩虹调色板”随意散布。产品主交互只使用一套蓝色体系。绿色、黄色和红色必须优先保留给状态语义，避免同一颜色在不同页面表达不同含义。

### 3.4 字体

品牌手册指定 HarmonyOS Sans，包含 Thin、Light、Regular、Medium、Bold 和 Black。产品界面建议只使用以下字重：

- 正文与数据：400 Regular。
- 按钮、标签和表头：500 Medium。
- 页面标题与关键数字：600 或 700，若字体文件未提供 600 则使用 700 Bold。
- 不使用 Thin 和 Light 承载小字号正文，避免低对比和 Windows 渲染发虚。

建议字体栈：

```css
font-family: "HarmonyOS Sans SC", "HarmonyOS Sans", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
```

项目当前没有 `ui/app/shared/fonts` 字体目录，也没有 HarmonyOS Sans 文件。实施前需要取得公司确认可用于 Web 分发的 WOFF2 字体文件，并按字重进行本地托管。字体文件未就绪时先使用系统中文字体回退，不应从不明 CDN 引入。

### 3.5 辅助图形

手册中的品牌弧线和三角形纹样可以成为产品的识别锚点，但只能低频使用：

- 弧线适合登录页、离线页、空状态、大型欢迎区或抽屉底部，作为内容与品牌区之间的边界。
- 三角形纹样适合页面空白区或身份验证背景，透明度建议控制在 4% 至 8%。
- 不在数据表格、表单、弹窗和卡片内部重复铺满纹样。
- 不对纹样做持续漂浮、呼吸或无意义循环动画。
- 品牌渐变只可用于非操作性大面积背景，例如登录或空状态。按钮、Logo、表头和状态标签使用纯色。

## 4. 现有前端审计结论

### 4.1 当前架构适合做令牌化重构

项目已经具备良好的主题入口：

- `ui/component/theme/src/default.css` 定义 OpenRemote 颜色令牌，并映射到 Vaadin Lumo 令牌。
- `ui/component/core/src/defaults.ts` 定义 `--or-app-color1` 至 `--or-app-color11` 的默认值。
- `ui/component/or-app/src/index.ts` 接收 Realm 级 `styles`、Logo、移动 Logo 和 favicon。
- `deployment/manager/app/manager_config.json` 已有按 Realm 配置主题颜色和 Logo 的机制。
- `ui/component/theme/src/components/` 已有 Vaadin 组件的外部主题入口。

因此，重构应沿用现有设计系统，不引入 Tailwind、Material 3、shadcn 或新的运行时主题库。

### 4.2 当前品牌冲突

当前默认主题仍以 OpenRemote 绿色为核心：

- 主色为 `#4D9D2A` 或等价的绿色 HSL。
- 默认 Logo SVG 使用 `#1D5632` 和 `#4E9D2D`。
- 默认字体为 Inter。
- 默认背景、文字和对比色带有绿色色相。
- 示例 `manager_config.json` 仍保留 smartcity 紫色与 manufacturer 浅蓝主题，没有 DPBIO 品牌配置。

这些颜色分布在全局令牌、应用默认值、Logo、图表、告警表格和部分页面局部样式中。如果只修改主色变量，会出现按钮变蓝但弹窗、图表、选中态或覆盖层仍然是绿色的“半换肤”问题。

### 4.3 硬编码颜色热点

静态扫描显示，以下文件需要优先人工审查：

| 文件 | 检出的十六进制颜色数量 | 风险说明 |
| --- | ---: | --- |
| `ui/component/or-chart/src/index.ts` | 11 | 图表系列色与文本色可能绕过主题 |
| `ui/component/or-app/src/images/logo.svg` | 11 | 仍为 OpenRemote 绿色 Logo |
| `ui/component/core/src/defaults.ts` | 11 | 应用级颜色默认值 |
| `ui/component/or-attribute-barchart/src/index.ts` | 9 | 柱图颜色与状态色 |
| `ui/app/manager/src/components/alarms/or-alarms-table.ts` | 8 | 告警等级与表格状态 |
| `ui/component/or-dashboard-builder/src/settings/map-settings.ts` | 6 | 地图设置颜色 |
| `ui/component/or-dashboard-builder/src/widgets/map-widget.ts` | 6 | 地图部件颜色 |
| `ui/component/or-gauge/src/index.ts` | 4 | 仪表盘刻度与状态色 |

数量不等于必须替换。Logo、数据系列色和状态色需要先判断语义，再迁移到对应令牌，禁止盲目全局替换。

### 4.4 深色主题现状

`default.css` 已提供 `:root[theme~="dark"]` 变量，但目前没有发现完整的产品级深色主题品牌规范或明确的用户切换流程。本方案保留深色能力，并给出 DPBIO 深色令牌。若当前版本没有向用户开放深色主题，先完成令牌和视觉回归测试，不新增入口，避免扩大功能范围。

### 4.5 Logo 文件颜色差异

品牌手册将达普浅蓝定义为 `#0395FF`，而现有 `docx/logo.png` 中的浅蓝像素为 `#4695F7`，深蓝像素与手册的 `#0215C1` 一致。实施时以品牌手册为颜色真源，但不要直接对 PNG 执行自动重染。应向品牌资产负责人取得官方 SVG 或源文件，并提供彩色横版、移动端图形标、反白版和 favicon。

## 5. 不可改变的功能边界

以下内容在本次配色重构中全部锁定：

- URL、路由、页面入口和返回逻辑。
- 主导航与次级导航的项目、名称、顺序和权限可见性。
- 用户、角色、Realm、资产、规则、服务、告警、通知、网关等业务流程。
- 表单字段、字段顺序、默认值、校验规则和提交行为。
- API 请求、Redux 状态、WebSocket、事件名、组件属性和数据模型。
- 地图交互、图表数据计算、筛选逻辑、排序、分页和导出结果。
- 键盘交互、焦点顺序、对话框确认逻辑和权限校验。
- 分析埋点、测试选择器、自动化测试依赖的稳定属性。

允许的变化仅包括：CSS 变量、字体、Logo 资源、颜色、边框、圆角、阴影、间距的微调、图标颜色、组件交互状态样式和品牌辅助图形。

## 6. 颜色系统与无障碍规则

### 6.1 对比度结论

以下结果按 WCAG 相对亮度公式计算：

| 组合 | 对比度 | 结论 |
| --- | ---: | --- |
| 白字 / `#0215C1` | 11.17:1 | 可用于所有正常字号主按钮 |
| 白字 / `#0032BE` | 9.55:1 | 可用于悬停态 |
| 白字 / `#000064` | 17.74:1 | 可用于按下态和深色表面 |
| 白字 / `#0395FF` | 3.11:1 | 不可用于普通小字号按钮文字 |
| `#000046` 字 / `#0395FF` | 6.20:1 | 可用于深色主题浅蓝按钮 |
| `#000046` 字 / `#8CC800` | 9.53:1 | 可用于成功标签 |
| `#000046` 字 / `#FFBE00` | 11.59:1 | 可用于警告标签 |
| 白字 / `#E60050` | 4.69:1 | 可用于普通字号错误按钮 |
| `#4B4B4B` 字 / 白底 | 8.72:1 | 可用于正文 |
| `#969696` 字 / 白底 | 2.96:1 | 不可用于重要小字号正文 |

由此确定：浅色主题主按钮使用达普蓝 `#0215C1`，不能使用达普浅蓝 `#0395FF` 配白色小字。达普浅蓝应主要用于焦点环、图标、信息高亮，或配深色文字使用。

### 6.2 建议语义令牌

#### 浅色主题

| 语义令牌 | 值 | 用途 |
| --- | --- | --- |
| `--dp-brand-primary` | `#0215C1` | 主操作、当前导航、关键链接 |
| `--dp-brand-primary-hover` | `#0032BE` | 主操作悬停 |
| `--dp-brand-primary-active` | `#000064` | 主操作按下 |
| `--dp-brand-focus` | `#0395FF` | 键盘焦点环 |
| `--dp-canvas` | `#F6F8FC` | 页面背景，来自品牌蓝的冷色浅调 |
| `--dp-surface` | `#FFFFFF` | 表格、表单、弹窗、侧栏表面 |
| `--dp-surface-subtle` | `#F0F1FB` | 表头、选项悬停、分组背景 |
| `--dp-selection` | `#E1F2FF` | 行选中、导航次级选中背景 |
| `--dp-text-strong` | `#000046` | 页面标题、关键数字 |
| `--dp-text` | `#4B4B4B` | 正文、表格数据 |
| `--dp-text-muted` | `#636A7A` | 次级说明，需维持 AA 对比度 |
| `--dp-text-disabled` | `#969696` | 禁用控件，不能承载必要信息 |
| `--dp-border` | `#D2D2D2` | 标准边框和分割线 |
| `--dp-border-strong` | `#969696` | 强分割和高对比边界 |
| `--dp-success` | `#8CC800` | 成功、在线、正常 |
| `--dp-warning` | `#FFBE00` | 警告、待处理 |
| `--dp-error` | `#E60050` | 错误、危险、离线 |
| `--dp-info` | `#0082FF` | 信息提示 |

#### 深色主题

| 语义令牌 | 值 | 用途 |
| --- | --- | --- |
| `--dp-canvas` | `#000046` | 最底层画布 |
| `--dp-surface` | `#000064` | 主表面 |
| `--dp-surface-raised` | `#07117A` | 弹窗、菜单、浮层 |
| `--dp-brand-primary` | `#0395FF` | 主操作与选中态 |
| `--dp-brand-primary-hover` | `#00AAFF` | 主操作悬停 |
| `--dp-brand-focus` | `#00C8FF` | 焦点环 |
| `--dp-on-primary` | `#000046` | 浅蓝按钮上的文字和图标 |
| `--dp-text-strong` | `#FFFFFF` | 标题和关键数字 |
| `--dp-text` | `#F0F1FB` | 正文 |
| `--dp-text-muted` | `#D2D2D2` | 次级说明 |
| `--dp-border` | `rgba(255,255,255,0.20)` | 分割线和控件边框 |

### 6.3 现有应用变量映射

Realm 外观编辑器当前只支持七个应用颜色，应按下表设置：

| 现有变量 | DPBIO 浅色值 | 含义 |
| --- | --- | --- |
| `--or-app-color1` | `#FFFFFF` | Surface |
| `--or-app-color2` | `#F6F8FC` | Background |
| `--or-app-color3` | `#4B4B4B` | Text / On secondary |
| `--or-app-color4` | `#0215C1` | Primary |
| `--or-app-color5` | `#D2D2D2` | Borders and lines |
| `--or-app-color6` | `#E60050` | Error |
| `--or-app-color8` | `#FFFFFF` | On primary |

Realm 配置可先使用如下内容完成第一阶段换肤：

```json
{
  "styles": ":host > * {--or-app-color1:#FFFFFF;--or-app-color2:#F6F8FC;--or-app-color3:#4B4B4B;--or-app-color4:#0215C1;--or-app-color5:#D2D2D2;--or-app-color6:#E60050;--or-app-color8:#FFFFFF;}",
  "logo": "/images/dpbio-logo-color.svg",
  "logoMobile": "/images/dpbio-mark-color.svg",
  "favicon": "/images/dpbio-favicon.ico"
}
```

这一步不能代替完整主题层。Vaadin Overlay、图表、地图和少数组件的颜色不一定继承 Realm 内部变量，仍需后续迁移。

## 7. 主题技术方案

### 7.1 推荐方案

如果 DPBIO 是整个部署的唯一品牌，建议在现有默认主题之后增加一层独立的 DPBIO 主题，并把应用默认值同步为 DPBIO。这样弹窗、下拉菜单和其他挂载在文档根节点的 Vaadin Overlay 也能获得一致颜色。

建议新增：

```text
ui/component/theme/src/dpbio.css
ui/component/theme/src/fonts.css
deployment/manager/app/images/dpbio-logo-color.svg
deployment/manager/app/images/dpbio-logo-white.svg
deployment/manager/app/images/dpbio-mark-color.svg
deployment/manager/app/images/dpbio-mark-white.svg
deployment/manager/app/images/dpbio-favicon.ico
```

在 `ui/component/theme/src/index.css` 中按顺序导入：

```css
@import "./default.css";
@import "./fonts.css";
@import "./dpbio.css";
```

`dpbio.css` 的核心结构建议如下：

```css
:root {
  --dp-brand-primary: #0215c1;
  --dp-brand-primary-hover: #0032be;
  --dp-brand-primary-active: #000064;
  --dp-brand-focus: #0395ff;

  --or-color-base: #ffffff;
  --or-color-base-5pct: #f6f8fc;
  --or-color-primary: var(--dp-brand-primary);
  --or-color-primary-50pct: rgba(2, 21, 193, 0.76);
  --or-color-primary-10pct: rgba(2, 21, 193, 0.10);
  --or-color-primary-contrast: #ffffff;
  --or-color-text-primary: var(--dp-brand-primary);
  --or-color-text-heading: #000046;
  --or-color-text-body: #4b4b4b;
  --or-color-text-secondary: #636a7a;
  --or-color-text-disabled: #969696;

  --or-color-error: #e60050;
  --or-color-warning: #ffbe00;
  --or-color-success: #8cc800;

  --lumo-font-family: "HarmonyOS Sans SC", "HarmonyOS Sans", "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
  --lumo-border-radius-s: 6px;
  --lumo-border-radius-m: 8px;
  --lumo-border-radius-l: 12px;
  --lumo-box-shadow-s: 0 2px 8px rgba(0, 21, 100, 0.08);
  --lumo-box-shadow-m: 0 8px 24px rgba(0, 21, 100, 0.10);
}

:root[theme~="dark"] {
  --or-color-base: #000064;
  --or-color-base-5pct: #000046;
  --or-color-primary: #0395ff;
  --or-color-primary-50pct: rgba(3, 149, 255, 0.76);
  --or-color-primary-10pct: rgba(3, 149, 255, 0.16);
  --or-color-primary-contrast: #000046;
  --or-color-text-primary: #0395ff;
  --or-color-text-heading: #ffffff;
  --or-color-text-body: #f0f1fb;
  --or-color-text-secondary: #d2d2d2;
}
```

实际实施时需要补齐 Lumo 对比度阶梯、状态色的 10% 和 50% 透明版本，并在浏览器中验证，不应只粘贴上述核心片段即结束。

### 7.2 多 Realm 部署的替代方案

如果同一 Manager 继续承载多个不同品牌 Realm，则不要把 DPBIO 变量无条件写到 `:root`。应在 Realm 配置加载完成后，仅给 DPBIO Realm 的应用根节点与文档根节点添加稳定的品牌标记，例如 `data-brand="dpbio"`。主题选择器使用：

```css
:root[data-brand="dpbio"],
or-app[data-brand="dpbio"] {
  /* DPBIO tokens */
}
```

文档根节点的标记用于覆盖 Vaadin Overlay。组件根节点的标记用于普通应用内容。这个标记只影响样式，不得参与权限或业务判断。

### 7.3 Vaadin 组件覆盖规则

必须遵守项目现有约定：

- 颜色、字体、圆角优先通过 Lumo 和 OpenRemote 变量覆盖。
- 小范围外观调整在 `ui/component/theme/src/components/or-vaadin-<name>.css` 使用外部 `::part()`。
- 需要进入 Shadow DOM 的规则使用项目既有的 Lumo 模块注入方式。
- 不覆盖组件的 `is` 属性或 `static styles`。
- 不通过深层 DOM 选择器依赖 Vaadin 内部结构，避免升级后失效。

## 8. 组件级视觉规范

### 8.1 应用框架与头部

- 保留现有 50 px 头部高度和导航结构，避免破坏可视区域与响应式断点。
- 头部使用白色表面，底部用 `#D2D2D2` 的 1 px 分割线，不使用厚重阴影。
- 桌面端使用彩色横版 Logo，移动端使用官方图形标。
- 当前导航使用达普蓝文字与 3 px 至 4 px 下边线，悬停只用淡蓝背景，不做缩放。
- 次级菜单、账户菜单和语言菜单保持现有位置和行为，只统一颜色、间距、圆角和焦点态。
- 深色头部若后续启用，必须切换官方反白 Logo，不能给彩色 Logo 加白色底框补救。

### 8.2 页面背景与内容层级

- 页面画布使用 `#F6F8FC`，主内容表面使用白色。
- 页面标题使用 `#000046`，正文使用 `#4B4B4B`。
- 主要内容块之间依靠 24 px 至 32 px 间距建立层级，不把每一段内容都包进卡片。
- 需要卡片时使用 8 px 或 12 px 圆角、1 px 淡边框和非常轻的蓝调阴影。
- 同一页面只能有一种主要圆角语言，禁止 6 px、12 px、20 px 和药丸形随意混用。

### 8.3 按钮

| 状态 | 主按钮 | 次按钮 | 文字按钮 |
| --- | --- | --- | --- |
| 默认 | `#0215C1` 底、白字 | 白底、`#D2D2D2` 边、深蓝字 | 透明底、达普蓝字 |
| 悬停 | `#0032BE` | `#F0F1FB` | `#F0F1FB` |
| 按下 | `#000064` | `#E1F2FF` | `#E1F2FF` |
| 焦点 | 3 px `#0395FF` 外环 | 同左 | 同左 |
| 禁用 | 降低表面与文字对比 | 同左 | 同左 |

- 常规按钮高度保持在 36 px 至 40 px，尊重现有密度，不把所有操作做成大按钮。
- 破坏性操作使用 `#E60050`，并保留确认流程。
- 只有状态标签、筛选标签和真正的胶囊式开关可以使用药丸圆角。
- 不使用按钮渐变、外发光和位移动效。

### 8.4 输入框、选择器与表单

- 白色表面、`#D2D2D2` 边框、`#4B4B4B` 输入文字。
- 聚焦边框使用达普蓝，外层焦点环使用透明度降低后的达普浅蓝。
- 错误边框和错误文字使用 `#E60050`，同时保留错误图标或文字，不能只靠红色。
- 标签、帮助文字、必填标记继续使用 Vaadin 现有语义和顺序。
- 下拉浮层、日期选择器和自动补全列表必须与输入框使用同一套表面和选中态。
- 禁用态不能只把透明度降到难以识别，标签和边界仍要可辨认。

### 8.5 表格与列表

- 表头使用 `#F0F1FB`，标题为 `#000064` 或 `#4B4B4B`，字重 500。
- 行背景默认白色，主要依靠 1 px 分割线组织信息，不使用浓重斑马纹。
- 行悬停使用淡蓝，行选中使用 `#E1F2FF` 并增加左侧达普蓝标记或复选框状态。
- 紧凑模式行高建议 44 px，标准模式 48 px。具体以现有信息密度为准，不改变分页和滚动逻辑。
- 操作列保持稳定宽度，危险操作不与普通操作使用相同颜色。
- 告警、通知和在线状态必须同时提供图标、文字或形状编码，不能只用颜色区分。

### 8.6 Tabs、侧栏和树形导航

- 当前项使用达普蓝文字和清晰的下划线或左侧 3 px 标记。
- 未选项使用正文色，悬停时使用淡蓝表面。
- 树节点缩进、展开图标和键盘行为不变。
- 层级线使用 `#D2D2D2`，避免用大量蓝色制造视觉噪声。
- 只有当前路径使用主色，不能让所有图标同时变蓝。

### 8.7 弹窗、菜单与浮层

- 统一 12 px 圆角、白色表面、1 px 淡边框和蓝调阴影。
- 标题、正文、主次操作维持现有顺序。
- 遮罩保持中性深色透明层，不使用品牌蓝遮罩。
- 移动端全屏弹窗继续沿用现有响应式行为。
- 浮层必须检查挂载到文档根节点时是否仍能继承 DPBIO 变量。

### 8.8 地图

- 默认点位或聚合色使用 `#0032BE`，选中态使用 `#0395FF` 与白色图标。
- 严重告警使用 `#E60050`，警告使用 `#FFBE00`，正常使用 `#8CC800`。
- 聚合数量要有足够文字对比，不能把白字放在达普浅蓝上。
- 地图底图不进行品牌染色，避免影响地理信息可读性。
- 筛选器、图例和弹出卡片使用统一的表面、边框和圆角令牌。

### 8.9 图表与仪表盘

图表属于数据编码，不应只使用一个蓝色。建议默认系列顺序：

```text
#0215C1, #0395FF, #00C8FF, #8CC800, #FFBE00, #E60050, #969696
```

使用规则：

- 第一关键系列固定达普蓝，第二系列使用达普浅蓝。
- 红、黄、绿在表达状态阈值时不得同时被当成普通分类色。
- 同一指标跨页面保持相同颜色，不由组件随机分配。
- 折线除颜色外增加点形、虚实或标签差异，照顾色觉差异用户。
- 网格线使用低对比冷灰，坐标文字使用正文或次级文字色。
- 图表 tooltip、legend、空数据和加载态全部使用主题令牌。
- Gauge 的阈值颜色与告警等级表使用同一语义来源。

### 8.10 状态、空状态与加载

- 成功：`#8CC800`，搭配 `#000046` 文字或深色图标。
- 警告：`#FFBE00`，搭配 `#000046` 文字。
- 错误：`#E60050`，实色按钮可搭配白字。
- 信息：`#0082FF` 或 `#00AAFF`，根据背景选择深色文字。
- 空状态优先给出原因与下一步操作，品牌三角纹样只作为低透明度背景。
- 加载状态优先使用骨架屏或局部进度，不为简单操作增加大型品牌动画。
- `prefers-reduced-motion: reduce` 下关闭非必要过渡。

## 9. 文件级实施清单

| 优先级 | 文件或目录 | 修改内容 | 功能风险控制 |
| --- | --- | --- | --- |
| P0 | `ui/component/theme/src/dpbio.css` | 新增 DPBIO 语义令牌、浅色和深色主题 | 只定义变量，不包含业务选择器 |
| P0 | `ui/component/theme/src/fonts.css` | 本地加载 HarmonyOS Sans WOFF2 | 提供系统字体回退 |
| P0 | `ui/component/theme/src/index.css` | 在默认主题之后导入 DPBIO 主题 | 保留默认主题作为基础和回退 |
| P0 | `ui/component/core/src/defaults.ts` | 唯一品牌部署时更新应用默认颜色 | 只改常量值，不改导出名 |
| P0 | `deployment/manager/app/manager_config.json` | 配置 DPBIO Logo、favicon 与 Realm 色 | 不改 pages、filters 和权限配置 |
| P0 | `deployment/manager/app/images/` | 加入官方彩色、反白、移动和 favicon 资产 | 不编辑原始 Logo 结构 |
| P0 | `ui/component/or-app/src/index.ts` | 检查应用色到 Lumo 的映射和品牌主题挂载 | 不改路由、状态和配置协议 |
| P0 | `ui/component/or-app/src/or-header.ts` | Logo 尺寸、导航状态、边框和焦点态 | 不改菜单项目、顺序和点击行为 |
| P1 | `ui/component/theme/src/components/` | 统一按钮、输入、选择器、弹窗、Badge、菜单 | 使用项目规定的 Vaadin 主题方式 |
| P1 | `ui/component/or-mwc-components/` | 把直接引用颜色常量的表格和输入样式迁移到变量 | 不改渲染模板和事件 |
| P1 | `ui/app/manager/src/pages/` | 清除页面级白色、灰色、旧绿色硬编码 | 逐文件人工判断语义 |
| P1 | `ui/app/manager/src/components/alarms/` | 统一告警等级、表格与操作色 | 保留告警等级和业务计算 |
| P1 | `ui/component/or-asset-tree/src/style.ts` | 树节点选中、悬停、层级线 | 保留展开、选择和拖放行为 |
| P1 | `ui/component/or-asset-viewer/src/style.ts` | 面板、字段、历史信息表面 | 保留面板顺序和响应式逻辑 |
| P1 | `ui/component/or-map/src/style.ts` | 地图控件、图例、弹层、点位语义 | 不改地图数据和交互 |
| P1 | `ui/component/or-chart/src/index.ts` | 建立统一图表系列令牌 | 不改数据集、单位和计算 |
| P1 | `ui/component/or-attribute-barchart/src/index.ts` | 迁移柱图硬编码颜色 | 保留阈值含义 |
| P1 | `ui/component/or-gauge/src/index.ts` | 迁移仪表盘阈值和文本色 | 保留数值范围和阈值 |
| P2 | `ui/app/insights/src/style.ts` | 仪表盘壳层、全屏头部、抽屉表面 | 不改部件布局和拖放 |
| P2 | `ui/component/or-dashboard-builder/src/` | 地图、Gauge、阈值面板颜色令牌化 | 不改设置模型和预览逻辑 |
| P2 | `ui/component/or-components/src/or-loading-indicator.ts` | 品牌化加载色，减少多余动效 | 保持加载状态触发条件 |

## 10. 分阶段实施顺序

### 阶段 0：建立回归基线

在修改前保存以下页面的桌面、平板和手机截图，并记录主要交互：

- Map、Assets、Rules、Services、Insights。
- Alarms、Notifications。
- Gateway、Gateway Tunnel、Logs。
- Users、Roles、Realms、Provisioning、Export、Appearance。
- Loading、Empty、Offline、Error、Dialog、Dropdown、Date picker。
- 管理员、受限用户和普通用户可见状态。

同时记录浏览器控制台错误、主要网络请求和关键端到端测试结果，作为功能未改变的证据。

### 阶段 1：品牌资产与基础变量

1. 取得官方 SVG、反白版、移动图形标、favicon 和授权字体。
2. 新增 DPBIO 主题文件，建立语义令牌。
3. 将 Realm 的七个应用色映射到 DPBIO 浅色主题。
4. 更新 Logo 配置与浏览器图标。
5. 验证 Vaadin Overlay、弹窗和下拉菜单没有遗留绿色。

### 阶段 2：基础组件

1. 统一按钮、输入、选择器、复选框、单选框、开关和日期控件。
2. 统一表格、列表、Tabs、树导航、Badge 和分页。
3. 统一 Dialog、Confirm Dialog、Menu Bar 和浮层阴影。
4. 补齐 default、hover、active、focus-visible、disabled、loading、error 和 selected 状态。

### 阶段 3：业务页面与硬编码迁移

1. 从高频页面开始处理 Assets、Map、Insights、Alarms 和 Notifications。
2. 再处理 Users、Roles、Realms、Gateway、Export 和 Configuration。
3. 将局部十六进制颜色迁移到语义变量。
4. 每改一个业务域立即完成视觉和功能回归，不做一次性全局替换。

### 阶段 4：地图、图表与状态体系

1. 建立稳定的图表系列色和告警阈值色。
2. 统一 Map marker、cluster、legend 和 popup。
3. 检查颜色在浅色、深色、投影仪和低亮度屏幕上的辨识度。
4. 为关键状态增加图标、形状或文字的冗余编码。

### 阶段 5：验收与分批上线

1. 运行单元测试、组件测试和端到端测试。
2. 进行全页面视觉回归和键盘可访问性检查。
3. 先在 DPBIO 测试 Realm 或测试环境启用。
4. 验收通过后再提升为默认主题。
5. 保留旧主题导入开关或配置备份，确保可快速回退。

建议把上述阶段拆成四个可审查的变更集：主题与资产、基础组件、业务与数据可视化、QA 与清理。不要把全部颜色重构压进一个难以评审的大提交。

## 11. 验证矩阵

### 11.1 视觉尺寸

至少覆盖：

- 1440 x 900 桌面。
- 1280 x 800 小屏桌面。
- 768 x 1024 平板。
- 390 x 844 手机。
- 浏览器 200% 缩放。
- 浅色主题与深色主题。

检查 320 px 至 1440 px 全区间，不只检查几个固定断点。任何页面都不应出现横向溢出、Logo 压缩、操作按钮被遮挡或浮层超出视口。

### 11.2 交互状态

每个可交互组件至少验证：

- default。
- hover。
- active 或 pressed。
- focus-visible。
- selected。
- disabled。
- loading。
- validation error。
- empty 和 no permission。

### 11.3 无障碍

- 普通文字达到 WCAG AA 的 4.5:1。
- 大文字达到 3:1。
- 控件边界、图标和焦点指示达到 3:1。
- 键盘可以到达所有原本可操作的元素。
- 焦点顺序不因样式重构而变化。
- 错误、告警、成功和在线状态不能只靠颜色区分。
- 200% 缩放时没有信息丢失。
- 系统减少动态效果时停止非必要动画。

### 11.4 功能回归

- 所有原有路由可访问，浏览器前进和后退正常。
- 登录态、退出、Realm 切换和权限可见性不变。
- 表单校验、保存、删除确认和错误处理不变。
- 表格排序、筛选、分页、行选择和批量操作不变。
- 地图缩放、拖动、点位选择和筛选不变。
- 图表时间范围、tooltip、legend 和数据值不变。
- Dashboard 新建、编辑、预览、拖放和保存不变。
- WebSocket 实时更新与通知未受影响。

### 11.5 构建验证

完整实现后按仓库约定运行：

```powershell
./gradlew clean installDist
```

在沙箱或无法联网的环境使用 `--offline`，前提是依赖已缓存。注意 `clean` 会删除项目根目录的 `tmp/`。如需运行集成测试，应按项目说明重新创建 `tmp` 并启动 PostgreSQL 与 Keycloak 测试栈。

## 12. 验收标准

必须同时满足以下条件才算完成：

- 全局界面不再出现无语义的 OpenRemote 旧绿色 `#4D9D2A`、`#4E9D2D` 和 `#1D5632`。
- DPBIO 主色、状态色和图表色均来自统一语义令牌。
- 标准 Logo 和反白 Logo 使用场景正确，无遮挡、变形、描边、阴影和改色。
- 品牌手册中的浅蓝色差异已经通过官方资产解决，而不是临时重染 PNG。
- 所有基础组件具备完整交互状态，没有遗漏的绿色、紫色或浏览器默认蓝。
- 普通文字、控件边界和焦点态达到既定对比度要求。
- 桌面、平板、手机和 200% 缩放下没有视觉破坏。
- 原有自动化测试通过，业务行为和数据结果与改造前一致。
- 除批准的状态色、图表色和第三方地图内容外，不再新增组件内硬编码色值。
- 视觉回归差异可以逐项解释为品牌样式变化，不包含意外的布局或交互变化。

## 13. 避免“AI 味道”的约束

以下表现与 DPBIO 的企业产品定位不符，应明确禁止：

- 紫蓝渐变作为全局主视觉。
- 大面积玻璃拟态、背景模糊、霓虹外发光和浮动光球。
- 所有内容都装进圆角卡片，或者每行都使用药丸标签。
- 三列等宽营销卡片、夸张大标题和无业务价值的宣传文案。
- 用随机插画、表情符号或通用机器人图标代替真实状态信息。
- 同一页面混用多套圆角、阴影和按钮风格。
- 只改截图可见区域，忽略空状态、错误态、弹窗、菜单和移动端。
- 为了“更有科技感”而降低数据密度或隐藏必要信息。

真正符合品牌的精致感来自准确的 Logo 使用、严格的色彩语义、稳定的排版、清楚的状态层级、克制的阴影和经过验证的细节，而不是装饰数量。

## 14. 实施前确认项

这些事项不会阻塞主题方案，但在进入正式代码实施前需要由品牌或产品负责人确认：

1. DPBIO 是否是所有 Realm 的默认品牌，还是只应用于指定 Realm。
2. 官方产品名称和浏览器标题是否使用“达普生物”“DPBIO”或具体产品名。
3. 官方彩色横版、反白横版、移动图形标和 favicon 的 SVG/ICO 源文件。
4. HarmonyOS Sans 的 Web 分发文件和公司内部使用授权。
5. 深色主题是否对用户开放，若不开放则只保留兼容令牌，不新增功能入口。
6. 告警等级与红、黄、绿的现行业务映射，防止纯视觉修改改变语义。

## 15. 最终交付物

完成实施后应交付：

- DPBIO 浅色与深色主题令牌文件。
- 官方 Logo、移动 Logo、反白 Logo 和 favicon 资源。
- Realm 品牌配置与回退配置。
- 已迁移的 Vaadin、MWC 和业务组件样式。
- 硬编码颜色审计清单及处理结果。
- 全页面、全状态、全尺寸视觉回归截图。
- 对比度检查结果和键盘可访问性检查结果。
- 功能回归测试记录。
- 上线与回退说明。

本方案的核心判断是：不改变 OpenRemote 的产品结构，也不覆盖掉 Vaadin/Lumo 这套真实存在的设计系统，而是在其上建立严谨的 DPBIO 品牌层。这样既能获得明显而统一的公司视觉，又能把功能风险控制在最低范围。
