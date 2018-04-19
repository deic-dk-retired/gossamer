import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('co-edit', 'Integration | Component | co edit', {
  integration: true
})

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('coname', 'EmberJs')
  this.set('saveCustomer', (actual) => {
    let expected = { comment: 'You are not a wizard!' }
    assert.deepEqual(actual, expected, 'submitted value is passed to external action')
  })
  this.set('addNetwork', (actual) => {
    let expected = { comment: 'You are not a wizard!' }
    assert.deepEqual(actual, expected, 'submitted value is passed to external action')
  })
  this.set('removeNetwork', (actual) => {
    let expected = { comment: 'You are not a wizard!' }
    assert.deepEqual(actual, expected, 'submitted value is passed to external action')
  })
  this.set('resetForm', (actual) => {
    let expected = { comment: 'You are not a wizard!' }
    assert.deepEqual(actual, expected, 'submitted value is passed to external action')
  })
  this.set('required', (actual) => {
    let expected = { comment: 'You are not a wizard!' }
    assert.deepEqual(actual, expected, 'submitted value is passed to external action')
  })
  this.render(hbs`{{co-edit coname=coname saveCustomer=(action saveCustomer) addNetwork=(action addNetwork) removeNetwork=(action removeNetwork) resetForm=(action resetForm) required=(action required)}}`)
  assert.equal(this.$('h2.title').text().trim(), 'EmberJs')
})
