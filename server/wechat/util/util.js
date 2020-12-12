const fs = require('fs')
const path = require('path')

function successSend(res, body, message) {
  res.send({
    info: {
      success: true,
      prompts: [{
        text: message
      }]
    },
    body: body
  })
}

function warningSend(res, message, body) {
  res.send({
    info: {
      success: false,
      warnings: [{
        text: message
      }]
    },
    body: body
  })
}

class M {
  readFile(path) {
    try {
      let data = fs.readFileSync(path)
      data = JSON.parse(data)
      return data
    } catch (e) {
      return false
    }
  }

  writeFile(path, data) {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (e) {

    }
  }

  getPath(name) {
    return path.join(__dirname, '../data/' + name + '.json')
  }

  getId(id) {
    return ('000000000' + id).slice(-6)
  }
}

const m = new M()

module.exports = {
  successSend,
  warningSend,
  m
}