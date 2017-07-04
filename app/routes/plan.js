import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return Ember.RSVP.hash({
      icmps: this.get('store').findAll('icmp'),
      tcps: this.store.findAll('tcp')
    })
  },
  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'icmps', model.icmps)
    Ember.set(controller, 'tcps', model.tcps)
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
