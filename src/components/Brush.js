import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { brush } from 'd3'

class Brush extends Component {
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
        
        const svg = d3.select('svg')

        const scale = d3.scale.linear()
            .domain([0, 1]) // [startValue, endValue]
            .range([100, window.innerWidth - 100])

        const xAxis = d3.svg.axis()
            .scale(scale);

        const brush = d3.svg.brush()
            .x(scale)
            .extent(this.props.extend) // start range
            .on('brushend', () => {
                console.log(brush.extent())
                this.props.testCallback(brush.extent())
            })

        const g = svg.append('g')
            .call(xAxis);
        brush(g)

        g.selectAll('rect').attr('height', 50)
        g.selectAll('.background')
            .style({ fill: '#999', visibility: 'visible' })
        g.selectAll('.extent')
            .style({ fill: 'yellow', visibility: 'visible', opacity: '0.5' })
        g.selectAll('.resize rect')
            .style({ fill: '#00f', visibility: 'visible' })
    }
    render() {
        return (
            <svg
                // style={{ border: '2px solid yellow' }}
                ref={node => this.node = node}
                width={window.innerWidth}
                height={50}
            >
            </svg>
        )
    }
}
export default Brush
