const request = require('../utils/request')

exports.findByUsername = username => {
  return request({
    url: '/users',
    params: {
      username
    }
  })
}

exports.findByNickname = nickname => {
  return request({
    url: '/users',
    params: {
      nickname
    }
  })
}

exports.createUser = data => {
  return request({
    url: '/users',
    method: 'POST',
    data: {
      username: data.username,
      password: data.password,
      nickname: data.nickname
    }
  })
}
