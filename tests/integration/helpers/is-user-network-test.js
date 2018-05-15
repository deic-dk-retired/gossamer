
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

const netArr = [5, 7, 11, 13, 19, 23]

moduleForComponent('is-user-network', 'helper:is-user-network', {
  integration: true
})

// Replace this with your real tests.
test('it checks whether network id exists for user', function (assert) {
  this.set('arr', netArr)
  this.set('netid', 15)
  this.render(hbs`{{is-user-network arr netid}}`)
  assert.equal(this.$().text().trim(), 'false')

  this.set('netid', 13)
  this.render(hbs`{{is-user-network arr netid}}`)
  assert.equal(this.$().text().trim(), 'true')
})
