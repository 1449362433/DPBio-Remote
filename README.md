# DPBio Remote

达普生物仪器运行数据采集与设备管理平台。

本项目基于 OpenRemote 进行定制，面向达普生物仪器的运行状态接入、设备管理、数据展示和后续异常检测建模。前端已按达普生物品牌视觉完成配色、标识、中文文案和主要业务界面的统一重构；后端业务逻辑保持上游实现不变。

## 当前定制内容

- 达普生物品牌色、Logo、图标与组件视觉规范
- 管理端和 Insights 端品牌化
- 面向中文用户的自然语义本地化
- 仪器监控场景的页面层级与信息密度优化
- 深圳市离线地图的显示范围配置
- 前端重构方案、实施记录和组件效果图

## 开发环境

- JDK 21
- Gradle
- Node.js / Yarn（前端工作区）
- Docker（本地完整环境）

完整构建可使用：

```bash
./gradlew clean installDist
```

## 地图数据

仓库不包含 `.mbtiles` 地图文件。地图数据体积较大且可能受供应商授权条款约束，请在部署时自行准备，并放入：

```text
deployment/map/mapdata.mbtiles
```

当前地图视野配置位于 `deployment/map/mapsettings.json`，默认范围为深圳市。

## 设计与实施文档

- `docx/DPBIO前端品牌配色重构实施方案.md`
- `docx/DPBIO前端品牌重构实施记录.md`
- `docx/DPBIO前端组件演示.png`

## 上游项目

本项目基于 [OpenRemote](https://github.com/openremote/openremote) 开发。使用和分发时请同时遵守仓库内的开源许可文件以及所使用第三方资源的许可条款。
