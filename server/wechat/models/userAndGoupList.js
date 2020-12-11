const UserAccount = require('./UserAccount')

class UserAndGoupList extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.list.map(p => {
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
      p.groupList = []
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
          countText: "[0/0]",
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

  getItemById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data
  }
}

module.exports = UserAndGoupList