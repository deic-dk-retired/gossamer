/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    flatpickr: {
      theme: 'airbnb'
    },
    SemanticUI: {
      // These flags allow you do turn on or off auto imports for Semantic UI
      import: {
        css: true,
        javascript: true,
        images: true,
        fonts: true
      },
      // These settings allow you to specify the source of the Semantic files
      source: {
        css: 'bower_components/semantic-ui/dist',
        javascript: 'bower_components/semantic-ui/dist',
        images: 'bower_components/semantic-ui/dist/themes/default/assets/images',
        fonts: 'bower_components/semantic-ui/dist/themes/default/assets/fonts'
      },
      // These settings allow you to specify the destination of the Semantic files
      // This only applies to images and fonts, since those are assets
      destination: {
        images: 'assets/themes/default/assets/images',
        fonts: 'assets/themes/default/assets/fonts'
      }
    }
  })

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  return app.toTree()
}
