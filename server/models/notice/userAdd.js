const {
  m,
  j
} = require('../../util/util')
const User = require('../User')
const user = new User()

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
    return m.readFile(this.path)
  }

  addUserNotice(body) {
    this.data = this.getData()
    const sendUserId = body.sendUserId || ""
    const targetUserId = body.targetUserId || ""
    const verifyType = body.verifyType || ""
    let hasKey = false
    body.handleType = "1"
    body.handleTime = new Date().getTime()
    for (const value of this.data) {
      if (value[targetUserId]) {
        const item = value[targetUserId]
        const isSend = item.some(p => p.sendUserId == sendUserId && p.targetUserId == targetUserId)
        if (isSend) {
          return "你已经发送过请求"
        }
        body.id = item.length + 1
        item.push(body)
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

  setNoticeHandle(userId, id, handleType) {
    this.data = this.getData()
    for (const item of this.data) {
      if (item.hasOwnProperty(userId)) {
        item[userId][id - 1].handleType = handleType
      }
    }
    this.save()
  }

  getUserAddNotice(userId, pageObj) {
    const data = this.getData()
    const pageSize = pageObj.pageSize || 10
    const page = pageObj.page || 1
    let noticeList = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty(userId)) {
        noticeList = data[i][userId]
        break
      }
    }
    const list = []
    if (noticeList.length > 0) {
      noticeList = noticeList.sort(m.compare('id', false))
      const pageBegin = (page - 1) * pageSize
      const pageEnd = page * pageSize - 1
      noticeList.forEach((p, index) => {
        if (index >= pageBegin && index <= pageEnd) {
          const sendUserId = p.sendUserId
          const userObj = user.getUserById(sendUserId)
          list.push({
            user: userObj,
            apply: p,
            answerList: p.answerList
          })
        }
      })
    }
    return list
  }

  save() {
    m.writeFile(this.path, this.data)
  }
}

module.exports = new UserAdd()