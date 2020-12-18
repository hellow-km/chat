const UserAccount = require('./UserAccount')
const User = require('./User')
const user = new User()
const {
  m
} = require('../util/util')

class Message extends UserAccount {
  constructor(list, path) {
    super(list, path)
    const data = this.getData()
    this.list = this.list.map((p, index) => {
      if (!data[index]) {
        p.userMessage = []
        p.groupMessage = []
      } else {
        p = data[index]
      }
      return p
    })
    this.save()
  }

  getList(userId) {
    const data = this.getMessageById(userId)
    return data
  }

  getMessageById(userId) {
    this.list = this.getData()
    return this.list.filter(p => p.userId == userId)
  }
}
const data = user.getData()
const messagePath = m.getPath('message')

const message = new Message(data, messagePath)

module.exports = {
  Message,
  message
}