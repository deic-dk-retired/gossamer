import Ember from 'ember'
// import d3 from 'ember-nvd3'

export default Ember.Route.extend({
  model () {
    var url = 'http://10.33.0.97:4242/api/series/qf-top-10-in-bps'
    return Ember.$.getJSON(url).then((response) => {
      return response.data
    });
  }
})
