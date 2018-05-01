import * as React from 'react'
import styled from 'styled-components'

const weight = (weight) => {
    if (weight === 'bold') return 600
    if (weight === 'light') return 300
    else return 400
}

const Label = styled('p')`
    color: ${props => props.theme.color.text.secondary};
    font-family: ${props => props.theme.typo.font.primary};
    font-weight: ${props => weight(props.weight)};
    font-size: 13px;
    line-height: 20px;
    margin: 0;
`

export default Label