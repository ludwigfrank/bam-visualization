import * as React from 'react'
import styled from 'styled-components'
import {
    geoAlbers,
    GeoProjection,
    ExtendedFeatureCollection, ExtendedFeature, GeoGeometryObjects
} from 'd3-geo'
import { Hexbin, hexbin as d3Hexbin } from 'd3-hexbin'
// import { polygonContains as d3PolygonContains } from 'd3-polygon'
import usJson from '../../data/us-states.json'
import * as topojson from 'topojson-client'
import { MultiPolygon, Polygon } from 'geojson'
import { DataPoint } from '../../types'
import { calculatePointGrid, getPointsInPolygon, renderHexagons, getParsedFeature } from './util'

import Map from './Map'

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
    pointGrid: Array<DataPoint>
}

const width = window.innerWidth
const height = window.innerHeight
const cols = 273
const hexDistance = width / cols
const hexRadius = hexDistance / .5

const hexBin: Hexbin<DataPoint> = d3Hexbin<DataPoint>()
    .radius(hexRadius)
    .x(function(d: any) { return d.x })
    .y(function(d: any) { return d.y })

interface FeatureProperties {
    name: string
}

export default class HexMap extends React.Component <Props, State> {
    canvas: HTMLElement

    constructor(props: Props) {
        super(props)

        this.state = {
            featureCollection: usJson,
            projection: geoAlbers().scale(800).translate([(width - 75) / 2, height / 2]),
            pointGrid: calculatePointGrid(cols, width, height)
        }
    }

    /*
    *  Transforms GeoJson to FeatureCollection
    *
    * */
    prepareDataFeatureCollection = (data: any) => {
        return topojson.feature(data, data.objects.usa)
    }

    renderFeature = (feature: ExtendedFeature<any, FeatureProperties>, geoProjection: GeoProjection) => {
        const { projection, pointGrid } = this.state
        const name = feature.properties.name

        const logPoly = (polygon: any) => {
            const pointsInPolygon = getPointsInPolygon(pointGrid, polygon, {name})
            renderHexagons(pointsInPolygon, this.canvas, hexBin, {name})
        }

        getParsedFeature(feature, projection, logPoly)
    }

    drawGeo = async (data: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, FeatureProperties>>) => {
        let i = 0

        setInterval(() => {
            if (i < data.features.length) {this.renderFeature(data.features[i], this.state.projection)}
            i++
            }, 0.1
        )
    }

    componentDidMount() {
        this.setState({
            featureCollection: usJson
        })
        this.drawGeo(usJson).catch(e => {
            console.log(e)
        })
    }

    render () {
        const { featureCollection, projection } = this.state

        return (
            <Canvas id={'map'} innerRef={element => this.canvas = element}>
                <Map projection={projection} featureCollection={featureCollection} />
            </Canvas>
        )
    }
}
