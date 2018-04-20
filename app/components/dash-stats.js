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

    setTimeout(function () {
      this.$('.dimmer').remove()
    }, 1000)

    let clsnm = this.get('class').split('-')[0]
    let setStats = {
      'act': () => {
        return {
          v: stats.active,
          l: 'active',
          c: 'red'
        }
      },
      'exp': () => {
        return {
          v: stats.expired,
          l: 'expired',
          c: 'green'
        }
      },
      'tcp': () => {
        return {
          v: stats.tcp,
          l: 'tcp',
          c: 'black'
        }
      },
      'icmp': () => {
        return {
          v: stats.icmp,
          l: 'icmp',
          c: 'black'
        }
      },
      'udp': () => {
        return {
          v: stats.udp,
          l: 'udp',
          c: 'black'
        }
      },
      'oth': () => {
        return {
          v: stats.other,
          l: 'others',
          c: 'black'
        }
      },
      'tot': () => {
        return {
          v: stats.total,
          l: 'total',
          c: 'black'
        }
      },
      'net': () => {
        return {
          v: stats.networks,
          l: 'networks',
          c: 'black'
        }
      }
    }

    let v = setStats[clsnm]().v
    let c = setStats[clsnm]().c
    let l = setStats[clsnm]().l

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

  didRender () {
    this._super(...arguments)
    Ember.$('.segment').append(`<div class="ui active inverted dimmer">
    <div class="ui mini text loader">Loading&hellip;</div>
  </div>`)
  },

  didInsertElement () {
    this._super(...arguments)
    this.renderStat()
  }
})

DashStatsComponent.reopenClass({
  positionalParams: 'params'
})

export default DashStatsComponent
