const express = require('express')
const { Nuxt } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = false

async function creatServer() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  await nuxt.ready()

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // define binary type for response
  // if includes, will return base64 encoded, very useful for images
  app.binaryTypes = ['*/*']

  return app
}

module.exports = creatServer
