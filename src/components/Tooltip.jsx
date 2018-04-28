import * as React from 'react'
import styled from 'styled-components'

const TooltipStyled = styled.div`
    background-color: white;
    border: 2px solid red;
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    display: ${props => props.active ? 'block' : 'none'};
    pointer-events: none;
    position: absolute;
    left: ${props => props.position.x + 15}px;
    top: ${props => props.position.y - 20}px;
    width: 200px;
`;

const Tooltip = (props) => {
    return (
        <TooltipStyled
            active={props.active}
            position={props.position}
        >
            {props.children}
        </TooltipStyled>
    );
}

export default Tooltip;
