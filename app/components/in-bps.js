import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  classNames: ['bps-in'],
  url: 'http://10.33.1.97:4242/api/series/qf-in-bps',
  title: 'bps (in)',
  gfill: '#AD1457',
  didInsertElement () {
    this._super(...arguments)
    // time parser for influx timestamp
    var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ')
    var xTime = d3.timeFormat('%H:%M')

    // get svg width and height from DOM
    var widget = d3.select('.' + this.get('classNames') + ' > .dash-widget')
    var svg = d3.select('.' + this.get('classNames') + ' > .dash-widget' + ' > svg')
    var svgW = this.$('.dash-widget svg').outerWidth()
    var svgH = this.$('.dash-widget svg').outerHeight()
    // configure chart widget dimensions
    var margin = {top: 20, right: 0, bottom: 120, left: 32}
    var margin2 = {top: 200, right: 0, bottom: 20, left: 32}
    var width = svgW - margin.left - margin.right - 20
    var height = +svgH - margin.top - margin.bottom
    var height2 = +svgH - margin2.top - margin2.bottom
    var g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // set widget title
    widget.append('p')
      .text(this.get('title'))
      .style('font-size', '.875rem')
      .style('font-weight', '100')

    // set x scale
    var x = d3.scaleTime()
      .rangeRound([0, width])
    // var x2 = d3.scaleTime().rangeRound([2, width])
      // set y scale
    var y = d3.scaleLinear()
      .rangeRound([height, 0])
    // var y2 = d3.scaleLinear().rangeRound([height2, 0])

    // x axis gen
    var xAxis = d3.axisBottom(x)

    // y axis gen
    var yAxis = d3.axisLeft(y)

    var line = d3.line()
    .x((d) => x(d.x))
    .y((d) => y(d.y))

    // fetch data and render chart content
    d3.json(this.get('url'), function (error, data) {
      if (error) throw error
      // format dates and values
      var d = data.stamp.map(function (obj) {
        var o = {}
        o.x = parseTime(obj.x)
        o.y = +obj.y
        return o
      })

      x.domain(d3.extent(d.map((d) => d.x)))
      y.domain(d3.extent(d.map((d) => d.y))).rangeRound([height, 0])

      // append the x axis
      g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis.tickSize(3)
              .ticks(8)
              .tickFormat(xTime)
              )
        .select('.domain')
        .remove()

      // append the y axis
      g.append('g')
        .call(yAxis
          .tickFormat(d3.format('.0s'))
          .tickSize(2)
          .ticks(5))
        .append('text')
        .attr('fill', '#448AFF')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#90A4AE')
        .text('bits')

      // append path with data
      g.append('path')
      .datum(d)
      .attr('fill', 'none')
      .attr('stroke', '#AD1457')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1)
      .attr('d', line)
    })
  }
})
