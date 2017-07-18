import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  actions: {
    editUser (user) {
      console.log('edit ' + user)
    }
  }
})
