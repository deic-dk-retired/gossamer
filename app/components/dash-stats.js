import Ember from 'ember'
import * as d3 from 'd3'
import ProgressBar from 'npm:progressbar.js'

const DashStatsComponent = Ember.Component.extend({

  class: Ember.computed('params.[]', function () {
    return this.get('params')[0]
  }),

  stats: Ember.computed('params.[]', function () {
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
    let stats = this.get('stats')
    let where = '.progress-' + this.get('class')
    let percent = 0.0

    setTimeout(function () {
      this.$('.dimmer').remove()
    }, 1000)

    let v = 0
    let l = '...'
    let c = '#ffffff'
    let h = '#37474F'

    switch (this.get('class').split('-')[0]) {
      case 'act':
        v = stats.active
        l = 'active'
        c = 'red'
        h = '#ef5350'
        break
      case 'exp':
        v = stats.expired
        l = 'expired'
        c = 'blue'
        h = '#0288D1'
        break
      case 'tcp':
        v = stats.tcp
        l = 'tcp'
        c = 'orange'
        h = '#FFB74D'
        break
      case 'icmp':
        v = stats.icmp
        l = 'icmp'
        c = 'yellow'
        h = '#FFEB3B'
        break
      case 'udp':
        v = stats.udp
        l = 'udp'
        break
      case 'oth':
        v = stats.other
        l = 'others'
        break
      case 'tot':
        v = stats.total
        l = 'total'
        c = 'teal'
        h = '#00B5AD'
        break
      case 'net':
        v = stats.networks
        l = 'networks'
        c = 'olive'
        h = '#B5CC18'
        break
    }

    percent = (v / stats.total)

    if (v >= 1000) {
      v = f(v)
    }
    wv.text(v)
    wl.text(l)
    tocolor.addClass(c)

    let bar = new ProgressBar.Circle(where, {
      strokeWidth: 5,
      trailColor: '#f0f0f0',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 2500,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: true
      },
      from: {color: '#90A4AE'},
      to: {color: h},
        // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color)
        let value = (bar.value() * 100).toFixed(1)
        if (value === 0) {
          bar.setText('')
        } else {
          bar.setText(v + ' <div class="statslabel">' + l.toUpperCase() + '</div>')
        }
        bar.text.style.color = state.color
      }
    })
    bar.animate(percent)
  }
})

DashStatsComponent.reopenClass({
  positionalParams: 'params'
})

export default DashStatsComponent
