const path = require('path')
const fs = require('fs')

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

module.exports = User