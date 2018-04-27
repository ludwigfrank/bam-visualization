import * as React from 'react';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map.jsx';

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <div>
               {'start page'}
               <Sidebar border={true} buttonLabel={'I want to add missing data'}>
                   {'Help us tell the story.'}
                   {'Blacks in American Medicine is a MIT Hyperstudio project that combines a comprehensive archive of black American medical primary and contextual content. A one-of-a-kind database, comprised of content that has never before been digitized. This archive includes materials accessible through a number of intersectional methods in order to allow enhanced user interaction while articulating this oft-forgotten chapter in American history. This project will help shed light on the often untold narrative in the vast history of the black experience.'}

                   <button>{'I want to explore'}</button>
               </Sidebar>
               <Map />
            </div>
        )
    }
}
