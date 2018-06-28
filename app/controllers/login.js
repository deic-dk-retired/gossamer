import Ember from 'ember'

export default Ember.Controller.extend({
  loginOk: false,
  processed: '',
  errorMessage: null,
  showPass: false,
  passType: Ember.computed('showPass', function () {
    let intype = 'password'
    if (this.get('showPass')) {
      intype = 'text'
    }
    return intype
  }),

  actions: {

    showPassword () {
      this.toggleProperty('showPass')
    },

    authenticate () {
      let { username, password } = this.getProperties('username', 'password')
      this.set('loginOk', true)
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
        this.set('loginOk', false)
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
