const express = require('express')
const md5 = require('md5')
const log = express.Router()
const fs = require('fs')
const path = require('path')
const {
  cloneDeep
} = require('lodash')
const {
  registerBack,
  userStatus
} = require('../models/model')
const {
  successSend,
  warningSend,
  m
} = require('../util/util')

let userList = []
const userDataPath = path.join(__dirname, '../data/user.json')
updateUserList()

log.post('/login', (req, res) => {
  const params = req.body
  const body = params.body || {}
  const account = body.account || ''
  const password = body.password || ''
  if (account.trim() == '' || password.trim() == '') {
    return warningSend(res, '用户名和密码不能为空')
  }
  let user = getUserByLogin(account, password)
  if (user) {
    userStatus.setUserIsLogin(account, true)
    global.account = account
    //todo token 
    const data = {
      token: '123456',
      user: user
    }
    successSend(res, data)
  } else {
    return warningSend(res, '用户名或密码错误')
  }
})

log.post('/existAccount', (req, res) => {
  const body = req.body.body || {}
  const account = body.account || ''
  if (!account) {
    return warningSend(res, '参数错误')
  }
  const hasUserAccount = checkAccount(account)
  if (hasUserAccount) {
    const data = {
      exist: true
    }
    return warningSend(res, '用户名已存在', data)
  } else {
    const data = {
      exist: false
    }
    successSend(res, data)
  }
})

log.post('/register', (req, res) => {
  const body = req.body.body || {}
  const user = body.user || {}
  const questions = body.questions || []
  if (user.account && user.password && user.nickName) {
    if (checkQuestions(questions)) {
      user.questions = questions
    } else {
      return warningSend(res, '问题或者答案不能为空')
    }
    const id = ('00000' + (userList.length + 1)).slice(-6);
    user.id = id
    addUserList(user)
    writeUser()
    registerBack()
    const data = {
      exist: false
    }
    successSend(res, data)
  } else {
    return warningSend(res, '参数错误')
  }
})

log.post('/getQuestionList', (req, res) => {
  const body = req.body
  const params = body.body
  const account = params.account
  const questions = getUserQuestions(account)
  if (questions) {
    const data = {
      userQuestions: questions
    }
    successSend(res, data)
  } else {
    return warningSend(res, '用户不存在')
  }
})

log.post('/checkAnswer', (req, res) => {
  const params = req.body.body || {}
  const account = params.account || ''
  const questions = params.questions || []
  if (!account || questions.length == 0) {
    return warningSend(res, '错误参数')
  }
  if (checkQuestionAnswer(account, questions)) {
    successSend(res, {})
  } else {
    return warningSend(res, '答案错误')
  }
})

log.post('/changePassword', (req, res) => {
  const params = req.body.body || {}
  const account = params.account || ''
  const newPassword = params.newPassword || ''
  if (!account || !newPassword) {
    return warningSend(res, '参数错误')
  }
  if (changePassword(account, newPassword)) {
    successSend(res, {})
  } else {
    return warningSend(res, '找不到用户')
  }
})

function addUserList(data) {
  userList = readUser()
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

function changePassword(account, password) {
  userList = readUser()
  try {
    userList.map(user => {
      if (user.account == account) {
        user.password = password
      }
      return user
    })
    writeUser()
    return true
  } catch (e) {
    return false
  }
}

function checkQuestionAnswer(account, list) {
  userList = readUser()
  let s = true
  const user = userList.filter(user => {
    return user.account == account
  })
  if (user.length == 1) {
    const questions = user[0].questions
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question == list[i].question && !(questions[i].answer == list[i].answer)) {
        s = false
      }
    }
    return s
  } else {
    return false
  }
}

function getUserQuestions(account) {
  userList = readUser()
  let data = []
  const user = userList.filter(user => {
    return user.account == account
  })
  if (user.length == 1) {
    const questions = user[0].questions || []
    for (const item of questions) {
      const question = item.question
      data.push({
        question: question
      })
    }
    return data
  }
  return false
}

function checkAccount(account) {
  userList = readUser()
  return userList.some(p => p.account == account)
}

function getUserByLogin(account, password) {
  userList = readUser()
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
  const data = m.readFile(userDataPath)
  if (data) {
    return data
  } else {
    return []
  }
}

function writeUser() {
  m.writeFile(userDataPath, userList)
}

function updateUserList() {
  let regUser = readUser()
  if (regUser) {
    userList.push(...regUser)
  }
}

function checkQuestions(questions) {
  if (questions.length > 0) {
    return questions.every(q => q.question && q.answer)
  } else {
    return true
  }
}

module.exports = log