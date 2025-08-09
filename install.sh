#!/bin/bash

# 电商后端服务一键安装脚本

echo "开始安装电商后端服务..."

# 检查Node.js是否已安装
if ! command -v node &> /dev/null
then
    echo "错误: 未找到Node.js，请先安装Node.js"
    exit 1
fi

echo "Node.js版本: $(node --version)"
echo "npm版本: $(npm --version)"

# 创建日志目录
mkdir -p logs

# 安装npm依赖
echo "正在安装npm依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "错误: npm依赖安装失败"
    exit 1
fi

echo "npm依赖安装完成"

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "创建默认环境变量文件..."
    cp .env.example .env 2>/dev/null || echo "请配置.env文件中的数据库连接信息"
fi

# 初始化数据库
echo "正在初始化数据库..."
node setup.js

if [ $? -ne 0 ]; then
    echo "警告: 数据库初始化失败，请检查数据库配置"
else
    echo "数据库初始化完成"
fi

echo "安装完成！"
echo ""
echo "启动开发服务器:"
echo "  npm run dev"
echo ""
echo "启动生产服务器:"
echo "  npm start"
echo ""
echo "请确保已正确配置.env文件中的数据库连接信息"