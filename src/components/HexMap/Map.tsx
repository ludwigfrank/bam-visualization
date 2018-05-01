import * as React from 'react'
import {
    ExtendedFeature, ExtendedFeatureCollection, GeoGeometryObjects
} from 'd3-geo'

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    dimensions: [number, number]
    hoveredHexagon: any
    geoPathGenerator: any
}

interface State {
}

export default class Map extends React.PureComponent <Props, State> {

    constructor(props: Props) {
        super(props)
    }

    render () {
        const { featureCollection, geoPathGenerator, dimensions, hoveredHexagon } = this.props
        hoveredHexagon && console.log(hoveredHexagon.countryCode)

        const countries = featureCollection.features.map((d: any, i) => {
            const fill = hoveredHexagon
                ? hoveredHexagon.countryCode === d.id ? '#c9c7d4' : '#fff'
                : '#faf6fb'
            return (
                <path
                    key={i}
                    d={geoPathGenerator(d)}
                    style={{ fill: fill, transition: 'all 0.5s' }}
                    ref={e => this[d.id] = e}
                />
            )
        })

        return (
            <svg id={'map'} style={{ width: dimensions[0], height: dimensions[1] }}>
                <g>
                    {countries}
                </g>
            </svg>
        )
    }
}
