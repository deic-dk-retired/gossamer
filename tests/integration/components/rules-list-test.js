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

moduleForComponent('rules-list', 'Integration | Component | rules list', {
  integration: true
})

test('should display rules listing', function (assert) {
  this.set('rulesObj', rules)
  this.render(hbs`{{rules-list rules=rulesObj}}`)
  assert.equal(this.$('.srcip span').text().trim(), '60.28.184.234', 'Source IP: 60.28.184.234')
  assert.equal(this.$('.destip span').text().trim(), '130.226.136.242', 'Dest IP: 130.226.136.242')
})
