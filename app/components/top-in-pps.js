import Ember from 'ember'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

export default Ember.Component.extend({
  // tagName: '',
  data: [
    {
      'x': '2017-06-07T10:45:03Z',
      'y': 9178,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:04Z',
      'y': 7677,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:05Z',
      'y': 11195,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:06Z',
      'y': 9373,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:07Z',
      'y': 7673,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:08Z',
      'y': 6282,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:09Z',
      'y': 9688,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:10Z',
      'y': 8504,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:11Z',
      'y': 6962,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:45:18Z',
      'y': 6194,
      'cidr': '130_226_136_242'
    }
  ],
  didInsertElement () {
    let yValues = this.get('data').map(data => data.y)

    let yScale = scaleLinear()
    .domain([0, Math.max(...yValues)])
    .range([0, 300])

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.cidr))
      .range([0, 300])
      .paddingInner(0.12)

    let svg = select(this.$('svg')[0])
    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', data => yScale(data.y))
      .attr('x', (data) => xScale(data.cidr))
      .attr('y', (data) => 300 - yScale(data.y))
  }
})
