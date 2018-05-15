import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('side-menu', 'Integration | Component | side menu', {
  integration: true
})

const fname = 'Ashokaditya Mohanty'

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('fname', fname)
  this.render(hbs`{{side-menu name=fname}}`)
  assert.equal(this.$('.logo i').hasClass('jet'), true, 'Renders Logo')
})
