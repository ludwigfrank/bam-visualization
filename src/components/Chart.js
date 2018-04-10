import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

class Chart extends Component {
    constructor(props){
        super(props)
        this.createChart = this.createChart.bind(this)
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        this.createChart()
    }
    createChart() {
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])
    select(node)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')
    
    select(node)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()
    
    select(node)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#666')
        .attr('x', (d,i) => i * (this.props.size[0] / this.props.data.length))
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', this.props.size[0])
    }
    render() {
        return (
            <svg
                ref={node => this.node = node}
                width={window.innerWidth}
                height={this.props.size[1]}
            >
            </svg>
        )
    }
}
export default Chart