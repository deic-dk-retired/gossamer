import Ember from 'ember'
// import hbs from 'htmlbars-inline-precompile'

export default Ember.Component.extend({
  tagName: '',
  showMore: false,
  appendList: `
    <tr class="rule rule-{{rule.id}}" {{action showRule rule.id rule.name}}>
      <td> <a class="ui green label">{{rule.ipprotocol}}</a> </td>
      <td> {{rule.srcprefix}}</td>
      <td> {{rule.destprefix}}</td>
      <td> {{rule.destport}}</td>
      <td> {{rule.pktlen}}</td>
      <td> {{rule.action}}</td>
      <td class="right aligned"> {{moment-from-now rule.validfrom hidePrefix=true interval=86400}}</td>
    </tr>`,

  init () {
    this._super(...arguments)
    Ember.$('.tabpager').append(`<div class="ui active inverted dimmer">
      <div class="ui mini text loader">Fetching&hellip;</div>
    </div>`)
  },

  didInsertElement () {
    this._super(...arguments)
    // Ember.Logger.info(this.get('appendList'))
    // Ember.$('.tabpager > table > tbody').append(this.get('appendList'))
    this._timer = setTimeout(function () {
      this.$('.dimmer').remove()
    }, 1000)
  },

  willDestroyElement () {
    this._super(...arguments)
    clearTimeout(this.get('_timer'))
  },

  actions: {
    toggleDetail () {
      this.toggleProperty('showMore')
      // call to detail view/component here
      // console.log('showRulesDetail ' + this.isDetail)
    }
  }
})
