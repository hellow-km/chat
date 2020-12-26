const fs = require('fs')

class UserAccount {
  constructor(data, path) {
    this.list = this.readFile()
    this.path = path
    if (data.length > 0) {
      data.map(u => {
        const id = u.id
        const account = u.account
        const obj = {
          userId: id,
          account: account
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

  writeFile(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data))
    } catch (e) {

    }
  }

  getData() {
    return this.readFile()
  }

  update(data) {
    this.list = data
    this.writeFile(data)
  }

  getDataObjById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data[0]
  }
}

module.exports = UserAccount