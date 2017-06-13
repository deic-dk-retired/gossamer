import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  data: [
    {
      'x': '2017-06-09T09:45:03Z',
      'y': 3916272,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:45:04Z',
      'y': 6806328,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:45:05Z',
      'y': 5652256,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:45:06Z',
      'y': 6419752,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:45:07Z',
      'y': 5273112,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:45:08Z',
      'y': 4321752,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:47:12Z',
      'y': 6257440,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:47:13Z',
      'y': 5555000,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:47:14Z',
      'y': 4688832,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    },
    {
      'x': '2017-06-09T09:47:15Z',
      'y': 4152144,
      'cidr': '130_226_136_242',
      'resource': 'bps'
    }
  ],
  didInsertElement () {
    let d = this.get('data')

    let svg = d3.select('svg')
    let margin = {top: 20, right: 0, bottom: 10, left: 30}
    let width = d3.select(svg).width - margin.left - margin.right
    let height = +300 - margin.top - margin.bottom
    let g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // let format = d3.format('.4n')
    // let prefix = d3.formatPrefix(',.0', 1e6)

    let parseTime = d3.utcParse('%Y-%m-%dT%H:%M:%SZ')
    let timeScale = d3.timeFormat('%H:%M:%S')

    // console.log(prefix(format(1234567890909)))

    let y = d3.scaleLinear()
    .domain([1e6, 2e6])
    .rangeRound([height, 0])

    let x = d3.scaleTime()
    .rangeRound([0, width])

    let line = d3.line()
    .x(d => x(100))
    .y(d => y(20))

    // console.log(d)

    x.domain(d3.extent(d, d => timeScale(parseTime(d.x))))
    y.domain(d3.extent(d, d => d.y))

    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
      .select('.domain')
        .remove()

    g.append('g')
        .call(d3.axisLeft(y)
              .ticks(6)
              .tickFormat(d3.formatPrefix('.1', 1e6)))
      .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 4)
        .attr('dy', '0.7em')
        .attr('text-anchor', 'end')
        .text('bytes')

    g.append('path')
      .datum(this.get('data'))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }
})
