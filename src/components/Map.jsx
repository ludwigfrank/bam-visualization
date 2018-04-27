import * as React from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    border: 2px solid red;
    height: 100%;
    right: 0;
    position: absolute;
    top: 0;
    width: 70%;
`;

export default class Map extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <MapContainer>{'Map'}</MapContainer>
        );
    }
}
