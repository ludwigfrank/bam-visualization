import * as React from 'react'
import {
    ExtendedFeature, ExtendedFeatureCollection, GeoProjection
} from 'd3-geo'
import { DataPoint } from '../../types'
import { Hexbin, hexbin as d3Hexbin } from 'd3-hexbin'
import { range as d3Range } from 'd3-array'
import doctorsWithLocation from '../../data/doctors-with-location.json'
import { scaleSequential } from 'd3-scale'
import { interpolateMagma } from 'd3-scale-chromatic'
import { getProjectedCoordinates } from './util'
import { MultiPolygon, Polygon, Position } from 'geojson'
import { polygonContains } from 'd3-polygon'

const colorScale = scaleSequential(function(t: number) {
        const tNew = Math.pow(t, 3)
        return interpolateMagma(tNew)
}).domain([48, 1])

const getHexProperties = (hexColumns: number, dimensions: number[]) => {
    const hexDistance = dimensions[0] / hexColumns
    const hexRadius = hexDistance / 1.5
    const hexBin: Hexbin<DataPoint> = d3Hexbin<DataPoint>()
        .radius(hexRadius)
        .x(function (d: any) {return d.x})
        .y(function (d: any) {return d.y})

    return {
        hexColumns,
        hexDistance,
        hexRadius,
        hexBin
    }
}

const getPointGrid = (cols: number, width: number, height: number): Array<any> => {
    const hexDistance = width / cols
    const rows = Math.floor(height / hexDistance)

    return d3Range(rows * cols).map((el, i) => {
        return {
            x: i % cols * hexDistance,
            y: Math.floor(i / cols) * hexDistance,
            data: {
                value: 0
            }
        }
    })
}

interface Location {
    formattedAddress: string
    coordinates: [number, number]
    projectedCoordinates: [number, number]
    country: string
    state: string
    city: string
}

interface Person {
    key: number
    name: string
    location: Location
    data: string
    x?: number
    y?: number
}

const parsedPersonData = (persons: Person[], projection: GeoProjection): Person[] => {
    return persons.reduce((acc, cur, ind, arr)  => {
        const projectedCoordinates = getProjectedCoordinates(
            [cur.location.coordinates[1], cur.location.coordinates[0]], projection) as [number, number]
        if (projectedCoordinates === null) { return acc }
        return [...acc, {...cur,
            data: cur.location.city,
            location: {...cur.location, projectedCoordinates },
            x: projectedCoordinates[0],
            y: projectedCoordinates[1]}]
    }, [])
}

const isPointInFeature = (point: [number, number], feature: ExtendedFeature<Polygon | MultiPolygon, any>): boolean => {
    if (feature.geometry.type === 'Polygon') {
        const geometry: Position[][] = feature.geometry.coordinates
        return polygonContains(geometry[0] as [number, number][], point)

    } else if (feature.geometry.type === 'MultiPolygon') {
        const multiGeometry: Position[][][] = feature.geometry.coordinates
        multiGeometry.forEach(geometry => {
            if (polygonContains(geometry[0] as [number, number][], point)) {
                return true
            } else {
                return
            }
        })
    } else {
        throw new Error(`Feature geometry type has to be either Polygon or MultiPolygon, 
        got ${feature.geometry}`)
    }

    return false
}

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, any>>
    projection: GeoProjection
    dimensions: [number, number]
}

interface State {
    hexBinData: Hexbin<DataPoint>
}

export default class HexagonMap extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props)
    }

    renderHexagons = () => {
        const columns = 150
        const pointGrid = getPointGrid(columns, this.props.dimensions[0], this.props.dimensions[1])
        const hexProperties = getHexProperties(columns, this.props.dimensions)
        const parsedPersons = parsedPersonData(doctorsWithLocation, this.props.projection)

        const mergedPoints = pointGrid.concat(parsedPersons)
        const hexBinData = hexProperties.hexBin(mergedPoints)

        const featureCollection = this.props.featureCollection

        return (
            <g>
                {
                    hexBinData.map((bin, i) => {
                        const groupSize = bin.filter((b: any) => b.key).length
                        const fill = groupSize > 0 ? `${colorScale(bin.length)}` : 'rgba(0,0,0,0)'

                        console.log(isPointInFeature([40, 40], featureCollection.features[1]))
                        return (
                            <path
                                key={i}
                                className={`hex ${bin.length}`}
                                transform={`translate(${bin.x}, ${bin.y})`}
                                style={{ fill: fill,
                                    stroke: 'rgb(204, 204, 204)', strokeWidth: 1 }}
                                d={hexProperties.hexBin.hexagon()}
                                onMouseEnter={() => console.log(bin)}
                            />
                        )
                    })
                }
            </g>
        )
    }

    render () {

        return (
            <svg>
                <g>
                    {this.renderHexagons()}
                </g>
            </svg>
        )
    }
}
