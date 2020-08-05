[![Serverless Nuxtjs Tencent Cloud](https://img.serverlesscloud.cn/2020310/1583829094342-nuxt.js%20_%E9%95%BF.png)](http://serverless.com)

# Tencent Nuxt.js Serverless Component

[简体中文](https://github.com/serverless-components/tencent-nuxtjs/blob/v2/README.md) | English

## Introduction

[Nuxt.js](https://github.com/nuxt/nuxt.js) Serverless Component for Tencent Cloud.

## Content

0. [Prepare](#0-prepare)
1. [Install](#1-install)
1. [Create](#2-create)
1. [Configure](#3-configure)
1. [Deploy](#4-deploy)
1. [Remove](#5-Remove)

### 0. Prepare

#### Init Nuxt.js Project

```bash
$ npx create-nuxt-app serverless-nuxtjs
$ cd serverless-nuxtjs
```

### 1. Install

Install the Serverless Framework globally:

```bash
$ npm install -g serverless
```

### 2. Create

In project root, create the following simple boilerplate:

```bash
$ touch serverless.yml
$ touch .env           # your Tencent api keys
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

- If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first.

### 3. Configure

```yml
# serverless.yml
component: nuxtjs
name: nuxtjsDemo
org: orgDemo
app: appDemo
stage: dev

inputs:
  src:
    src: ./src
    exclude:
      - .env
  region: ap-guangzhou
  runtime: Nodejs10.15
  apigatewayConf:
    protocols:
      - http
      - https
    environment: release
```

- [More Options](https://github.com/serverless-components/tencent-nuxtjs/blob/v2/docs/configure.md)

### 4. Deploy

#### 4.1 Build static assets

```bash
$ npm run build
```

#### 4.2 Deploy to cloud

```bash
$ sls deploy
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove
```

## More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.

## Migration for custom express server

If you had used `express` for you server, you should create entry file `sls.js`, please change depand on your server entry file, below is a template:

```js
const express = require('express')
const { loadNuxt } = require('nuxt')

async function createServer() {
  // not report route for custom monitor
  const noReportRoutes = ['/_nuxt', '/static', '/favicon.ico']

  const server = express()
  const nuxt = await loadNuxt('start')

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
```

## Customize Monitor

When deploying Next.js Application, if net config `role` in `serverless.yml`, it will try to bind `QCS_SCFExcuteRole` role for it, and start customize monitor which will help user to collect monitor data.
For project which have no customize entry file `sls.js`, it will ignore request paths which start with `/_next` and `/static`. If you want to customize `sls.js` file, you can create it by yourself. For no report path, just set `__SLS_NO_REPORT__` to `true` on `req` object, like below:

```js
server.get('/no-report', (req, res) => {
  req.__SLS_NO_REPORT__ = true
  return handle(req, res)
})
```

so when user access `GET /no-report` route, it won't report monitor data.

## License

MIT License

Copyright (c) 2020 Tencent Cloud, Inc.
