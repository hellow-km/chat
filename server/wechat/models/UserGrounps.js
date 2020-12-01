const UserAccount = require('./UserAccount')

class UserGrounps extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.save()
  }
}

module.exports = UserGrounps