const express = require('express')
const userList = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')
const {
  userAndGoupList
} = require('../models/model')

userList.get('/getUserList', (req, res) => {
  const userId = req.query.userId || ""
  if (userId == "") {
    warningSend(res, "参数错误")
  }
  const data = userAndGoupList.getListById(userId)
  if (data) {
    successSend(res, data)
  } else {
    warningSend(res, "无数据")
  }
})

module.exports = userList