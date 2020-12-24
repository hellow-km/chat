const UserAccount = require('./UserAccount')
const User = require('./User')
const user = new User()
const {
  m
} = require('../util/util')
const {
  userAndGoupList
} = require('./userAndGoupList')

class ChatMessage extends UserAccount {
  constructor(path, list) {
    super(path, list)
    const data = this.getData()
    this.list = this.list.map((p, index) => {
      if (!data[index]) {

      } else {
        p = data[index]
      }
      return p
    })
    this.save()
  }
}