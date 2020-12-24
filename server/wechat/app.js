const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
var multer = require('multer')
const {
  log,
  address,
  userSetting,
  menu,
  userAndGoupList,
  find,
  modules,
  getSelect,
  noticeUser,
  message,
  chat
} = require('./router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

const {
  resetJsonExUser
} = require('./util/util')

app.use('/public', express.static(path.join(__dirname, './public')));

const upload = multer({
  dest: __dirname + './upload'
})

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  // const cors = ['http://localhost:8080', 'http://192.168.2.101:8080']
  // if (cors.indexOf(req.headers.origin) > -1) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  //res.header("Access-Control-Allow-Headers", "content-type");
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'get,post')
  res.header('Access-Control-Allow-Credentials', true)
  res.setHeader('Content-Type', 'application/json');
  //}
  next()
})
app.use('/', address)
app.use('/client', log)
app.use('/setting', userSetting)
app.use('/menu', menu)
app.use('/user', userAndGoupList)
app.use('/find', find)
app.use('/modules', modules)
app.use('/getSelect', getSelect)
app.use('/notice', noticeUser)
app.use('/message', message)
app.use('/chat', chat)

app.get('/resetJsonExUser', (req, res) => {
  resetJsonExUser()
  res.send('ok')
})
app.listen(3000)

var ws = require('nodejs-websocket');
const {
  userStatus
} = require('./models/model.js')
var server = ws.createServer(function (conn) {
  const account = global.account || ''
  conn.on("text", function (str) {
    if (str === 'open') {
      conn.sendText('连接成功');
    }
  })
  conn.on("close", function (code, reason) {
    userStatus.setUserIsLogin(account, false)
  })
  conn.on("error", function (code, reason) {
    userStatus.setUserIsLogin(account, false)
  });
}).listen(3001)