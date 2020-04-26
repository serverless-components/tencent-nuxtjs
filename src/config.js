const CONFIGS = {
  templateUrl:
    'https://serverless-templates-1300862921.cos.ap-beijing.myqcloud.com/nuxtjs-demo.zip',
  framework: 'nuxtjs',
  frameworkFullname: 'Nuxt.js',
  handler: 'sl_handler.handler',
  runtime: 'Nodejs10.15',
  exclude: ['.git/**', '.gitignore', '.DS_Store'],
  timeout: 3,
  memorySize: 128,
  namespace: 'default'
}

module.exports = CONFIGS
