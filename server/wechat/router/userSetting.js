const express = require('express')
const setting = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')
const {
  userSetting
} = require('../models/model')

setting.get('/contactAddVerifySetting', (req, res) => {
  const query = req.query
  let userId = ''
  if (query.userId) {
    userId = query.userId
  } else {
    warningSend(res, '参数错误')
  }
  const sendBody = userSetting.getSettingByUserId(userId)
  successSend(res, sendBody)
})

module.exports = setting