import Ember from 'ember'
import moment from 'moment'

export default Ember.Controller.extend({
  now: moment.now(),
  nowef10m: Ember.computed('now', function () {
    return this.get('now') + 600000
  }),
  fromDate: null,
  toDate: null,

  init () {
    this._super(...arguments)
    this.updateTime()
  },

  updateTime () {
    let self = this
    setInterval(function () {
      self.set('now', moment.now())
    }, 1000, self)
  },

  actions: {
    pauseTime () {
      clearInterval(this.updateTime())
    },

    addRule () {
      Ember.Logger.info('Create rule')
    }
  }
})
