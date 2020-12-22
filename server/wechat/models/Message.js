const UserAccount = require('./UserAccount')
const User = require('./User')
const user = new User()
const {
  m
} = require('../util/util')
const {
  userAndGoupList
} = require('./userAndGoupList')

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

  getListById(userId) {
    const data = this.getMessageById(userId)
    return data
  }

  addUserMessage(userId, sendId) {
    return this.addUserMessageById(userId, sendId)
  }

  addUserMessageById(userId, sendId) {
    const data = this.getMessageById(userId)[0]
    const userMessage = data.userMessage
    const user = userAndGoupList.getUserById(userId, sendId)
    const m = userMessage.filter(p => p.userId == user.id)
    if (m.length == 1) {
      return m[0]
    }
    const name = user.remark || user.nickName
    let obj = {
      type: 'user',
      userId: user.id,
      active: true,
      key: userMessage.length + 1,
      name,
      avatar: user.avatar,
      gray: user.gray,
      red: user.red,
      redCount: user.redCount,
      text: '',
      time: new Date().getTime(),
      createTime: new Date().getTime()
    }
    userMessage.push(obj)
    this.save()
    return obj
  }

  removeMessage(userId, type, key) {
    const data = this.getMessageById(userId)[0]
    let mesType = type == 'user' ? 'userMessage' : 'groupMessage'
    const mes = data[mesType]
    mes.forEach((m, index) => {
      if (m.key == key) {
        mes.splice(index, 1)
      }
    })
    this.save()
  }

  getMessageById(userId) {
    this.list = this.getData()
    return this.list.filter(p => p.userId == userId)
  }

  getMessageItem(userId, key) {
    const data = this.getMessageById(userId)
    const userMessage = data.userMessage
    return userMessage.filter(p => p.key == key)
  }

}
const data = user.getData()
const messagePath = m.getPath('message')

const message = new Message(data, messagePath)
module.exports = {
  Message,
  message
}