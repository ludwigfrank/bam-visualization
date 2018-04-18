import * as React from 'react'
import {
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects, GeoProjection } from 'd3-geo'
import { DataPoint } from '../../types'
import { Hexbin, hexbin as d3Hexbin } from 'd3-hexbin'
import { range as d3Range } from 'd3-array'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    projection: GeoProjection
    dimensions: [number, number]
}

interface State {
    hexBinData: Hexbin<DataPoint>
}

const getHexProperties = (hexColumns: number, dimensions: number[]) => {
    const hexDistance = dimensions[0] / hexColumns
    const hexRadius = hexDistance / 1.5
    const hexBin: Hexbin<DataPoint> = d3Hexbin<DataPoint>()
        .radius(hexRadius)
        .x(function (d: any) {return d.x})
        .y(function (d: any) {return d.y})

    return {
        hexColumns,
        hexDistance,
        hexRadius,
        hexBin
    }
}

const getPointGrid = (cols: number, width: number, height: number): Array<DataPoint> => {
    const hexDistance = width / cols
    const rows = Math.floor(height / hexDistance)

    return d3Range(rows * cols).map((el, i) => {
        return {
            x: Math.floor(i % cols * hexDistance),
            y: Math.floor(i / cols) * hexDistance,
            data: {
                value: 0
            }
        }
    })
}

export default class HexagonMap extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)
    }

/*    d3Select(element)
    .append('g')
    .attr('id', 'hexes')
    .attr('class', data.name)
    .selectAll('.hex').data(hexbin(points))
    .enter().append('path')
    .attr('class', `hex`)
    .attr('class', `hex-${data.name.replace(/ /g, '_')} hex`)
        .attr('transform', function(d: any) {
        return 'translate(' + d.x + ', ' + d.y + ')'; })
        .attr('d', hexbin.hexagon())
        .style('fill', 'rgba(255,255,255,0.5)')
        .style('stroke', '#ccc')
        .style('stroke-width', 1)*/

    render () {
        const columns = 273
        const pointGrid = getPointGrid(columns, this.props.dimensions[0], this.props.dimensions[1])
        const hexProperties = getHexProperties(columns, this.props.dimensions)
        const hexBinData = hexProperties.hexBin(pointGrid)

        return (
            <svg>
                <g>
                    {
                        hexBinData.map((bin, i) => {
                            return (
                                <path
                                    key={i}
                                    className={'hex'}
                                    transform={`translate(${bin.x}, ${bin.y})`}
                                    style={{
                                        fill: '#ccc'
                                    }}
                                    d={hexProperties.hexBin.hexagon()}
                                />
                            )
                        })
                    }

                </g>
            </svg>
        )
    }
}
