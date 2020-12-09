const express = require('express')
const settings = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')

const {
  addUserSetting
} = require('../models/model')

settings.get('/getSetting', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  if (userId == "") {
    return warningSend(res, "参数错误")
  }
  const data = addUserSetting.getSettingByUserId(userId)
  if (data) {
    successSend(res, {
      setting: data
    })
  } else {
    warningSend(res, "错误")
  }
})

settings.post('/updateSetting', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""

  if (userId && JSON.stringify(body) !== '{}') {
    try {
      addUserSetting.updateDataById(userId, body)
      successSend(res, {}, "保存成功")
    } catch (e) {
      warningSend(res, '服务器错误')
    }
  } else {
    warningSend(res, '参数错误')
  }
})

settings.get('/contactAddVerifySetting', (req, res) => {
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

module.exports = settings