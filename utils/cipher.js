// 封装node加解密的方法
const crypto = require('crypto')
const {
  cipher: {
    arithmetic,
    encryptedKey
  }

} = require('../config/config.default')
exports.encryptedUser = function (data) {
  /* eslint-disable*/
  const cipher = crypto.createCipher(arithmetic, encryptedKey)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

exports.decipherUser = function (data) {
  const decipher = crypto.createDecipher(arithmetic, encryptedKey)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}