const path = require('path')
const express = require('express')
const { Nuxt } = require('nuxt')

// not report route for custom monitor
const noReportRoutes = ['/_next', '/static']

async function createServer(custom) {
  const server = express()
  // get next config
  let configPath = path.join(__dirname, '..', 'nuxt.config.js')
  if (custom) {
    configPath = path.join(__dirname, 'nuxt.config.js')
  }
  const config = require(configPath)
  config.dev = false

  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  await nuxt.ready()

  // Give nuxt middleware to express
  // app.use(nuxt.render)
  server.all('*', (req, res, next) => {
    noReportRoutes.forEach((route) => {
      if (req.path.indexOf(route) === 0) {
        req.__SLS_NO_REPORT__ = true
      }
    })
    return nuxt.render(req, res, next)
  })

  // define binary type for response
  // if includes, will return base64 encoded, very useful for images
  server.binaryTypes = ['*/*']

  return server
}

module.exports = createServer
