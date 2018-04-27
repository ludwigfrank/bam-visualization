import * as React from 'react'
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
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

export default class SearchDotGrid extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
        }
    }
    shouldComponentUpdate() {
        return false;
    }
    componentDidMount() {
        // Initilize pixi canvas
        // this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
        // this.pixiCanvas.appendChild(this.app.view);
        // this.app.start();
        
        // this.dotSprite = PIXI.Sprite.fromImage(dot);
        // this.dotSprite.x = this.app.screen.width / 2;
        // this.dotSprite.y = this.app.screen.height / 2;
        // this.app.stage.addChild(this.dotSprite);

        // animate sprites
        // this.app.ticker.add((delta) => {
        //     // just for fun, let's rotate mr rabbit a little
        //     // delta is 1 if running at 100% performance
        //     // creates frame-independent transformation
        //     this.dotSprite.rotation += 0.1 * delta;
        // });

        this.app = new PIXI.Application();
        this.pixiCanvas.appendChild(this.app.view);
        this.app.start();
        
        var sprites = new PIXI.particles.ParticleContainer(10000, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.app.stage.addChild(sprites);
        
        // create an array to store all the sprites
        var maggots = [];
        
        var totalSprites = this.app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;
        
        for (var i = 0; i < totalSprites; i++) {
        
            // create a new Sprite
            var dude = PIXI.Sprite.fromImage(dot);
        
            dude.tint = Math.random() * 0xE8D4CD;
        
            // set the anchor point so the texture is centerd on the sprite
            dude.anchor.set(0.5);
        
            // different maggots, different sizes
            dude.scale.set(0.8 + Math.random() * 0.3);
        
            // scatter them all
            dude.x = Math.random() * this.app.screen.width;
            dude.y = Math.random() * this.app.screen.height;
        
            dude.tint = Math.random() * 0x808080;
        
            // create a random direction in radians
            dude.direction = Math.random() * Math.PI * 2;
        
            // this number will be used to modify the direction of the sprite over time
            dude.turningSpeed = Math.random() - 0.8;
        
            // create a random speed between 0 - 2, and these maggots are slooww
            dude.speed = (2 + Math.random() * 2) * 0.2;
        
            dude.offset = Math.random() * 100;
        
            // finally we push the dude into the maggots array so it it can be easily accessed later
            maggots.push(dude);
        
            sprites.addChild(dude);
        }

    }
    componentWillUnmount() {
        this.app.stop();
    }
    render () {
        let component = this;
        return (
            <DotContainer>
                <div ref={(thisDiv) => {component.pixiCanvas = thisDiv}} />
            </DotContainer>
        )
    }
}
