import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  isDetail: false,
  actions: {
    toggleRulesDetail () {
      this.toggleProperty('isDetail')
      // call to detail view/component here
      // console.log('showRulesDetail ' + this.isDetail)
    }
  }
})
