import React, { Component } from "react";
import Animated from "animated";
import { Sprite, Stage } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import dot from '../../images/doctor-dot.png'

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
            counter: 0,
            // scale: new Animated.ValueXY({ x: 0.4, y: 0.4 }),
            rotation: new Animated.Value(0),
            position: new Animated.ValueXY({ x: props.x, y: props.y })
        };
    }
    shouldComponentUpdate() {
        this.grow();
        return false;
    }
    componentDidMount() {
        this.props.triggerAnimation(this.grow);
    }
    shrink = () => {
        // Animated.timing(this.state.scale, { toValue: { x: 0.4, y: 0.4 }, duration: 500 }).start();
        Animated.timing(this.state.rotation, { toValue: 0, duration: 500 }).start();
        Animated.timing(this.state.position, { toValue: { x: this.props.x, y: this.props.y }, duration: 500 }).start();
    }
    grow = () => {
        // Animated.timing(this.state.scale, { toValue: { x: 1, y: 1 }, duration: 500 }).start();
        Animated.timing(this.state.rotation, { toValue: 0, duration: 500 }).start();
        Animated.timing(this.state.position, { toValue: { x: window.innerWidth / 4, y: window.innerHeight / 4 + 100 * this.state.counter}, duration: 500 }).start();
    }
    render() {
        return (
            <AnimatedSprite
                anchor={CENTER}
                cursor="pointer"
                interactive
                pointerover={() => null}
                pointerout={() => null}
                pointerdown={this.grow}
                pointerup={this.shrink}
                position={this.state.position}
                rotation={this.state.rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.PI * 2]
                })}
                // scale={this.state.scale}
                texture={PIXI.Texture.fromImage(dot)}
                buttonMode
            />
        );
    }
}
