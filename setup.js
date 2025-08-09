const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// 从环境变量获取数据库配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  port: process.env.MYSQL_PORT || 3306
};

async function setupDatabase() {
  let connection;
  
  try {
    // 连接MySQL服务器
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });
    
    console.log('MySQL服务器连接成功');
    
    // 读取SQL初始化文件
    const sqlFilePath = path.join(__dirname, 'database', 'mysql_init.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // 分割SQL语句并执行
    const statements = sqlScript.split(';').filter(stmt => stmt.trim() !== '');
    
    for (const statement of statements) {
      if (statement.trim() !== '') {
        await connection.execute(statement);
        console.log('执行SQL语句:', statement.trim().substring(0, 50) + '...');
      }
    }
    
    console.log('数据库初始化完成');
    
    // 插入一些示例数据
    await insertSampleData(connection);
    
    console.log('示例数据插入完成');
  } catch (error) {
    console.error('数据库初始化失败:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function insertSampleData(connection) {
  try {
    // 插入示例分类
    await connection.execute(`
      INSERT INTO categories (name_en, name_zh, description_en, description_zh) 
      VALUES 
        ('Electronics', '电子产品', 'Electronic devices and accessories', '电子设备及配件'),
        ('Clothing', '服装', 'Apparel and fashion items', '服装及时尚单品'),
        ('Books', '图书', 'Books and educational materials', '书籍和教育材料')
    `);
    
    console.log('示例分类数据插入完成');
    
    // 插入示例商品
    await connection.execute(`
      INSERT INTO products (name_en, name_zh, description_en, description_zh, price, stock_quantity, category_id) 
      VALUES 
        ('Smartphone', '智能手机', 'Latest model smartphone with advanced features', '具有先进功能的最新款智能手机', 699.99, 50, 1),
        ('Laptop', '笔记本电脑', 'High-performance laptop for work and gaming', '适用于工作和游戏的高性能笔记本电脑', 1299.99, 30, 1),
        ('T-Shirt', 'T恤', 'Comfortable cotton t-shirt', '舒适的棉质T恤', 19.99, 100, 2),
        ('Jeans', '牛仔裤', 'Classic blue jeans', '经典蓝色牛仔裤', 49.99, 75, 2),
        ('Programming Book', '编程书籍', 'Learn programming with this comprehensive guide', '通过这本综合指南学习编程', 39.99, 25, 3)
    `);
    
    console.log('示例商品数据插入完成');
    
    // 插入示例用户
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    await connection.execute(`
      INSERT INTO users (username, email, password_hash, role) 
      VALUES 
        ('admin', 'admin@example.com', ?, 'admin'),
        ('user1', 'user1@example.com', ?, 'user')
    `, [passwordHash, passwordHash]);
    
    console.log('示例用户数据插入完成');
  } catch (error) {
    console.error('插入示例数据失败:', error.message);
  }
}

// 执行数据库初始化
setupDatabase().then(() => {
  console.log('数据库设置完成');
  process.exit(0);
}).catch(error => {
  console.error('数据库设置失败:', error);
  process.exit(1);
});