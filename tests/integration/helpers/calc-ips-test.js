
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('calc-ips', 'helper:calc-ips', {
  integration: true
})

// Replace this with your real tests.
test('it renders', function (assert) {
  this.set('cidr', '10.33.6.0/24')
  this.render(hbs`{{calc-ips cidr}}`)
  assert.equal(this.$().text().trim(), '256')
})
