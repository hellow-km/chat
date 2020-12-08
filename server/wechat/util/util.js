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

module.exports = {
  successSend,
  warningSend
}