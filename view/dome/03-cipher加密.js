const crypto = require('crypto')

// 获取所有的加密算法类型 aes-256-cfb
console.log(crypto.getCiphers())
// 创建一个加密对象
// 参数1: 加密算法(对称算法)
// 参数2: 加解密钥匙
const cipher = crypto.createCipher('aes192', 'user')

// 使用加密对象对指定的字符串进行加密
// 参数: 要加密的数据
// 参数2: 输入数据的编码格式
// 参数3: 加密的数据格式,建议hex16进制
let encrypted = cipher.update('hellow', 'utf8', 'hex')

// 加密对象的调用 .final方法结束加密,阐述加密的结果,指定输出结果为16进制的格式
encrypted += cipher.final('hex')
console.log(encrypted)

// 解密
const decipher = crypto.createDecipher('aes192', 'user')

let decrypted = decipher.update(encrypted, 'hex', 'utf8')
decrypted += decipher.final('utf8')
console.log(decrypted)
// Prints: some clear text data
