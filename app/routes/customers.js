import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  tagName: '',

  model () {
    return Ember.RSVP.hash({
      customers: this.store.findAll('customer', {include: 'networks'})
      // networks: this.store.findAll('network')
    })
  },

  afterModel () {
    if (this.get('session.data.authenticated.role') === 'netadmin') {
      this.replaceWith('dashboard')
    }
  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'customers', model.customers)
    // Ember.set(controller, 'networks', model.networks)
  }
})
