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

  validSrcPort: false,
  srcPortErr: '',

  validDest: false,
  destErr: '',

  validDestPort: false,
  destPortErr: '',

  validRateLim: false,
  rateLimErr: '',

  validated: false,

  uid: Ember.computed('session', function () {
    return `${this.get('session.data.authenticated.uid')}`
  }),

  usrtype: Ember.computed('uid', function () {
    let uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('kind')}`
  }),

  usrNetworks: Ember.computed('uid', function () {
    let uid = this.get('uid')
    let usrNets = []
    this.get('store').peekRecord('user', uid).get('networks').forEach(function (e) {
      usrNets.push(e.get('net'))
    })
    return usrNets
  }),

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

  coid: Ember.computed('uid', function () {
    let uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('customerid')}`
  }),

  couuid: Ember.computed('uid', function () {
    let uid = this.get('uid')
    return `${this.get('store').peekRecord('user', uid).get('couuid')}`
  }),

  mnow: moment.now(),
  mnowef10m: Ember.computed('mnow', function () {
    return this.get('mnow') + 600000
  }),

  isdefDurChanged: Ember.on('init', Ember.observer('isdefDur', function () {
    let uptime = function () {
      if (this.get('isdefDur')) {
        this.set('mnow', moment.now())
      }
      this._timer = setTimeout(uptime, 1000)
    }.bind(this)
    uptime()
  })),

  fromDate: Ember.computed('mnow', function () {
    let d = new Date(this.get('mnow'))
    return d
  }),

  toDate: Ember.computed('mnowef10m', function () {
    let d = new Date(this.get('mnowef10m'))
    return d
  }),

  extractDate (dt) {
    let exdt = Array.isArray(dt) ? dt[0] : dt
    return exdt
  },

  fragmentList: ['dont-fragment', 'first-fragment', 'is-fragment', 'last-fragment', 'not-a-fragment'],

  processedFragenc: Ember.computed('fragenc', function () {
    let fe = this.get('fragenc')
    return fe !== null ? `[${fe}]` : ``
  }),

  ruleact: 'discard',

  resact: Ember.computed('ruleact', function () {
    let act = this.get('ruleact')
    let react = 'discard'
    if (act === 'rate limit') {
      react = `${act} ${this.get('pktrate')}`
    }
    return `${react}`
  }),

  protocolDidChange: Ember.on('init', Ember.observer('protocol', function () {
    if (this.get('protocol') === 'icmp') {
      this.setProperties({
        srcport: null,
        destport: null,
        tcpflags: []
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

        validDest: false,
        validDestPort: false,
        validRateLim: false,
        validated: false,
        destErr: '',
        srcPortErr: '',
        destPortErr: '',
        rateLimErr: ''
      })
    },

    setMinDate () {
      this.set('toMinDate', this.get('fromDate'))
    },

    validateIpCidr (prefixinput) {
      let t = Ember.$(prefixinput).val()
      let v = (t.split('/').length < 2) ? nc.ip.validate(t) : nc.cidr.validate(t)
      let ms = (typeof v !== 'object') ? v.split(': ') : v
      let matchedNetworks = this.get('usrNetworks').map((e) => nc.cidr.includes(e, this.get('destip')))
      let ifNetBelongsToUser = matchedNetworks.indexOf(true) !== -1
      let msg = ''
      if (ms === null && ifNetBelongsToUser) {
        this.set('validDest', true)
        this.set('destErr', '')
      } else {
        this.set('validDest', false)
        msg = (ms === null) ? 'This is not within networks assigned to you!' : ms.join(', ')
        this.set('destErr', msg)
      }
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
    },

    validateRateLimit () {
      const pattern = new RegExp(/^[^0\+\-\.\s](\d*)(?!\.|\,)$/, 'gm')
      let t = Ember.$('#pktrate').val().trim()
      let msg = ''
      let m = pattern.test(t) ? '' : 'That is not a positive integer'
      let ms = parseInt(t) <= Math.pow(10, 11) ? '' : 'Max allowed value is 100 gigabits or 10^11 bits'
      if (m === '' && ms === '') {
        this.set('validRateLim', true)
        this.set('rateLimErr', '')
      } else {
        this.set('validRateLim', false)
        msg = (m === '') ? ms : m
        this.set('rateLimErr', msg)
      }
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
        // this.get('notifications').clearAll()
        this.get('notifications').warning(this.get('responseMessage'), {
          autoClear: true,
          clearDuration: 10000
        })
      }
    }
  }
})
