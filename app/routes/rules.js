import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('rule').then((results) => {
      return {
        rules: results,
        meta: results.get('meta')
      }
    })
  },
  afterModel () {
    Ember.$('.planets').remove()
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
