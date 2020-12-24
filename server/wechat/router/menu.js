const express = require('express')
const menu = express.Router()
var multer = require('multer')
const path = require('path')
const {
  successSend,
  warningSend,
  m
} = require('../util/util')

const {
  user
} = require('../models/model')

const fs = require('fs')
const headImgDir = path.resolve(__dirname, '../public/headImg');
const uploadImgDir = path.resolve(__dirname, '../public/uploadChatImg');

const headStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, headImgDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const chatStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadImgDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const uploadHead = multer({
  storage: headStorage
});
const uploadChat = multer({
  storage: chatStorage
});
menu.post('/updateHead', uploadHead.single('file'), (req, res) => {
  const SIZELIMIT = 20000000;
  if (req.file === undefined) {
    return warningSend(res, '参数错误')
  }
  const {
    size,
    filename
  } = req.file;

  if (size >= SIZELIMIT) {
    return warningSend(res, '图片太大')
  }

  const file = req.file

  file.url = `http://localhost:3000/public/headImg/${filename}`
  successSend(res, file, '上传成功')
})

menu.post('/uploadImage', uploadChat.single('file'), (req, res) => {
  const SIZELIMIT = 20000000;

  if (req.file === undefined) {
    return warningSend(res, '参数错误')
  }
  const {
    size,
    filename
  } = req.file;

  if (size >= SIZELIMIT) {
    return warningSend(res, '图片太大')
  }

  const file = req.file

  file.url = `http://localhost:3000/public/uploadChatImg/${filename}`
  successSend(res, file, '上传成功')
})

menu.post('/updateUser', (req, res) => {
  const body = req.body.body || {}
  if (body && body.id) {
    m.tryDo(res, () => {
      user.updateUser(body)
      successSend(res, body, "修改成功")
    })
  } else {
    return warningSend(res, "参数错误")
  }
})

menu.post('/changePassword', (req, res) => {
  const body = m.getBody(req)
  const id = body.id || ""
  const password = body.password
  const newPassword = body.newPassword
  if (!id || !password || !newPassword) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    const success = user.changePassWord(id, password, newPassword)
    if (success) {
      successSend(res, {}, "修改成功")
    } else {
      return warningSend(res, "修改失败")
    }
  })
})

module.exports = menu