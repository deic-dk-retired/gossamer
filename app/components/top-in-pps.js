import Ember from 'ember'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

export default Ember.Component.extend({
  // tagName: '',
  data: [
    {
      'x': '2017-06-08T13:07:23Z',
      'y': 1,
      'cidr': '130_226_136_250',
      'resource': 'pps'
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
