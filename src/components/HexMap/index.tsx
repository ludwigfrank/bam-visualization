import * as React from 'react'
import styled from 'styled-components'
import {
    geoEquirectangular,
    GeoProjection,
    ExtendedFeatureCollection, ExtendedFeature
} from 'd3-geo'
// import { polygonContains as d3PolygonContains } from 'd3-polygon'
import worldGeoJson from '../../data/world.json'
import * as topojson from 'topojson-client'
import Map from './Map'
import HexagonMap from './HexagonMap'
import { MultiPolygon, Polygon } from 'geojson'

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
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, any>>
    projection: GeoProjection
}

const width = window.innerWidth
const height = window.innerHeight

export default class HexMap extends React.Component <Props, State> {
    canvas: HTMLElement

    constructor(props: Props) {
        super(props)

        this.state = {
            featureCollection: worldGeoJson,
            projection: geoEquirectangular().scale(200).translate([(width + 0) / 2, height / 2])
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
                <Map projection={projection} featureCollection={featureCollection} dimensions={[width, height]}/>
                <HexagonMap projection={projection} featureCollection={featureCollection} dimensions={[width, height]}/>
            </Canvas>
        )
    }
}
