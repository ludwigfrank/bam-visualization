import { range as d3Range } from 'd3-array'
import { select as d3Select, selectAll as d3SelectAll } from 'd3-selection'
import { polygonContains as d3PolygonContains } from 'd3-polygon'
import { DataPoint } from '../../types'
import { Hexbin } from 'd3-hexbin'
import { MultiPolygon, Polygon, Position } from 'geojson'
import { ExtendedFeature, GeoProjection } from 'd3-geo'

export const calculatePointGrid = (cols: number, width: number, height: number): Array<DataPoint> => {
    const hexDistance = width / cols
    const rows = Math.floor(height / hexDistance)

    return d3Range(rows * cols).map((el, i) => {
        return {
            x: Math.floor(i % cols * hexDistance),
            y: Math.floor(i / cols) * hexDistance,
            data: {
                value: 0
            }
        }
    })
}

export const renderPoints = (data: Array<DataPoint>, element: HTMLElement) => {
    d3Select(element)
        .append('g')
        .attr('id', 'circles')
        .selectAll('.dot').data(data)
            .enter().append('circle')
            .attr('cx', (d: DataPoint) => d.x)
            .attr('cy', (d: DataPoint) => d.y)
            .attr('r', 1)
            .attr('fill', 'tomato');
}

export const renderHexagons = (
    points: Array<DataPoint>, element: HTMLElement, hexbin: Hexbin<DataPoint>, data: any) => {
    if (points.length < 1) { return }
    d3Select(element)
        .append('g')
            .attr('id', 'hexes')
            .attr('class', data.name)
        .selectAll('.hex').data(hexbin(points))
            .enter().append('path')
            .attr('class', `hex`)
            .attr('class', `hex-${data.name.replace(/ /g, '_')} hex`)
            .attr('transform', function(d: any) {
                return 'translate(' + d.x + ', ' + d.y + ')'; })
            .attr('d', hexbin.hexagon())
            .style('fill', '#fff')
            .style('stroke', '#ccc')
            .style('stroke-width', 1)

    d3SelectAll('.hex').on('mouseover', function (d: any, i: number) {
        const name = d3Select(this).data()[0][0].data.name.replace(/ /g, '_')
        d3SelectAll(`.hex-${name}`)
            .style('fill', 'red')
    })

}

export const getPointsInPolygon = (
    points: Array<DataPoint>, polygon: Array<[number, number]>, data: any): Array<DataPoint> => {
    const pointsInPolygon: Array<DataPoint> = []
    points.map((point) => {
        const inPolygon = d3PolygonContains(polygon, [point.x, point.y])
        if (inPolygon) {
            point.data = data
            pointsInPolygon.push(point)
        }
    })
    return pointsInPolygon
}

/**
 * Returns the projected coordinates of the given coordinate.
 */
export const getProjection = (coordinate: Position, geoProjection: GeoProjection): Position => {
    return geoProjection([coordinate[0], coordinate[1]]) as [number, number]
}

interface FeatureProperties {
    name: string
}

/**
 * Parses a feature to generate:
 * @param feature: the GeoFeature consisting of Polygons or MultiPolygon as geometry
 * @param geoProjection: GeoProjection
 * @param geometryCallback: function that gets called with each individual polygon.
 */
export const getParsedFeature = (
    feature: ExtendedFeature<any, FeatureProperties>, geoProjection: GeoProjection, geometryCallback: Function):
    ExtendedFeature<Polygon | MultiPolygon, FeatureProperties> => {
    const geometryCoordinates = feature.geometry.coordinates
    const geometryType = feature.geometry.type

    if (geometryType === 'Polygon') {
        const polygon = geometryCoordinates.map((coordinates: Position[]) => {
            return coordinates.map((coordinate: Position) => getProjection(coordinate, geoProjection))
        })
        geometryCallback(polygon[0])
        return {...feature, geometry: {...feature.geometry, projectedCoordinates: polygon}}

    } else if (geometryType === 'MultiPolygon') {
        const multiPolygon: Position[][][] = []
        geometryCoordinates.map((multiCoordinates: Position[][]) => {
            const polygon = multiCoordinates.map((coordinates: Position[]) => {
                return coordinates.map((coordinate: Position) => getProjection(coordinate, geoProjection))
            })
            geometryCallback(polygon[0])
            multiPolygon.push(polygon)
        })
        return {...feature, geometry: {...feature.geometry, projectedCoordinates: multiPolygon}}
    } else {
        throw new Error(`The specified feature type is not valid: ${feature.geometry.type}.
                    Make sure the data contains only Polygon or MultiPolygon geometry.`)
    }

}