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
    height: 90%;
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
            const groupPadding = gridWidth * 2 * groupIndex; // double of the single grid width
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
        // this.pixiCanvas.interactive = false;
        // this.app.interactive = false;
        this.app.start();
        
        // var sprites = new PIXI.particles.ParticleContainer(amountDots, {
        //     scale: true,
        //     position: true,
        //     rotation: true,
        //     uvs: true,
        //     alpha: true
        // });
        // var sprites = new PIXI.particles.ParticleContainer(amountDots);
        var sprites = new PIXI.Container(amountDots);
    
        sprites.interactive = true;
        sprites.interactiveChildren = true;
        this.app.stage.addChild(sprites);
        
        // store for sprites
        this.dots = [];
        this.totalSprites = this.app.renderer instanceof PIXI.WebGLRenderer ? amountDots : gridWidth * 2;
        
        this.scaleValue = 0.4;
        this.dotSize = 50 * this.scaleValue;
        this.gridPositions = this.getGridPositions(
            this.dotSize, this.containerDimensions.x, amountDots, 0 // pointSize, gridWidth, totalPoints, groupIdex
        );

        const chromaColor = chroma.scale(['white', 'orange']).mode('lab');

        for (let index = 0; index < this.totalSprites; index += 1) {
            const dotSprite = PIXI.Sprite.fromImage(dot);
            // dotSprite.tint = chromaColor(0.5);
            dotSprite.tint = 0xff9900;
            dotSprite.alpha = Math.random();
        
            dotSprite.anchor.set(0.5); // center texture
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
            
            // Add eventlisteners
            dotSprite.interactive = true;
            dotSprite.buttonMode = true;
            dotSprite.on('mouseover', this.handleMouseover);
            dotSprite.on('mouseout', this.handleMouseout);
            dotSprite.on('mousedown', this.handleMousedown);

            this.dots.push(dotSprite);
            sprites.addChild(dotSprite);
        }

        animate();
        
    }
    handleMouseover(data) {
        // console.log('mouseover');
        // console.log(data.target);
        data.target.alpha = 1;
        data.target.tint = 0x000000;
    }
    handleMouseout(data) {
        // console.log('mouseout');
        // console.log(data.currentTarget);
        data.currentTarget.tint = 0x00ff00;
    }
    handleMousedown(data) {
        // console.log('mousedown');
        // console.log(data.target);
        data.target.tint = 0x0000ff;
    }
    componentWillUnmount() {
        this.app.stop();
    }
    updatePointPosition = (groupingValue) => {
        console.log('update position');

        const groups = _groupBy(doctors, (doctor) => doctor[groupingValue]);
        // console.log(groups);
        const numberOfGroups = Object.keys(groups).length;

        let pointsCounter = 0;
        Object.keys(groups).forEach((key, index) => {
            const group = groups[key];
            const groupLength = group.length;

            const gridPositions = this.getGridPositions(
                this.dotSize,
                this.containerDimensions.x / (numberOfGroups * 2),
                groupLength,
                index,
                numberOfGroups
            );

            // for (let index = 0; index < this.dots.length; index += 1) {
            for (let i = 0; i < groupLength; i += 1) {
                const dotSprite = this.dots[pointsCounter];

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
        console.log('render');
        return (
            <DotContainer
                id={'dot-container'}
                // onClick={this.updatePointPosition}
            >
                <div ref={(thisDiv) => {component.pixiCanvas = thisDiv}} />
            </DotContainer>
        )
    }
}
