const UserAccount = require('./UserAccount')
const User = require('./User')
const user = new User()
const {
  m
} = require('../util/util')
const {
  message
} = require('./Message')

class ChatMessage extends UserAccount {
  constructor(list, path) {
    super(list, path)
    const data = this.getData()
    const messageData = message.getData()
    this.list = this.list.map((p, index) => {
      if (!data[index]) {
        const i = messageData.findIndex(m => m.userId == p.userId)
        const mList = messageData[i].userMessage
        const length = mList.length
        p.allChatList = []
        for (let i = 1; i <= length; i++) {
          p.allChatList.push({
            key: i,
            chatList: []
          })
        }
      } else {
        p = data[index]
      }
      return p
    })
    this.save()
  }

  add(id, key, targetId) {
    const roomData = this.getChatRoomByKey(id, key)
    message.addUserMessage(targetId, id)

  }

  getItemById(id) {
    return this.list.filter(p => p.userId == id)[0]
  }

  getChatRoomByKey(id, key) {
    const data = this.getItemById(id)
    return data.allChatList.filter(p => p.key == key)[0]
  }
}

const data = user.getData()
const path = m.getPath('chatList')
const chatMessage = new ChatMessage(data, path)

module.exports = {
  ChatMessage,
  chatMessage
}