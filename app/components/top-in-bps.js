import Ember from 'ember'
import * as d3 from 'd3'

export default Ember.Component.extend({
  classNames: ['top-10-bps-in'],
  url: '',
  didInsertElement () {
    // time parser for influx timestamp
    let parseTime = d3.utcParse('%Y-%m-%dT%H:%M:%SZ')
    // only to show hours
    let xTime = d3.timeFormat('%H')

    // exp

    // get bps on component call
    let data = this.get('bps').stamp
    // parse time data using parser
    let dx = data.map((data) => parseTime(data.x))

    let widget = d3.select('.' + this.get('classNames') + ' > .dash-widget')
    let svg = d3.select('svg')
    // get svg width and height from DOM
    let svgW = svg['_groups'][0][0].clientWidth
    let svgH = svg['_groups'][0][0].clientHeight

    // configure chart widget dimensions
    let margin = {top: 20, right: 0, bottom: 20, left: 32}
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
    .domain([1e6, 2e6])
    .rangeRound([height, 0])

    let line = d3.line()
    .x((d) => x(d.x))
    .y((d) => x(d.y))

    // console.log(line)
    x.domain(d3.extent(dx))
    y.domain([1000, 2 * Math.pow(10, 9)])

    // append the x axis
    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x)
                .ticks(20)
                // .tickFormat(xTime)
              )
      .select('.domain')
        .remove()

    // append the y axis
    g.append('g')
        .call(d3.axisLeft(y)
              .ticks(5)
              .tickFormat(d3.formatPrefix('.1', 1e9))
              )
      .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 4)
        .attr('dy', '0.7em')
        .attr('text-anchor', 'end')
        .text('bytes')

    // append data points
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#03A9F4')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)

    // d3.map(data, function (d) {
    //   console.log(d)
    //   d.x = parseTime(d.x)
    //   d.y = +d.y
    //   console.log(d)
    //   return d
    // },
    // function (error, data) {
    //   if (error) throw error

    //   x.domain(d3.extent(dx))
    //   y.domain([1000, 2 * Math.pow(10, 9)])
    //   // x.domain(d3.extent(data, function (d) { return d.x }))
    //   // y.domain(d3.extent(data, function (d) { return d.y }))

    //   // append the x axis
    //   g.append('g')
    //   .attr('transform', 'translate(0,' + height + ')')
    //   .call(d3.axisBottom(x))
    // .select('.domain')
    //   .remove()

    //   // append the y axis
    //   g.append('g')
    //       .call(d3.axisLeft(y)
    //             .ticks(5)
    //             .tickFormat(d3.formatPrefix('.1', 1e9))
    //             )
    //     .append('text')
    //       .attr('fill', '#000')
    //       .attr('transform', 'rotate(-90)')
    //       .attr('y', 4)
    //       .attr('dy', '0.7em')
    //       .attr('text-anchor', 'end')
    //       .text('bytes')

    //   g.append('path')
    //       .datum(data)
    //       .attr('fill', 'none')
    //       .attr('stroke', '#03A9F4')
    //       .attr('stroke-linejoin', 'round')
    //       .attr('stroke-linecap', 'round')
    //       .attr('stroke-width', 1.5)
    //       .attr('d', line)
    // })
  }
})
