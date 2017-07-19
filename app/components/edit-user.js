import Ember from 'ember'

export default Ember.Component.extend({
  init () {
    this._super(...arguments)
    this.errors = []
  },

  didUpdateAttrs () {
    this._super(...arguments)
    this.set('errors', [])
  },

  didRender () {
  },

  actions: {
    required (event) {
      if (!event.target.value) {
        this.get('errors').pushObject({message: `${event.target.name} is required`})
      }
    }
  }
})
