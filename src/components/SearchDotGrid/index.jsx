import * as React from 'react'
import * as d3 from 'd3'
import * as PIXI from 'pixi.js'
import _groupBy from 'lodash.groupby';
import styled from 'styled-components'
import chroma from 'chroma-js'
import TWEEN from '@tweenjs/tween.js'

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


function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
}

export default class SearchDotGrid extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
        }
    }
    shouldComponentUpdate() {
        return false;
    }
    getGridPositions(pointSize, gridWidth, totalPoints, groupIndex, numberOfGroups) {
        const pointDimension = pointSize;
        const pointsPerRow = Math.floor(gridWidth / pointDimension);
        const numRows = totalPoints / pointsPerRow;

        const dotPositions = [];
        for (let index = 0; index < totalPoints; index++) {
            const groupPadding = 100 * groupIndex;
            const xPosition = pointDimension * (index % pointsPerRow) + groupPadding;
            const yPosition = pointDimension * Math.floor(index / pointsPerRow) + pointDimension;

            dotPositions.push({ x: xPosition, y: yPosition });
        }

        return dotPositions;
    }
    componentDidMount() {
        const dotContainer = document.getElementById('dot-container');
        const dotContainerDimension = dotContainer.getBoundingClientRect();

        // const amountDots = 5000;
        const amountDots = doctors.length;

        this.containerDimensions = {
            x: dotContainerDimension.width - 3,
            y: dotContainerDimension.height - 3
        };

        this.app = new PIXI.Application(this.containerDimensions.x, this.containerDimensions.y, {backgroundColor : 0xffffff});
        this.pixiCanvas.appendChild(this.app.view);
        this.pixiCanvas.interactive = true;
        this.app.interactive = true;
        this.app.start();
        
        var sprites = new PIXI.particles.ParticleContainer(amountDots, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        sprites.interactive = true;
        sprites.interactiveChildren = true;
        this.app.stage.addChild(sprites);
        
        // create an array to store all the sprites
        this.dots = [];
        this.totalSprites = this.app.renderer instanceof PIXI.WebGLRenderer ? amountDots : 100;
        
        this.scaleValue = 0.2;
        this.dotSize = 50 * this.scaleValue;
        this.gridPositions = this.getGridPositions(
            this.dotSize, this.containerDimensions.x, amountDots, 0
        ); // pointSize, gridWidth, totalPoints, groupIdex

        const chromaColor = chroma.scale(['white', 'orange']).mode('lab');

        for (let index = 0; index < this.totalSprites; index += 1) {
            // create a new Sprite
            const dotSprite = PIXI.Sprite.fromImage(dot);
            dotSprite.interactive = true;
            dotSprite.buttonMode = true;

            dotSprite.on('mousedown', (event) => {
                console.log('interactive');
            });
            dotSprite.on('pointerdown', (event) => {
                console.log('interactive');
            });
            dotSprite.on('mousedown', (event) => {
                console.log('interactive');
            });
            dotSprite.on('click', (event) => {
                console.log('interactive');
            });

            // dotSprite.tint = chromaColor(0.5);
            dotSprite.tint = 0xff9900;
            dotSprite.alpha = Math.random();
        
            // set the anchor point so the texture is centerd on the sprite
            dotSprite.anchor.set(0.5);
            dotSprite.scale.set(this.scaleValue / 1.5);

            const position = {x: 0, y: 0}
            const tween = new TWEEN.Tween(position)
                .to({ x: this.gridPositions[index].x, y: this.gridPositions[index].y }, 700)
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(500)
                .start();

            tween.onUpdate(position => {
                dotSprite.x = position.x;
                dotSprite.y = position.y;
            });
            
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

        animate();
        
    }
    componentWillUnmount() {
        this.app.stop();
    }
    updatePointPosition = () => {
        console.log('update position');

        const groups = _groupBy(doctors, (doctor) => doctor['name']);
        console.log(groups);
        const numberOfGroups = Object.keys(groups).length;

        let pointsCounter = 0;
        Object.keys(groups).forEach((key, index) => {
            const group = groups[key];
            const groupLength = group.length;

            const gridPositions = this.getGridPositions(
                this.dotSize,
                // this.containerDimensions.x / numberOfGroups,
                100,
                groupLength,
                index,
                numberOfGroups
            );

            console.log('position group');
            console.log(gridPositions);

            // for (let index = 0; index < this.dots.length; index += 1) {
            for (let i = 0; i < groupLength; i += 1) {
                const dotSprite = this.dots[pointsCounter];

                dotSprite.tint = 0xff0000;
                dotSprite.alpha = 1;

                const position = {x: dotSprite.x, y: dotSprite.y}
                const tween = new TWEEN.Tween(position)
                    .to({ x: gridPositions[i].x, y: gridPositions[i].y }, 700)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
                
                tween.onUpdate(position => {
                    dotSprite.x = position.x;
                    dotSprite.y = position.y;
                });

                pointsCounter += 1;
            }
    
        });
        
        animate();
    }
    animate = () => {
        requestAnimationFrame(this.animate);
        TWEEN.update();
    }
    render () {
        let component = this;
        return (
            <DotContainer
                id={'dot-container'}
                onClick={this.updatePointPosition}
            >
                <div ref={(thisDiv) => {component.pixiCanvas = thisDiv}} />
            </DotContainer>
        )
    }
}
