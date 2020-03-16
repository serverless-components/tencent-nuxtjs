[![Serverless Nuxtjs Tencent Cloud](https://img.serverlesscloud.cn/2020310/1583829094342-nuxt.js%20_%E9%95%BF.png)](http://serverless.com)

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
$ npx create-nuxt-app serverlesss-nuxtjs
$ cd serverlesss-nuxtjs
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
  DEBUG ─ Generating serverless handler...
  DEBUG ─ Generated serverless handler successfully.
  DEBUG ─ Compressing function nuxtjs-function file to /Users/yugasun/Desktop/Develop/serverless/tencent-nuxtjs/example/.serverless/nuxtjs-function.zip.
  DEBUG ─ Compressed function nuxtjs-function file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-guangzhou-code]. sls-cloudfunction-default-nuxtjs-function-1584350378.zip
  DEBUG ─ Uploaded package successful /Users/yugasun/Desktop/Develop/serverless/tencent-nuxtjs/example/.serverless/nuxtjs-function.zip
  DEBUG ─ Creating function nuxtjs-function
  nuxtjs-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 1502.16k/s
  DEBUG ─ Created function nuxtjs-function successful
  DEBUG ─ Setting tags for function nuxtjs-function
  DEBUG ─ Creating trigger for function nuxtjs-function
  DEBUG ─ Deployed function nuxtjs-function successful
  DEBUG ─ Starting API-Gateway deployment with name ap-guangzhou-apigateway in the ap-guangzhou region
  DEBUG ─ Service with ID service-dxcq0xuu created.
  DEBUG ─ API with id api-b83j9sme created.
  DEBUG ─ Deploying service with id service-dxcq0xuu.
  DEBUG ─ Deployment successful for the api named ap-guangzhou-apigateway in the ap-guangzhou region.

  NuxtjsFunc:
    functionName:        nuxtjs-function
    functionOutputs:
      ap-guangzhou:
        Name:        nuxtjs-function
        Runtime:     Nodejs8.9
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     30
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a template function
    region:              ap-guangzhou
    apiGatewayServiceId: service-dxcq0xuu
    url:                 https://service-dxcq0xuu-1251556596.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  38s › NuxtjsFunc › done
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function nuxtjs-function successful
  DEBUG ─ Removing any previously deployed API. api-b83j9sme
  DEBUG ─ Removing any previously deployed service. service-dxcq0xuu

  8s › NuxtjsFunc › done
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
