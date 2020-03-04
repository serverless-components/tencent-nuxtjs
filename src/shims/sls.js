const express = require.fromParentEnvironment('express')
const { Nuxt } = require.fromParentEnvironment('nuxt')
const pkg = require.fromParentEnvironment('./package.json')

const app = express()

// Import and Set Nuxt.js options
const config = require.fromParentEnvironment('./nuxt.config.js')
config.dev = false

async function createServer() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  await nuxt.ready()

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // define binary type for response
  // if includes, will return base64 encoded, very useful for images
  app.binaryTypes = pkg.binaryTypes || ['*/*']

  return app
}

module.exports = createServer
