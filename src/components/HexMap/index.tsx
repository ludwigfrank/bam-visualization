import * as React from 'react'
import styled from 'styled-components'
import { select as d3Select } from 'd3-selection'
import {
    geoPath as d3GeoPath,
    geoNaturalEarth1 as d3GeoNaturalEarth,
    GeoProjection,
    ExtendedFeatureCollection, ExtendedFeature
} from 'd3-geo'
import { Hexbin, hexbin as d3Hexbin } from 'd3-hexbin'
// import { polygonContains as d3PolygonContains } from 'd3-polygon'
import usJson from '../../data/world.json'
import * as topojson from 'topojson-client'
import { MultiPolygon, Polygon, Position } from 'geojson'
import { DataPoint } from '../../types'
import { calculatePointGrid, renderPoints, getPointsInPolygon } from './util'

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
    hoveredCountry: string
}

const width = window.innerWidth
const height = window.innerHeight
const cols = 160
const hexDistance = width / cols
const hexRadius = hexDistance / 1.5

const hexBin: Hexbin<DataPoint> = d3Hexbin<DataPoint>()
    .radius(hexRadius)
    .x(function(d: any) { return d.x })
    .y(function(d: any) { return d.y })

const projection: GeoProjection = d3GeoNaturalEarth()
    .scale(240)
    .translate([(width - 75) / 2, height / 2])

const pointGrid = calculatePointGrid(cols, width, height)

interface FeatureProperties {
    name: string
}

export default class HexMap extends React.Component <Props, State> {
    canvas: HTMLElement

    /*
    *  Transforms GeoJson to FeatureCollection
    *
    * */
    prepareDataFeatureCollection = (data: any) => {
        return topojson.feature(data, data.objects.usa)
    }

    getPolygonPoints = (data: ExtendedFeatureCollection<ExtendedFeature<Polygon, any>>) => {
        const polygonPoints: Array<[number, number] | null> = []
        data.features.map((feature, i) => {
            feature.geometry.coordinates.map(coordinates => {
                coordinates.map(coordinate => {
                    polygonPoints.push(projection([coordinate[0], coordinate[1]]))
                })
            })
        })

        const points: Array<[number, number]> = []
        data.features.map(feature => {
            if (feature.geometry.type === 'Polygon') {
                feature.geometry.coordinates.map(coordinates => {
                    coordinates.map(coordinate => {
                        points.push(projection([coordinate[0], coordinate[1]]) as [number, number])
                    })
                })
            } else if (feature.geometry.type === 'MultiPolygon') {
                console.log(feature)
            } else {
                throw new Error(`The specified feature type is not valid: ${feature.geometry.type}.
                    Make sure the data contains only Polygon or MultiPolygon geometry.`)
            }
        })

        const po: Array<[number, number]> = []
        console.log(data.features[168].properties)
        data.features[168].geometry.coordinates[5][0].map(coordinate => {
            po.push(projection([coordinate[0], coordinate[1]]) as [number, number])
        })
        return points
    }

    renderPolygonPoints = (points: Array<DataPoint>, polygon: Array<[number, number]>): void => {
        const pointsInPolygon = getPointsInPolygon(points, polygon)
        renderPoints(pointsInPolygon, this.canvas)
    }

    renderFeature = (feature: ExtendedFeature<Polygon | MultiPolygon, FeatureProperties>, geoProjection: GeoProjection) => {
        // const name = feature.properties.name
        const geometryCoordinates = feature.geometry.coordinates
        const geometryType = feature.geometry.type
        let polygon: Array<[number, number]> = []

        const render = (coordinates: Position[]): void => {
            coordinates.map((coordinate: Position) => {
                polygon.push(geoProjection([coordinate[0], coordinate[1]]) as [number, number])
            })
            this.renderPolygonPoints(pointGrid, polygon)
            polygon = []
        }

        if (geometryType === 'Polygon') {
            geometryCoordinates.map((coordinates: Position[][]) => {
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

    getHexPoints = (points: DataPoint[]) => {
        return hexBin(points)
    }

    drawGeo = (data: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, FeatureProperties>>) => {
        const geoPath = d3GeoPath()
            .projection(projection)

        d3Select(this.canvas)
            .append('path')
            .datum(data)
            .attr('d', geoPath)
            .attr('fill', '#ccc')

        this.renderFeature(data.features[0], projection)
        // const points = getPointsInPolygon(calculatePointGrid(160, width, height), this.getPolygonPoints(usJson))
        const hexPoints = [[1, 1]]

        d3Select(this.canvas)
            .append('g').attr('id', 'hexes')
            .selectAll('.hex').data(hexPoints)
            .enter().append('path')
            .attr('class', 'hex')
            .attr('transform', function(d: any) {
                return 'translate(' + d.x + ', ' + d.y + ')'; })
            .attr('d', hexBin.hexagon())
            .style('fill', '#fff')
            .style('stroke', '#ccc')
            .style('stroke-width', 1)

    }

    componentDidMount() {
        this.drawGeo(usJson)
    }

    render () {
        return (
            <Canvas
                id={'world-map'}
                innerRef={element => this.canvas = element}
            />
        )
    }
}
