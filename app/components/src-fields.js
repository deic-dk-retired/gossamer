import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',

  actions: {
    validatePrefix (prxinp) {
      this.sendAction('validatePrefix', prxinp)
    },
    validatePort (portid) {
      this.sendAction('validatePort', portid)
    }
  }
})
