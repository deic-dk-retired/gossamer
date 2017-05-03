import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('log-in', 'Integration | Component | log in', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{log-in}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#log-in}}
      template block text
    {{/log-in}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
