import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import config from '../config/environment'
import fetch from 'fetch'
import Ember from 'ember'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  url: `${config.APP.SERV_HOST + ':' + config.APP.SERV_PORT + '/' + config.APP.SERV_API}`,

  userid: Ember.computed('session', function () {
    return `${this.get('session.data.authenticated.uuid')}`
  }),

  model () {
    return fetch(this.get('url') + '/stats/' + this.get('userid'),
      { headers: {
        'jwtauthtkn': this.get('session.data.authenticated.token')}
      }
    )
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
  },

  setupController (controller, model) {
    this._super(...arguments)
    Ember.set(controller, 'stats', model)
  }

})
