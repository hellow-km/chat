const UserAccount = require('./UserAccount')

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
}

module.exports = UserStatus