import Ember from 'ember'
import fetch from 'fetch'

export default Ember.Route.extend({
  userid: '3611a271-50ae-4425-86c5-b58b04393242',

  model () {
    return fetch('http://10.33.1.97:4242/api/stats/' + this.get('userid'))
    .then((response) => {
      if (response.status !== 200) {
        Ember.Logger.info('Looks like there was a problem. Status Code: ' + response.status)
        return
      }
      return response.json()
      .then((d) => {
        return d.data
      })
    })
    .catch((err) => {
      Ember.Logger.info('dashboard stats error: ' + err)
    })
  }

})
