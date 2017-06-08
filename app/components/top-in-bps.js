import Ember from 'ember'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

export default Ember.Component.extend({
  data: [
    {
      x: '2017-06-08T13:07:23Z',
      y: 520,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:07:24Z',
      y: 424,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:07:25Z',
      y: 344,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:17:20Z',
      y: 600,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:17:21Z',
      y: 488,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:17:22Z',
      y: 392,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:17:23Z',
      y: 320,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:17:24Z',
      y: 344,
      cidr: '130_226_136_250',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:18:02Z',
      y: 336,
      cidr: '130_226_136_243',
      resource: 'bps'
    },
    {
      x: '2017-06-08T13:24:49Z',
      y: 336,
      cidr: '130_226_136_250',
      resource: 'bps'
    }
  ],
  didInsertElement () {
    let yValues = this.get('data').map(data => parseInt(data.y))

    let yScale = scaleLinear()
    .domain([0, Math.max(...yValues)])
    .range([0, 300])

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.cidr))
      .range([0, 300])
      .paddingInner(0.12)

    console.log(this.get('data').map(data => data.cidr))

    let svg = select(this.$('svg')[0])
    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', data => yScale(data.y))
      .attr('x', data => xScale(data.cidr))
      .attr('y', data => 300 - yScale(data.y))
  }
})
