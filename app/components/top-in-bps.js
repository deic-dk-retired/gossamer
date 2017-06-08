import Ember from 'ember'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

export default Ember.Component.extend({
  // tagName: '',
  data: [
    {
      'x': '2017-06-07T16:07:50Z',
      'y': 832,
      'cidr': '130_226_136_247'
    },
    {
      'x': '2017-06-07T16:07:51Z',
      'y': 680,
      'cidr': '130_226_136_247'
    },
    {
      'x': '2017-06-07T16:18:08Z',
      'y': 832,
      'cidr': '130_226_136_247'
    },
    {
      'x': '2017-06-07T16:18:09Z',
      'y': 680,
      'cidr': '130_226_136_247'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 712,
      'cidr': '130_226_136_244'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 704,
      'cidr': '130_226_136_249'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 688,
      'cidr': '130_226_136_250'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_252'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_251'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_240'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_243'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_246'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_247'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_253'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_248'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_245'
    },
    {
      'x': '2017-06-07T16:20:00Z',
      'y': 664,
      'cidr': '130_226_136_241'
    },
    {
      'x': '2017-06-07T16:23:35Z',
      'y': 816,
      'cidr': '130_226_136_251'
    },
    {
      'x': '2017-06-07T16:27:25Z',
      'y': 832,
      'cidr': '130_226_136_240'
    },
    {
      'x': '2017-06-07T16:27:26Z',
      'y': 680,
      'cidr': '130_226_136_240'
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
