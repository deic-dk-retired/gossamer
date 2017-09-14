import Ember from 'ember'

export default Ember.Route.extend({
  tagName: '',

  model () {
    return Ember.RSVP.hash({
      users: this.get('store').findAll('user', {included: 'networks'}),
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
