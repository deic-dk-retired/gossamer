import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('top-incoming', 'Integration | Component | top incoming', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{top-incoming}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#top-incoming}}
      template block text
    {{/top-incoming}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
