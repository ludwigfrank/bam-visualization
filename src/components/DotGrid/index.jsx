import * as React from 'react'
import * as d3 from 'd3'
import { Sprite, Stage, Graphics, ParticleContainer } from 'react-pixi-fiber';
import test from '../../images/test.png';
import d3LayoutGrid from './d3LayoutGrid';
import GridLayout from './GridLayout.jsx';
import DotGrid from './DotGrid.jsx';
import _groupBy from 'lodash.groupby';

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

const HEIGHT = window.innerHeight / 2;
const WIDTH = window.innerWidth / 2;

export default class Map extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            groupValue: 'name'
        }
    }
    animationCallback(callback) {
        console.log(callback);
    }
    render () {
        console.log('render');
        const pointWidth = 20;
        const width = window.innerWidth;

        const groups = _groupBy(doctors, (doctor) => doctor[this.state.groupValue]);
        console.log(groups);
        const groupedPoints = Object.keys(groups).map((key, index) => {
            return (
                <GridLayout
                    points={groups[key]}
                    pointWidth={pointWidth}
                    gridWidth={100}
                    keyValue={key}
                    groupIndex={index}
                />
            );
        });

        console.log(groupedPoints);

        return (
            <div>
                <Stage
                    height={HEIGHT}
                    width={WIDTH}
                    interactiveChildren
                    // onClick={() => this.setState({ groupValue: 'value' })}
                >
                    <DotGrid
                        pointWidth={30}
                        gridWidth={WIDTH}
                        points={doctors}
                        groupIndex={0}
                        interactive
                        pointerdown={() => console.log('dot grid')}
                        onClick={() => console.log('dot grid')}
                        animationCallback={this.animationCallback}
                    />
                </Stage>
                <button
                    onClick={() => {
                        console.log('clicked button');
                        this.animationCallback();
                    }}
                >
                    {'button'}
                </button>
            </div>
        )
    }
}
