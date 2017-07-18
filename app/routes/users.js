import Ember from 'ember'

export default Ember.Route.extend({
  tagName: '',
  model () {
    return this.get('store').findAll('user')
  },
  afterModel () {
    Ember.$('.planets').remove()
  }

})
