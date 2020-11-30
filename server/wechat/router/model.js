const fs = require('fs')
const path = require('path')
class User {
  constructor() {
    this.userDataPath = path.join(__dirname, '../data/user.json')
    try {
      const data = fs.readFileSync(this.userDataPath)
      this.data = JSON.parse(data)
    } catch (e) {
      return new Error('获取失败')
    }
  }

  getData() {
    return this.data
  }

  push(...obj) {
    if (arguments.length > 1) {
      for (const value of arguments) {
        if (isObj(value)) {
          this.data.push(value)
        }
      }
    } else {
      const d = arguments[0]
      if (isObj(d)) {
        this.data.push(d)
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(this.userDataPath, this.data)
    } catch (e) {
      return new Error('保存失败')
    }
  }

  changeData(data) {
    try {
      fs.writeFileSync(this.userDataPath, data)
      this.data = data
    } catch (e) {
      return new Error('修改失败')
    }
  }
}

function isObj(d) {
  if (typeof Array.isArray === "function") {
    if (d && typeof d == 'object' && !Array.isArray(d)) {
      return true
    } else {
      return false
    }
  }
}
let user = new User()
const data = user.getData()

class UserAccount {
  constructor(data, path) {
    this.list = this.readFile()
    this.path = path
    if (data.length > 0) {
      data.map(u => {
        const account = u.account
        const obj = {
          account: u.account
        }
        if (this.list.length > 0) {
          const isHasUser = this.list.some(p => {
            p.account == account
          })
          if (!isHasUser) {
            this.list.push(obj)
          }
        } else {
          this.list.push(obj)
        }
      })
    }
  }

  save() {
    try {
      if (this.list && Array.isArray(this.list)) {
        const list = JSON.stringify(this.list)
        fs.writeFileSync(this.path, list)
      }
    } catch (e) {
      return new Error('写入失败')
    }
  }

  readFile() {
    try {
      const data = fs.readFileSync(this.path)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      return []
    }
  }

  getData() {
    return this.list
  }
}

class UserStatus extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.list.map(p => {
      p.isLogin = false
    })
    this.save()
  }

  setUserIsLogin(account, isLogin) {
    if (account) {
      this.list.map(p => {
        if (p.account === account) {
          p.isLogin = isLogin
        }
      })
      this.save()
    }
  }
}

class UserGrounps extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.save()
  }
}

const userStatusPath = path.join(__dirname, '../data/userStatus.json')
let userStatus = new UserStatus(data, userStatusPath)

const userGrounpsPath = path.join(__dirname, '../data/userGrounps.json')
let userGrounps = new UserGrounps(data, userGrounpsPath)

function registerBack() {
  user = new User()
  const data = user.getData()
  userStatus = new UserStatus(data, userStatusPath)
  userGrounps = new UserGrounps(data, userGrounpsPath)
}

module.exports = {
  user,
  userStatus,
  userGrounps,
  registerBack
}