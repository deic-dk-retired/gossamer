import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',

  init () {
    this._super(...arguments)
    Ember.$('.card').parent().parent().parent()
    .append(`<div class="ui active inverted dimmer">
      <div class="ui mini text loader">Loading&hellip;</div>
    </div>`)
  },

  didInsertElement () {
    this._super(...arguments)
    setTimeout(function () {
      this.$('.dimmer').remove()
    }, 500)
  }
})
