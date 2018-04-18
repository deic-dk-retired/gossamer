import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Ember from 'ember'
import ms from 'npm:ms'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // session: Ember.inject.service('session'),
  timeToExp: Ember.computed('session', function () {
    let session = this.get('session')
    let texp = 0
    if (session.authenticator !== null && !Ember.isEmpty(session) && session.isAuthenticated) {
      texp = ms(this.get('session.data.authenticated.texp'))
    }
    return texp
  }),

  min: ms('1m'),

  beforeModel () {
    this._super(...arguments)
    let session = this.get('session')
    // let texp = 0
    if (!Ember.isEmpty(session) && session.isAuthenticated) {
      Ember.run.next(this, () => {
        this.get('notifications').info(`Your session will expire in ${ms(this.get('timeToExp'), { long: true })}`, {
          autoClear: true,
          clearDuration: 5000
        })
      })
      Ember.run.later(this, () => {
        session.invalidate()
      }, this.get('timeToExp')).bind(this)

      Ember.run.later(this, () => {
        this.get('notifications').warning(`Your session is about to expire in ${ms(this.get('min'), { long: true })}`, {
          autoClear: true,
          clearDuration: this.get('min')
        })
      }, this.get('timeToExp') - this.get('min')).bind(this)
      this.transitionTo('dashboard')
    }

    if (Ember.isEmpty(session) || !session.isAuthenticated) {
      this.transitionTo('login')
    }
  }
})
