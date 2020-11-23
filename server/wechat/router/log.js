const express = require('express')
const md5 = require('md5')
const log = express.Router()
const fs = require('fs')

let userList = [{
    account: 'admin',
    nickName: '管理',
    password: md5('123456')
  },
  {
    account: 'aaa',
    nickName: '小a',
    password: md5('aaa')
  },
  {
    account: 'abc',
    nickName: '大abc',
    password: md5('123')
  },
]

log.post('/login', (req, res) => {
  const body = req.body.body
  const {
    account,
    password
  } = body

  let sendData = {}
  if (account.trim() == '' || password.trim() == '') {
    return res.send({
      info: {
        success: false,
        warnings: [{
          text: '用户名密码不能为空'
        }]
      },
      body: {}
    })
  }
  if (req.session.regList) {
    addUserList(req.session.regList)
  }
  let user = getUserByLogin(account, password)
  if (user.length > 0) {
    sendData = {
      info: {
        success: true
      },
      body: {
        token: '123456',
        user: user
      }
    }
  } else {
    sendData = {
      info: {
        success: false,
        warnings: [{
          text: '用户名或密码错误'
        }],
      },
      body: {}
    }
  }
  res.send(sendData)
})

log.post('/existAccount', (req, res) => {
  const body = req.body.body
  const account = body.account
  let sendData = {}
  const hasUserAccount = checkAccount(account)
  if (hasUserAccount) {
    sendData = {
      info: {
        success: false,
        warnings: [{
          text: '用户名已存在'
        }],
      },
      body: {
        exist: true
      }
    }
  } else {
    sendData = {
      info: {
        success: true
      },
      body: {
        exist: false
      }
    }
  }
  res.send(sendData)
})

log.post('/register', (req, res) => {
  const body = req.body.body
  req.session.regList = []
  console.log(body);
  const user = body.user
  const questions = body.questions
  user.questions = questions
  res.send()
})

function addUserList(data) {
  if (data) {
    if (data.length) {
      for (const value of data) {
        userList.push(value)
      }
    } else if (typeof data == 'object') {
      userList.push(data)
    }
  } else {
    return
  }
}

function checkAccount(account) {
  return userList.some(p => p.account == account)
}

function getUserByLogin(account, password) {
  let user = userList.filter(p => p.account == account && p.password == password)
  delete user.password
  return user
}
module.exports = log