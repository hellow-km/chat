const UserAccount = require('./UserAccount')

class UserStatus extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.list.map(p => {
      p.isLogin = false
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
}

module.exports = UserStatus