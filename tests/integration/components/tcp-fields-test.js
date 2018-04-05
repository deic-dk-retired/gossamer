import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('tcp-fields', 'Integration | Component | tcp fields', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{tcp-fields}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'Destination Host or CIDR', 'Field Labels')
})
