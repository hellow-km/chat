const path = require('path')
const User = require('./User')
const UserStatus = require('./UserStatus')
const UserGrounps = require('./UserGrounps')
const UserSetting = require('./UserSetting')

let user = new User()
const data = user.getData()

const userStatusPath = getPath('userStatus')
let userStatus = new UserStatus(data, userStatusPath)

const userGrounpsPath = getPath('userGrounps')
let userGrounps = new UserGrounps(data, userGrounpsPath)

const userSettingPath = getPath('userSetting')
let userSetting = new UserSetting(data, userSettingPath)

function getPath(name) {
  return path.join(__dirname, '../data/' + name + '.json')
}

registerBack()

function registerBack() {
  user = new User()
  const data = user.getData()
  userStatus = new UserStatus(data, userStatusPath)
  userGrounps = new UserGrounps(data, userGrounpsPath)
  userSetting = new UserSetting(data, userSettingPath)
}

module.exports = {
  user,
  userStatus,
  userGrounps,
  registerBack,
  userSetting
}