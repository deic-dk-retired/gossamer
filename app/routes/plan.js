import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
