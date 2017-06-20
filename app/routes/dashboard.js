import Ember from 'ember'
export default Ember.Route.extend({
  model (params) {
    var _bps = 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps'
    var _pps = 'http://10.33.1.97:4242/api/series/qf-top-10-in-pps'
    var _flux = (url) => Ember.$.getJSON(url)
      // .then((response) => {
      //   return response
      // })
    return {b: _flux(_bps), p: _flux(_pps)}
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
