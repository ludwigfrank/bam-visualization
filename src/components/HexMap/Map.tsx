import * as React from 'react'
import {
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects
} from 'd3-geo'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    dimensions: [number, number],
    geoPathGenerator: any
}

interface State {
}

export default class Map extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)

    }

    render () {
        const { featureCollection, geoPathGenerator, dimensions } = this.props

        const countries = featureCollection.features.map((d: any, i) => (
            <path
                key={i}
                d={geoPathGenerator(d)}
                style={{ fill: '#faf6fb' }}
            />
        ))
        return (
            <svg id={'map'} style={{ width: dimensions[0], height: dimensions[1] }}>
                <g>
                    {countries}
                </g>
            </svg>
        )
    }
}
