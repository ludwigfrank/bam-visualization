import React, { Component } from "react";
import Animated from "animated";
import { Sprite } from "react-pixi-fiber";
import AnimatedDot from './AnimatedDot.jsx';

export default class DotGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const pointHeight = this.props.pointWidth * 2;
        const pointsPerRow = Math.floor(this.props.gridWidth / this.props.pointWidth * 2);
        const numRows = this.props.points.length / pointsPerRow;

        console.log(this.props.points);

        const particleSprites = this.props.points.map((point, i) => {
            const AnimatedSprite = Animated.createAnimatedComponent(Sprite);

            const x = this.props.pointWidth * 2 * (i % pointsPerRow) + this.props.pointWidth + this.props.gridWidth * 5 * this.props.groupIndex;
            const y = pointHeight * Math.floor(i / pointsPerRow)

            return (
                <AnimatedDot
                    x={x}
                    y={y}
                    pointWidth={this.props.pointWidth}
                    gridWidth={this.props.gridWidth}
                    points={this.props.points}
                    groupIndex={this.props.groupIndex}
                    pointerdown={() => console.log('dot grid')}
                    mousedown={() => console.log('dot grid')}
                    onClick={() => console.log('dot grid')}
                    animationCallback={this.props.animationCallback}
                />
            );
        });

        return particleSprites;
    }
}
