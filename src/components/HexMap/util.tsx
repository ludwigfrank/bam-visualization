import { range as d3Range } from 'd3-array'
import { select as d3Select } from 'd3-selection'
import { polygonContains as d3PolygonContains } from 'd3-polygon'
import { DataPoint } from '../../types'

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

export const getPointsInPolygon = (points: Array<DataPoint>, polygon: Array<[number, number]>): Array<DataPoint> => {
    const pointsInPolygon: Array<DataPoint> = []
    points.map((point) => {
        const inPolygon = d3PolygonContains(polygon, [point.x, point.y])
        if (inPolygon) { pointsInPolygon.push(point) }
    })
    return pointsInPolygon
}