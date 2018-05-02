import styled from 'styled-components'
import React from "react"

const HeadingOne = styled('h1')`
    font-size: 36px;
    line-height: 42px;
    padding-top: 32px;
    padding-bottom: 8px;
`

const Paragraph = styled('span')`
    font-size: 16px;
    line-height: 26px;
`

const MarkDocument = styled('span')`
    background-color: #ffeeba;
`

export {
    Paragraph,
    HeadingOne,
    MarkDocument
}