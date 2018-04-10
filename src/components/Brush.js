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
            .domain([20, 30])
            .range([10, 450])

        const brush = d3.svg.brush()
            .x(scale)
            .extent([22, 28])
            .on('brushend', function() {
                console.log(brush.extent())
            })

        const g = svg.append('g')

        brush(g)

        // g.attr('transform', 'translate(50, 50)')
        g.selectAll('rect').attr('height', 30)
        g.selectAll('.background')
            .style({ fill: '#4b9e9e', visibility: 'visible' })
        g.selectAll('.extent')
            .style({ fill: '#78c5c5', visibility: 'visible' })
        g.selectAll('.resize rect')
            .style({ fill: '#276c86', visibility: 'visible' })
    }
    render() {
        return (
            <svg
                style={{ border: '2px solid red' }}
                ref={node => this.node = node}
                width={window.innerWidth}
                height={300}
            >
            </svg>
        )
    }
}
export default Brush
