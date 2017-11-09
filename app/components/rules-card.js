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
    if (percent > 1) {
      return 1
    } else {
      return `${percent}`
    }
    // return `${percent}`
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
    setInterval(function () {
      this.set('now', moment.now())
    }.bind(this), f)
  },

  removeCard (timer) {
    Ember.$('.card.rule-' + this.get('rid')).addClass('toRemove')
    setTimeout(function () {
      Ember.$('.card.rule-' + this.get('rid')).remove()
    }.bind(this), 300)
    clearInterval(timer)
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
      let f = this.get('frequency')
      let reanimate = setInterval(function () {
        bar.animate(this.get('prcnt'))
        if (this.get('pre_checked') && this.get('prcnt') > 0.99) {
          this.removeCard(reanimate)
        }
      }.bind(this), f)
    }
  },

  didDestroyElement () {
    this._super(...arguments)
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
