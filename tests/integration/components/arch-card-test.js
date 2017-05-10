import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

let archive = Ember.Object.create({
  rname: '00:25:90:47:2b:48',
  admname: 'Fastnetmon Developer',
  protocol: 'icmp',
  fromdate: '2017-04-23',
  formatted_frmdate: '2017-04-22T22:00:00.000Z',
  maxfromtime: '12:03:50',
  todate: '2017-04-23',
  sourcepre: '60.28.184.234',
  destpre: '130.226.136.242',
  count: '2',
  maxpktlen: 60,
  active: true,
  totduration: {
    minutes: 20
  }
})

moduleForComponent('arch-card', 'Integration | Component | arch card', {
  integration: true
})

test('should display rules details', function(assert) {
  this.set('rulesObj', archive)
  this.render(hbs`{{arch-card archive=rulesObj}}`)
  assert.equal(this.$('.protocol .counter').text().trim(), '2', 'Count: 2');
  assert.equal(this.$('.name p').text().trim(), '00:25:90:47:2b:48', 'RuleName: 00:25:90:47:2b:48');
})

test('should toggle detail class on click', function(assert) {
  this.set('rulesObj', archive)
  this.render(hbs`{{arch-card archive=rulesObj}}`)
  assert.equal(this.$('.card.detail').length, 0, 'initially rendered as a card')
  this.$('.card').click()
  assert.equal(this.$('.card.detail').length, 1, 'rendered card detail')
  this.$('.card').click()
  assert.equal(this.$('.card.detail').length, 0, 'rendered card after second click')
})
