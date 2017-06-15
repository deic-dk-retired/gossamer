import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  classNames: ['top-10-bps-in'],
  url: '',
  didInsertElement () {
    // time parser for influx timestamp
    let parseTime = d3.utcParse('%Y-%m-%dT%H:%M:%SZ')
    // only to show hours
    let xTime = d3.timeFormat('%S')

    // exp

    // get bps on component call
    let data = this.get('bps').stamp
    // parse time data using parser
    let dx = data.map((data) => parseTime(data.x))
    let dy = data.map((data) => (data.y))
    console.log(dx)

    let widget = d3.select('.' + this.get('classNames') + ' > .dash-widget')
    let svg = d3.select('svg')
    // get svg width and height from DOM
    let svgW = svg['_groups'][0][0].clientWidth
    let svgH = svg['_groups'][0][0].clientHeight

    // configure chart widget dimensions
    let margin = {top: 20, right: 0, bottom: 32, left: 32}
    let width = svgW - margin.left - margin.right - 20
    let height = +svgH - margin.top - margin.bottom
    let g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // widget title
    widget.append('p')
      .text('top 10 bps (in)')
      .style('font-size', '.875rem')
      .style('font-weight', '100')

    // console.log(data)
    // let format = d3.format('.4n')
    // let prefix = d3.formatPrefix(',.0', 1e6)

    let x = d3.scaleTime()
    .rangeRound([0, width])

    let y = d3.scaleLinear()
    .domain(d3.extent(dy))
    .rangeRound([height, 0])

    // console.log(line)
    x.domain(d3.extent(dx))

    // append the x axis
    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x)
                .ticks(20)
                .tickFormat(xTime)
                .tickSize(2)
              )
      .select('.domain')
        .attr('stroke', '#448AFF')
      .selectAll('text')
        .attr('fill', '#448AFF')

    // append the y axis
    g.append('g')
        .call(d3.axisLeft(y)
              .tickSize(2)
              .ticks(5)
              .tickFormat(d3.formatPrefix('.0', 1e9))
              )
      .select('.domain')
        .remove()
      .append('text')
        .attr('fill', '#448AFF')
        .attr('transform', 'rotate(-90)')

    // change y domain to plot
    let yd = y.domain(d3.extent(dy)).rangeRound([height, 0])
    // console.log(yd)

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('stroke', 'none')
      .attr('fill', '#448AFF')
      .attr('width', 1)
      .attr('height', (d) => yd(d.y))
      .attr('x', (d) => x(parseTime(d.x)))
      .attr('y', (d) => height - yd(d.y))
  }
})
