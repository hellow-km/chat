const path = require('path')
const fs = require('fs')
const {
  m
} = require('../util/util')
class User {
  constructor() {
    this.path = m.getPath('user')
    this.data = this.getData()
  }

  getData() {
    const data = m.readFile(this.path)
    if (data) {
      return data
    } else {
      return []
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

  updateUser(user) {
    this.data = this.getData()
    const id = user.id
    const index = this.data.findIndex(p => p.id == id)
    if (index == -1) return
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        this.data[index][key] = user[key]
      }
    }
    m.writeFile(this.path, this.data)
  }

  changePassWord(id, password, newPassword) {
    this.data = this.getData()
    let mark = true
    let p = this.getUserObjById(this.data, id)
    if (p.password == password) {
      p.password = newPassword
      this.save()
    } else {
      mark = false
    }
    return mark
  }

  save() {
    m.writeFile(this.path, this.data)
  }

  getUserById(userId) {
    this.data = this.getData()
    let data = this.getUserObjById(this.data, userId)
    delete data.password
    return data
  }

  getUserObjById(list, userId) {
    const data = list.filter(p => p.id == userId)
    return data[0]
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