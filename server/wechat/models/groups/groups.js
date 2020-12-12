const {
  m
} = require('../../util/util')
class Groups {
  constructor() {
    this.path = m.getPath('groups')
    this.data = m.readFile(this.path)
    if (!this.data) {
      this.data = []
      this.save()
    }
  }

  getData() {
    return m.readFile(this.path)
  }

  getLength() {
    return this.getData().length
  }

  addGroup(group) {
    if (group) {
      this.data.push(group)
      this.save()
    }
  }

  save() {
    m.writeFile(this.path, this.data)
  }
}

const groups = new Groups()

module.exports = groups