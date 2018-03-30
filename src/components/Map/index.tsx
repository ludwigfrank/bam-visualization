import * as React from 'react'
import styled from 'styled-components'
import Datamap from 'datamaps'
import 'topojson'
import 'd3'

const MapContainer = styled.div`
    border: 2px solid red;
    height: 100%;
    position: absolute;
    width: 100%;
`

interface Props {
    country?: string
}

interface State {
    hoveredCountry: string
}

export default class Map extends React.Component <Props, State> {
    static defaultProps: Props = {
        country: 'USA'
    }

    private mapContainer: HTMLInputElement

    constructor (props: Props) {
        super (props)
        this.state = {
            hoveredCountry: ''
        }
    }

    componentDidMount() {
        const doctorsData = [{
            name: 'Doctor Name 1',
            radius: 10,
            info: 100,
            country: 'USSR',
            fillKey: 'USA',
            latitude: 50.07,
            longitude: 60.43
        }, {
            name: 'Doctor Name 2',
            radius: 10,
            info: 100,
            country: 'USSR',
            fillKey: 'FRA',
            latitude: 50.07,
            longitude: 78.43

        }, {
            name: 'Doctor Name 3',
            radius: 10,
            info: 100,
            country: 'USSR',
            fillKey: 'PAK',
            latitude: 73.482,
            longitude: 54.5854
        }]

        const doctorsMap = new Datamap({
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
            data: {
                'USA': {fillKey: 'STANDARD'}
            }
        })

        doctorsMap.bubbles(doctorsData, {
            popupTemplate: (geo: string, data: {name: string, info: string, country: string, date: string}) => {
                return [
                    '<div class="hoverinfo">' +  data.name,
                    '<br/>Country: ' +  data.country,
                    '<br/>Info: ' +  data.info,
                    '</div>'
                ].join('');
            }
        })

    }

    render () {
        return (
            <MapContainer innerRef={element => this.mapContainer = element}/>
        )
    }
}
