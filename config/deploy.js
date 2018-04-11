/* eslint-env node */
'use strict'

module.exports = function (deployTarget) {
  let ENV = {
    build: {},
    APP: {
      PORT: 8686,
      SCPSS: process.env.SU_SEC_3SHA512,
      SERV_HOST: process.env.SERV_HOST,
      SERV_PORT: process.env.SERV_HOST,
      SERV_API: process.env.SERV_NAMESPACE
    },
    'ember-cli-notifications': {
      includeFontAwesome: true
    },
    'ember-simple-auth': {
      authorzer: 'authorizer:custom',
      routeAfterAuthentication: '/',
      routeIfAlreadyAuthenticated: '/dashboard'
    }
    // include other plugin configuration that applies to all deploy targets here
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development'
    ENV.APP.SERV_PORT = 9696
    ENV.APP.PORT = 8686
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'staging'
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production'
    ENV.APP.SERV_PORT = 9090
    ENV.APP.PORT = 8080
    ENV.APP.LOG_RESOLVER = false
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_TRANSITIONS = false
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false
    ENV.APP.LOG_VIEW_LOOKUPS = false
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV
}
