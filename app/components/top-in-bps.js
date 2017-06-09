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

    let svg = d3.select('svg'),
      margin = {top: 20, right: 0, bottom: 5, left: 55},
      width = +780 - margin.left - margin.right,
      height = +300 - margin.top - margin.bottom,
      g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let f = d3.format('.3n')
    let p = d3.formatPrefix(',.0', 1e6)

    var parseTime = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ')

    var y = d3.scaleLinear()
    .rangeRound([height, 0])

    var x = d3.scaleTime()
    .rangeRound([0, width])

    var line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y))

    console.log(d)

    x.domain(d3.extent(this.get('data'), d => parseTime(d.x)))
    y.domain(d3.extent(this.get('data'), d => d.y))

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .select('.domain')
      .remove()

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 4)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Mb')

    // g.append('path')
    //   .datum(this.get('data'))
    //   .attr('fill', 'none')
    //   .attr('stroke', 'steelblue')
    //   .attr('stroke-linejoin', 'round')
    //   .attr('stroke-linecap', 'round')
    //   .attr('stroke-width', 1.5)
    //   .attr('d', line)

  //   let yScale = d3.scaleLinear()
  //   .domain([0, Math.max(...y)])
  //   .range([0, 300])

  //   let xScale = d3.scaleBand()
  //     .domain(this.get('data').map(data => data.y))
  //     .range([0, 300])
  //     .paddingInner(0.12)

  //   // let svg = d3.select(this.$('svg')[0])
  //   svg.selectAll('rect')
  //     .data(this.get('data'))
  //     .enter()
  //     .append('rect')
  //     .attr('width', xScale.bandwidth())
  //     .attr('height', data => yScale(data.y))
  //     .attr('x', data => xScale(data.y))
  //     .attr('y', data => 300 - yScale(data.y))
  }
})
