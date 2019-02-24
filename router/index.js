const express = require('express')

const indexCtrl = require('../controller/index.js')

const {
  check,
  validationResult
} = require('express-validator/check') // 导入服务端校验数据模块

const router = express.Router()

router
  .get('/', indexCtrl.showIndex)

  .get('/login', indexCtrl.showLogin)

  .post('/signup', [ // 配置校验规则
    check('username').not().isEmpty(),
    check('password').not().isEmpty(),
    check('nickname').not().isEmpty(),
    check('captcha').not().isEmpty()
  ], (req, res, next) => { // 验证成功之后的中间件
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    next() // 验证通过 进入下一个中间件
  }, indexCtrl.signup)

  .get('/captcha', indexCtrl.captcha)

  .get('/verify', indexCtrl.verify)

  .post('/signin', indexCtrl.signin)

  .get('/signout', indexCtrl.signout)
module.exports = router
