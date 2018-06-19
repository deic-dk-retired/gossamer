import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('dest-fields', 'Integration | Component | dest fields', {
  integration: true
})

test('it renders for not ICMP', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{dest-fields notIcmp=true}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'Destination Host or CIDR')
  // Template block usage:
  this.render(hbs`
    {{#dest-fields notIcmp=true}}
      <div class="required field">
        <label>Destination Host or CIDR</label>
      </div>
      <div class="required field">
        <label>Destination Port</label>
      </div>
    {{/dest-fields}}`)
  assert.equal(this.$().text().trim().split('\n')[0], `Destination Host or CIDR`)
})

test('it renders for ICMP', function (assert) {
  this.render(hbs`{{dest-fields notIcmp=false}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'ICMP Type')
  // Template block usage:
  this.render(hbs`
    {{#dest-fields notIcmp=false}}
      <div class="required twelve wide field">
        <label>ICMP Type</label>
            <div class="default text">Select Type</div>
            <i class="dropdown icon"></i>
            <div class="menu">
            </div>
      </div>
      <div class="required twelve wide field">
        <label>ICMP Code</label>
          <div class="default text">Select Code</div>
          <i class="dropdown icon"></i>
          <div class="menu">
          </div>
      </div>
    {{/dest-fields}}`)
  assert.equal(this.$().text().trim().split('\n')[0], `ICMP Type`)
})
