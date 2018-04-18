import Ember from 'ember'

export default Ember.Controller.extend({
  // session: Ember.inject.service(),

  loginFailed: false,
  processed: false,
  errorMessage: null,

  actions: {

    authenticate () {
      let { username, password } = this.getProperties('username', 'password')
      let session = this.get('session')
      session.authenticate('authenticator:jwt', {username, password})
      .then(() => {
        this.set('processed', `Welcome ${this.get('session.data.authenticated.ualias').split(' ')[0]}`)
        this.get('notifications').success(this.get('processed'), {
          autoClear: true,
          clearDuration: 3000
        })
      })
      .catch((err) => {
        this.set('loginFailed', true)
        this.set('errorMessage', err.responseJSON.message || 'error')
        this.get('notifications').clearAll()
        this.get('notifications').error(this.get('errorMessage'), {
          autoClear: true,
          clearDuration: 5000
        })
      })
    }
  }
})
