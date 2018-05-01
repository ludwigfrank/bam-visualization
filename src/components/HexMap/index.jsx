import * as React from 'react'
import {
    GeoConicProjection,
    ExtendedFeatureCollection, ExtendedFeature,
    geoPath, GeoProjection, geoEquirectangular
} from 'd3-geo'
// import { polygonContains as d3PolygonContains } from 'd3-polygon'
import worldGeoJson from '../../data/world-simplified-only-polygons.json'
import worldGeoJsonMulti from '../../data/world-simplified.json'
import * as topojson from 'topojson-client'
import Map from './Map'
import { MultiPolygon, Polygon } from 'geojson'
import Tooltip from './Tooltip'
import { getFeatureByID } from './util'
import HexagonMap from './HexagonMap'

interface Bin {
    data: object
    x: number
    y: number
}

interface Props {
    country?: string
}

interface State {
    featureCollection: ExtendedFeatureCollection<ExtendedFeature<Polygon | MultiPolygon, any>>
    projection: GeoConicProjection | GeoProjection
    hoveredHexagon: Bin | undefined
    focusedCountry: 'World' | 'US'
}

const width = window.innerWidth
const height = window.innerHeight
const baseProjection = geoEquirectangular()
    .scale(1)
    .translate([0, 0])

export default class HexMap extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            featureCollection: worldGeoJson,
            projection: geoEquirectangular()
                .scale(200)
                .translate([width / 2, height / 2]),
            hoveredHexagon: undefined,
            focusedCountry: 'World',
        }
    }

    get geoPathGenerator () {
        return geoPath().projection(this.state.projection)
    }

    /*
    *  Transforms GeoJson to FeatureCollection
    *
    * */
    prepareDataFeatureCollection = (data: any) => {
        return topojson.feature(data, data.objects.usa)
    }

    onHexagonHover = (hexagon: Bin) => {
        this.setState({hoveredHexagon: hexagon})
    }

    onHexagonClick = (hexagon: Bin, country: any) => {
        console.log(country)
        const bounds = this.getBounds(country.polygon.countryCode)
        console.log(bounds)
        this.setState((prevState) => {
            return {
                focusedCountry: 'US',
                projection: geoEquirectangular()
                    .center([0, 0])
                    .scale(bounds.scale)
                    .translate(bounds.transform as [number, number])
            }
        })
    }

    getBounds = (countryCode: string) => {
        const feature = getFeatureByID(worldGeoJsonMulti, countryCode) as ExtendedFeature<any, any>
        const bounds = geoPath().projection(baseProjection).bounds(feature)

        const scale  = .7 /
            Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height)
        const transform  = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
            (height - scale * (bounds[1][1] + bounds[0][1])) / 2]

        return {
            scale,
            transform
        }
    }

    render () {
        const { featureCollection, projection } = this.state

        return (
            <div
                id={'map'}
            >
                <Tooltip
                    hoveredHexagon={this.state.hoveredHexagon}
                />
                <Map
                    geoPathGenerator={this.geoPathGenerator}
                    featureCollection={featureCollection}
                    dimensions={[width, height]}
                />
                <HexagonMap
                    featureCollection={featureCollection}
                    projection={projection}
                    dimensions={[width, height]}
                    onHexagonHover={this.onHexagonHover}
                    onHexagonClick={this.onHexagonClick}
                />
            </div>
        )
    }
}