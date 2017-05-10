import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('side-menu', 'Integration | Component | side menu', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{side-menu}}`)
  assert.equal(this.$('.aside__middle a:first-child').text().trim(), 'dashboard', 'dashboard')
})
