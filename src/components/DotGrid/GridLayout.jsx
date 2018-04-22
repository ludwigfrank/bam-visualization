import * as React from 'react'
import * as d3 from 'd3'
import { Sprite, Stage, Graphics, ParticleContainer } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import test from '../../images/test.png';
import d3LayoutGrid from './d3LayoutGrid';
import _groupBy from 'lodash.groupby';
import Animated from 'animated';
import {Motion, spring} from 'react-motion';

import styled from 'styled-components'
import Datamap from 'datamaps'
import Dot from './Dot.jsx';
import doctors from './doctors.js';

import dot from '../../images/test.png'

const HEIGHT = 450;
const WIDTH = 600;
const CENTER = new PIXI.Point(0.5, 0.5);

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


// points, this.props.pointWidth, gridWidth, key
export default class GridLayout extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            scale: new Animated.ValueXY({ x: 1, y: 1 }),
            rotation: new Animated.Value(0)
        }
    }

    shrink = () => {
        Animated.spring(this.state.scale, { toValue: { x: 1, y: 1 } }).start();
        // Comment out next line to see the bug
        Animated.spring(this.state.rotation, { toValue: 0 }).start();
    }

    grow = () => {
        Animated.spring(this.state.scale, { toValue: { x: 8, y: 8 } }).start();
        // Comment out next line to see the bug
        Animated.spring(this.state.rotation, { toValue: 1 }).start();
    }

    render () {
        const pointHeight = this.props.pointWidth * 2;
        const pointsPerRow = Math.floor(this.props.gridWidth / this.props.pointWidth * 2);
        const numRows = this.props.points.length / pointsPerRow;

        console.log(this.props.points);

        const particleSprites = this.props.points.map((point, i) => {
            const AnimatedSprite = Animated.createAnimatedComponent(Sprite);

            const x = this.props.pointWidth * 2 * (i % pointsPerRow) + this.props.pointWidth + this.props.gridWidth * 5 * this.props.groupIndex;
            const y = pointHeight * Math.floor(i / pointsPerRow)

            return (
                <Sprite
                    x={x}
                    y={y}
                    height={this.props.pointWidth}
                    width={this.props.pointWidth}
                    anchor={CENTER}
                    cursor="pointer"
                    interactive
                    pointerdown={this.grow}
                    pointerup={this.shrink}
                    position={new PIXI.Point(WIDTH / 2, HEIGHT / 2)}
                    rotation={this.state.rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.PI * 2]
                    })}
                    scale={this.state.scale}
                    texture={PIXI.Texture.fromImage(dot)}
                />
            );
        });

        return (
            <ParticleContainer
                maxSize={1000}
                children={particleSprites}
                interactive
                interactiveChildren
                click={() => console.log('clicked particle container')}
                pointerdown={() => console.log('clicked sprite')}
                tap={() => console.log('clicked sprite')}
            />
        );
    }
}
