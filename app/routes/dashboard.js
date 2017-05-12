import Ember from 'ember'

export default Ember.Route.extend({
  // tagName: 'e3',
  model () {
    var url = 'http://10.33.0.97:4242/api/series/qf-top-10-in-bps'
    return Ember.$.getJSON(url).then((response) => {
      return response.data
    })
  }
})
