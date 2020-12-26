const path = require('path')
const User = require('./User')
const {
  UserStatus
} = require('./UserStatus')
const {
  UserAndGoupList
} = require('./userAndGoupList')
const {
  UserSetting
} = require('./menu/setting')
const groups = require('./groups/groups')
const userAdd = require('./notice/userAdd')
const {
  Message
} = require('./Message')
const {
  chatMessage
} = require('./ChatMessage')

let user = new User()
const data = user.getData()

const userStatusPath = getPath('userStatus')
let userStatus = new UserStatus(data, userStatusPath)

const userAndGoupListPath = getPath('userAndGoupList')
let userAndGoupList = new UserAndGoupList(data, userAndGoupListPath)

const addUserSettingPath = getPath('addUserSetting')
let addUserSetting = new UserSetting(data, addUserSettingPath)

const messagePath = getPath('message')
let message = new Message(data, messagePath)

function getPath(name) {
  return path.join(__dirname, '../data/' + name + '.json')
}

registerBack()

function registerBack() {
  user = new User()
  const data = user.getData()
  userStatus = new UserStatus(data, userStatusPath)
  userAndGoupList = new UserAndGoupList(data, userAndGoupListPath)
  addUserSetting = new UserSetting(data, addUserSettingPath)
  message = new Message(data, messagePath)
}

module.exports = {
  user,
  userStatus,
  userAndGoupList,
  registerBack,
  addUserSetting,
  //groups,
  userAdd,
  message,
  chatMessage
}