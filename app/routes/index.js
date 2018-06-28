import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Ember from 'ember'
import ms from 'npm:ms'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
    let texp = this.get('timeToExp')
    if (!Ember.isEmpty(session) && session.isAuthenticated) {
      Ember.$('.bg').remove()
      Ember.$('.begin').remove()

      Ember.run.next(this, () => {
        this.get('notifications').info(`Your session expires in ${ms(this.get('timeToExp'), { long: true })}`, {
          autoClear: true,
          clearDuration: 5000
        })
      })
      Ember.run.later(this, () => {
        session.invalidate()
      }, texp)

      Ember.run.later(this, () => {
        this.get('notifications').warning(`Your session is about to expire in ${ms(this.get('min'), { long: true })}`, {
          autoClear: true,
          clearDuration: this.get('min')
        })
      }, this.get('timeToExp') - this.get('min')).bind(this)

      Ember.run.next(this, () => {
        this.transitionTo('dashboard')
        Ember.$('div.pusher')
          .before(`<div class="ui active inverted dimmer">
              <div class="ui mini text loader">Loading&hellip;</div>
            </div>`)
      })
    }

    if (Ember.isEmpty(session) || !session.isAuthenticated) {
      this.transitionTo('login')
    }
  }
})
