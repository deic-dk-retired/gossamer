import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model (params) {
    return Ember.RSVP.hash({
      rules: this.get('store').query('rule', params)
    })
  },

  setupController (controller, model) {
    this._super(...arguments)

    Ember.set(controller, 'rules', model.rules)
  }
})
