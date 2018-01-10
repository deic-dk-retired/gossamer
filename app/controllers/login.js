import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  notifications: Ember.inject.service('notification-messages'),

  loginFailed: false,
  // isProcessing: false,
  errorMessage: null,

  actions: {

    authenticate () {
      let { username, password } = this.getProperties('username', 'password')
      this.get('session')
      .authenticate('authenticator:jwt', {username, password})
      .catch((err) => {
        this.set('loginFailed', true)
        this.set('errorMessage', err.responseJSON.message)

        this.get('notifications').clearAll()
        this.get('notifications').error(this.get('errorMessage'), {
          autoClear: true,
          clearDuration: 5000
        })
      })
    }
  }
})
