import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('src-fields', 'Integration | Component | src fields', {
  integration: true
})

test('it renders', function (assert) {
  this.render(hbs`{{src-fields}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'Source Host or CIDR')
})
