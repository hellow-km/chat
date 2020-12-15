const express = require('express')
const userList = express.Router()
const {
  successSend,
  warningSend,
  m
} = require('../util/util')
const {
  userAndGoupList
} = require('../models/model')

userList.get('/getUserList', (req, res) => {
  const userId = req.query.userId || ""
  if (userId == "") {
    return warningSend(res, "参数错误")
  }
  const data = userAndGoupList.getListById(userId)
  if (data) {
    return successSend(res, data)
  } else {
    return warningSend(res, "无数据")
  }
})

userList.post('/addUserToList', (req, res) => {
  const body = m.getBody(req)
  const sendUserId = body.sendUserId || ""
  const acceptUserId = body.acceptUserId || ""
  const acceptKey = body.acceptKey || 0
  const sendKey = body.sendKey || 0
  const noticeId = body.noticeId || 0

  const hasEmpty = m.hasEmpty(acceptUserId, sendUserId, acceptKey, sendKey, noticeId)
  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  if (userAndGoupList.addUserToList(body)) {
    return warningSend(res, "你已添加该用户")
  }
  return successSend(res, {}, "添加成功")
})

module.exports = userList