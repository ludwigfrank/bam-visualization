import * as React from 'react'
import * as d3 from 'd3'
import { Sprite, Stage, Graphics } from 'react-pixi-fiber';
import test from '../../images/test.png';
import d3LayoutGrid from './d3LayoutGrid';

import styled from 'styled-components'
import Datamap from 'datamaps'
import Dot from './Dot.jsx';
import doctors from './doctors.js';

import dot from '../../images/test.png'

const MapContainer = styled.div`
    border: 2px solid red;
    background-color: lightblue;
    height: 100%;
    position: absolute;
    width: 100%;
`

function gridLayout(points, pointWidth, gridWidth) {
    const pointHeight = pointWidth * 2;
    const pointsPerRow = Math.floor(gridWidth / pointWidth * 2);
    const numRows = points.length / pointsPerRow;
  
    return points.map((point, i) => {
        return (
            // <Dot
            //     x={pointWidth * 2 * (i % pointsPerRow) + pointWidth}
            //     y={pointHeight * Math.floor(i / pointsPerRow)}
            //     radius={pointWidth}
            //     fill={0xFFFF00}
            //     key={i}
            // />
            <Sprite
                x={pointWidth * 2 * (i % pointsPerRow) + pointWidth}
                y={pointHeight * Math.floor(i / pointsPerRow)}
                height={pointWidth}
                width={pointWidth}
                fill={0xFFFF00}
                texture={PIXI.Texture.fromImage(dot)}
                key={i}
                interactive={true}
                click={() => console.log('clicked sprite')}
            />
          );
    });
}

export default class Map extends React.Component {
    constructor (props) {
        super (props)
    }
    render () {
        const pointWidth = 20;
        const width = window.innerWidth;

        const points = gridLayout(doctors, pointWidth, 200);

        console.log(points)

        return (
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                options={{ backgroundColor: 0x10bb99 }}
            >
                {points}
            </Stage>
        )
    }
}
