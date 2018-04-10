import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Ember from 'ember'
import ms from 'npm:ms'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  timeToExp: Ember.computed('session', function () {
    return `${ms(this.get('session.data.authenticated.texp'))}`
  }),

  beforeModel () {
    this._super(...arguments)
    let session = this.get('session')
    if (!Ember.isEmpty(session) && session.isAuthenticated) {
      Ember.run.later(this, () => {
        Ember.Logger.info(this.get('timeToExp'))
        session.invalidate()
      }, this.get('timeToExp')).bind(this)
      this.transitionTo('dashboard')
    }

    if (Ember.isEmpty(session) || !session.isAuthenticated) {
      this.transitionTo('login')
    }
  }
})
