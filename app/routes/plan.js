import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model () {
    return Ember.RSVP.hash({
      rules: this.get('store').findAll('rule'),
      fnms: this.get('store').findAll('fnm'),
      users: this.get('store').findAll('user'),
      customers: this.store.findAll('customer'),
      networks: this.store.findAll('network'),
      ictype: this.get('store').findAll('icmptype'),
      tcps: this.store.findAll('tcp')
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'rules', model.rules)
    Ember.set(controller, 'fnms', model.fnms)
    Ember.set(controller, 'users', model.users)
    Ember.set(controller, 'customers', model.customers)
    Ember.set(controller, 'networks', model.networks)
    Ember.set(controller, 'ictype', model.icmptype)
    Ember.set(controller, 'tcps', model.tcps)
  }
})
