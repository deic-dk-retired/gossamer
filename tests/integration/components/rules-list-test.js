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

moduleForComponent('rules-list', 'Integration | Component | rules list', {
  integration: true
})

test('should display rules listing', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-list rule=rulesObj}}`)
  assert.equal(this.$('.protocol span').text().trim(), 'tcp', 'Protocol: tcp')
  assert.equal(this.$('.destip span').text(), '130.226.136.242', 'Dest IP: 130.226.136.242')
  assert.equal(this.$('.ports span').text(), '26', 'Affected Ports: 26')
})

test('should toggle detail class on click', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-list rule=rulesObj}}`)
  assert.equal(this.$('.thumb.detail').length, 0, 'initially rendered as a list')
  this.$('.thumb').click()
  assert.equal(this.$('.thumb.detail').length, 1, 'rendered list detail')
  this.$('.thumb').click()
  assert.equal(this.$('.thumb.detail').length, 0, 'rendered list after second click')
})
