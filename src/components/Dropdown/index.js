import React from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
    display: inline-block;
    padding: 8px 8px;
    box-shadow: ${props => props.theme.shadow[6]};
    min-width: 40px;
    background-color: white;
    border-radius: 4px;
    transition: all 0.1s ease-in-out;
`

const Dropdown = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default Dropdown