import * as React from 'react'
import styled from 'styled-components'

const HelpButtonStyle = styled.div`
    // border: 2px solid red;
    cursor: pointer;
    line-height: 32px;
    // padding-left: 45px;
    position: absolute;
    text-align: left;
    right: 50px;

    &::before {
        background-color: ${props => props.active ? 'orange' : 'white'};
        // border: 2px solid gray;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
        content: '?';
        height: 36px;
        left: 0;
        line-height: 38px;
        text-align: center;
        top: 0;
        position: absolute;
        width: 36px;
    }
`;

export default class HelpButton extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            active: false
        }
    }
    handleEvents = () => {
        console.log('help entered');
        this.setState({ active: !this.state.active });
    }
    render () {
        return (
            <HelpButtonStyle
                onMouseEnter={this.handleEvents}
                onMouseLeave={this.handleEvents}
                active={this.state.active}
            />
        );
    }
}
