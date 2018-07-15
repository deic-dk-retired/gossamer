import Ember from 'ember'
import uuid from 'npm:uuid'
import moment from 'moment'
import { default as nc } from 'npm:node-cidr'

export default Ember.Controller.extend({
  protocol: '',
  icmptype: null,
  icmpcode: null,
  tcpflags: [],
  isdefDur: false,

  validSrc: true,
  srcErr: '',

  validSrcPort: true,
  srcPortErr: '',

  validDest: false,
  destErr: '',

  validDestPort: true,
  destPortErr: '',

  validRateLimit: true,
  rateLimErr: '',

  validated: false,

  uid: Ember.computed('session', function () {
    return `${this.get('session.data.authenticated.uid')}`
  }),

  usrtype: Ember.computed('uid', function () {
    const uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('kind')}`
  }),

  usrNetworks: Ember.computed('uid', function () {
    const uid = this.get('uid')
    const usrNets = []
    this.get('store').peekRecord('user', uid).get('networks').forEach(function (e) {
      usrNets.push(e.get('net'))
    })
    return usrNets
  }),

  userNetworksPopup: Ember.computed('usrNetworks', function () {
    let p = `<div class="ui small header">Assigned Networks</div>
      <div class="ui relaxed list">`
    const un = this.get('usrNetworks')
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

  coid: Ember.computed('uid', function () {
    const uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('customerid')}`
  }),

  couuid: Ember.computed('uid', function () {
    const uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('couuid')}`
  }),

  mnow: moment.now(),
  mnowef10m: Ember.computed('mnow', function () {
    return this.get('mnow') + 600000
  }),

  isdefDurChanged: Ember.on('init', Ember.observer('isdefDur', function () {
    const uptime = function () {
      if (this.get('isdefDur')) {
        this.set('mnow', moment.now())
      }
      this._timer = setTimeout(uptime, 1000)
    }.bind(this)
    uptime()
  })),

  fromDate: Ember.computed('mnow', function () {
    const d = new Date(this.get('mnow'))
    return d
  }),

  toDate: Ember.computed('mnowef10m', function () {
    const d = new Date(this.get('mnowef10m'))
    return d
  }),

  extractDate (dt) {
    const exdt = Array.isArray(dt) ? dt[0] : dt
    return exdt
  },

  fragmentList: ['dont-fragment', 'first-fragment', 'is-fragment', 'last-fragment', 'not-a-fragment'],

  processedFragenc: Ember.computed('fragenc', function () {
    const fe = this.get('fragenc')
    return fe !== null ? `[${fe}]` : ``
  }),

  ruleact: 'discard',

  resact: Ember.computed('ruleact', function () {
    const act = this.get('ruleact')
    let react = 'discard'
    if (act === 'rate limit') {
      react = `${act} ${this.get('pktrate')}`
    }
    return `${react}`
  }),

  ruleactDidChange: Ember.on('init', Ember.observer('ruleact', function () {
    this.set('pktrate', null)
    this.set('rateLimErr', '')
    if (this.get('ruleact') === 'rate limit') {
      this.set('validRateLimit', false)
    } else {
      this.set('validRateLimit', true)
    }
    this.send('checkValidated')
  })),

  protocolDidChange: Ember.on('init', Ember.observer('protocol', function () {
    if (this.get('protocol') === 'icmp') {
      this.setProperties({
        srcport: null,
        destport: null,
        tcpflags: [],
        srcPortErr: '',
        destPortErr: ''
      })
    }
    if (this.get('protocol') !== 'icmp') {
      this.setProperties({
        icmptype: null,
        icmpcode: null
      })
      if (this.get('protocol') !== 'tcp') {
        this.setProperties({
          tcpflags: []
        })
      }
    }
  })),

  responseMessage: '',

  willDestry () {
    this._super(...arguments)
    this.set('isdefDur', false)
    clearTimeout(this.get('_timer'))
  },

  actions: {
    resetForm () {
      this.setProperties({
        protocol: '',
        srcip: null,
        srcport: null,
        destip: null,
        destport: null,
        tcpflags: [],
        icmptype: null,
        icmpcode: null,
        pktlen: null,
        fragenc: null,
        shrtcomm: null,
        isdefDur: false,
        ruleact: 'discard',
        pktrate: 0,

        srcErr: '',
        srcPortErr: '',
        destErr: '',
        destPortErr: '',
        rateLimErr: '',
        validSrc: true,
        validSrcPort: true,
        validDest: false,
        validDestPort: true,
        validRateLimit: true,
        validated: false
      })
    },

    setMinDate () {
      this.set('toMinDate', this.get('fromDate'))
    },

    checkValidated () {
      let protocol = this.get('protocol')
      let vldSrc = this.get('validSrc')
      let vldSrcPort = this.get('validSrcPort')
      let vldDes = this.get('validDest')
      let vldDesPort = this.get('validDestPort')
      let vldRtLim = this.get('validRateLimit')
      this.set('validated', false)
      if (protocol !== 'icmp' && vldSrc && vldSrcPort && vldDes && vldDesPort && vldRtLim) {
        this.set('validated', true)
      }
      if (protocol === 'icmp' && vldSrc && vldDes && vldRtLim) {
        this.set('validated', true)
      }
    },

    validateIpCidr (prefixinput) {
      const t = Ember.$(prefixinput).val()
      const validipcidr = (t.split('/').length < 2) ? nc.ip.validate(t) : nc.cidr.validate(t)
      const m = (typeof validipcidr !== 'object') ? validipcidr.split(': ') : validipcidr
      let ifNetBelongsToUser = false
      let msg = ''
      if (prefixinput === '#destip') {
        const matchedNetworks = this.get('usrNetworks').map((e) => nc.cidr.includes(e, this.get('destip')))
        ifNetBelongsToUser = matchedNetworks.indexOf(true) !== -1
        if (m === null && ifNetBelongsToUser) {
          this.set('validDest', true)
          this.set('destErr', '')
        } else {
          this.set('validDest', false)
          msg = (m === null) ? 'This is not within networks assigned to you!' : m.join(', ')
          this.set('destErr', msg)
        }
      }
      if (prefixinput === '#srcip') {
        if (t.length > 0 && m !== null) {
          this.set('validSrc', false)
          this.set('srcErr', m.join(', '))
        } else {
          this.set('validSrc', true)
          this.set('srcErr', '')
        }
      }
      this.send('checkValidated')
    },

    validatePort (portid) {
      const pattern = new RegExp(/^(=\d+-\d+)\s*?$|^(=[<>]?\d+\s*)+$/, 'gm')
      const t = Ember.$(portid).val().trim()
      const m = 'That is not a valid flowspec port pattern'
      const test = t.length > 0 ? pattern.test(t) : true
      const validProp = portid === '#destport' ? 'validDestPort' : 'validSrcPort'
      const portErr = portid === '#destport' ? 'destPortErr' : 'srcPortErr'
      if (test) {
        this.set(validProp, true)
        this.set(portErr, '')
      } else {
        this.set(validProp, false)
        this.set(portErr, m)
      }
      this.send('checkValidated')
    },

    validateRateLimit () {
      const pattern = new RegExp(/^[^0\+\-\.\s](\d*)(?!\.|\,)$/, 'gm')
      const t = Ember.$('#pktrate').val().trim()
      let msg = ''
      const m1 = pattern.test(t) ? '' : 'That is not a positive integer'
      const m2 = parseInt(t) <= Math.pow(10, 11) ? '' : 'Max allowed value is 100 gigabits or 10^11 bits'
      if (m1 === '' && m2 === '') {
        this.set('validRateLimit', true)
        this.set('rateLimErr', '')
      } else {
        this.set('validRateLimit', false)
        msg = (m1 === '') ? m2 : m1
        this.set('rateLimErr', msg)
      }
      this.send('checkValidated')
    },

    createRule () {
      let ruuid = uuid.v4()
      let fxExDt = this.get('extractDate')
      // let matchedNetworks = this.get('usrNetworks').map((e) => nc.cidr.includes(e, this.get('destip')))
      // let ifNetBelongsToUser = matchedNetworks.indexOf(true) !== -1
      if (this.get('validated')) {
        let rule = this.get('store').createRecord('rule', {
          ruleuuid: ruuid,
          couuid: this.get('couuid'),
          userid: this.get('uid'),
          validfrom: fxExDt(this.get('fromDate')).toISOString(),
          validto: fxExDt(this.get('toDate')).toISOString(),
          srcprefix: this.get('srcip') || null,
          srcport: this.get('srcport') || null,
          destprefix: this.get('destip'),
          destport: this.get('destport'),
          ipprotocol: this.get('protocol'),
          icmptype: this.get('icmptype'),
          icmpcode: this.get('icmpcode'),
          tcpflags: this.get('tcpflags').join().toLowerCase(),
          fragenc: this.get('processedFragenc') || null,
          description: this.get('shrtcomm'),
          pktlen: this.get('pktlen'),
          action: this.get('resact')
        })
        rule.save()
        .then((response) => {
          let ruleprcl = response.get('store').peekRecord('rule', response.get('id')).get('ipprotocol').toUpperCase()
          this.set('responseMessage',
            `A ${ruleprcl} was created successfully on ${response.get('store').peekRecord('rule', response.get('id')).get('destprefix')}`)
          this.get('notifications').clearAll()
          this.get('notifications').success(this.get('responseMessage'), {
            autoClear: true,
            clearDuration: 5000
          })
        })
        .catch((adapterError) => {
          Ember.Logger.info(adapterError)
          this.get('notifications').clearAll()
          this.get('notifications').error('Something went wrong on create!', {
            autoClear: true,
            clearDuration: 10000
          })
        })
      } else {
        this.set('responseMessage', `You can't add rules on non-assigned networks`)
        this.get('notifications').warning(this.get('responseMessage'), {
          autoClear: true,
          clearDuration: 10000
        })
      }
    }
  }

})
