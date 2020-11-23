const express = require('express')
const md5 = require('md5')
const log = express.Router()

log.post('/login', (req, res) => {
  const body = req.body
  const {
    account,
    password
  } = body.body
  if (account.trim() == '' || password.trim() == '') {
    return res.send({
      info: {
        success: false,
        warning: '用户名密码不能为空',
      },
      body: {

      }
    })
  }
  const regList = req.session.regList ? req.session.regList : []
  const userList = [{
      account: 'admin',
      password: md5('123456')
    },
    {
      account: 'a',
      password: md5('a')
    },
    {
      account: 'abc',
      password: md5('123')
    },
    ...regList
  ]

  if (userList.some(p => p.account == account && p.password == password)) {
    res.send({
      info: {
        success: true
      },
      body: {
        account: account,
        token: '123456',
        user: {
          account: account
        }
      }
    })
  } else {
    res.send({
      info: {
        success: false,
        warnings: [{
          text: '用户名或密码错误'
        }],
      },
      body: {}
    })
  }
})

log.post('/register', (req, res) => {
  res.send('ok')
})

module.exports = log