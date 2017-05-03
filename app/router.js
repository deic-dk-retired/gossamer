import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('dashboard')
  this.route('archive', {path: '/rules'})
  this.route('plan')
  this.route('login')
  this.route('users')
  this.route('404', { path: '/*wildcard' })
})

export default Router
