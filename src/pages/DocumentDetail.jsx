import * as React from 'react'
import styled from 'styled-components'

import doctorDocument from '../images/stories/stories-01.png';

const DocumentDetailImage = styled.img`
    // border: 3px solid green;
    width: 100%;
`;

export default class DocumentDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <div>
               <DocumentDetailImage src={doctorDocument} />
            </div>
        )
    }
}
