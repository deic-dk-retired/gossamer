import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  classNames: ['top-10-bps-in']
  // url: 'http://10.33.1.97:4242/api/series/qf-top-10-in-bps',
  // title: 'top 10 bps (in)',
  // gfill: '#BBDEFB',
  // didInsertElement () {
  //   this._super(...arguments)
  //   // time parser for influx timestamp
  //   var parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%SZ')
  //   var xTime = d3.timeFormat('%H:%M')

  //   // get svg width and height from DOM
  //   var widget = d3.select('.' + this.get('classNames') + ' > .dash-widget')
  //   var svg = d3.select('.' + this.get('classNames') + ' > .dash-widget' + ' > svg')
  //   var svgW = this.$('.dash-widget svg').outerWidth()
  //   var svgH = this.$('.dash-widget svg').outerHeight()
  //   // configure chart widget dimensions
  //   var margin = {top: 10, right: 10, bottom: 80, left: 32}
  //   var margin2 = {top: 310, right: 10, bottom: 20, left: 32}
  //   var width = svgW - margin.left - margin.right - 20
  //   var height = +svgH - margin.top - margin.bottom
  //   var height2 = +svgH - margin2.top - margin2.bottom

  //   // set widget title
  //   widget.select('.title').text(this.get('title'))

  //   // set x & y scales
  //   var x = d3.scaleTime().range([0, width])
  //   var x2 = d3.scaleTime().range([0, width])
  //   var y = d3.scaleLinear().range([height, 0])
  //   var y2 = d3.scaleLinear().range([height2, 0])

  //   // x & y axes gen
  //   var xAxis = d3.axisBottom(x)
  //   var xAxis2 = d3.axisBottom(x2)
  //   var yAxis = d3.axisLeft(y)

  //   var brush = d3.brushX()
  //     .extent([[0, 0], [width, height2]])
  //     .on('brush end', brushed)

  //   var zoom = d3.zoom()
  //     .scaleExtent([1, Infinity])
  //     .translateExtent([[0, 0], [width, height]])
  //     .extent([[0, 0], [width, height]])
  //     .on('zoom', zoomed)

  //   // lines to append
  //   var line = d3.line()
  //     .x((d) => x(d.x))
  //     .y((d) => y(d.y))
  //   var line2 = d3.line()
  //     .x((d) => x2(d.x))
  //     .y((d) => y2(d.y))

  //   svg.append('defs').append('clipPath')
  //       .attr('id', 'clip')
  //     .append('rect')
  //       .attr('width', width)
  //       .attr('height', height)

  //   // focus and context groups for svg elements
  //   var focus = svg.append('g')
  //   .attr('class', 'focus')
  //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  //   var context = svg.append('g')
  //   .attr('class', 'context')
  //   .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

  //   // callback to handle fetched data
  //   // also renders the chart
  //   var render = function (error, data) {
  //     if (error) throw error
  //     // remove old points
  //     focus.selectAll('path').remove()
  //     focus.selectAll('g').remove()
  //     context.selectAll('path').remove()
  //     context.selectAll('g').remove()
  //     // format dates and values
  //     var d = data.stamp.map(function (obj) {
  //       var o = {}
  //       o.x = parseTime(obj.x)
  //       o.y = +obj.y
  //       return o
  //     })

  //     // set domains and ranges
  //     x.domain(d3.extent(d, (d) => d.x))
  //     y.domain([0, d3.max(d, (d) => d.y)])
  //     x2.domain(x.domain())
  //     y2.domain(y.domain())

  //     // append path with data
  //     focus.append('path').datum(d)
  //       .attr('class', 'line')
  //       .attr('stroke', '#BBDEFB')
  //       .attr('d', line)

  //     // append the x & y axis focus
  //     focus.append('g')
  //       .attr('class', 'axis axis--x')
  //       .attr('transform', 'translate(0,' + height + ')')
  //       .call(xAxis.tickSize(3).ticks(6).tickFormat(xTime))
  //     focus.select('.domain')
  //       .attr('class', 'axes')

  //     focus.append('g')
  //       .attr('class', 'axis--y')
  //       .call(yAxis.tickFormat(d3.format('.0s')).tickSize(2).ticks(6))
  //       .append('text')
  //         .attr('transform', 'rotate(-90)')
  //         .attr('y', 6)
  //         .attr('dy', '0.71em')
  //         .attr('fill', '#90A4AE')
  //         .text('bits/s')
  //     focus.select('.domain')
  //       .attr('class', 'axes')

  //     // append path to context
  //     context.append('path').datum(d)
  //       .attr('class', 'line')
  //       .attr('stroke', '#BBDEFB')
  //       .attr('d', line2)

  //     // append x axis to context
  //     context.append('g')
  //       .attr('class', 'axis--x')
  //       .attr('transform', 'translate(0,' + height2 + ')')
  //       .call(xAxis2.tickSize(3).ticks(8).tickFormat(xTime))
  //     context.select('.domain')
  //       .attr('class', 'axes')

  //     context.append('g')
  //       .attr('class', 'brush')
  //       .call(brush)
  //       .call(brush.move, x.range())

  //     svg.append('rect')
  //       .attr('class', 'zoom')
  //       .attr('width', width)
  //       .attr('height', height)
  //       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  //       .call(zoom)
  //   }

  //   function brushed () {
  //     console.log(d3)
  //     if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return // ignore brush-by-zoom
  //     var s = d3.event.selection || x2.range()
  //     x.domain(s.map(x2.invert, x2))
  //     focus.select('.area').attr('d', line)
  //     focus.select('.axis--x').call(xAxis)
  //     svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
  //         .scale(width / (s[1] - s[0]))
  //         .translate(-s[0], 0))
  //   }

  //   function zoomed () {
  //     console.log(d3)
  //     if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return // ignore zoom-by-brush
  //     var t = d3.event.transform
  //     x.domain(t.rescaleX(x2).domain())
  //     focus.select('.area').attr('d', line)
  //     focus.select('.axis--x').call(xAxis)
  //     context.select('.brush').call(brush.move, x.range().map(t.invertX, t))
  //   }
  //   // fetch data and render chart content
  //   d3.json(this.get('url'), render)
  //   // update every 5sec
  //   setInterval(function (url) {
  //     d3.json(url, render)
  //   }, 5000, this.get('url'))
  // }
})
