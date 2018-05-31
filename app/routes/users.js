import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  tagName: '',

  model () {
    return Ember.RSVP.hash({
      users: this.store.findAll('user', {include: 'networks'}),
      customers: this.store.findAll('customer'),
      networks: this.store.findAll('network')
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)

    Ember.set(controller, 'users', model.users)
    Ember.set(controller, 'customers', model.customers)
    Ember.set(controller, 'networks', model.networks)
  }

})
