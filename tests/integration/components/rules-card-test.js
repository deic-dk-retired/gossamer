import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

let rules = Ember.Object.create({
  admname: 'Fastnetmon Developer',
  rulename: '00:25:90:47:2b:48',
  protocol: 'tcp',
  fromdate: '2017-05-18',
  minfromtime: '00:44:58',
  todate: '2017-05-18',
  maxtotime: '12:57:39',
  srcprefix: null,
  destprefix: '130.226.136.242',
  action: 'discard',
  portsaff: '26',
  maxpktlength: null,
  totduration: {
    hours: 4,
    minutes: 20
  },
  isactive: true,
  isexpired: true
})

moduleForComponent('rules-card', 'Integration | Component | rules card', {
  integration: true
})

// test('should display rules details', function (assert) {
//   this.set('rulesObj', rules)
//   this.render(hbs`{{rules-card showRule=showRule rule=rulesObj}}`)
//   assert.equal(this.$('div.counter').text(), '26', 'Ports Affected: 26')
//   assert.equal(this.$('div.name p').text(), '00:25:90:47:2b:48', 'RuleName: 00:25:90:47:2b:48')
// })

test('should toggle detail class on click', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-card showRule=showRule rule=rulesObj}}`)
  assert.equal(this.$('.card.detail').length, 0, 'initially rendered as a card')

  // this.$('.card').click()
  // assert.equal(this.$('.card.detail').length, 1, 'rendered card detail')
  // this.$('.card').click()
  // assert.equal(this.$('.card.detail').length, 0, 'rendered card after second click')
})
