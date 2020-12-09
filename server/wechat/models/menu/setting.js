const UserAccount = require('../UserAccount')

class UserSetting extends UserAccount {
  constructor(list, path) {
    super(list, path)
    this.list.map(u => {
      u.setting = {
        VERIFY_TYPE_ANY: 1,
        /*** 2：需要验证 **/
        VERIFY_TYPE_AUTH: 2,
        /*** 3：需要回答正确的问题 **/
        VERIFY_TYPE_ANSWER: 3,
        /*** 4：需要回答问题并由我确认 **/
        VERIFY_TYPE_CONFIRM: 4,

        userId: '',
        /**
         * 1：允许任何人添加 <br>
         * 2：需要验证 <br>
         * 3：需要回答正确的问题 <br>
         * 4：需要回答问题并由我确认 <br>
         */
        verifyType: 2,
        question: '',
        answer: '',
        onlyQuestions: []
      }
      return u
    })
    this.save()
  }

  getSettingByUserId(userId) {
    this.list = this.getData()
    const data = this.list.filter(li => {
      return li.userId === userId
    })

    if (data.length == 1) {
      return data[0].setting
    } else {
      return data
    }
  }

  updateDataById(userId, setting) {
    this.list = this.getData()
    const data = this.list.map(li => {
      if (li.userId === userId) {
        li.setting = setting
      }
      return li
    })
    this.update(data)
  }
}

module.exports = UserSetting