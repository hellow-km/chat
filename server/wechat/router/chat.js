const express = require('express')
const chat = express.Router()
const {
  successSend,
  warningSend,
  m
} = require('../util/util')
const {
  chatMessage
} = require('../models/model')

chat.post('/sendMessage', (req, res) => {
  const body = m.getBody(req)
  const id = body.id || ""
  const targetId = body.targetId || ""
  const html = body.html || ""
  const key = body.key || ""
  const hasEmpty = m.hasEmpty(id, key, targetId, html)

  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    const data = chatMessage.sendMessage(id, key, targetId, html)
    successSend(res, data)
  })
})

chat.get('/getMessage', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  const key = query.key || ""
  if (m.hasEmpty(userId, key)) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    const data = chatMessage.getList(userId, key)
    successSend(res, data)
  })
})

module.exports = chat