import Ember from 'ember'
import fetch from 'fetch'

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

      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.get('username'),
          password: this.get('password')
        })
      })
      .then(function (d) {
        return d.json()
      })
      .then(function (d) {
        if (d.data.attributes.hasAccess) {
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
