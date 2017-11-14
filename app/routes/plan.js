import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return Ember.RSVP.hash({
      ictype: this.get('store').findAll('icmptype'),
      tcps: this.store.findAll('tcp')
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'ictype', model.icmptype)
    Ember.set(controller, 'tcps', model.tcps)
  }
})
