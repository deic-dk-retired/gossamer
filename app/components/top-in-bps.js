import Ember from 'ember'
import { select } from 'd3-selection'
// import data from 'dashboard'

export default Ember.Component.extend({
  // tagName: '',
  data: [
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 768,
      'cidr': '130_226_136_243'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 712,
      'cidr': '130_226_136_248'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 688,
      'cidr': '130_226_136_242'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 672,
      'cidr': '130_226_136_244'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 664,
      'cidr': '130_226_136_251'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 664,
      'cidr': '130_226_136_240'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 664,
      'cidr': '130_226_136_245'
    },
    {
      'x': '2017-06-07T10:01:12Z',
      'y': 664,
      'cidr': '130_226_136_252'
    },
    {
      'x': '2017-06-07T10:14:10Z',
      'y': 728,
      'cidr': '130_226_136_252'
    },
    {
      'x': '2017-06-07T10:14:10Z',
      'y': 680,
      'cidr': '130_226_136_255'
    }
  ],
  didInsertElement () {
    let svg = select(this.$('svg')[0])
    svg.selectAll('rect').data(this.get('data'))
    .enter()
    .append('rect')
    .attr('width', 20)
    .attr('height', data => (data.y / 3))
    .attr('x', (data, i) => i * 22)
  }
})
