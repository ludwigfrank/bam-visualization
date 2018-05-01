import * as React from 'react'
import styled from 'styled-components'

const weight = (weight) => {
    if (weight === 'bold') return 600
    if (weight === 'light') return 300
    else return 400
}

const Paragraph = styled('p')`
    color: ${props => props.hint ? props.theme.color.text.secondary : props.theme.color.text.primary};
    font-family: ${props => props.theme.typo.font.primary};
    font-weight: ${props => weight(props.weight)};
    font-size: 15px;
    line-height: 24px;
    margin: 0;
`

export default Paragraph