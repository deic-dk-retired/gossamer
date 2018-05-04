import Ember from 'ember'
import * as d3 from 'd3'

const DashStatsComponent = Ember.Component.extend({

  class: Ember.computed('params.[]', function () {
    return this.get('params')[0]
  }),

  stats: Ember.computed('params.[]', function () {
    return this.get('params')[1]
  }),

  renderStat () {
    let wv = this.$('.value')
    let wl = this.$('.label')
    let tocolor = this.$('.ui')
    let f = d3.formatPrefix(',.1', 1e3)
    let stats = this.get('stats')

    this._timer = setTimeout(function () {
      this.$('.centered.segment > .dimmer').remove()
    }, 1500)

    let clsnm = this.get('class').split('-')[0]
    let stsobj = {
      v: '...',
      l: '...',
      c: 'black'
    }
    let setStats = {
      'act': () => {
        stsobj.v = stats.active
        stsobj.l = 'active'
        stsobj.c = 'red'
      },
      'exp': () => {
        stsobj.v = stats.expired
        stsobj.l = 'expired'
        stsobj.c = 'green'
      },
      'tcp': () => {
        stsobj.v = stats.tcp
        stsobj.l = 'tcp'
      },
      'icmp': () => {
        stsobj.v = stats.icmp
        stsobj.l = 'icmp'
      },
      'udp': () => {
        stsobj.v = stats.udp
        stsobj.l = 'udp'
      },
      'oth': () => {
        stsobj.v = stats.other
        stsobj.l = 'others'
      },
      'tot': () => {
        stsobj.v = stats.total
        stsobj.l = 'total'
      },
      'net': () => {
        stsobj.v = stats.networks
        stsobj.l = 'networks'
      }
    }
    setStats[clsnm]()
    let v = stsobj.v
    let c = stsobj.c
    let l = stsobj.l

    if (v >= 1000) {
      v = f(v)
    }
    if (/[A-za-z]$/g.test(v)) {
      wv.append(`${v.substr(0, v.length - 1)}<span class='suffix'>${v.substr(-1)}</span>`)
    } else {
      wv.text(v)
    }

    wl.text(l)
    tocolor.addClass(c)
  },

  didInsertElement () {
    this._super(...arguments)
    Ember.$('.statistic').before(`<div class="ui active inverted dimmer">
      <div class="ui mini text loader">Loading&hellip;</div>
    </div>`)
    this.renderStat()
  },

  willDestroyElement () {
    this._super(...arguments)
    clearTimeout(this.get('_timer'))
  }
})

DashStatsComponent.reopenClass({
  positionalParams: 'params'
})

export default DashStatsComponent
