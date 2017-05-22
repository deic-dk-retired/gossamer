import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    // return this.store.findAll('icmpt')
    var url = 'http://10.33.0.97:4242/api/icmpt'
    return Ember.$.getJSON(url)
    .then((response) => {
      return response.data
    })
  }
})
