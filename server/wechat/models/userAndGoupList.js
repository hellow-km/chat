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
    const data = this.list.filter(p => p.userId == userId)
    if (data.length == 1) {
      return data[0]
    } else {
      return data
    }
  }
}

module.exports = UserAndGoupList