import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return this.store.findAll('user')
  },
  afterModel () {
    return this.store.peekAll('user')
  }
})
