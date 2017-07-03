import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  classNames: ['top-10-pps-in'],
  url: 'http://10.33.1.97:4242/api/series/qf-top-10-in-pps',
  title: 'top 10 pps (in)',
  gfill: '#1E88E5',
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
    var margin = {top: 10, right: 0, bottom: 80, left: 32}
    var margin2 = {top: 20, right: 0, bottom: 10, left: 32}
    var height = +svgH - margin.top - margin.bottom
    var height2 = +svgH - margin2.top - margin2.bottom
    var width = svgW - margin.left - margin.right - 20

    // set widget title
    widget.select('.title').text(this.get('title'))

    // set x & y scales
    var x = d3.scaleTime().range([0, width])
    var y = d3.scaleLinear().range([height, 0])
    var y2 = d3.scaleLinear().range([height2, 0])

    // x & y axes gen
    var xAxis = d3.axisBottom(x)
    var yAxis = d3.axisLeft(y)

    // lines to append
    var line = d3.line().x((d) => x(d.x)).y((d) => y(d.y))
    var line2 = d3.line().x((d) => x(d.x)).y((d) => y2(d.y))

    // focus and context groups for svg elements
    var focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.bottom + ')')

    // callback to handle fetched data
    // also renders the chart
    var render = function (error, data) {
      if (error) throw error
      // remove old points
      focus.selectAll('path').remove()
      focus.selectAll('g').remove()
      context.selectAll('path').remove()
      context.selectAll('g').remove()
      // format dates and values
      var d = data.stamp.map(function (obj) {
        var o = {}
        o.x = parseTime(obj.x)
        o.y = +obj.y
        return o
      })

      // set domains and ranges
      x.domain(d3.extent(d.map((d) => d.x)))
      y.domain(d3.extent(d.map((d) => d.y))).range([height, 0])
      y2.domain(d3.extent(d.map((d) => d.y))).range([height2, height + 2 * margin2.top])

      // append the x & y axis t-graph
      focus.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis.tickSize(3).ticks(6).tickFormat(xTime))
      focus.select('.domain')
        .attr('class', 'axes')

      focus.append('g')
        .call(yAxis.tickFormat(d3.format('.0s')).tickSize(2).ticks(6))
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('fill', '#90A4AE')
          .text('bits/s')
      focus.select('.domain')
        .attr('class', 'axes')

      // append path with data
      focus.append('path').datum(d)
        .attr('fill', 'none')
        .attr('stroke', '#1E88E5')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1)
        .attr('d', line)

      // append x axis to b-graph
      context.append('g')
        .attr('transform', 'translate(0,' + height2 + ')')
        .call(xAxis.tickSize(3).ticks(8).tickFormat(xTime))
      context.select('.domain')
        .attr('class', 'axes')

      context.append('path').datum(d)
        .attr('fill', 'none')
        .attr('stroke', '#1E88E5')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1)
        .attr('d', line2)
    }
    // fetch data and render chart content
    d3.json(this.get('url'), render)
    // update every 5sec
    setInterval(function (url) {
      d3.json(url, render)
    }, 5000, this.get('url'))
  }
})
