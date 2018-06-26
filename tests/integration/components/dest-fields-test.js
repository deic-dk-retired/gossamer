import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

const userNetworks = ['10.33.0.0/16', '10.33.44.0/24']

moduleForComponent('dest-fields', 'Integration | Component | dest fields', {
  integration: true
})

test('it renders destination info inputs', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('usrNetworks', userNetworks)
  this.render(hbs`{{dest-fields usrNetworks=usrNetworks protocol='udp'}}`)
  assert.equal(this.$().text().trim().split('\n')[0], 'Destination Host or CIDR ')
  // Template block usage:
  this.render(hbs`
    <div class="field {{unless (eq destErr '') 'error'}}">
      <label>Destination Host or CIDR <div class="ui red tiny circular empty label dot"></div>
        {{#ui-popup class="pop inline"
            html=userNetworksPopup
            variation="mini wide"
            position="right center"}}
          <i class="info icon green tiny"></i>
        {{/ui-popup}}
      </label>
    </div>`)
  assert.equal(this.$().text().trim().split('\n')[0], `Destination Host or CIDR`)
})
