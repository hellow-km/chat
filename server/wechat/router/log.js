const express = require('express')
const md5 = require('md5')
const log = express.Router()
const fs = require('fs')
const path = require('path')
const {
  cloneDeep
} = require('lodash')
let userList = []
const userDataPath = path.join(__dirname, '../data/user.json')
updateUserList()

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
  let user = getUserByLogin(account, password)
  if (user) {
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
  let sendData = {}
  const user = body.user
  const questions = body.questions
  if (user.account && user.password && user.nickName) {
    if (checkQuestions(questions)) {
      user.questions = questions
    } else {
      return res.send({
        info: {
          success: false,
          warnings: [{
            text: '问题或者答案不能为空'
          }],
          body: {}
        }
      })
    }
    addUserList(user)
    writeUser()
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

log.post('/getQuestionList', (req, res) => {
  let sendData = {
    info: {
      success: false,
      warnings: [{
        text: '用户名或密码错误'
      }],
      body: {}
    }
  }
  const body = req.body
  const params = body.body
  const {
    account,
    password
  } = params
  const user = getUserByLogin(account, password)
  if (user) {
    sendData = {
      info: {
        success: true
      },
      body: {
        user: user
      }
    }
  }
  res.send(sendData)
})

function addUserList(data) {
  if (data && typeof data == 'object') {
    if (data.length) {
      if (data.length == 0) return
      for (const value of data) {
        userList.push(value)
      }
    } else {
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
  if (user.length > 0) {
    user = cloneDeep(user[0])
    delete user.password
    return user
  } else {
    return null
  }
}

function readUser() {
  let data = ''
  try {
    data = fs.readFileSync(userDataPath)
  } catch (e) {}
  return JSON.parse(data)
}

function writeUser() {
  try {
    const data = JSON.stringify(userList)
    fs.writeFileSync(userDataPath, data)
  } catch (e) {
    return
  }
}

function updateUserList() {
  let regUser = readUser()
  userList.push(...regUser)
}

function checkQuestions(questions) {
  if (questions.length > 0) {
    return questions.every(q => q.question && q.answer)
  } else {
    return true
  }
}

module.exports = log