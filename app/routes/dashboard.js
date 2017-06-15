import Ember from 'ember'

export default Ember.Route.extend({
  beforeModel () {
    // Assume the 'loading' class displays an overlay with a loading animation
    // Ember.$('body').append(``)
  },
  model (params) {
    // ifluxObj:{}
    // return this.store.findAll('series/qf-top-10-in-bps')
    var url = 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps'
    return Ember.$.getJSON(url)
      .then((response) => {
        return response
      })
  },
  afterModel () {
    // Ember.$('.sk-folding-cube').remove()
  }
})
