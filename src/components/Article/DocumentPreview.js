import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { List } from 'immutable'

const Wrapper = styled('div')`
    position: absolute;
    min-width: 20vw;
    right: 0;
`

const DocumentLink = styled('div')`
    position: absolute;
    top: ${props => props.top}px
`

const getArc = (start, end) => {
    if (start === null || end === null) { throw new Error(`Invalid position provided`) }
    const dx = start[0] - end[0]
    const dy = start[1] - end[1]
    const dr = Math.sqrt(dx * dx + dy * dy)
    const spath = ' 0 0,0 '
    return 'M' + start[0] + ',' + start[1] + 'A' + dr + ',' + dr + spath + end[0] + ',' + end[1]
}

export default class DocumentPreview extends React.Component {
    state = {
        documentLinkHTMLElements: List()
    }

    componentDidUpdate () {
        const links = this.props.documentLinks.map(documentLink => {
            return document.getElementById(documentLink)
        })
        this.setState({
            documentLinkHTMLElements: links
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.documentLinks !== this.props.documentLinks) return true
        if (nextState.documentLinkHTMLElements.size !== this.state.documentLinkHTMLElements.size) return true
        return false
    }

    render() {
        const root = window.document.getElementById('root')
        return ReactDOM.createPortal(
            <div>
                <Wrapper>
                    {this.state.documentLinkHTMLElements.map(documentLink => {
                        const rect = documentLink.getBoundingClientRect()
                        const top = rect.top + window.pageYOffset

                        return (
                            <DocumentLink top={top} key={documentLink.id}>
                                {documentLink.id}
                            </DocumentLink>
                        )
                    })}
                </Wrapper>
                {this.state.documentLinkHTMLElements.map(documentLink => {
                    const rect = documentLink.getBoundingClientRect()
                    console.log(rect)
                    const top = rect.top + window.pageYOffset + 20
                    const left = rect.left + rect.width / 2

                    return (
                        <div style={{position: 'absolute', pointerEvents: 'none'}}>
                            <svg style={{width: '100vw', height: '400vh'}}>
                                <path
                                    style={{ fill: 'none',
                                        stroke: 'rgba(155, 155, 225, 0.5)',
                                        strokeWidth: 2}}
                                    d={getArc([left, top], [left + (window.innerWidth * 0.8) - rect.left, top])}
                                />
                            </svg>
                        </div>
                    )
                })}
            </div>,
            root
        )
    }
}