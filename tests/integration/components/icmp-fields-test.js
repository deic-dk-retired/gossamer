import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('icmp-fields', 'Integration | Component | icmp fields', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{icmp-fields}}`)

  assert.equal(this.$().text().trim().split('\n')[0], 'ICMP Type')
})
