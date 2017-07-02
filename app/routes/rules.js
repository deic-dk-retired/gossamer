import Ember from 'ember'

export default Ember.Route.extend({
  resultPromise: {},
  model () {
    // var fetched = this.get('resultPromise') || this.get('store').findAll('rule').then((results) => {
    //   return {
    //     rules: results,
    //     meta: results.get('meta')
    //   }
    // })
    // this.set('resultPromise', fetched)
    // return resultPromise
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
      // return this.get('model')
    }
  }
})
