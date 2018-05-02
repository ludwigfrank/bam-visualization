import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { brush, line } from 'd3'

class Brush extends Component {
    constructor(props){
        super(props)
        this.createChart = this.createChart.bind(this)
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        // this.createChart() // FIXME: Don't create a new brush on every render
    }
    createChart() {
        const node = this.node
        
        const svg = d3.select('svg')

        const testLineData = [
            [100, 20],
            [200, 25],
            [300, 30],
            [400, 10],
            [500, 15],
            [600, 40],
            [700, 5],
            [800, 8],
            [900, 30],
            [1000, 10],
            [1100, 5]
        ];

        const lineGenerator = d3.svg.line();
        const pathString = lineGenerator(this.props.data);

        const scale = d3.scale.linear()
            .domain([0, 1]) // [startValue, endValue]
            .range([3, this.props.size[0] - 1])

        const xAxis = d3.svg.axis()
            .scale(scale);

        const brush = d3.svg.brush()
            .x(scale)
            .extent(this.props.extend) // start range
            .on('brushend', () => {
                console.log(brush.extent())
                this.props.brushCallback(brush.extent())
            })

        const g = svg.append('g')
            .call(xAxis);

        brush(g)

        g.selectAll('rect').attr('height', 50)
        g.selectAll('.background')
            .style({ fill: 'white', visibility: 'visible', opacity: '.2' })
        g.selectAll('.extent')
            .style({ fill: 'black', visibility: 'visible', opacity: '.1' })
        g.selectAll('.resize rect')
            .style({ fill: '#000', visibility: 'visible', width: 2 })

        d3.select('path')
            .attr('d', pathString)
            .style({
                fill: '#ff0000',
                stroke: '#ff9900',
                'stroke-width': 1.5,
                top: 100,
                visibility: 'visible'
            })
            .attr("class", "line")
    }
    render() {
        return (
            <svg
                ref={node => this.node = node}
                width={this.props.size[0]}
                height={this.props.size[1]}
            >
            </svg>
        )
    }
}
export default Brush
