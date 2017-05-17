
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rule-maxpkt', 'helper:rule-maxpkt', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{rule-maxpkt inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

