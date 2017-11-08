import Ember from 'ember'
import * as d3 from 'd3'
import { event } from 'd3-selection'

const DashWidgetComponent = Ember.Component.extend({

  endpoint: 'http://10.33.1.97:4242/api/series/',

  class: Ember.computed('params.[]', function () {
    return this.get('params')[0]
  }),

  ytext: Ember.computed('params.[]', function () {
    return this.get('params')[1]
  }),

  series: Ember.computed('params.[]', function () {
    return this.get('params')[2]
  }),

  title: Ember.computed('params.[]', function () {
    return this.get('params')[3]
  }),

  gfill1: Ember.computed('params.[]', function () {
    return this.get('params')[4]
  }),

  gfill2: Ember.computed('params.[]', function () {
    return this.get('params')[5]
  }),

  shape: Ember.computed('params.[]', function () {
    return this.get('params')[6]
  }),

  url: Ember.computed('endppoint', 'series', function () {
    return this.get('endpoint') + this.get('series')
  }),

  pre_checked: true,

  checkLabel: Ember.computed('pre_checked', function () {
    if (this.get('pre_checked')) {
      return `${'Refresh Off'}`
    } else {
      return `${'Refreshing...'}`
    }
  }),

  baseRate: 10,

  init () {
    this._super(...arguments)
    this.set('baseRate', 10)
  },

  didRender () {
    this._super(...arguments)
    this.$('.segment').append(`<div class="ui active inverted dimmer">
      <div class="ui mini text loader">Loading&hellip;</div>
    </div>`)
    if (this.$('.dimmer').length !== 0) {
      setTimeout(function () {
        this.$('.dimmer').remove()
      }.bind(this), 1000)
    }
  },

  didInsertElement () {
    this._super(...arguments)
    this.$().addClass(this.get('class'))

    let parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ')
    let xTime = d3.timeFormat('%H:%M')

    // get svg width and height from DOM
    let widget = d3.select('.' + this.get('class') + ' .dash-widget')
    let svg = d3.select('.' + this.get('class') + ' .dash-widget' + ' > svg')
    let svgW = this.$('.dash-widget svg').outerWidth()
    let svgH = this.$('.dash-widget svg').outerHeight()
    // configure chart widget dimensions
    let margin = {top: 20, right: 0, bottom: 100, left: 32}
    let margin2 = {top: 310, right: 0, bottom: 20, left: 32}
    let width = svgW - margin.left - margin.right - 20
    let height = +svgH - margin.top - margin.bottom
    let height2 = +svgH - margin2.top - margin2.bottom

    // set widget title
    widget.select('.title').text(this.get('title'))

    // set x & y scales
    let x = d3.scaleTime().range([0, width])
    let x2 = d3.scaleTime().range([0, width])
    let y = d3.scaleLinear().range([height, 0])
    let y2 = d3.scaleLinear().range([height2, 0])

    // x & y axes gen
    let xAxis = d3.axisBottom(x)
    let xAxis2 = d3.axisBottom(x2)
    let yAxis = d3.axisLeft(y)

    let brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on('brush end', brushed)

    let zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', zoomed)

    let shape = ''
    let shape2 = ''
    let css = 'd3shape ' // .area or .line
    let skin = '' // stroke or fill

    if (this.get('shape') === 'line') {
      css = css + 'line'
      skin = 'stroke'
        // lines to append
      shape = d3.line()
          .curve(d3.curveMonotoneX)
          .x((d) => x(d.x))
          .y((d) => y(d.y))
      shape2 = d3.line()
          .curve(d3.curveMonotoneX)
          .x((d) => x2(d.x))
          .y((d) => y2(d.y))
    }
    if (this.get('shape') === 'area') {
      css = css + 'area'
      skin = 'fill'
        // areas to append
      shape = d3.area()
          .curve(d3.curveMonotoneX)
          .x((d) => x(d.x))
          .y0(height)
          .y1((d) => y(d.y))
      shape2 = d3.area()
          .curve(d3.curveMonotoneX)
          .x((d) => x2(d.x))
          .y0(height2)
          .y1((d) => y2(d.y))
    }

    svg.append('defs').append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('width', width)
        .attr('height', height)

    // focus and context groups for svg elements
    let focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

    // callback to handle fetched data
    // also renders the chart
    let render = function (error, data) {
      if (error) throw error

      // remove old points
      focus.selectAll('path').remove()
      focus.selectAll('g').remove()
      context.selectAll('path').remove()
      context.selectAll('g').remove()
      // format dates and values
      let d = data.stamp.map(function (obj) {
        let o = {}
        o.x = parseTime(obj.x)
        o.y = +obj.y
        return o
      })

      // set domains and ranges
      x.domain(d3.extent(d.map((d) => d.x)))
      y.domain([0, d3.max(d, (d) => d.y)])
      x2.domain(x.domain())
      y2.domain(y.domain())

      // append the x & y axis focus
      focus.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
      focus.select('.domain').remove()

      focus.append('g')
        .attr('class', 'axis--y')
        .call(yAxis.tickFormat(d3.format('.0s')).tickSize(0 - width).ticks(8))
        .append('text')
          .attr('class', 'ytext')
          .text(this.get('ytext'))
      focus.select('.domain').remove()

      // append path with data
      focus.append('path').datum(d)
        .attr('class', css)
        .attr(skin, this.get('gfill1'))
        .attr('d', shape)

      // append path to context
      context.append('path').datum(d)
      .attr('class', css)
      .attr(skin, this.get('gfill1'))
      .attr('d', shape2)

      // append x axis to context
      context.append('g')
        .attr('class', 'axis--x')
        .attr('transform', 'translate(0,' + height2 + ')')
        .call(xAxis2.tickSize(4).tickFormat(xTime).ticks(8))
      context.select('.domain')
        .attr('class', 'axes')

      context.append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, x.range())

      svg.append('rect')
        .attr('class', 'zoom')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom)
    }.bind(this)

    // fetch data and render chart content
    d3.json(this.get('url'), render)

    let refresh = setInterval(function (url) {
      if (!this.get('pre_checked')) {
        d3.json(url, render)
      }
    }.bind(this), this.get('baseRate') * 1000, this.get('url'))

    function pauseRefresh () {
      clearInterval(refresh)
    }

    function brushed () {
      if (event.sourceEvent && event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
      let s = event.selection || x2.range()
      x.domain(s.map(x2.invert, x2))
      focus.select('.d3shape').attr('d', shape)
      focus.select('.axis--x').call(xAxis)
      focus.select('.domain').remove()
      svg.select('.zoom').call(zoom.transform, d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0))
    }

    function zoomed () {
      if (event.sourceEvent && event.sourceEvent.type === 'brush') return // ignore zoom-by-brush
      let t = event.transform
      x.domain(t.rescaleX(x2).domain())
      focus.select('.d3shape').attr('d', shape)
      focus.select('.axis--x').call(xAxis)
      focus.select('.domain').remove()
      context.select('.brush').call(brush.move, x.range().map(t.invertX, t))
    }
    // time parser for influx timestamp
  }

})

DashWidgetComponent.reopenClass({
  positionalParams: 'params'
})

export default DashWidgetComponent
