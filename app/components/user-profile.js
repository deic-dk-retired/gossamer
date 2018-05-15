import Ember from 'ember'

export default Ember.Component.extend({
  tagName: '',

  didInsertElement () {
    this._super(...arguments)
    Ember.$('.card.usr-stub').prepend(`<div class="ui active inverted dimmer">
      <div class="ui mini text loader">Loading&hellip;</div>
    </div>`)
    this._timer = setTimeout(function () {
      this.$('.usr-stub > .dimmer').remove()
    }, 1000)
  },

  willDestroyElement () {
    this._super(...arguments)
    clearTimeout(this.get('_timer'))
  }
})
