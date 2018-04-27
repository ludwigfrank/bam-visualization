import * as React from 'react'
import styled from 'styled-components'

const WorldButtonStyle = styled.div`
    // border: 2px solid red;
    cursor: pointer;
    line-height: 32px;
    // padding-left: 45px;
    position: absolute;
    text-align: left;
    left: 50px;

    &::before {
        background-color: ${props => props.active ? 'orange' : 'white'};
        // border: 2px solid gray;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
        content: 'w';
        height: 30px;
        left: 0;
        line-height: 28px;
        text-align: center;
        top: 0;
        position: absolute;
        width: 30px;
    }
`;

export default class WorldButton extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            active: false
        }
    }
    handleEvents = () => {
        console.log('world button entered');
        this.setState({ active: !this.state.active });
    }
    render () {
        return (
            <WorldButtonStyle
                onMouseEnter={this.handleEvents}
                onMouseLeave={this.handleEvents}
                active={this.state.active}
            />
        );
    }
}
