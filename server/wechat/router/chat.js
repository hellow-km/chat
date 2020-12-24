const express = require('express')
const chat = express.Router()
const {
  successSend,
  warningSend,
  m
} = require('../util/util')

chat.post('/sendMessage', (req, res) => {
  const body = m.getBody(req)
  const id = body.id || ""
  const targetId = body.targetId || ""
  const html = body.html || ""
  if (m.hasEmpty(id, targetId, html)) {
    warningSend(res, "参数错误")
  }
  res.send(req.body.body)
})

module.exports = chat