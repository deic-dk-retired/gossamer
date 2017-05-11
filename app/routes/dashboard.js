import Ember from 'ember'

export default Ember.Route.extend({
  // tagName: 'e3',
  model () {
    // var url = 'http://10.33.0.97:4242/api/series/qf-top-10-in-bps'
    // return Ember.$.getJSON(url).then((response) => {
    //   return response.data
    // })
    return [
      {
        year: 2010,
        rainfall: 12,
        temperature: 86
      },
      {
        year: 2011,
        rainfall: 15,
        temperature: 88
      },
      {
        year: 2012,
        rainfall: 21,
        temperature: 90
      }
    ]
  }
})
