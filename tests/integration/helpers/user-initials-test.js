
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('user-initials', 'helper:user-initials', {
  integration: true
})

// Replace this with your real tests.
test('it renders', function (assert) {
  this.set('name', 'Ashokaditya Mohanty')
  this.render(hbs`{{user-initials name}}`)
  assert.equal(this.$().text().trim(), 'AM')
})
