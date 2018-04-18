import * as React from 'react'
import styled from 'styled-components'
import {
    geoAlbers,
    GeoProjection,
    ExtendedFeatureCollection, ExtendedFeature, GeoGeometryObjects
} from 'd3-geo'
// import { polygonContains as d3PolygonContains } from 'd3-polygon'
import usJson from '../../data/us-states.json'
import * as topojson from 'topojson-client'

import Map from './Map'
import HexagonMap from './HexagonMap'

const Canvas = styled.svg`
    height: 100vh;
    margin: 0 auto;
    width: 100vw;
    border: 1px solid gray; 
`

interface Props {
    country?: string
}

interface State {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<GeoGeometryObjects, any>>
    projection: GeoProjection
}

const width = window.innerWidth
const height = window.innerHeight

export default class HexMap extends React.Component <Props, State> {
    canvas: HTMLElement

    constructor(props: Props) {
        super(props)

        this.state = {
            featureCollection: usJson,
            projection: geoAlbers().scale(800).translate([(width - 75) / 2, height / 2])
        }
    }

    /*
    *  Transforms GeoJson to FeatureCollection
    *
    * */
    prepareDataFeatureCollection = (data: any) => {
        return topojson.feature(data, data.objects.usa)
    }

    render () {
        const { featureCollection, projection } = this.state

        return (
            <Canvas id={'map'} innerRef={element => this.canvas = element}>
                <Map projection={projection} featureCollection={featureCollection} />
                <HexagonMap projection={projection} featureCollection={featureCollection} dimensions={[width, height]}/>
            </Canvas>
        )
    }
}
