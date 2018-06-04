import Base from 'ember-simple-auth/authorizers/base'
import Ember from 'ember'

export default Base.extend({
  session: Ember.inject.service(),

  authorize (data, block) {
    const { token } = data
    if (this.get('session.isAuthenticated') && token) {
      block('ddpsauthtkn', `${token}`)
    }
  }
})
