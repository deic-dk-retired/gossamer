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

  actprogress: Ember.computed('validfrom', 'validto', 'now', function () {
    let b = parseInt(moment(this.get('validfrom')).format('x'))
    let a = parseInt(moment(this.get('validto')).format('x'))
    let tot = moment(a).diff(b)
    let now = this.get('now')
    let percent = (moment(now).diff(b) / tot).toFixed(3)
    return `${percent}`
  }),

  prcnt: 0.0,

  init () {
    this._super(...arguments)
    this.updateTime()
  },

  actprogressDidChange: Ember.on('init', Ember.observer('actprogress', function () {
    this.set('prcnt', this.get('actprogress'))
  })),

  updateTime () {
    let self = this
    setInterval(function () {
      self.set('now', moment.now())
    }, 5000, self)
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
        let value = (bar.value() * 100).toFixed(1)
        if (value === 0) {
          bar.setText('')
        } else {
          bar.setText(value + ' <span class="centsign">%</span>')
        }

        bar.text.style.color = '#37474F'
      }
    })
    bar.text.style.fontSize = '1.5rem'

    bar.animate(percent)
    let self = this
    setInterval(function () {
      bar.animate(self.get('prcnt'))
    }, 10000, self)
  }

})
