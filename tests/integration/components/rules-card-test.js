import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

let rules = Ember.Object.create({
  flowspecruleid: '2677',
  rule_name: '00:25:90:47:2b:48',
  administratorid: 42,
  direction: 'in',
  validfrom: '2017-05-17T10:51:22.304Z',
  validto: '2017-05-17T11:01:22.304Z',
  fastnetmoninstanceid: 1,
  isactivated: true,
  isexpired: true,
  destinationprefix: '130.226.136.242',
  sourceprefix: null,
  ipprotocol: 'tcp',
  srcordestport: '80',
  destinationport: '80',
  sourceport: null,
  icmptype: null,
  icmpcode: null,
  tcpflags: 'syn',
  packetlength: 174,
  dscp: null,
  fragmentencoding: null,
  description: null,
  customerid: 1,
  action: 'rate-limit 9600'
})

moduleForComponent('rules-card', 'Integration | Component | rules card', {
  integration: true
})

test('should display rules details', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-card rules=rulesObj}}`)
  // assert.equal(this.$('.protocol .counter').text().trim(), '2', 'Count: 2')
  assert.equal(this.$('.name p').text().trim(), '00:25:90:47:2b:48', 'RuleName: 00:25:90:47:2b:48')
})

test('should toggle detail class on click', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-card rules=rulesObj}}`)
  assert.equal(this.$('.card.detail').length, 0, 'initially rendered as a card')
  this.$('.card').click()
  assert.equal(this.$('.card.detail').length, 1, 'rendered card detail')
  this.$('.card').click()
  assert.equal(this.$('.card.detail').length, 0, 'rendered card after second click')
})
