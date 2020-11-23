const express = require('express')
const address = express.Router()

address.post('/get_address', (req, res) => {
  // res.send({
  //   info: {
  //     success: true,
  //     message: '12345',
  //   },
  //   body: {
  //     token: '1',
  //     address: [{
  //       name: 'log',
  //       code: '001',
  //       /**
  //        * 服务描述
  //        */
  //       description: '登录注册',
  //       /**
  //        * 是否启用：0：否、1：是
  //        */
  //       addressList: [{
  //         code: '0011',
  //         name: '/login',
  //         protocol: '1',
  //       }],

  //       isEnabled: '1'
  //     }]
  //   }
  // })
  res.send({
    info: {
      success: true,
      message: '12345',
    },
    body: {
      token: '1',
    }
  })
})

module.exports = address