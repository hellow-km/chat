const express = require('express')
const getSelect = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')
const {
  userAndGoupList
} = require('../models/model')

getSelect.get('/getUserCategory', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  if (!userId) {
    warningSend(res, "参数错误")
  }
  const data = userAndGoupList.getUserNameList(userId)
  successSend(res, data)
})

getSelect.get('/getGroupCategory', (req, res) => {
  const query = req.query || {}
  const userId = query.userId || ""
  if (!userId) {
    warningSend(res, "参数错误")
  }
  const data = userAndGoupList.getGroupNameList(userId)
  successSend(res, data)
})

module.exports = getSelect