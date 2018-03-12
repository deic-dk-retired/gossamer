/* eslint-env node */
require('dotenv').config()

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'gossamer',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      HOST: process.env.DDPS_HOST,
      PORT: process.env.DDPS_PORT,
      API: 'api',
      SCPSS: process.env.SU_SEC_3SHA512
    },

    'ember-cli-notifications': {
      includeFontAwesome: true
    }

  }

  ENV['ember-simple-auth'] = {
    authorzer: 'authorizer:custom',
    routeAfterAuthentication: '/',
    routeIfAlreadyAuthenticated: '/dashboard'
  }

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false
    ENV.APP.LOG_ACTIVE_GENERATION = true
    ENV.APP.LOG_TRANSITIONS = true
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true
    ENV.APP.LOG_VIEW_LOOKUPS = true
    ENV.APP.PORT = 8080
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {
    ENV.APP.LOG_RESOLVER = true
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_TRANSITIONS = false
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false
    ENV.APP.LOG_VIEW_LOOKUPS = false
    ENV.APP.PORT = 8686
  }

  return ENV
}
