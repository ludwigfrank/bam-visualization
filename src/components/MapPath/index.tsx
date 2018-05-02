import * as React from 'react'
import { GeoProjection } from 'd3-geo'
import institutions from '../../data/institutions.json'

type Position2D = [number, number] | null

interface Location {
    formattedAddress: string
    coordinates: [number, number]
    projectedCoordinates: [number, number]
    country: string
    state: string
    city: string
}

interface Institution extends Location {
    name: string
}

interface Bin {
    data: object
    x: number
    y: number
}

interface Props {
    projection: GeoProjection
    dimensions: [number, number]
    hoveredHexagon: Bin | undefined,
}

interface State {
}

const getArc = (start: Position2D, end: Position2D) => {
    if (start === null || end === null) { throw new Error(`Invalid position provided`) }
    const dx = start[0] - end[0]
    const dy = start[1] - end[1]
    const dr = Math.sqrt(dx * dx + dy * dy)
    const spath = ' 0 0,0 '
    return 'M' + start[0] + ',' + start[1] + 'A' + dr + ',' + dr + spath + end[0] + ',' + end[1]
}

export default class MapPath extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
        }
    }

    renderPath () {
        const { projection, hoveredHexagon} = this.props

        return (
            <g>
                {
                    institutions.map((institution: Institution) => {
                        const start: Position2D = hoveredHexagon ? [hoveredHexagon.x, hoveredHexagon.y] : [0, 0]
                        const end: Position2D = projection([institution.coordinates[1], institution.coordinates[0]])
                        const arc = getArc(start, end)
                        return (
                            <path
                                key={institution.name}
                                className={`path`}
                                style={{ fill: 'none',
                                    stroke: 'rgba(50, 50, 225, 0.7)',
                                    strokeWidth: Math.random() * 10}}
                                d={arc}
                            />
                        )
                    })
                }
            </g>
        )
    }

    render () {
        const { dimensions, hoveredHexagon } = this.props

        return (
            <div
                style={{ width: dimensions[0], height: dimensions[1], top: 0,
                    position: 'absolute', pointerEvents: 'none'}}
            >
                <svg style={{ width: '100%', height: '100%'}}>
                    {hoveredHexagon && this.renderPath()}
                </svg>
            </div>
        )
    }
}
