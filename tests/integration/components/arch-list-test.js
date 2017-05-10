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
    seconds: 30
  }
})

moduleForComponent('arch-list', 'Integration | Component | arch list', {
  integration: true
})

test('should display rules listing', function(assert) {
  this.set('rulesObj', archive)
  this.render(hbs`{{arch-list archive=rulesObj}}`)
  assert.equal(this.$('.srcip span').text().trim(), '60.28.184.234', 'Source IP: 60.28.184.234')
  assert.equal(this.$('.destip span').text().trim(), '130.226.136.242', 'Dest IP: 130.226.136.242')
})