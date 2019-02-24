const user = require('../service/user')
const crypto = require('../utils/cipher')
module.exports = async (req, res, next) => {
  const {
    userSession
  } = req.session
  // 如果Session中,没有登录状态, 则查找cookie中是否有登录信息
  if (!userSession) {
    let {
      userCookie
    } = req.cookies
    if (!userCookie) {
      return next() // 没有登录
    }
    // 这里表示 cookie 中有用户信息 那么就校验用户信息是否正确
    try {
      let decipherUser = crypto.decipherUser(JSON.parse(userCookie))
      userCookie = decipherUser
      const userList = await user.findByNickname(userCookie.username)
      if (!userList) {
        return next()
      }
      if (userCookie.password !== userList.password) {
        return next()
      }
      // 如果都验证成功了 需要保持登录状态
      req.session.userSession = userList
    } catch (error) {
      return next()
    }
  }
  next()
}
