import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    // var url = 'http://10.33.0.97:4242/api/rules'
    // return Ember.$.getJSON(url)
    //   .then((response) => {
    //     return response.data
    //   })
    return this.store.findAll('rules')
  },
  actions: {
    showOlder () {
    }
  }
})
