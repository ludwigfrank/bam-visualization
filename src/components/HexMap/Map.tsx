import * as React from 'react'
import {
    geoPath,
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects, GeoProjection } from 'd3-geo'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    projection: GeoProjection
}

interface State {
}

export default class Map extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)

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
