import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    filter: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
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
    loading (transition, route) {
      let controller = this.controllerFor('rules')
      controller.set('currentlyLoading', true)

      transition.finally(function () {
        controller.set('currentlyLoading', false)
      })
    }
  }
})
