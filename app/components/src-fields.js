import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  actions: {
    validateIpCidr (prxinp) {
      this.sendAction('validateIpCidr', prxinp)
    },
    validatePort (portid) {
      this.sendAction('validatePort', portid)
    }
  }
})
