const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors()); // 跨域资源共享
app.use(express.json()); // 解析JSON请求体

// 数据库连接
const connectDB = require('./config/db');
connectDB();

// 基础路由
app.get('/', (req, res) => {
  res.json({ 
    message: '跨境电商后端服务API', 
    version: '1.0.0' 
  });
});

// 路由
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes')); // 添加购物车路由
app.use('/api/shipments', require('./routes/shipmentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = app;