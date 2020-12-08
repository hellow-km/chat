const express = require('express')
const menu = express.Router()
var multer = require('multer')
const path = require('path')
const {
  successSend,
  warningSend
} = require('../util/util')
const fs = require('fs')
const dir = path.resolve(__dirname, '../public/img');
const storage = multer.diskStorage({
  // 指定文件路径
  destination: function (req, file, cb) {
    // ！！！相对路径时以node执行目录为基准，避免权限问题，该目录最好已存在*
    // cb(null, './uploads');
    cb(null, dir);
  },
  // 指定文件名
  filename: function (req, file, cb) {
    // filedname指向参数key值
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage
});
const SIZELIMIT = 20000000;
menu.post('/updateHead', upload.single('file'), (req, res) => {
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

  fs.readFile('../public/img/' + filename + "", function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
  const file = req.file
  // 这里是拼接返回给前端的路径，现在所获取到的filename是没有文件格式的，但是在本地的项目时，是可以展示的。
  // 如果作为线上项目，你要配置public文件夹
  // 代码-线上接口，展示的是以5000端口返回的图片地址有图片格式的返回
  file.url = `http://localhost:3000/public/img/${filename}`
  successSend(res, file, '上传成功')
})

module.exports = menu