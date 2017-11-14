import Ember from 'ember'

export default Ember.Route.extend({
  tagName: '',
  beforeModel () {
    this.replaceWith('dashboard')
  }
})
