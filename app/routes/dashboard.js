import Ember from 'ember'
export default Ember.Route.extend({
  model () {
    var _bps = 'http://10.33.1.97:4242/api/series/qf-in-bps'
    var _pps = 'http://10.33.1.97:4242/api/series/qf-in-pps'
    var _bps10 = 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps'
    var _pps10 = 'http://10.33.1.97:4242/api/series/qf-top-10-in-pps'
    var _flux = (url) => Ember.$.getJSON(url).done()
    var d = {b: _flux(_bps), p: _flux(_pps), tb: _flux(_bps10), tp: _flux(_pps10)}
    return Ember.RSVP.hash(d)
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
