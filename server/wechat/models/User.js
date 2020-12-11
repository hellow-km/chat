const path = require('path')
const fs = require('fs')

class User {
  constructor() {
    this.userDataPath = path.join(__dirname, '../data/user.json')
    this.data = this.getData()
  }

  getData() {
    return this.readFile()
  }

  readFile() {
    try {
      let data = fs.readFileSync(this.userDataPath)
      data = JSON.parse(data)
      return data
    } catch (e) {
      return new Error('获取失败')
    }
  }

  getSearchUser(text) {
    const list = this.getData()
    const data = list.filter(p => {
      if (p.account == text || p.nickName == text) {
        return true
      } else {
        return false
      }
    })
    return data
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

module.exports = User