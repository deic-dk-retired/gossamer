import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  beforeModel () {
    Ember.Logger.info('before model is loaded...')
  },

  model (params) {
    // Ember.Logger.info(params)
    return Ember.RSVP.hash({
      rules: this.get('store').query('rule', params)
    })
  },

  setupController (controller, model) {
    this._super(...arguments)

    Ember.set(controller, 'rules', model.rules)
  },

  actions: {
    loading (transition, originRoute) {
      Ember.Logger.info('loading rules...')
    },

    didTransition () {
      Ember.Logger.info('all models loaded for rules route')
    }
  }
})
