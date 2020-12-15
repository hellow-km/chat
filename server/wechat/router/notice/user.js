const express = require('express')
const user = express.Router()
const {
  userAdd,
  addUserSetting
} = require('../../models/model')
const {
  warningSend,
  successSend,
  m
} = require('../../util/util')

user.post('/sendAddUser', (req, res) => {
  const body = m.getBody(req)
  const sendUserId = body.sendUserId || ""
  const targetUserId = body.targetUserId || ""
  const verifyType = body.verifyType || ""
  const answer = body.answer || ""
  const hasEmpty = m.hasEmpty(sendUserId, targetUserId, verifyType)
  if (hasEmpty) {
    return warningSend(res, "参数错误")
  }
  if (sendUserId == targetUserId) {
    return warningSend(res, "不能添加自己为好友")
  }
  if (verifyType == 3) {
    const isRightAnswer = addUserSetting.checkSettingAnswer(targetUserId, answer)
    if (!isRightAnswer) {
      return warningSend(res, "答案错误")
    }
  }
  try {
    const isSend = userAdd.addUserNotice(body)
    if (isSend) {
      return warningSend(res, "你已发送过请求，请勿重新发送")
    }
    successSend(res, {}, "请求成功")
  } catch (e) {
    warningSend(res, "请求失败")
  }
})

user.get('/addUserNoctice', (req, res) => {
  const query = req.query
  const userId = query.userId || ""
  const page = query.page || {}
  if (m.hasEmpty(userId, page)) {
    warningSend(res, "参数错误")
  }
  // try{
  const data = userAdd.getUserAddNotice(userId, page)
  successSend(res, {
    list: data
  })
  // }
  // catch(e){
  //   warningSend(res,"请求失败")
  // }
})

module.exports = user