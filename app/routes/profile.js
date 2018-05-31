import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  tagName: '',

  model () {
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', this.get('session.data.authenticated.uid'), {include: 'networks'})
    })
  },

  afterModel () {

  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'profile', model.user)
  }

})
