import * as React from 'react'
import {
    geoPath,
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects, GeoProjection } from 'd3-geo'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    projection: GeoProjection,
    dimensions: [number, number]
}

interface State {
}

export default class Map extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)

    }

    render () {
        const { featureCollection, projection, dimensions } = this.props
        const pathGenerator: any = geoPath().projection(projection)

        const countries = featureCollection.features.map((d: any, i) => (
            <path
                key={i}
                d={pathGenerator(d)}
                style={{ fill: '#f8f4f9' }}
            />
        ))
        return (
            <svg id={'map'} style={{ width: dimensions[0], height: dimensions[1] }}>
                {countries}
            </svg>
        )
    }
}
