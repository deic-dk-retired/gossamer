import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('arch-card', 'Integration | Component | arch card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{arch-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#arch-card}}
      template block text
    {{/arch-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
