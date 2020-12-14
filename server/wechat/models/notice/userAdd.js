const {
  m,
  j
} = require('../../util/util')

class UserAdd {
  constructor() {
    this.path = m.getPath('notice_userAdd')
    const data = this.getData()
    if (data) {
      this.data = data
    } else {
      this.data = []
    }
    this.save()
  }

  getData() {
    // const jsonD = m.readFile(this.path)
    // let data = new Map()
    // if (!jsonD) {
    //   this.save()
    // } else {
    //   data = j._objToStrMap(jsonD)
    // }
    // return data
    return m.readFile(this.path)
  }

  addUserNotice(body) {
    this.data = this.getData()
    const sendUserId = body.sendUserId || ""
    const targetUserId = body.targetUserId || ""
    const verifyType = body.verifyType || ""
    // const hasKey = this.data.has(targetUserId)
    // if (hasKey) {
    //   let value = this.data.get(targetUserId)
    //   body.id = value.length + 1
    //   value.push(body)
    //   this.data.set(targetUserId, value)
    // } else {
    //   body.id = 1
    //   this.data.set(targetUserId, [body])
    // }
    let hasKey = false
    for (const value of this.data) {
      if (value[targetUserId]) {
        const item = value[targetUserId]
        const isSend = item.some(p => p.sendUserId == sendUserId && p.targetUserId == targetUserId)
        if (isSend) {
          return true
        }
        body.id = item.length + 1
        item.push(body)
        value[targetUserId] = item
        hasKey = true
      }
    }
    if (!hasKey) {
      body.id = 1
      this.data.push({
        [targetUserId]: [body]
      })
    }
    this.save()
  }

  save() {
    //const json = j._mapToJson(this.data)
    //m.writeFile(this.path, json)
    m.writeFile(this.path, this.data)
  }
}

module.exports = new UserAdd()