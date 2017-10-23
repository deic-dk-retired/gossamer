import Ember from 'ember'
import fetch from 'fetch'
import * as d3 from 'd3'
import ProgressBar from 'npm:progressbar.js'

const DashStatsComponent = Ember.Component.extend({

  class: Ember.computed('params.[]', function () {
    return this.get('params')[0]
  }),

  userid: Ember.computed('params.[]', function () {
    return this.get('params')[1]
  }),

  didRender () {
    this._super(...arguments)
    Ember.$('.segment').append(`<div class="ui active inverted dimmer">
    <div class="ui mini text loader">Loading&hellip;</div>
  </div>`)
  },

  didInsertElement () {
    this._super(...arguments)

    let wv = this.$('.value')
    let wl = this.$('.label')
    let tocolor = this.$('.ui')
    let f = d3.formatPrefix(',.1', 1e3)

    fetch('http://10.33.1.97:4242/api/stats/' + this.get('userid'))
    .then(function (d) {
      return d.json()
    })
    .then((d) => {
      setTimeout(function () {
        this.$('.dimmer').remove()
      }, 1000)

      let v = 0
      let l = '...'
      let c = 'black'
      switch (this.get('class').split('-')[0]) {
        case 'act':
          v = d.data.active
          l = 'active'
          c = 'red'
          break
        case 'exp':
          v = d.data.expired
          l = 'expired'
          c = 'blue'
          break
        case 'tcp':
          v = d.data.tcp
          l = 'tcp'
          break
        case 'icmp':
          v = d.data.icmp
          l = 'icmp'
          break
        case 'udp':
          v = d.data.udp
          l = 'udp'
          break
        case 'oth':
          v = d.data.other
          l = 'others'
          break
        case 'tot':
          v = d.data.total
          l = 'total'
          break
        case 'net':
          v = d.data.networks
          l = 'networks'
          break
      }

      let where = '.progress-' + this.get('class')
      let percent = (v / d.data.total)

      if (v >= 1000) {
        v = f(v)
      }
      wv.text(v)
      wl.text(l)
      tocolor.addClass(c)

      let bar = new ProgressBar.Circle(where, {
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
        to: {color: '#4CAF50'},
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
      bar.text.style.fontSize = '1.5rem'
      bar.animate(percent)
    })
  }
})

DashStatsComponent.reopenClass({
  positionalParams: 'params'
})

export default DashStatsComponent
