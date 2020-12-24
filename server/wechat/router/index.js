const log = require('./log')
const address = require('./getAddress')
const userSetting = require('./addUserSetting')
const menu = require('./menu')
const userAndGoupList = require('./userAndGoupList')
const find = require('./find')
const modules = require('./modules')
const getSelect = require('./getSelect')
const noticeUser = require('./notice/user')
const message = require('./message')
const chat = require('./chat')
module.exports = {
  log,
  address,
  userSetting,
  menu,
  userAndGoupList,
  find,
  modules,
  getSelect,
  noticeUser,
  message,
  chat
}