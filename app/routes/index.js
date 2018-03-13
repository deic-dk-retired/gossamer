import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Ember from 'ember'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  beforeModel () {
    this._super(...arguments)
    let session = this.get('session')
    if (!Ember.isEmpty(session) && session.isAuthenticated) {
      this.transitionTo('dashboard')
    } else {
      this.transitionTo('login')
    }
  }
})
