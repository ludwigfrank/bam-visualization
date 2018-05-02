import * as React from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import DocumentPreview from './DocumentPreview'
import { List } from 'immutable'

interface Props {
}

interface State {
    documentLinks: List<any>
}

const Wrapper = styled('div')`
    max-width: 620px;
    margin: 52px auto 0;
`

export default class Article extends React.Component <Props, State> {
    menu: HTMLElement

    constructor(props: Props) {
        super(props)
        this.state = {
            documentLinks: List([])
        }
    }

    handleDocumentLinkMutation = (documentID: number) => {
        const contains = this.state.documentLinks.contains(documentID)
        this.setState(({documentLinks}) => ({
            documentLinks: !contains
                ? documentLinks.push(documentID)
                : documentLinks.filter((i) => i !== documentID) as any
        }), () => {console.log(this.state.documentLinks)})
    }

    render() {
        return (
            <Wrapper>
                <Editor
                    handleDocumentLinkMutation={this.handleDocumentLinkMutation}
                />
                <DocumentPreview documentLinks={this.state.documentLinks}/>
            </Wrapper>
        )
    }
}
