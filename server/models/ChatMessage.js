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

  getList(userId, key) {
    const roomData = this.getOrCreateChatRoomByKey(userId, key)
    return roomData
  }

  sendMessage(id, key, targetId, html) {
    const data = this.add(id, key, targetId, html, true)
    this.add(id, key, targetId, html, false)
    this.save()
    return data
  }

  add(id, key, targetId, html, isOwn) {
    let roomData;
    if (!isOwn) {
      message.addUserMessage(targetId, id)
      roomData = this.getOrCreateChatRoomByKey(targetId, key)
    } else {
      roomData = this.getOrCreateChatRoomByKey(id, key)
    }
    const chatList = roomData.chatList
    const u = user.getUserById(id)
    const showName = u.remark ? u.remark : u.nickName
    const obj = {
      id,
      targetId,
      key: key,
      user: u,
      showName,
      isOwn,
      context: {
        html: html,
        timestamp: new Date().getTime()
      }
    }
    chatList.push(obj)
    return obj
  }

  getItemById(id) {
    return this.list.filter(p => p.userId == id)[0]
  }

  getOrCreateChatRoomByKey(id, key) {
    const data = this.getItemById(id)
    const allChatList = data.allChatList
    const list = allChatList.filter(p => p.key == key)
    if (list.length) {
      return list[0]
    } else {
      if (!allChatList) {
        allChatList = []
      }
      allChatList.push({
        key: key,
        chatList: []
      })
      return allChatList[allChatList.length - 1]
    }
  }
}

const data = user.getData()
const path = m.getPath('chatList')
const chatMessage = new ChatMessage(data, path)

module.exports = {
  ChatMessage,
  chatMessage
}