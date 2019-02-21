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

### router 的封装步骤

1. 在`utils`文件夹中,创建一个`request.js`的文件
2. 在`request.js`中引入 axios
3. 在`config`文件夹中,创建一个`config.default.js`的文件,用于配置路径
4. 在`request.js`中创建 axios 的实例 axios.create({})方法可以创建实例
5. 在`service`中创建`user.js`文件,用于存放调用接口的方法

#### 任务

- 修改了 index.html,提取了公共的部分
- 修改了 people-home.html 提取了公共的部分 基于模板页 layout 定制内容
- 提取路由
