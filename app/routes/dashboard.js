import Ember from 'ember'
export default Ember.Route.extend({
  model () {
    var _bps = 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps'
    var _pps = 'http://10.33.1.97:4242/api/series/qf-top-10-in-pps'
    var _flux = (url) => Ember.$.getJSON(url).done()
    const d = {b: _flux(_bps), p: _flux(_pps)}
    return d
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
