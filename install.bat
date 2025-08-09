@echo off
echo 电商后端服务一键安装脚本
echo.

echo 开始安装电商后端服务...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请先安装Node.js
    exit /b 1
)

echo Node.js版本:
node --version

echo npm版本:
npm --version

echo 正在安装npm依赖...
npm install

if %errorlevel% neq 0 (
    echo 错误: npm依赖安装失败
    exit /b 1
)

echo npm依赖安装完成

if not exist .env (
    echo 创建默认环境变量文件...
    copy .env.example .env >nul 2>&1
)

echo 正在初始化数据库...
node setup.js

if %errorlevel% neq 0 (
    echo 警告: 数据库初始化失败，请检查数据库配置
) else (
    echo 数据库初始化完成
)

echo.
echo 安装完成!
echo.
echo 启动开发服务器:
echo   npm run dev
echo.
echo 启动生产服务器:
echo   npm start
echo.
echo 请确保已正确配置.env文件中的数据库连接信息