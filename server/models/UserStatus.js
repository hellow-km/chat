const UserAccount = require('./UserAccount')
const {
  m
} = require('../util/util')
const User = require('./User')
const user = new User()
const data = user.getData()

class UserStatus extends UserAccount {
  constructor(list, path) {
    super(list, path)
    const data = this.getData()
    this.list = this.list.map((p, index) => {
      if (!data[index]) {
        p.isLogin = false
      } else {
        p = data[index]
      }
      return p
    })
    this.save()
  }

  setUserIsLogin(account, isLogin) {
    this.list = this.getData()
    if (account) {
      this.list.map(p => {
        if (p.account === account) {
          p.isLogin = isLogin
        }
        return p
      })
      this.save()
    }
  }

  getStatus(userId) {
    this.list = this.getData()
    const data = this.list.filter(p => {
      if (p.userId == userId) {
        return true
      } else {
        return false
      }
    })
    return data[0].isLogin
  }
}
const userStatusPath = m.getPath('userStatus')
let userStatus = new UserStatus(data, userStatusPath)
module.exports = {
  UserStatus,
  userStatus
}