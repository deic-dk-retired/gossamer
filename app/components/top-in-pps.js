import Ember from 'ember'
import { select } from 'd3-selection'
// import data from 'dashboard'

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
    let svg = select(this.$('svg')[0])
    svg.selectAll('rect').data(this.get('data'))
    .enter()
    .append('rect')
    .attr('width', 20)
    .attr('height', data => (data.y / 30))
    .attr('x', (data, i) => i * 22)
  }
})
