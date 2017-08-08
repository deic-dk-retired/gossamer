import Ember from 'ember'

export default Ember.Route.extend({
  resultPromise: {},
  model () {
    return this.get('store').findAll('rule')
  },
  afterModel () {
  },
  actions: {
    showMore () {
      console.log('more..')
    }
  }
})
