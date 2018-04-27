import * as React from 'react'
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
import _groupBy from 'lodash.groupby';
import styled from 'styled-components'

import doctors from './doctors.js';
import dot from '../../images/doctor-dot.png'

const DotContainer = styled.div`
    background-color: lightblue;
    border: 2px solid red;
    bottom: 0;
    height: 80%;
    position: absolute;
    width: 100%;
`;

export default class SearchDotGrid extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
        }
    }
    shouldComponentUpdate() {
        return false;
    }
    getGridPositions(pointSize, gridWidth, totalPoints, groupIndex) {
        const pointDimension = pointSize;
        const pointsPerRow = Math.floor(gridWidth / pointDimension);
        const numRows = totalPoints / pointsPerRow;

        const dotPositions = [];
        for (let index = 0; index < totalPoints; index++) {
            const groupPadding = pointDimension + gridWidth * 5 * groupIndex;
            const xPosition = pointDimension * (index % pointsPerRow) + groupPadding;
            const yPosition = pointDimension * Math.floor(index / pointsPerRow);

            dotPositions.push({ x: xPosition, y: yPosition });
        }

        return dotPositions;
    }
    componentDidMount() {
        const dotContainer = document.getElementById('dot-container');
        const dotContainerDimension = dotContainer.getBoundingClientRect();

        const amountDots = 1000;

        this.app = new PIXI.Application(dotContainerDimension.width - 3, dotContainerDimension.height - 3, {backgroundColor : 0xffffff});
        this.pixiCanvas.appendChild(this.app.view);
        this.app.start();
        
        var sprites = new PIXI.particles.ParticleContainer(amountDots, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.app.stage.addChild(sprites);
        
        // create an array to store all the sprites
        this.dots = [];
        this.totalSprites = this.app.renderer instanceof PIXI.WebGLRenderer ? amountDots : 100;
        
        this.gridPositions = this.getGridPositions(50, dotContainerDimension.width, amountDots, 0); // pointSize, gridWidth, totalPoints, groupIdex

        for (let index = 0; index < this.totalSprites; index += 1) {
            // create a new Sprite
            const dotSprite = PIXI.Sprite.fromImage(dot);
            dotSprite.tint = Math.random() * 0xff000;
        
            // set the anchor point so the texture is centerd on the sprite
            dotSprite.anchor.set(0.5);
            // different this.dots, different sizes
            // dotSprite.scale.set(0.8 + Math.random() * 0.3);
            dotSprite.scale.set(1);

            // positioning scatter them all
            // dotSprite.x = Math.random() * this.app.screen.width;
            // dotSprite.y = Math.random() * this.app.screen.height;
            dotSprite.x = this.gridPositions[index].x;
            dotSprite.y = this.gridPositions[index].y;

            // dotSprite.tint = Math.random() * 0x808080;
        
            // create a random direction in radians
            dotSprite.direction = Math.random() * Math.PI * 2;
            // this number will be used to modify the direction of the sprite over time
            dotSprite.turningSpeed = Math.random() - 0.8;
            // create a random speed between 0 - 2, and these this.dots are slooww
            dotSprite.speed = (2 + Math.random() * 2) * 0.2;
            dotSprite.offset = Math.random() * 100;
        
            // finally we push the dotSprite into the this.dots array so it it can be easily accessed later
            this.dots.push(dotSprite);
        
            sprites.addChild(dotSprite);
        }
        
    }
    componentWillUnmount() {
        this.app.stop();
    }
    animateSprites = () => {
        // create a bounding box for margots
        var dotSpriteBoundsPadding = 100;
        var dotSpriteBounds = new PIXI.Rectangle(
            -dotSpriteBoundsPadding,
            -dotSpriteBoundsPadding,
            this.app.screen.width + dotSpriteBoundsPadding * 2,
            this.app.screen.height + dotSpriteBoundsPadding * 2
        );

        let tick = 0;        
        this.app.ticker.add(() => {
        
            // iterate through the sprites and update their position
            for (let index = 0; index < this.dots.length; index += 1) {
        
                var dotSprite = this.dots[index];
                // dotSprite.scale.y = 0.95 + Math.sin(tick + dotSprite.offset) * 0.05;
                dotSprite.direction += dotSprite.turningSpeed * 0.01;
                dotSprite.x += Math.sin(dotSprite.direction) * (dotSprite.speed * dotSprite.scale.y);
                dotSprite.y += Math.cos(dotSprite.direction) * (dotSprite.speed * dotSprite.scale.y);
                dotSprite.rotation = -dotSprite.direction + Math.PI;
        
                // wrap the this.dots
                if (dotSprite.x < dotSpriteBounds.x) {
                    dotSprite.x += dotSpriteBounds.width;
                }
                else if (dotSprite.x > dotSpriteBounds.x + dotSpriteBounds.width) {
                    dotSprite.x -= dotSpriteBounds.width;
                }
        
                if (dotSprite.y < dotSpriteBounds.y) {
                    dotSprite.y += dotSpriteBounds.height;
                }
                else if (dotSprite.y > dotSpriteBounds.y + dotSpriteBounds.height) {
                    dotSprite.y -= dotSpriteBounds.height;
                }
            }
        
            // increment the ticker
            tick += 0.1;
        });
    }
    render () {
        let component = this;
        return (
            <DotContainer
                id={'dot-container'}
                onClick={this.animateSprites}
            >
                <div ref={(thisDiv) => {component.pixiCanvas = thisDiv}} />
            </DotContainer>
        )
    }
}
