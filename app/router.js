import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('dashboard')
  this.route('plan')
  this.route('login')
  this.route('users')
  this.route('rules')
  this.route('not-found', {path: '/*path'})
  this.route('packets')
  this.route('measurements')
  this.route('traffic')
  this.route('customers')
})

export default Router
