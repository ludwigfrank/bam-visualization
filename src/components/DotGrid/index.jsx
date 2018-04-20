import * as React from 'react'
import { Sprite, Stage, Graphics } from 'react-pixi-fiber';
import test from '../../images/test.png';

import styled from 'styled-components'
import Datamap from 'datamaps'

const MapContainer = styled.div`
    border: 2px solid red;
    background-color: lightblue;
    height: 100%;
    position: absolute;
    width: 100%;
`

export default class Map extends React.Component {
    constructor (props) {
        super (props)
    }

    render () {
        return (
            <Stage
                width={800}
                height={600}
                options={{ backgroundColor: 0x10bb99 }}
                onClick={() => this.setState({ test: true })}
            >
                <Graphics />
            </Stage>
        )
    }
}
