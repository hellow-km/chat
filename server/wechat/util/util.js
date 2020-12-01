function successSend(res, body) {
  res.send({
    info: {
      success: true
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

module.exports = {
  successSend,
  warningSend
}