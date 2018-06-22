import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model () {
    return Ember.RSVP.hash({
      rules: this.store.findAll('rule'),
      fnms: this.store.findAll('fnm'),
      users: this.store.findAll('user', {include: 'networks'}),
      customers: this.store.findAll('customer'),
      networks: this.store.findAll('network'),
      icmps: this.get('store').findAll('icmptype'),
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
    Ember.set(controller, 'icmps', model.icmps)
    Ember.set(controller, 'tcps', model.tcps)
  }
})
