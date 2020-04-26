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
$ mkdir serverless-nuxtjs && cd serverless-nuxtjs
$ npx create-nuxt-app src
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

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
