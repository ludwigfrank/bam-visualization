import * as React from 'react';
import Sidebar from '../components/Sidebar';
import HexMap from '../components/HexMap'
import HexMap from '../components/TimeSlider'

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderValues,
            filtered: true
        };
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
        return (
            <div>
               {'start page'}
               <Sidebar
                    border={true}
                    header={'Help us tell the story.'}
                    buttonLabel={'I want to add missing data'}
                    buttons={sidebarButtons}
                >
                   
                   {'Blacks in American Medicine is a MIT Hyperstudio project that combines a comprehensive archive of black American medical primary and contextual content. A one-of-a-kind database, comprised of content that has never before been digitized. This archive includes materials accessible through a number of intersectional methods in order to allow enhanced user interaction while articulating this oft-forgotten chapter in American history. This project will help shed light on the often untold narrative in the vast history of the black experience.'}
               </Sidebar>
               <HexMap />
               <TimeSlider
                    sliderValuesCallback={(sliderValues) => {
                        // const totalSelectedRange = sliderValues[1] - sliderValues[0]; 
                        this.setState({
                            sliderValues,
                            filtered: true
                        })
                    }}
                    data={saturatedLocations}
                />
            </div>
        )
    }
}
