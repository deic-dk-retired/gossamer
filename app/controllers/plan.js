import Ember from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({
  now: moment.now(),
  nowef10m: Ember.computed('now', function () {
    return this.get('now') + 600000
  }),
  fromDate: null,
  toDate: null,

  protocol: '',

  icmptype: null,
  icmpcode: null,

  isdefDur: false,

  isdefDurChanged: Ember.on('init', Ember.observer('isdefDur', function () {
    let uptime = function () {
      if (this.get('isdefDur')) {
        this.set('now', moment.now())
      }
      setTimeout(uptime, 1000)
    }.bind(this)
    uptime()
  })),

  ruleact: 'block',

  actions: {
    resetForm () {
      this.setProperties({
        protocol: null,
        destip: null,
        destport: null,
        tcpflags: [],
        icmptype: null,
        icmpcode: null,

        pktlen: null,
        fragEncode: null,
        shrtcomm: null,
        isdefDur: false,
        ruleact: 'block',
        pktrate: 0
      })
    },

    pauseTime () {
      clearInterval(this.updateTime())
    },

    addRule () {
      Ember.Logger.info('Create rule')
    }
  }
})
