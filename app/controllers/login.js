import Ember from 'ember'

export default Ember.Controller.extend({
  loginFailed: false,
  processed: false,
  errorMessage: null,

  actions: {
    authenticate () {
      let { username, password } = this.getProperties('username', 'password')
      let session = this.get('session')
      this.set('processed', `Verifying...`)
      this.get('notifications').info(this.get('processed'), {
        autoClear: true,
        clearDuration: 500
      })
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
    },

    authwayf () {
      /**
       * redirect to wayf
       * fetch token after successful authentication
       * store in session
       */
      this.get('notifications').clearAll()
      this.set('processed', 'Redirecting...')
      this.get('notifications').info(this.get('processed'), {
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
