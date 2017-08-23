import Ember from 'ember'

export default Ember.Route.extend({
  tagName: '',

  model () {
    return Ember.RSVP.hash({
      users: this.get('store').findAll('user'),
      customers: this.store.findAll('customer')
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'users', model.users)
    Ember.set(controller, 'customers', model.customers)
  }

})
