import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import doctorStory from '../images/stories/stories-02.png';

const DoctorStory = styled.img`
    // border: 3px solid green;
    width: 100%;
`;

export default class DetailView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <div>
               <Link to={'/document'}>
                    <DoctorStory src={doctorStory} />
                </Link>
            </div>
        )
    }
}
