import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import * as d3 from 'd3'

const sts = {
  'total': '18582',
  'active': '3',
  'expired': '18576',
  'tcp': '16461',
  'icmp': '134',
  'udp': '680',
  'other': '1307',
  'networks': '14',
  'totnet': '18582'
}

const f = d3.formatPrefix(',.1', 1e3)

moduleForComponent('dash-stats', 'Integration | Component | dash stats', {
  integration: true
})

test('it renders', function (assert) {
  this.set('stats', sts)
  this.render(hbs`{{dash-stats 'act' stats}}`)
  assert.equal(this.$('.label').text().trim(), 'active')
})

test('it returns value for apt stats block', function (assert) {
  this.set('stats', sts)
  this.render(hbs`{{dash-stats 'net' stats}}`)
  assert.equal(this.$('.value').text().trim(), '14')
})

test('it formats numbers > 1k', function (assert) {
  this.set('stats', sts)
  this.render(hbs`{{dash-stats 'exp' stats}}`)
  assert.equal(this.$('.value').text().trim(), f(sts.expired))
})
