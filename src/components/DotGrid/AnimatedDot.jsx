import React, { Component } from "react";
import Animated from "animated";
import { Sprite, Stage } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
const bunny = "https://i.imgur.com/IaUrttj.png";
import dot from '../../images/test.png'

const HEIGHT = 450;
const WIDTH = 600;
const CENTER = new PIXI.Point(0.5, 0.5);

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const OPTIONS = {
  backgroundColor: 0x1099bb
};

const AnimatedSprite = Animated.createAnimatedComponent(Sprite);

export default class AnimatedDot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: new Animated.ValueXY({ x: 1, y: 1 }),
            rotation: new Animated.Value(0),
            position: new Animated.ValueXY({ x: props.x, y: props.y })
        };
    }

    shrink = () => {
        Animated.spring(this.state.scale, { toValue: { x: 1, y: 1 } }).start();
        Animated.spring(this.state.rotation, { toValue: 0 }).start();
        Animated.spring(this.state.position, { toValue: { x: this.props.x, y: this.props.y } }).start();
    };

    grow = () => {
        Animated.spring(this.state.scale, { toValue: { x: 8, y: 8 } }).start();
        Animated.spring(this.state.rotation, { toValue: 1 }).start();
        Animated.spring(this.state.position, { toValue: { x: window.innerWidth / 2, y: window.innerHeight / 2 } }).start();
    };

    render() {
        return (
            <AnimatedSprite
                anchor={CENTER}
                cursor="pointer"
                interactive
                pointerdown={this.grow}
                pointerup={this.shrink}
                position={this.state.position}
                rotation={this.state.rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.PI * 2]
                })}
                scale={this.state.scale}
                texture={PIXI.Texture.fromImage(bunny)}
            />
        );
    }
}
