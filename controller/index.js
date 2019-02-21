const axios = require('axios')

const user = require('../service/user')

exports.showIndex = async (req, res, next) => {
  res.render('index.html')
}

exports.showLogin = async (req, res, next) => {
  res.render('login.html')
}

exports.showQuestions = async (req, res, next) => {
  res.render('topic-new.html')
}
exports.signup = async (req, res, next) => {
  const { username, password, nickname } = req.body
  // 1. 获取表单数据
  // 2. 表单数据验证
  // 3. 业务处理
  // 3.1 校验用户名和昵称是否被占用

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
  console.log(createUser)
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
