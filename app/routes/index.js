import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  // tagName: '',
  beforeModel () {
    this._super(...arguments)

    let session = this.get('session')
    if (!Ember.isEmpty(session) && session.isAuthenticated) {
      return this.transitionTo('dashboard')
    } else {
      return this.transitionTo('login')
    }
  }
})
