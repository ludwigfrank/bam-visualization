import * as React from 'react'
import {
    geoPath,
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects, GeoProjection } from 'd3-geo'
import { DataPoint } from '../../types';
import { calculatePointGrid } from './util';
import { Hexbin, hexbin as d3Hexbin } from 'd3-hexbin'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    projection: GeoProjection
    dimensions: [number, number]
}

interface State {
    hexColumns: number
    hexDistance: number
    hexRadius: number
    hexBin: Hexbin<DataPoint>
    pointGrid: Array<DataPoint>
}

export default class HexagonOverlay extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            hexColumns: 273,
            hexDistance: this.props.dimensions[0] / this.state.hexColumns,
            hexRadius: this.state.hexDistance / 1.5,
            hexBin: d3Hexbin<DataPoint>()
                .radius(this.state.hexRadius)
                .x(function(d: any) { return d.x })
                .y(function(d: any) { return d.y }),
            pointGrid: calculatePointGrid(this.state.hexColumns, this.props.dimensions[0], this.props.dimensions[1]),
        }
    }

    render () {
        const { featureCollection, projection } = this.props
        const pathGenerator: any = geoPath().projection(projection)

        const countries = featureCollection.features.map((d: any, i) => (
            <path
                key={i}
                d={pathGenerator(d)}
            />
        ))
        return (
            <svg id={'map'} style={{ zIndex: 400 }}>
                {countries}
            </svg>
        )
    }
}
