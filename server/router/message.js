const express = require('express')
const message_r = express.Router()
const {
  successSend,
  warningSend,
  m
} = require('../util/util')
const {
  message
} = require('../models/model')

message_r.get('/getList', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  const hasEmpty = m.hasEmpty(userId)
  if (hasEmpty) {
    return warningSend(res, '参数错误')
  }
  const list = message.getListById(userId)
  successSend(res, list)
})

message_r.post('/addUserMessage', (req, res) => {
  const body = m.getBody(req)
  const userId = body.userId || ""
  const sendId = body.sendId || ""
  const hasEmpty = m.hasEmpty(userId, sendId)
  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    const data = message.addUserMessage(userId, sendId)
    successSend(res, data)
  })
})

message_r.post('/removeMessage', (req, res) => {
  const body = m.getBody(req)
  const userId = body.userId || ""
  const key = body.key || ""
  const type = body.type || ""
  const hasEmpty = m.hasEmpty(userId, type, key)
  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    message.removeMessage(userId, type, key)
    successSend(res, {})
  })
})
module.exports = message_r