const path = require('path')
const User = require('./User')
const UserStatus = require('./UserStatus')
const UserGrounps = require('./UserGrounps')
const AddUserSetting = require('./menu/setting')

let user = new User()
const data = user.getData()

const userStatusPath = getPath('userStatus')
let userStatus = new UserStatus(data, userStatusPath)

const userGrounpsPath = getPath('userGrounps')
let userGrounps = new UserGrounps(data, userGrounpsPath)

const addUserSettingPath = getPath('addUserSetting')
let addUserSetting = new AddUserSetting(data, addUserSettingPath)

function getPath(name) {
  return path.join(__dirname, '../data/' + name + '.json')
}

registerBack()

function registerBack() {
  user = new User()
  const data = user.getData()
  userStatus = new UserStatus(data, userStatusPath)
  userGrounps = new UserGrounps(data, userGrounpsPath)
  addUserSetting = new AddUserSetting(data, addUserSettingPath)
}

module.exports = {
  user,
  userStatus,
  userGrounps,
  registerBack,
  addUserSetting
}