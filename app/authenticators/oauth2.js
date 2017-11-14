import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant'
import fetch from 'fetch'
import Ember from 'ember'

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: 'http://10.33.1.97:4242/api/login/'
})
