import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('traffic-spec-network', 'Integration | Component | traffic spec network', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{traffic-spec-network}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#traffic-spec-network}}
      template block text
    {{/traffic-spec-network}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
