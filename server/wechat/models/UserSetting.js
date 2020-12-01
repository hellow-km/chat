const UserAccount = require('./UserAccount')

class UserSetting extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.list.map(u => {
      u.setting = {

      }
      return u
    })
    this.save()
  }

  getSettingByUserId(userId) {
    this.list = this.getData()
    const data = this.list.filter(li => {
      return li.userId === userId
    })
    return data
  }
}

module.exports = UserSetting