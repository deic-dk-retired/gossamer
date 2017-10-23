import Ember from 'ember'

export default Ember.Controller.extend({
  defaultDate: Date.now(),
  fromDate: null,
  toDate: null,

  actions: {
    addRule () {
      Ember.Logger.info('Create rule')
    }
  }
})
