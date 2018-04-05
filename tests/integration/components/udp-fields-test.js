import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('udp-fields', 'Integration | Component | udp fields', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{udp-fields}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'Destination Host or CIDR', 'Field Labels')
})
