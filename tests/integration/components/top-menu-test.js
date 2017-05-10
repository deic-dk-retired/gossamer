import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

let user = 'emberuser'

moduleForComponent('top-menu', 'Integration | Component | top menu', {
  integration: true
})

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })
  this.set('user', user)
  this.render(hbs`{{top-menu username=user}}`)
  assert.equal(this.$('.username').text().trim(), 'emberuser')
})
