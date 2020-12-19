const express = require('express')
const settings = express.Router()
const {
  successSend,
  warningSend,
  m
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
  m.tryDo(res, () => {
    const data = addUserSetting.getSettingByUserId(userId)
    if (data) {
      successSend(res, {
        setting: data
      })
    } else {
      return warningSend(res, "错误")
    }
  })
})

settings.post('/updateSetting', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""

  if (userId && JSON.stringify(body) !== '{}') {
    try {
      addUserSetting.updateDataById(userId, body)
      successSend(res, {}, "保存成功")
    } catch (e) {
      return warningSend(res, '服务器错误')
    }
  } else {
    return warningSend(res, '参数错误')
  }
})

settings.get('/contactAddVerifySetting', (req, res) => {
  const query = req.query
  let userId = ''
  if (query.userId) {
    userId = query.userId
  } else {
    return warningSend(res, '参数错误')
  }
  m.tryDo(res, () => {
    const sendBody = userSetting.getSettingByUserId(userId)
    successSend(res, sendBody)
  })
})

settings.get('/getAddUserSetting', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  const hasEmpty = m.hasEmpty(userId)
  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    const setting = addUserSetting.getAddUesrSettingByUserId(userId)
    successSend(res, setting)
  })
})

module.exports = settings