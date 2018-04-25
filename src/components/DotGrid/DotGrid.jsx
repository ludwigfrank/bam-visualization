import React, { Component } from "react";
import Animated from "animated";
import { Sprite } from "react-pixi-fiber";
import AnimatedDot from './AnimatedDot.jsx';

export default class DotGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.animationRefs = [];
    }
    // Don't update component so the whole canvas doesn't get's rerendered
    shouldComponentUpdate() {
        // console.log(this.animationRefs);
        this.animationRefs.forEach(animationRef => animationRef());
        return false;
    }

    render() {
        const pointHeight = this.props.pointWidth * 2;
        const pointsPerRow = Math.floor(this.props.gridWidth / this.props.pointWidth * 2);
        const numRows = this.props.points.length / pointsPerRow;

        // console.log(this.props.points);

        const particleSprites = this.props.points.map((point, i) => {
            const AnimatedSprite = Animated.createAnimatedComponent(Sprite);

            const x = this.props.pointWidth * 2 * (i % pointsPerRow) + this.props.pointWidth + this.props.gridWidth * 5 * this.props.groupIndex;
            const y = pointHeight * Math.floor(i / pointsPerRow)

            return (
                <AnimatedDot
                    triggerAnimation={animation => this.animationRefs.push(animation)}
                    interactive
                    x={x}
                    y={y}
                    pointWidth={this.props.pointWidth}
                    gridWidth={this.props.gridWidth}
                    points={this.props.points}
                    groupIndex={this.props.groupIndex}
                />
            );
        });

        return particleSprites;
    }
}
