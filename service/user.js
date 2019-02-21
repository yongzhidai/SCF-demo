const request = require('../utils/request')

exports.findByNickname = async nickname => {
  return await request({
    url: '/users',
    params: {
      nickname
    }
  })
}

exports.findByUsername = async username => {
  return await request({
    url: '/users',
    params: {
      username
    }
  })
}

exports.createUser = async data => {
  return await request({
    url: '/users',
    method: 'POST',
    data: {
      username: data.username,
      password: data.password,
      nickname: data.nickname
    }
  })
}
