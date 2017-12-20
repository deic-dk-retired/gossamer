/* eslint-env node */

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
    },

    'ember-cli-notifications': {
      includeFontAwesome: true
    }

  }

  ENV['ember-simple-auth'] = {
    authorzer: 'authorizer:custom',
    routeAfterAuthentication: '/'
  }

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false
    ENV.APP.LOG_ACTIVE_GENERATION = true
    ENV.APP.LOG_TRANSITIONS = true
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true
    ENV.APP.LOG_VIEW_LOOKUPS = true
    ENV.APP.HOST = 'http://10.33.1.97:4242'
    ENV.APP.API = 'api'
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

  }

  return ENV
}
