import * as React from 'react'
import styled from 'styled-components'

import PhysicianTile from './PhysicianTile.jsx';

const PhysicianGridStyle = styled.div`
    border: 2px solid red;
`;

export default class PhysicianTileGrid extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <PhysicianGridStyle>
                {'physician grid'}
            </PhysicianGridStyle>
        );
    }
}
