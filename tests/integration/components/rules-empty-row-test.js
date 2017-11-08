import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rules-empty-row', 'Integration | Component | rules empty row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rules-empty-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rules-empty-row}}
      template block text
    {{/rules-empty-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
