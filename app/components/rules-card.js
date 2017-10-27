import Ember from 'ember'
import moment from 'moment'
import ProgressBar from 'npm:progressbar.js'

export default Ember.Component.extend({
  tagName: '',

  rid: Ember.computed('rule', function () {
    return this.get('rule').get('id')
  }),

  now: moment.now(),

  validfrom: Ember.computed('validfrom', function () {
    let vfrom = this.get('rule').get('validfrom')
    return `${vfrom}`
  }),

  validto: Ember.computed('validto', function () {
    let vto = this.get('rule').get('validto')
    return `${vto}`
  }),

  dur: Ember.computed('rule', function () {
    let dur = this.get('rule').get('totdur')
    return `${dur}`
  }),

  frequency: Ember.computed('dur', function () {
    let f = Math.ceil(this.get('dur') / 60)
    return `${f}`
  }),

  actprogress: Ember.computed('validfrom', 'validto', 'now', function () {
    let b = parseInt(moment(this.get('validfrom')).format('x'))
    let a = parseInt(moment(this.get('validto')).format('x'))
    let tot = moment(a).diff(b)
    let now = this.get('now')
    let percent = (moment(now).diff(b) / tot).toFixed(2)
    Ember.Logger.info(percent)
    return `${percent}`
  }),

  prcnt: 0.0,

  init () {
    this._super(...arguments)
    this.updateNow()
  },

  actprogressDidChange: Ember.on('init', Ember.observer('actprogress', function () {
    this.set('prcnt', this.get('actprogress'))
  })),

  updateNow () {
    let self = this
    let f = this.get('frequency')
    setInterval(function () {
      self.set('now', moment.now())
    }, f, self)
  },

  didInsertElement () {
    this._super(...arguments)

    let where = '.progress-' + this.get('rid')
    let percent = this.get('prcnt')

    let bar = new ProgressBar.SemiCircle(where, {
      strokeWidth: 6,
      color: '#90A4AE',
      trailColor: '#f4f4f4',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: true
      },
      from: {color: '#ECEFF1'},
      to: {color: '#0288D1'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color)
        let value = Math.floor(bar.value() * 100).toFixed(1)
        if (value === 0) {
          bar.setText('')
        } else {
          bar.setText(value + ' <span class="centsign">%</span><div class="proglabel">complete</div>')
        }

        bar.text.style.color = '#37474F'
      }
    })
    bar.text.style.fontSize = '1.2rem'

    bar.animate(percent)
    let self = this
    let f = this.get('frequency')
    setInterval(function () {
      bar.animate(self.get('prcnt'))
      // Ember.Logger.info(self.get('prcnt'))
      // if (self.get('prcnt') >= 1.0) {
      //   self.transitionTo('rules')
      // }
    }, f, self)
  }

})
