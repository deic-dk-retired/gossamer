import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  init () {
    this._super(...arguments)
    this.errors = []
  },

  didUpdateAttrs () {
    this._super(...arguments)
    this.set('errors', [])
  },

  didRender () {
    this._super(...arguments)
  },

  actions: {
    showUser (user) {
      console.log('editUser ' + user)
    }
  }
})
