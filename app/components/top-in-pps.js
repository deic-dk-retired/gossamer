import Ember from 'ember'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

export default Ember.Component.extend({
  // tagName: '',
  data: [
    {
      'x': '2017-06-09T09:45:03Z',
      'y': 6793,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:45:04Z',
      'y': 11899,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:45:05Z',
      'y': 9872,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:45:06Z',
      'y': 11220,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:45:07Z',
      'y': 9217,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:45:08Z',
      'y': 7554,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:47:12Z',
      'y': 11785,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:47:13Z',
      'y': 10466,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:47:14Z',
      'y': 8835,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    },
    {
      'x': '2017-06-09T09:47:15Z',
      'y': 7826,
      'cidr': '130_226_136_242',
      'resource': 'pps'
    }
  ],
  didInsertElement () {
    let yValues = this.get('data').map(data => data.y)

    let yScale = scaleLinear()
    .domain([0, Math.max(...yValues)])
    .range([0, 300])

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.y))
      .range([0, 300])
      .paddingInner(0.12)

    let svg = select(this.$('svg')[0])
    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', data => yScale(data.y))
      .attr('x', (data) => xScale(data.y))
      .attr('y', (data) => 300 - yScale(data.y))
  }
})
