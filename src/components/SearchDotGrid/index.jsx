import * as React from 'react'
import * as d3 from 'd3'
import _groupBy from 'lodash.groupby';
import styled from 'styled-components'

import doctors from './doctors.js';
import dot from '../../images/test.png'

const DotContainer = styled.div`
    background-color: lightblue;
    border: 2px solid red;
    bottom: 0;
    height: 100%;
    position: absolute;
    width: 100%;
`

export default class Map extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
        }
    }
    render () {
        return (
            <DotContainer>
                {'dot container'}
            </DotContainer>
        )
    }
}
