import * as React from 'react'
import styled from 'styled-components'

const Physician = styled.div`
    border: 2px solid red;
`;

export default class PhysicianTile extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <Physician>
                {'physician'}
            </Physician>
        );
    }
}
