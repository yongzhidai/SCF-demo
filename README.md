#十次方项目

#### 文件夹注释(核心初始化)

- `app.js` 项目的启动入口
- `controller` 控制器模块
- `service` 和服务器交互的模块
- `view` 视图文件
- `config` 配置文件
- `router` 路由文件
- `public` 客户端用到的静态资源 css,图片
- `utile` 工具模块
- `vendor` 第三方工具包

#### 初始化 package.json 安装 express

```
npm init -y
npm i express
```

#### 渲染静态资源

- 把静态资源放入 view 文件夹中
- 开放 public 资源

```js
// 开放public资源 使用express中间件
app.use('/public/', express.static(path.join(__dirname, './public/')))
```

### Nunjucks 的使用

#### extends 语法

- extends 用来指定模板继承,被注定的模板为父级模板

```html
{% extends "base.html" %}
```

##### block 语法

- 区块(block)定义了模板片段并识别一个名字,在模板继承中使用.父级模板可指定一个区块,字幕版覆盖这个区块

```html
{% block css %}
<link rel="stylesheet" href="app.css" />
{% endblock %}
```

#### include 语法

- 使用 include 引入其他模板

```html
{% include "item.html" %}
```

#### router 的封装步骤

1. 在`utils`文件夹中,创建一个`request.js`的文件
2. 在`request.js`中引入 axios
3. 在`config`文件夹中,创建一个`config.default.js`的文件,用于配置路径
4. 在`request.js`中创建 axios 的实例 axios.create({})方法可以创建实例
5. 在`service`中创建`user.js`文件,用于存放调用接口的方法

#### node 制作图片验证码

1. 安装`svg-captcha`

```npm
npm i svg-captcha
```

2. 注意点:对一个请求发起多次,默认只缓存一次,所以在请求后面,拼接一个 Math.random() 随机数

3. 使用`express-session`中间件,把图片验证码存储到 session 中,进行校验

4. 存储验证码和过期时间

#### jquery validate 表单校验

1. 安装`jquery-validation`

2. 配置校验规则

```js
// 使用$('#signup_form').validate()方法配置校验规则
$('#signup_form').validate({
  rules: {
    uesrname: {
      required: true,
      minlength: 2
    }
  },
  messages: {
    username: {
      required: '请输入用户名',
      minlength: '用户名必须由两个字母组成'
    }
  }
})
```

#### 远程校验用户名,昵称是否存在,合法

#### 服务端校验(永远不要相信用户的输入)

1. 安装`npm i express-validator`

#### 客户端登录处理

#### 记住登录状态 使用 session 记住用户状态

#### 记住密码实现逻辑

1. 如果用户勾选了记住密码

- 把用户登录的用户名+密码等信息加密为一个字符串存储到客户端 cookie 中
- 记得 weicookie 设置一个过期时间

2. 每次用户请求服务端的时候,服务端判断 session 中有没有会话状态,

- 如果有,则登录状态
- 如果没有,则读物 cookie 中加密的用户信息,然后解密
- 拿到解密数据 用户名+密码
- 登录成功,则将登录状态记录到 session 中保持
- 读取cookie npm i cookie-parser

#### 封装记住我中间件


#### 加密cookie 封装加密的cookie模块
- 使用node的核心模块`crypto`
- cipher和decipher可以实现对称加密

#### 用户退出功能
#### 任务

1. 远程校验用户名

2. 服务端校验数据
