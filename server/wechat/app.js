const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const {
  log,
  address
} = require('./router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('public'));

app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  const cors = ['http://localhost:8080', 'http://192.168.2.101:8080']
  if (cors.indexOf(req.headers.origin) > -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    //res.header("Access-Control-Allow-Headers", "content-type");
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'get,post')
    res.header('Access-Control-Allow-Credentials', true)
    res.setHeader('Content-Type', 'application/json');
  }
  next()
})
app.use('/', address)
app.use('/client', log)

app.listen(3000)