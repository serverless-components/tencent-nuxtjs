try {
  require('tencent-component-monitor')
} catch (e) {
  console.log(e)
}
const fs = require('fs')
const path = require('path')
const { createServer, proxy } = require('tencent-serverless-http')

let app
let server

module.exports.handler = async (event, context) => {
  if (!app) {
    const userSls = path.join(__dirname, '..', process.env.SLS_ENTRY_FILE)
    if (fs.existsSync(userSls)) {
      // eslint-disable-next-line
      console.log(`Using user custom entry file ${process.env.SLS_ENTRY_FILE}`)
      app = await require(userSls)(true)
    } else {
      app = await require('./sls')(false)
    }

    // provide sls intialize hooks
    if (app.slsInitialize && typeof app.slsInitialize === 'function') {
      await app.slsInitialize()
    }
  }

  // attach event and context to request
  try {
    app.request.__SLS_EVENT__ = event
    app.request.__SLS_CONTEXT__ = context
  } catch (e) {
    // no op
  }

  // do not cache server, so we can pass latest event to server
  server = createServer(
    app.callback && typeof app.callback === 'function' ? app.callback() : app,
    null,
    app.binaryTypes || []
  )

  context.callbackWaitsForEmptyEventLoop = app.callbackWaitsForEmptyEventLoop === true

  const { promise } = await proxy(server, event, context, 'PROMISE')
  return promise
}
