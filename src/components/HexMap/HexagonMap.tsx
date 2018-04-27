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
import { MultiPolygon, Polygon } from 'geojson'
import { polygonContains } from 'd3-polygon'
import worldSimple from '../../data/world-simple.json'

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

const isPointInGeometryCollection = (point: [number, number], mask: [number, number][][]): boolean => {
    const polygon = mask.find(geometry => {
        return polygonContains(geometry as [number, number][], point)
    })
    return polygon !== undefined
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
        const columns = 200
        const pointGrid = getPointGrid(columns, this.props.dimensions[0], this.props.dimensions[1])
        const hexProperties = getHexProperties(columns, this.props.dimensions)
        const parsedPersons = parsedPersonData(doctorsWithLocation, this.props.projection)

        const mergedPoints = pointGrid.concat(parsedPersons)
        const hexBinData = hexProperties.hexBin(mergedPoints)
        const maskPolygons = worldSimple.geometries.map((geometry: Polygon) => {
            return geometry.coordinates[0].map(position => {
                return this.props.projection([position[0], position[1]])
            })
        })

        // console.log(maskPolygons)
        return (
            <g>
                {
                    hexBinData.map((bin, i) => {
                        const groupSize = bin.filter((b: any) => b.key).length
                        const fill = groupSize > 0 ? `${colorScale(bin.length)}` : 'rgba(0,0,0,0)'

                       if (isPointInGeometryCollection([bin.x, bin.y], maskPolygons) || groupSize > 0) {
                           return (
                               <path
                                   key={i}
                                   className={`hex ${bin.length}`}
                                   transform={`translate(${bin.x}, ${bin.y})`}
                                   style={{ fill: fill,
                                       stroke: 'rgb(225, 225, 225)', strokeWidth: 1 }}
                                   d={hexProperties.hexBin.hexagon()}
                                //    onMouseEnter={() => console.log(bin)}
                               />
                           )
                       }
                       return
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
