const UserAccount = require('./UserAccount')
const {
  m
} = require('../util/util')
const groups = require('./groups/groups')
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
      return data[0]
    } else {
      return data
    }
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

  getItemById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data
  }
}

module.exports = UserAndGoupList