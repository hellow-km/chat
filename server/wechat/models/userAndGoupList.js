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
    return data
  }

  addGroup(group) {
    this.list = this.getData()
    const belongUserId = group.belongUserId
    if (group) {
      this.list.map(p => {
        if (p.userId == belongUserId) {
          const length = groups.getLength()
          group.id = m.getId(length + 1)
          group.number = m.getId(length)
          const key = group.group
          const count = p.groupList[key].items.length
          p.groupList[key].countText = "[" + (count + 1) + "]"
          p.groupList[key].items.push(group)
          groups.addGroup(group)
        }
        return p
      })
      this.save()
    }
  }

  addUserListById(userId, name) {
    this.list = this.getData()
    this.list.map(p => {
      if (p.userId == userId) {
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
      }
      return p
    })
    this.save()
  }

  addGroupListById(userId, name) {
    this.list = this.getData()
    this.list.map(p => {
      if (p.userId == userId) {
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
      }
      return p
    })
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

  addUserToList(body) {
    const sendRemark = body.sendRemark || ""
    const sendUserId = body.sendUserId
    const acceptRemark = body.acceptRemark || ""
    const acceptUserId = body.acceptUserId
    const acceptKey = body.acceptKey
    const sendKey = body.sendKey
    const noticeId = body.noticeId
    const isAdded = this.addUser(acceptUserId, sendUserId, acceptKey, acceptRemark)
    this.addUser(sendUserId, acceptUserId, noticeId, sendKey, sendRemark)
    this.save()
    if (isAdded) {
      return isAdded
    }
  }

  addUser(userId, addId, noticeId, key, remark) {
    this.list = this.getData()
    if (this.checkIsAdded(userId, addId)) {
      return true
    }
    for (let i = 0; i < this.list.length; i++) {
      let item = this.list[i]
      if (item.userId == userId) {
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
      }
    }
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
    for (let i = 0; i < this.list.length; i++) {
      let item = this.list[i]
      if (item.userId == userId) {
        let userList = item.userList
        for (let value of userList) {
          if (value.key == key) {
            return value.items
          }
        }
      }
    }
  }

  checkIsAdded(id, targetId) {
    const list = this.getData()
    const data = this.getItemById(list, id)
    for (const value of data) {
      if (value.id == targetId) {
        return true
      }
    }
    return false
  }

  getItemById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data
  }


}
const data = user.getData()
const userAndGoupListPath = m.getPath('userAndGoupList')
let userAndGoupList = new UserAndGoupList(data, userAndGoupListPath)

module.exports = {
  UserAndGoupList,
  userAndGoupList
}