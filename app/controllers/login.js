import Ember from 'ember'
// import fetch from 'fetch'

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  // loginFailed: false,
  // isProcessing: false,
  errorMessage: null,

  actions: {

    authenticate () {
      let { username, password } = this.getProperties('username', 'password')
      // Ember.Logger.info(username, password)
      this.get('session')
      .authenticate('authenticator:jwt', {username, password})
      .catch((err) => {
        this.set('errorMessage', err.error || err)
      })
    }
  }
})
