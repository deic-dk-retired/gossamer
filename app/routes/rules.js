import Ember from 'ember'

export default Ember.Route.extend({
  resultPromise: Ember.Object.create({}),
  model () {
    // var fetched = this.get('resultPromise') || this.get('store').findAll('rule').then((results) => {
    //   return {
    //     rules: results,
    //     meta: results.get('meta')
    //   }
    // })
    // this.set('resultPromise', fetched)
    // return this.get('resultPromise')
    return this.get('store').findAll('rule').then((results) => {
      return {
        rules: results,
        meta: results.get('meta')
      }
    })
  },
  afterModel () {
    console.info(this.get('resultPromise'))
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
