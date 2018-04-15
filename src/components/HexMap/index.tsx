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
import { MultiPolygon, Polygon, Position } from 'geojson'
import { DataPoint } from '../../types'
import { calculatePointGrid, getPointsInPolygon, renderHexagons } from './util'

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
}

const width = window.innerWidth
const height = window.innerHeight
const cols = 273
const hexDistance = width / cols
const hexRadius = hexDistance / 1.5

const hexBin: Hexbin<DataPoint> = d3Hexbin<DataPoint>()
    .radius(hexRadius)
    .x(function(d: any) { return d.x })
    .y(function(d: any) { return d.y })

const pointGrid = calculatePointGrid(cols, width, height)

interface FeatureProperties {
    name: string
}

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

    renderPolygonPoints = (points: Array<DataPoint>, polygon: Array<[number, number]>, data: any): void => {
        const pointsInPolygon = getPointsInPolygon(points, polygon, data)
        renderHexagons(pointsInPolygon, this.canvas, hexBin, data)
    }

    renderFeature = (feature: ExtendedFeature<any, FeatureProperties>, geoProjection: GeoProjection) => {
        const name = feature.properties.name
        const geometryCoordinates = feature.geometry.coordinates
        const geometryType = feature.geometry.type
        let polygon: Array<[number, number]> = []

        const render = (coordinates: Position[]): void => {
            coordinates.map((coordinate: Position) => {
                polygon.push(geoProjection([coordinate[0], coordinate[1]]) as [number, number])
            })
            this.renderPolygonPoints(pointGrid, polygon, {name})
            polygon = []
        }

        if (geometryType === 'Polygon') {
            geometryCoordinates.map((coordinates: Position[]) => {
                render(coordinates)
            })
        } else if (geometryType === 'MultiPolygon') {
            geometryCoordinates.map((coordinateGroup: Position[][]) => {
                coordinateGroup.map((coordinates: Position[]) => {
                    render(coordinates)
                })
            })
        } else {
            throw new Error(`The specified feature type is not valid: ${feature.geometry.type}.
                    Make sure the data contains only Polygon or MultiPolygon geometry.`)
        }
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
