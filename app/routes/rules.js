import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    }
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
    if (params !== '') {
      return this.fetchRules(params)
    } else {
      return this.store.findAll('rules')
    }
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
    loading () {
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
