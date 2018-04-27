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
        this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
        this.pixiCanvas.appendChild(this.app.view);
        this.app.start();
        
        this.dotSprite = PIXI.Sprite.fromImage(dot);
        this.dotSprite.x = this.app.screen.width / 2;
        this.dotSprite.y = this.app.screen.height / 2;
        this.app.stage.addChild(this.dotSprite);

        this.app.ticker.add((delta) => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            this.dotSprite.rotation += 0.1 * delta;
        });

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
