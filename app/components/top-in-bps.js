import Ember from 'ember'
import { select } from 'd3-selection'
// import data from 'dashboard'

export default Ember.Component.extend({
  didInsertElement () {
    let svg = select(this.$('svg')[0])

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 20)
    .attr('height', d => d.x)
    .attr('x', (d, i) => i * 25)
  }
})
