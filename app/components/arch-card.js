import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  showMore: false,
  actions: {
    toggleRulesCard () {
      this.toggleProperty('showMore')
      // call to detail view/component here
      // console.log('showRulesDetail ' + this.isDetail)
    }
  }
})
