# Tencent Nuxt.js Serverless Component

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-nuxtjs)](http://www.npmtrends.com/%40serverless%2Ftencent-nuxtjs)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-nuxtjs.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-nuxtjs)

[简体中文](https://github.com/serverless-components/tencent-nuxtjs/blob/master/README.md) | English

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
$ npm init next-app
```

Add `express` dependency：

```
$ npm i express --save
```

> Notice: using express for server of nuxt.js.

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
NuxtjsFunc:
  component: '@serverless/tencent-nuxtjs'
  inputs:
    functionName: nuxtjs-function
    region: ap-guangzhou
    code: ./
    functionConf:
      timeout: 30
      memorySize: 128
    environment:
      variables:
        RUN_ENV: test
    apigatewayConf:
      protocols:
        - http
        - https
      environment: release
```

- [More Options](https://github.com/serverless-components/tencent-nuxtjs/blob/master/docs/configure.md)

### 4. Deploy

#### 4.1 Build static assets

```bash
$ npm run build
```

#### 4.2 Deploy to cloud

```bash
$ sls --debug

  DEBUG ─ Resolving the template's static variables.
  DEBUG ─ Collecting components from the template.
  DEBUG ─ Downloading any NPM components found in the template.
  DEBUG ─ Analyzing the template's components dependencies.
  DEBUG ─ Creating the template's components graph.
  DEBUG ─ Syncing template state.
  DEBUG ─ Executing the template's components graph.
  DEBUG ─ Compressing function nuxtjs-function file to /Users/yugasun/Desktop/Develop/serverless/tencent-nuxtjs/example/.serverless/nuxtjs-function.zip.
  DEBUG ─ Compressed function nuxtjs-function file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-guangzhou-code]. sls-cloudfunction-default-nuxtjs-function-1583031760.zip
  DEBUG ─ Uploaded package successful /Users/yugasun/Desktop/Develop/serverless/tencent-nuxtjs/example/.serverless/nuxtjs-function.zip
  DEBUG ─ Creating function nuxtjs-function

  DEBUG ─ Created function nuxtjs-function successful
  DEBUG ─ Setting tags for function nuxtjs-function
  DEBUG ─ Creating trigger for function nuxtjs-function
  DEBUG ─ Deployed function nuxtjs-function successful
  DEBUG ─ Starting API-Gateway deployment with name NuxtjsFunc.TencentApiGateway in the ap-guangzhou region
  DEBUG ─ Service with ID service-gt5jq7t2 created.
  DEBUG ─ API with id api-i4clsxoq created.
  DEBUG ─ Deploying service with id service-gt5jq7t2.
  DEBUG ─ Deployment successful for the api named NuxtjsFunc.TencentApiGateway in the ap-guangzhou region.

  NuxtjsFunc:
    region:              ap-guangzhou
    functionName:        nuxtjs-function
    apiGatewayServiceId: service-gt5jq7t2
    url:                 https://service-gt5jq7t2-1251556596.gz.apigw.tencentcs.com/release/

  45s › NuxtjsFunc › done
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removing function
  DEBUG ─ Request id
  DEBUG ─ Removed function nuxtjs-function successful
  DEBUG ─ Removing any previously deployed API. api-i4clsxoq
  DEBUG ─ Removing any previously deployed service. service-gt5jq7t2

  10s › NuxtjsFunc › done
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
