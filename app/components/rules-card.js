import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',
  showMore: false,
  destport: Ember.computed('destport', function () {
    return this.get('destport').replace(/= {1,}/g, '')
  }),
  actions: {
    toggleDetail () {
      this.toggleProperty('showMore')
      // call to detail view/component here
      // console.log('showRulesDetail ' + this.isDetail)
    }
  }
})
