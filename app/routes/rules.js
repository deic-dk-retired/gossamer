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
      Ember.$('.sec-load button').addClass('disabled')
      Ember.$('.sec-load .loader').removeClass('disabled')
      Ember.$('.sec-load .loader').addClass('active')
    },

    didTransition () {
      Ember.$('.sec-load button').removeClass('disabled')
      Ember.$('.sec-load .loader').addClass('disabled')
      Ember.$('.sec-load .loader').removeClass('active')
    }
  }
})
