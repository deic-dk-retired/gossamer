import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  beforeModel () {
    Ember.Logger.info(`before rules is loaded...`)
  },

  fetchRules (params) {
    return this.get('store').query('rule', params).then((d) => {
      return {
        rules: d,
        meta: d.get('meta')
      }
    })
  },

  model (params) {
    return this.fetchRules(params)
  },

  afterModel () {
    Ember.Logger.info(`after rules is loaded...`)
  },

  setupController (controller, model) {
    this._super(...arguments)

    Ember.set(controller, 'rules', model.rules)
    Ember.set(controller, 'meta', model.meta)
  },

  actions: {
    loading (transition, originRoute) {
      Ember.$('.sec-load button').addClass('disabled')
      Ember.$('.sec-load .loading').removeClass('invisi')
      Ember.$('.sec-load .arrow').addClass('invisi')
      // Ember.$('.sec-load .loading').addClass('active')
    },

    didTransition () {
      Ember.$('.sec-load button').removeClass('disabled')
      Ember.$('.sec-load .loading').addClass('invisi')
      Ember.$('.sec-load .arrow').removeClass('invisi')
      // Ember.$('.sec-load .loader').removeClass('active')
    }
  }
})
