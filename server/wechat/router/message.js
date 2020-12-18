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
  const list = message.getList(userId)
  successSend(res, list)
})

module.exports = message_r