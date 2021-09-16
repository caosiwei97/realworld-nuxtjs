const mongoose = require('mongoose')
const { mongo } = require('./index')

var isProduction = process.env.NODE_ENV === 'production'

mongoose.set('useCreateIndex', true)
// 创建连接
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(`mongodb://192.168.2.212/realworld`, {
    useNewUrlParser: true, // 新的URL解析器, 前提是URL必须加端口
    useUnifiedTopology: true, // 新连接管理引擎
  })

  mongoose.set('debug', true)
}

const db = mongoose.connection

db.on('open', () => {
  console.log('当前程序与MongoDB已成功建立连接')
})

db.on('error', () => {
  console.log('当前程序与MongoDB的连接发生错误')
})

db.on('close', () => {
  console.log('当前程序与MongoDB已断开连接')
})

module.exports = mongoose
