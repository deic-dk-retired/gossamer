import Ember from 'ember'

export default Ember.Controller.extend({
  loginFailed: false,
  isProcessing: false,
  url: 'http://10.33.1.97:4242/api/login/',
  actions: {
    login () {
      this.setProperties({
        loginFailed: false,
        isProcessing: true
      })

      Ember.$.get(this.url + this.get('username') + '/' + this.get('password'))
      .then(function (data) {
        // console.log(data.users.hasAccess)
        if (data.users.hasAccess) {
          this.set('isProcessing', false)
          document.location = '/dashboard'
        } else {
          this.set('loginFailed', true)
        }
      }.bind(this), function () {
        this.set('isProcessing', false)
        this.set('loginFailed', true)
      }.bind(this))
    }
  }
})
