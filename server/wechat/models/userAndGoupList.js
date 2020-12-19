const UserAccount = require('./UserAccount')
const {
  m
} = require('../util/util')
const groups = require('./groups/groups')
const userAdd = require('./notice/userAdd')
const User = require('./User')
const user = new User()
const {
  userStatus
} = require('./UserStatus.js')


class UserAndGoupList extends UserAccount {
  constructor(list, path) {
    super(list, path)
    const data = this.getData()
    this.list = this.list.map((p, index) => {
      if (!data[index]) {
        const userList = [{
          key: 0,
          name: "我的好友",
          rank: 0,
          countText: "[0/0]",
          items: [],
          isOpen: false,
          red: false,
          redCount: 0
        }];
        p.userList = userList;
        p.groupList = [{
          key: 0,
          name: "默认分组",
          rank: 0,
          countText: "[0]",
          items: [],
          isOpen: false,
          red: false,
          redCount: 0
        }]
      } else {
        p = data[index]
      }
      return p
    })
    this.save()
  }

  getListById(userId) {
    this.list = this.getData()
    const data = this.getItemById(this.list, userId)
    if (data.length == 1) {
      return this.getUserStatusContext(data[0])
    } else {
      return data
    }
  }

  getUserStatusContext(data) {
    const userList = data.userList
    for (const value of userList) {
      const items = value.items
      for (const item of items) {
        const isOnline = userStatus.getStatus(item.id)
        item.gray = !isOnline
      }
      const onlineCount = this.getOnlineCount(data.userId, value.key)
      value.countText = `[${onlineCount}/${items.length}]`
    }
    this.save()
    return data
  }

  addGroup(group) {
    this.list = this.getData()
    const belongUserId = group.belongUserId
    if (group) {
      const p = this.getItemById(this.list, belongUserId)[0]
      const length = groups.getLength()
      group.id = m.getId(length + 1)
      group.number = m.getId(length)
      const key = group.group
      const count = p.groupList[key].items.length
      p.groupList[key].countText = "[" + (count + 1) + "]"
      p.groupList[key].items.push(group)
      groups.addGroup(group)
      this.save()
    }
  }

  addUserListById(userId, name) {
    this.list = this.getData()
    const p = this.getItemById(this.list, userId)[0]
    const length = p.userList.length
    let obj = {
      name: name,
      key: length,
      rank: length,
      countText: "[0/0]",
      items: [],
      isOpen: false,
      red: false,
      redCount: 0
    }
    p.userList.push(obj)
    this.save()
  }

  addGroupListById(userId, name) {
    this.list = this.getData()
    const p = this.getItemById(this.list, userId)[0]
    const length = p.groupList.length
    let obj = {
      name: name,
      key: length,
      rank: length,
      countText: "[0]",
      items: [],
      isOpen: false,
      red: false,
      redCount: 0
    }
    p.groupList.push(obj)

    this.save()
  }

  getUserNameList(userId) {
    let list = this.getData()
    const item = this.getItemById(list, userId)[0]
    const userList = item.userList
    return userList.map(p => {
      const item = {
        name: p.name,
        rank: p.rank,
        id: p.key,
        userId: userId
      }
      return item
    })
  }

  getGroupNameList(userId) {
    let list = this.getData()
    const item = this.getItemById(list, userId)[0]
    const groupList = item.groupList
    return groupList.map(p => {
      const item = {
        name: p.name,
        rank: p.rank,
        id: p.key,
        userId: userId
      }
      return item
    })
  }

  toggleClass(userId, type, key, isOpen) {
    this.list = this.getData()
    let listType = type == 'user' ? 'userList' : 'groupList'
    const data = this.getItemById(this.list, userId)[0]
    let values = data[listType]
    values = values.map(p => {
      if (p.key == key) {
        p.isOpen = isOpen
      }
    })
    this.save()
  }

  addUserToList(body) {
    const sendRemark = body.sendRemark || ""
    const sendUserId = body.sendUserId
    const acceptRemark = body.acceptRemark || ""
    const acceptUserId = body.acceptUserId
    const acceptKey = body.acceptKey
    const sendKey = body.sendKey
    const noticeId = body.noticeId
    const isAdded = this.addUser(acceptUserId, sendUserId, noticeId, acceptKey, acceptRemark)
    this.addUser(sendUserId, acceptUserId, noticeId, sendKey, sendRemark)
    if (isAdded) {
      return isAdded
    }
  }

  addUser(userId, addId, noticeId, key, remark) {
    this.list = this.getData()
    if (this.checkIsAdded(userId, addId, key)) {
      return true
    }
    let item = this.getItemById(this.list, userId)[0]
    let userList = item.userList
    for (let value of userList) {
      if (value.key == key) {
        const userObj = user.getUserById(addId)
        userObj.remark = remark
        const isLogin = userStatus.getStatus(userObj.id)
        userObj.gray = !isLogin
        userAdd.setNoticeHandle(addId, noticeId, "2")
        const items = value.items
        items.push(userObj)
        const onLineCounts = this.getOnlineCount(userId, key)
        value.countText = `[${onLineCounts}/${items.length}]`
      }
    }
    this.save()
  }

  getOnlineCount(userId, key) {
    let count = 0
    const items = this.getUserListItems(userId, key)
    for (const value of items) {
      if (!value.gray) {
        count++
      }
    }
    return count
  }

  getUserListItems(userId, key) {
    const list = this.getData()
    let item = this.getItemById(list, userId)[0]
    let userList = item.userList
    const items = this.getItems(userList, key)
    return items
  }

  checkIsAdded(id, targetId, key) {
    const list = this.getData()
    const data = this.getItemById(list, id)[0]
    const userList = data.userList
    const items = this.getItems(userList, key)
    for (const item of items) {
      if (item.id == targetId) {
        return true
      }
    }
    return false
  }

  getItemById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data
  }

  getItems(userList, key) {
    for (let value of userList) {
      if (value.key == key) {
        return value.items
      }
    }
  }

  getUserById(userId, sendId) {
    this.list = this.getData()
    const data = this.getItemById(this.list, userId)[0]
    const userList = data.userList
    for (let value of userList) {
      const items = value.items
      for (const user of items) {
        if (user.id == sendId) {
          return user
        }
      }
    }
  }

}
const data = user.getData()
const userAndGoupListPath = m.getPath('userAndGoupList')
let userAndGoupList = new UserAndGoupList(data, userAndGoupListPath)

module.exports = {
  UserAndGoupList,
  userAndGoupList
}