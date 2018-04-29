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

interface MaskPolygonFeature {
    geometry: [number, number][]
    countryCode: string
}

const maskPolygonsFeature = (
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, any>>,
    projection: GeoProjection):
    MaskPolygonFeature[] => {
    return featureCollection.features.map((feature: ExtendedFeature<Polygon, any>): MaskPolygonFeature => {
        const geometry =  feature.geometry.coordinates[0].map((position) => {
            return projection([position[0], position[1]])
        }) as [number, number][]

        const countryCode = feature.id as string

        return {
            geometry,
            countryCode
        }
    })
}

const isPointInGeometryCollection = (point: [number, number], mask: MaskPolygonFeature[]): any => {
    const polygon = mask.find(polygonFeature => {
        return polygonContains(polygonFeature.geometry as [number, number][], point)
    })
    return {
        isDefined: polygon !== undefined,
        polygon: polygon
    }
}

interface Props {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, any>>
    projection: GeoProjection
    dimensions: [number, number]
    onHexagonHover: Function
    onHexagonClick: Function
}

interface State {
    hoveredHexagon: Bin | undefined,
    mousePosition: [number, number]
}

interface Bin {
    data: object
    x: number
    y: number
}

export default class HexagonMap extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hoveredHexagon: undefined,
            mousePosition: [0, 0]
        }
    }

    handleHexagonMouseEnter = (bin: Bin | undefined) => {
        this.props.onHexagonHover(bin)
    }

    handleHexagonClick = (bin: Bin, country: any ) => {
        this.props.onHexagonClick(bin, country)
    }

    shouldComponentUpdate(nextProps: Props) {
        if (this.props.projection !== nextProps.projection) { return true }
        return false
    }

    componentDidMount() {
        console.log(maskPolygonsFeature(this.props.featureCollection, this.props.projection))
    }

    renderHexagons = () => {
        const hexagonWidth = 10
        const columns = Math.floor(this.props.dimensions[0] / hexagonWidth)
        const pointGrid = getPointGrid(columns, this.props.dimensions[0], this.props.dimensions[1])
        const hexProperties = getHexProperties(columns, this.props.dimensions)
        const parsedPersons = parsedPersonData(doctorsWithLocation, this.props.projection)

        const mergedPoints = pointGrid.concat(parsedPersons)
        const hexBinData = hexProperties.hexBin(mergedPoints)

        const maskPolygons = maskPolygonsFeature(this.props.featureCollection, this.props.projection)

        return (
            <g>
                {
                    hexBinData.map((bin: any, i) => {
                        bin = {x: bin.x, y: bin.y,
                            data: Object.values(bin.filter((b: any) => b.key))}
                        const isDataPoint = bin.data.length > 0
                        const fill = isDataPoint ? `${colorScale(bin.data.length)}` : 'rgba(0,0,0,0)'

                        const country = isPointInGeometryCollection([bin.x, bin.y], maskPolygons)
                        if (country.isDefined || isDataPoint) {
                            return (
                                <path
                                    key={i}
                                    className={`hex ${bin.length}`}
                                    transform={`translate(${bin.x}, ${bin.y})`}
                                    style={{ fill: fill, stroke: 'rgb(225, 225, 225)', strokeWidth: 1 }}
                                    d={hexProperties.hexBin.hexagon()}
                                    onMouseEnter={() => { if (isDataPoint) {this.handleHexagonMouseEnter(bin)} }}
                                    onMouseLeave={() => { if (isDataPoint) {this.handleHexagonMouseEnter(undefined)}}}
                                    onClick={() => this.handleHexagonClick(bin, country)}
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
        const { dimensions } = this.props

        return (
            <div style={{ width: dimensions[0], height: dimensions[1], top: 0, position: 'absolute'}}>
                <svg style={{ width: '100%', height: '100%'}}>
                    <g>
                        {this.renderHexagons()}
                    </g>
                </svg>
            </div>
        )
    }
}
