import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  username: Ember.computed('session', function () {
    return `${this.get('session.data.authenticated.ualias').split(' ')[0]}`
  }),

  usertype: Ember.computed('session', function () {
    return `${this.get('session.data.authenticated.role')}`
  })
})
