# TheoTown Region Creator

![TheoTown Region Creator](https://img.shields.io/badge/version-1.1.4-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

一个基于Web的TheoTown游戏地图区域创建工具，使用高德地图数据生成真实的地理区域地图。

## [立即使用](https://www.theosite.cn)

## 🌟 功能特性

- **导出真实地图**: 基于高德地图 API 导出现实世界的地图
- **单一城市地图**: 支持导出单一的超大城市地图
- **多平台支持**: 支持 iOS、Android、Steam 平台
- **两种导入模式**: 生成可直接用于 TheoTown 的地图文件或者通过控制台导入

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/Kinsey-LKJ/theotown-region-creater.git
cd theotown-region-creater

# 安装依赖
npm install
```

### 环境配置

1. 复制环境变量模板文件：
```bash
cp .env.example .env.local
```

2. 编辑 `.env.local` 文件，填入您的高德地图API密钥：
```bash
# 高德地图API配置
AMAP_API_KEY=your_amap_api_key_here
AMAP_SECURITY_CODE=your_amap_security_code_here  
AMAP_WEB_KEY=your_amap_web_key_here
```

### 获取高德地图API密钥

1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 注册并登录账号
3. 创建应用并申请Web服务API和Web端(JS API)密钥
4. 将获得的密钥填入环境变量文件

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 项目构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📁 项目结构

```
theotown-region-creater/
├── components/           # React组件
│   ├── amap/            # 高德地图组件
│   ├── button/          # 按钮组件
│   ├── modal/           # 模态框组件
│   └── ...
├── pages/               # Next.js页面
│   ├── api/             # API路由
│   │   └── amap-districts.js  # 地图数据代理API
│   ├── _app.js          # 应用入口
│   └── index.js         # 主页面
├── public/              # 静态资源
├── styles/              # 样式文件
└── ...
```

## 🛠️ 技术栈

- **前端框架**: Next.js 12.1.0
- **UI库**: React 17.0.2
- **地图服务**: 高德地图 API
- **图像处理**: html2canvas
- **文件处理**: FilePond
- **样式**: CSS Modules


## 🤝 贡献指南

我们欢迎任何形式的贡献！

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request


## 🐛 问题反馈

如果您在使用过程中遇到问题，请通过以下方式反馈：

- [GitHub Issues](https://github.com/Kinsey-LKJ/theotown-region-creater/issues)

## 📄 许可证

本项目基于 [MIT License](LICENSE) 许可证开源。

---

⭐ 如果这个项目对您有帮助，请考虑给它一个Star！