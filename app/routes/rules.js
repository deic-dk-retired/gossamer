import Ember from 'ember'

export default Ember.Route.extend({
  resultPromise: {},
  model () {
    return this.get('store').findAll('rule')
  },
  afterModel () {
    console.info(this.get('resultPromise'))
    Ember.$('.planets').remove()
  },
  actions: {
    showMore () {
      console.log('more..')
    }
  }
})
