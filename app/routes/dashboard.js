import Ember from 'ember'
export default Ember.Route.extend({
  model () {

  },
  afterModel () {
    Ember.$('.planets').remove()
  }
})
