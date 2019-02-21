const express = require('express')

const nunjucks = require('nunjucks')

const path = require('path')

const app = express()

const router = require('./router/index')

// 开放public资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use(
  '/node_modules/',
  express.static(path.join(__dirname, './node_modules/'))
)

// 接收解析客户端提交的 json 格式数据

// application/json 格式的数据  {key:value,key1:value1}
app.use(express.json())
// application/x-www-form-urlencoded key=value&key1=value1 jquery发送这种格式的数据
app.use(
  express.urlencoded({
    extended: true
  })
)

// nunjucks默认去view找视图文件 渲染页面
nunjucks.configure(path.join(__dirname, './view/'), {
  autoescape: true,
  express: app,
  watch: true // 禁用模板文件缓存  监视模板文件 改了就会预编译模板
})

app.use(router)

app.listen(3000, () => {
  console.log('服务器启动成功')
  console.log('http://localhost:3000/')
})
