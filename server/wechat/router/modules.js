const express = require('express')
const modules = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')
const {
  userAndGoupList
} = require('../models/model')

modules.post('/addContactCategory', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""
  const name = body.name || ""

  if (!userId || !name) {
    warningSend(res, "参数错误")
  }
  userAndGoupList.addUserListById(userId, name)
  successSend(res, {}, "添加成功")
})

modules.post('/addGroupCategory', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""
  const name = body.name || ""
  if (!userId || !name) {
    warningSend(res, "参数错误")
  }
  userAndGoupList.addGroupListById(userId, name)
  successSend(res, {}, "添加成功")
})

module.exports = modules