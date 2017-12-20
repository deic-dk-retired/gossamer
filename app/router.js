import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('customers')
  this.route('dashboard')
  this.route('login')
  this.route('measurements')
  this.route('not-found', {path: '/*path'})
  this.route('packets')
  this.route('plan')
  this.route('rules')
  this.route('traffic')
  this.route('users')
})

export default Router
