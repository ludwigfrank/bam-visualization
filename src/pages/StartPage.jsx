import * as React from 'react';
import styled from 'styled-components'
import Sidebar from '../components/Sidebar';
import HexMap from '../components/HexMap'
import TimeSlider from '../components/TimeSlider'

import doctorsData from '../data/doctors-with-location.json'

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtered: true,
            sliderValues: [0, doctorsData.length],
            filtered: false
        };

        this.doctorsMap = {};
    }
    render() {
        const sidebarButtons = [
            {
                label: 'I want to contribute',
                src: '/contribute',
                filled: true
            },
            {
                label: 'I want to explore',
                src: '/explore',
                filled: false
            }
        ];

        let filteredLocations;
        if (this.state.filtered) {
            filteredLocations = this.locationsData.slice(
                0, this.locationsData.length * this.state.sliderValues[1]
            )
            // this.log(filteredLocations.length)
            this.doctorsMap.bubbles(filteredLocations)
        }
        
        return (
            <div>
               <Sidebar
                    border={true}
                    header={'Help us tell the story.'}
                    buttonLabel={'I want to add missing data'}
                    buttons={sidebarButtons}
                >
                   
                   {'Blacks in American Medicine is a MIT Hyperstudio project that combines a comprehensive archive of black American medical primary and contextual content. A one-of-a-kind database, comprised of content that has never before been digitized. This archive includes materials accessible through a number of intersectional methods in order to allow enhanced user interaction while articulating this oft-forgotten chapter in American history. This project will help shed light on the often untold narrative in the vast history of the black experience.'}
               </Sidebar>
               <TimeSlider
                    sliderValuesCallback={(sliderValues) => {
                        // const totalSelectedRange = sliderValues[1] - sliderValues[0]; 
                        // this.setState({
                        //     sliderValues,
                        //     filtered: true
                        // })

                        console.log('changed slider value');
                    }}
                    data={doctorsData}
                />
               <HexMap />
            </div>
        )
    }
}
