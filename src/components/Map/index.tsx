import * as React from 'react'
import styled from 'styled-components'
import Datamap from 'datamaps'
// import * as d3 from 'd3';
import { event as d3Event } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';
// import { drag as d3Drag } from 'd3-drag';
import { select as d3Select } from 'd3-selection';
import { geoPath, geoEquirectangular } from 'd3-geo'
import 'topojson'
import TimeSlider from '../TimeSlider'

// import doctorsBiographicalData from '../../data/doctorsBiographicalData.json'
// import saturatedLocations from '../../data/saturatedLocations.json'
import saturatedLocations from '../../data/saturatedLocations_02.json'

const MapContainer = styled.div`
    border: 2px solid red;
    background-color: lightblue;
    height: 100%;
    position: absolute;
    width: 100%;
`

interface Props {
    country?: string
}

interface State {
    hoveredCountry: string,
    sliderValues: Array<number>,
    filtered: boolean
}

export default class Map extends React.Component <Props, State> {
    static defaultProps: Props = {
        country: 'USA'
    }
    doctorsMap: any // tslint:disable-line: no-any
    locationsData: any // tslint:disable-line: no-any

    private mapContainer: HTMLInputElement

    constructor (props: Props) {
        super (props)
        this.state = {
            hoveredCountry: '',
            sliderValues: [0, saturatedLocations.length],
            filtered: false
        }

        this.doctorsMap = {}
        this.locationsData = saturatedLocations.map((location: any, index: number) => { // tslint:disable-line: no-any
            const [latitude, longitude] = location.coordinates
            return {
                name: `Doctor Name ${index}`,
                latitude,
                longitude,
                radius: .2,
                fillKey: 'USA',
                info: 100
            }
        })

        // const locationsData = [{
        //     name: 'Doctor Name 1',
        //     radius: 5,
        //     info: 100,
        //     country: 'USSR',
        //     fillKey: 'USA',
        //     latitude: 50.07,
        //     longitude: 60.43,
        //     date: [0, 1]
        // }, {
        //     name: 'Doctor Name 2',
        //     radius: 5,
        //     info: 100,
        //     country: 'USSR',
        //     fillKey: 'FRA',
        //     latitude: 50.07,
        //     longitude: 78.43,
        //     date: [0, 1]

        // }, {
        //     name: 'Doctor Name 3',
        //     radius: 5,
        //     info: 100,
        //     country: 'USSR',
        //     fillKey: 'PAK',
        //     latitude: 73.482,
        //     longitude: 54.5854,
        //     date: [0, 1]
        // }]
    }

    componentDidMount() {
        this.doctorsMap = new Datamap({
            element: this.mapContainer,
            scope: 'world',
            geographyConfig: {
                borderColor: '#fff',
                borderWidth: 0.5,
                // highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                highlightBorderWidth: 0.5,
                highlightBorderOpacity: 1,
                highlightFillColor: 'yellow',
                highlightOnHover: true,
                popupOnHover: true
                // dataJson: topoJsonData
            },
            bubblesConfig: {
                borderWidth: 2,
                borderOpacity: 1,
                borderColor: '#000',
                popupOnHover: true, // True to show the popup while hovering
                radius: null,
                fillOpacity: 0.75,
                animate: true,
                highlightOnHover: true,
                highlightFillColor: '#000',
                // highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                highlightBorderWidth: 2,
                highlightBorderOpacity: 1,
                highlightFillOpacity: 0.85,
                exitDelay: 100 // Milliseconds
                // key: JSON.stringify
            },
            fills: {
                'STANDARD': '#1f77b4',
                defaultFill: '#7f7f7f'
            },
            setProjection: (element: {offsetWidth: number, offsetHeight: number}) => {
                const projection = geoEquirectangular()
                    .center([0, 0])
                    .rotate([0, 0])
                    .scale(150)
                    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                const path = geoPath()
                    .projection(projection);
            
                return {path: path, projection: projection};
            },
            done: (datamap: any) => { // tslint:disable-line: no-any
                const handleMapZoom = () => {
                    const { k, x, y } = d3Event.transform;
                    datamap.svg
                        .selectAll('g')
                        .attr(
                            'transform', 
                            `translate(${x}, ${y}) scale(${k})`
                        )
                }

                d3Select('svg').call(d3Zoom().on('zoom', handleMapZoom));
            },
            data: {
                'USA': {fillKey: 'STANDARD'}
            }
        })

        this.doctorsMap.bubbles(this.locationsData, {
            popupTemplate: (geo: string, data: {name: string, info: string, country: string, date: string}) => {
                return [
                    '<div class="hoverinfo">' + data.name,
                    '<br/>Country: ' + data.country,
                    '<br/>Info: ' + data.info,
                    '<br/>Geo: ' + geo,
                    '</div>'
                ].join('');
            }
        })
    }
    log(msg: any) { // tslint:disable-line: no-any
        let f = console.log.bind(console);
        f(msg);
    }

    render () {
        if (this.state.filtered) {
            // const test = saturatedLocations.splice(0, saturatedLocations.length * this.state.sliderValues[1] - 10)
            this.log(this.locationsData)
            this.doctorsMap.bubbles(this.locationsData)
        }

        return (
            <div>
                <TimeSlider
                    sliderValuesCallback={(sliderValues: Array<number>) => {
                        this.setState({
                            sliderValues,
                            filtered: true
                        })
                    }}
                />
                <MapContainer
                    id={'world-map'}
                    innerRef={element => this.mapContainer = element}
                />
            </div>
        )
    }
}
