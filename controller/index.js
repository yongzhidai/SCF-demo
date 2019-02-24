const user = require('../service/user')

const svgCaptcha = require('svg-captcha') // 导入node创建验证码模块

const crypto = require('../utils/cipher') // 导入加密模块

exports.showIndex = async (req, res, next) => {
  res.render('index.html', {
    sessionUser: req.session.userSession
  })
}

exports.showLogin = async (req, res, next) => {
  res.render('login.html')
}

exports.showQuestions = async (req, res, next) => {
  res.render('topic-new.html')
}

exports.signup = async (req, res, next) => {
  const {
    username,
    password,
    nickname,
    captcha
  } = req.body
  // 1. 获取表单数据
  // 2. 表单数据验证
  // 3. 业务处理
  // 3.1 校验用户名和昵称是否被占用
  // console.log(req.body)
  const {
    text,
    overdueTime
  } = req.session.captcha
  if (+new Date() > overdueTime) {
    return res.status(200).json({
      data: {
        msg: '验证码已过期',
        success: 'false'
      },
      status: 200
    })
  }
  if (captcha.toLowerCase() !== text.toLowerCase()) {
    return res.status(200).json({
      data: {
        msg: '验证码错误',
        success: 'false'
      },
      status: 200
    })
  }

  const findUserName = await user.findByUsername(username)
  if (findUserName.data[0]) {
    return res.status(200).json({
      data: {
        msg: '用户名已经存在',
        success: 'false'
      },
      status: 200
    })
  }

  const findNickName = await user.findByNickname(nickname)
  if (findNickName.data[0]) {
    return res.status(200).json({
      data: {
        msg: '昵称已存在',
        success: 'fales'
      },
      status: 200
    })
  }

  const createUser = await user.createUser({
    username,
    password,
    nickname
  })
  if (createUser.data) {
    res.status(200).json({
      data: {
        msg: '创建账户成功',
        success: 'true'
      },
      status: 200
    })
  }

  // 4. 发送结果响应
}

exports.captcha = async (req, res, next) => {
  let captcha = svgCaptcha.create() // 创建验证码
  req.session.captcha = {
    text: captcha.text,
    overdueTime: +new Date() + 1000 * 500
  } // 把验证码存储到 session 中
  res.type('svg') // 设置响应类型
  res.status(200).send(captcha.data) // 发送响应结果
}

exports.verify = async (req, res, next) => {
  const {
    username,
    nickname
  } = req.query
  let flag
  if (username) {
    const findUserName = await user.findByUsername(username)
    /* eslint-disable */
    flag = findUserName.data.length > 0 ? false : true
  } else if (nickname) {
    const findNickName = await user.findByNickname(nickname)
    flag = findNickName.data.length > 0 ? false : true
  }
  res.status(200).send(flag)
}

exports.signin = async (req, res, next) => {
  const {
    inputname,
    inputpassword,
    remember
  } = req.body
  const findUserName = await user.findByUsername(inputname)
  if (!findUserName.data[0]) {
    return res.status(200).json({
      data: {
        message: '用户名不存在',
        success: false
      },
      status: 200
    })
  }
  if (findUserName.data[0].password === inputpassword) {
    // 如果用户勾选了记住我 JSON.stringify(findUserName.data[0])
    let cryptoUser = crypto.encryptedUser(JSON.stringify(findUserName.data[0]))
    if (remember) {
      res.cookie('userCookie', cryptoUser, {
        maxAge: 1000 * 60 * 10 // 滑动过期时间:相对于当前时间往后推移 24小时过期  expires绝对过期时间
      })

    }

    // 用户登录成功 记录session保持登录状态
    req.session.userSession = findUserName.data[0]
    res.status(200).json({
      data: {
        message: '登录成功',
        success: true
      },
      status: 200
    })

  } else {
    res.status(200).json({
      data: {
        message: '用户名或密码错误',
        success: false
      },
      status: 200
    })
  }
}

exports.signout = async (req, res, next) => {
  req.session.userSession = null
  res.clearCookie('userCookie')
  res.redirect('/login')
}