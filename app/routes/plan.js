import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    var _icmp = 'http://10.33.1.97:4242/api/icmp'
    var _flux = (url) => Ember.$.getJSON(url).done()
    var d = {icmp: _flux(_icmp)}
    return Ember.RSVP.hash(d)
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
