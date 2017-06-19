import Ember from 'ember'
export default Ember.Route.extend({
  influxObj: {
    bps: {
      url: 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps',
      inf: () => Ember.$.getJSON(this.url)
      .then((response) => {
        return response
      })
    },
    pps: {
      url: 'http://10.33.1.97:4242/api/series/qf-top-10-in-pps',
      inf: () => Ember.$.getJSON(this.url)
      .then((response) => {
        return response
      })
    }
  },
  model () {
    return this.get('influxObj')
    // return this.store.findAll('series/qf-top-10-in-bps')
    // var url = 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps'
    // return Ember.$.getJSON(url)
    //   .then((response) => {
    //     return response
    //   })
  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
