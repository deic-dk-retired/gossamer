import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return this.store.findAll('icmptype')
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
