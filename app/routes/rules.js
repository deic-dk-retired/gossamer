import Ember from 'ember'

export default Ember.Route.extend({
  // loader: `<div class="sk-folding-cube">
  //     <div class="sk-cube1 sk-cube"></div>
  //     <div class="sk-cube2 sk-cube"></div>
  //     <div class="sk-cube4 sk-cube"></div>
  //     <div class="sk-cube3 sk-cube"></div>
  //   </div>`,
  beforeModel () {
    // Assume the 'loading' class displays an overlay with a loading animation
    // Ember.$('body').append(this.get('loader'))
  },
  model () {
    return this.get('store').findAll('rule').then((results) => {
      return {
        rules: results,
        meta: results.get('meta')
      }
    })
  },
  afterModel () {
    Ember.$('.sk-folding-cube').remove()
  },
  setupController (controller, { rules, meta }) {
    this._super(controller, rules)
    controller.set('meta', meta)
  },
  actions: {
    showMore () {
      console.log('more..')
    }
  }
})
