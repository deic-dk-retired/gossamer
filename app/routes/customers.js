import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  tagName: '',

  beforeModel () {
    if (this.get('session.data.authenticated.role') === 'netadmin') {
      this.get('notifications').warning(`You need a db or super admin access for that!`, {
        autoClear: true,
        clearDuration: 5000
      })
      this.transitionTo('dashboard')
    }
  },
  model () {
    return Ember.RSVP.hash({
      customers: this.store.findAll('customer'),
      networks: this.store.findAll('network')
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'customers', model.customers)
    Ember.set(controller, 'networks', model.networks)
  }
})
