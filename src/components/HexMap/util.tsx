import { polygonContains as d3PolygonContains } from 'd3-polygon'
import { DataPoint } from '../../types'
import { MultiPolygon, Polygon, Position } from 'geojson'
import { ExtendedFeature, GeoProjection } from 'd3-geo'

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
 * @param coordinate: Coordinate
 * @param geoProjection: Geo Projection
 */
export const getProjectedCoordinates = (coordinate: Position, geoProjection: GeoProjection): Position => {
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
            return coordinates.map((coordinate: Position) => getProjectedCoordinates(coordinate, geoProjection))
        })
        geometryCallback(polygon[0])
        return {...feature, geometry: {...feature.geometry, projectedCoordinates: polygon}}

    } else if (geometryType === 'MultiPolygon') {
        const multiPolygon: Position[][][] = []
        geometryCoordinates.map((multiCoordinates: Position[][]) => {
            const polygon = multiCoordinates.map((coordinates: Position[]) => {
                return coordinates.map((coordinate: Position) => getProjectedCoordinates(coordinate, geoProjection))
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