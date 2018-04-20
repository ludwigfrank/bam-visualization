import * as React from 'react'
import * as d3 from 'd3'
import { Sprite, Stage, Graphics } from 'react-pixi-fiber';
import test from '../../images/test.png';
import d3LayoutGrid from './d3LayoutGrid';

import styled from 'styled-components'
import Datamap from 'datamaps'
import Dot from './Dot.jsx';

const MapContainer = styled.div`
    border: 2px solid red;
    background-color: lightblue;
    height: 100%;
    position: absolute;
    width: 100%;
`

function random (start, end) {
    const range = end - start;
    return start + Math.floor(Math.random() * range);
}
function randomPick (array) {
    const length = array.length;
    const index = random(0, array.length);
    return array[index];
  }

const data = d3.range(0, 150).map(function (i) {
    return {
        index: i,
        prop1: randomPick(['a', 'b', 'c']),
        prop2: randomPick(['a', 'b', 'c', 'd', 'e']),
        x: random(window.innerWidth / 2 - 100, window.innerWidth / 2 + 100),
        y: random(window.innerHeight / 2 - 100, window.innerHeight / 2 + 100),
        shape: randomPick(['circle', 'square', 'ellipse']),
        size: random(20, 40)
    };
});

function calculateGrid() {
    const grid = d3LayoutGrid()
        .width(500)
        .height(300)
        .colWidth(50)
        .rowHeight(50)
        .marginTop(75)
        .marginLeft(50)
        .sectionPadding(100)
        .data(data);

    console.log(grid);
}

export default class Map extends React.Component {
    constructor (props) {
        super (props)
    }
    render () {
        return (
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                options={{ backgroundColor: 0x10bb99 }}
                onClick={() => this.setState({ test: true })}
            >
                <Dot
                    x={250}
                    y={200}
                    radius={100}
                    fill={0xFFFF00}
                />
            </Stage>
        )
    }
}
