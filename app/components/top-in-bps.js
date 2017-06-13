import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  data: [
    {
      'x': '2017-06-13T11:45:02Z',
      'y': 3921160,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:03Z',
      'y': 7134072,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:04Z',
      'y': 5993896,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:05Z',
      'y': 6627032,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:06Z',
      'y': 5461008,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:07Z',
      'y': 4479800,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:45:08Z',
      'y': 3678336,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:47:22Z',
      'y': 4081240,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:47:23Z',
      'y': 4124152,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-13T11:47:24Z',
      'y': 3507200,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    }
  ],
  didInsertElement () {
    let parseTime = d3.utcParse('%Y-%m-%dT%H:%M:%SZ')
    let xTime = d3.timeFormat('%H')

    let d = this.get('data')
    let dx = d.map(d => parseTime(d.x))

    // console.log(d3.extent(dx))

    let svg = d3.select('svg')
    let svgW = svg['_groups'][0][0].clientWidth
    let svgH = svg['_groups'][0][0].clientHeight
    let margin = {top: 20, right: 0, bottom: 20, left: 32}
    let width = svgW - margin.left - margin.right
    let height = +svgH - margin.top - margin.bottom
    let g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    console.log(d)
    // let format = d3.format('.4n')
    // let prefix = d3.formatPrefix(',.0', 1e6)

    let x = d3.scaleTime()
    .rangeRound([0, width])

    let y = d3.scaleLinear()
    .domain([1e6, 2e6])
    .rangeRound([height, 0])

    let line = d3.line()
    .x(function (d) { return x(d.x) })
    .y(function (d) { return x(d.y) })

    // d3.map(d, function(d) {
    //   d.x = parseTime(d.x)
    //   d.y = +d.y
    //   return d
    // }, function(error, data) {
    //   if (error) throw error

    // console.log(line)

    x.domain(d3.extent(dx))
    y.domain([1000, 2 * Math.pow(10, 9)])

    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x)
                .ticks(d3.timeSecond.every(20))
                // .tickFormat(xTime)
              )
      .select('.domain')
        .remove()

    g.append('g')
        .call(d3.axisLeft(y)
              .ticks(5)
              .tickFormat(d3.formatPrefix('.1', 1e9))
              )
      .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 4)
        .attr('dy', '0.7em')
        .attr('text-anchor', 'end')
        .text('bytes')

    g.append('path')
      .datum(d)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }
})
