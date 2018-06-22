import Ember from 'ember'
import { default as nc } from 'npm:node-cidr'

export default Ember.Component.extend({
  tagName: '',
  validDest: false,
  validDestPort: false,
  validIcType: false,
  validIcCode: false,
  validatedFields: false,
  destErr: '',
  destPortErr: '',

  userNetworksPopup: Ember.computed('usrNetworks', function () {
    let p = `<div class="ui small header">Assigned Networks</div>
      <div class="ui relaxed list">`
    let un = this.get('usrNetworks')
    un.forEach((e) => {
      p += `<div class="item">
              <i class="fork icon"></i>
              <div class="content">
                <div class="header">
                  ${e}
                </div>
              </div>
            </div>`
    })
    return p
  }),

  validateDestInfo () {
    let isValidFields = false
    if (this.get('protocol') !== 'icmp') {
      isValidFields = this.get('validDest') && this.get('validDestPort')
    }
    if (this.get('protocol') === 'icmp') {
      isValidFields = this.get('validIcType') && this.get('validIcCode')
    }
    Ember.Logger.info(isValidFields)
    if (isValidFields) {
      this.set('validatedFields', true)
    }
  },
  // instead of rerendering and reseting validated twice
  // call these two functions after every blur action has been called
  // so that after required fields submit button is enabled when fields
  // are validated
  didReceiveAttrs () {
    // Ember.Logger.info('check all fields')
    // this.validateDestInfo()
    // this.get('validatedFields') ? this.set('validated', true) : this.set('validated', false)
  },

  actions: {
    validateDestPrefix () {
      let t = Ember.$('#destip').val()
      let v = (t.split('/').length < 2) ? nc.ip.validate(t) : nc.cidr.validate(t)
      let ms = (typeof v !== 'object') ? v.split(': ') : v
      let matchedNetworks = this.get('usrNetworks').map((e) => nc.cidr.includes(e, this.get('destip')))
      let ifNetBelongsToUser = matchedNetworks.indexOf(true) !== -1
      if (ms === null && ifNetBelongsToUser) {
        this.set('validDest', true)
        this.set('destErr', '')
      } else {
        this.set('validDest', false)
        let msg = (ms === null) ? 'This is not within networks assigned to you!' : ms.join(', ')
        this.set('destErr', msg)
      }
    },
    // validate patterns:
    /**
     * num:: num | =num | >=num
     * new:: base + space
     * new:: <=num
     * between 1 - 2^16-1
     */
    validateDestPort () {
      let pattern = RegExp(/(\s{1})|(>\d+)|(>=\d+)|(<=\d+)|(<\d+)|(=\d+)/g)
      let t = Ember.$('#destport').val().trim()
      Ember.Logger.info(pattern.test(t))
      let m = pattern.test(t) ? '' : 'That is not a valid flowspec port pattern'
      if (m === '') {
        this.set('validDestPort', true)
        this.set('destPortErr', '')
      } else {
        this.set('validDestPort', false)
        this.set('destPortErr', m)
      }
    },

    validateIcmpType () {},
    validateIcmpCode () {}
  }
})
