import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  // user: this.get('session'),

  actions: {
    logout () {
      this.get('session').invalidate()
    }
  }
})
