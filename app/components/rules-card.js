import Ember from 'ember'
import ProgressBar from 'npm:progressbar.js'

export default Ember.Component.extend({
  tagName: '',
  rid: Ember.computed('rid', function () {
    return this.get('rid')
  }),
  prcnt: Ember.computed('rule', function () {
    return this.get('rule').get('actprogress')
  }),

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
      from: {color: '#90A4AE'},
      to: {color: '#0288D1'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color)
        let value = Math.round(bar.value() * 100)
        if (value === 0) {
          bar.setText('')
        } else {
          bar.setText(value + ' <span class="centsign">%</span>')
        }

        bar.text.style.color = state.color
      }
    })
    bar.text.style.fontSize = '2rem'
    bar.animate(percent)
  }
})
