# 跨境电商后端服务

这是一个基于Node.js + Express构建的跨境电商后端服务，提供完整的电商功能包括用户管理、商品管理、订单处理、支付集成和物流跟踪等。

## 功能特性

- 用户注册/登录和第三方登录支持 (微信、Google、Facebook)
- 商品浏览与搜索，多语言支持
- 购物车与下单功能
- 多种支付方式集成 (PayPal、Stripe、支付宝、微信支付)
- 物流追踪与运费计算
- 多货币支持

## 技术栈

- Node.js + Express
- MySQL (主数据存储)
- MongoDB (文档存储)
- Redis (缓存和会话管理)
- JWT (身份认证)

## 环境要求

- Node.js >= 14.x
- MySQL >= 5.7
- MongoDB >= 4.0
- Redis >= 3.0

## 安装与配置

### 自动安装 (推荐)

#### Windows系统:

```cmd
install.bat
```

#### Linux/macOS系统:

```bash
chmod +x install.sh
./install.sh
```

### 手动安装

1. 安装依赖:
```bash
npm install
```

2. 配置环境变量:
```bash
cp .env.example .env
```
然后编辑 `.env` 文件，配置数据库连接和其他参数

3. 初始化数据库:
```bash
node setup.js
```

## 启动服务

### 开发模式
```bash
npm run dev
```

### 生产模式
```bash
npm start
```

服务默认运行在 `http://localhost:3000`

## API文档

启动服务后，访问 `http://localhost:3000/api-docs` 查看API文档

## 数据库设计

系统使用MySQL作为主要数据存储，包含以下核心表：

- users: 用户表
- categories: 商品分类表
- products: 商品表
- orders: 订单表
- order_items: 订单项表
- carts: 购物车表
- shipments: 物流表
- reviews: 评价表
- user_social_accounts: 用户第三方账户关联表

## 目录结构

```
.
├── config          # 配置文件
├── database        # 数据库初始化脚本
├── models          # 数据模型
├── routes          # 路由控制器
├── services        # 业务逻辑服务
├── middleware      # 中间件
├── utils           # 工具函数
├── server.js       # 应用入口
└── setup.js        # 数据库初始化脚本