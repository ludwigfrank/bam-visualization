import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
    position: absolute;
`

interface Props {
    colorScale: any
}

const Legend = (props: Props) => {
    return (
        <Wrapper>
            Legend
        </Wrapper>
    )
}

export default Legend