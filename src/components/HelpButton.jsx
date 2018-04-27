import * as React from 'react'
import styled from 'styled-components'

const HelpButtonStyle = styled.div`
    // border: 2px solid red;
    cursor: pointer;
    line-height: 32px;
    padding-left: 45px;
    position: relative;
    text-align: left;

    &::before {
        background-color: white;
        // border: 2px solid gray;
        border-radius: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 2px 3px;
        content: '?';
        height: 30px;
        left: 0;
        line-height: 28px;
        text-align: center;
        top: 0;
        position: absolute;
        width: 30px;
    }
`;

export default class HelpButton extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
        }
    }
    render () {
        return (
            <HelpButtonStyle />
        );
    }
}
