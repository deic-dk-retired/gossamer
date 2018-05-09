
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('null-replace', 'helper:null-replace', {
  integration: true
})

// Replace this with your real tests.
test('it replaces nulls with ellipses', function (assert) {
  this.set('inputValue', null)
  this.render(hbs`{{null-replace inputValue}}`)
  assert.equal(this.$().text().trim(), '...')
})
