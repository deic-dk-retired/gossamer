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
    if (percent < 0) {
      return 0
    }
    if (percent > 1) {
      return `${percent / percent}`
    } else {
      return `${percent}`
    }
  }),

  prcnt: 0.0,

  isClear: false,

  init () {
    this._super(...arguments)
    this.updateNow()
  },

  actprogressDidChange: Ember.on('init', Ember.observer('actprogress', function () {
    this.set('prcnt', this.get('actprogress'))
  })),

  updateNow () {
    let f = this.get('frequency')
    this._intrvl = setInterval(function () {
      this.set('now', moment.now())
    }.bind(this), f)
  },

  removeCard () {
    Ember.$('.card.rule-' + this.get('rid')).addClass('toRemove')
    this._timer1 = setTimeout(function () {
      Ember.$('.card.rule-' + this.get('rid')).remove()
    }.bind(this), 300)
  },

  didInsertElement () {
    this._super(...arguments)

    let where = '.progress-' + this.get('rid')
    let percent = this.get('prcnt')

    if (where.length !== null) {
      let bar = new ProgressBar.SemiCircle(where, {
        strokeWidth: 6,
        color: '#90A4AE',
        trailColor: '#f4f4f4',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 2500,
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
      let f = this.get('frequency')
      let reanimate = function () {
        bar.animate(this.get('prcnt'))
        if (this.get('pre_checked') && this.get('prcnt') > 0.99) {
          this.removeCard()
        }
        this._timer2 = setTimeout(reanimate, f)
      }.bind(this)
      reanimate()
    }
  },

  willDestroyElement () {
    this._super(...arguments)
    clearTimeout(this.get('_timer1'))
    clearTimeout(this.get('_timer2'))
    clearInterval(this.get('_intrvl'))
  },

  actions: {

    toggleClear (rid) {
      this.toggleProperty('isClear')
      this.send('toggleConfirm', rid)
    },

    toggleConfirm (rid) {
      if (this.get('isClear')) {
        Ember.$('.rule-' + rid + ' button.labeled').addClass('hide')
        Ember.$('.rule-' + rid + ' .buttons').removeClass('hide')
      }
      if (!this.get('isClear')) {
        Ember.$('.rule-' + rid + ' button.labeled').removeClass('hide')
        Ember.$('.rule-' + rid + ' .buttons').addClass('hide')
      }
    }

  }

})
