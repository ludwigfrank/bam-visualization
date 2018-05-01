import * as React from 'react'
import { Editor, RenderMarkProps, RenderNodeProps } from 'slate-react'
import { Value } from 'slate'
import styled from 'styled-components'
import Menu from './Menu'
import { Paragraph, HeadingOne, MarkDocument } from './textStyles'

import initialValue from './article-1-value.json'

interface Props {
}

interface State {
    value: Value
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
            value: Value.fromJSON(initialValue)
        }
    }

    componentDidMount () {
        this.menuUpdate()
    }

    componentDidUpdate () {
        this.menuUpdate()
    }

    onChange = (state: State) => {
        const value = state.value
        this.setState({ value })
    }

    renderNode = (props: RenderNodeProps) => {
        const { attributes, children, node } = props
        switch (node.type) {
            case 'paragraph':
                return <Paragraph {...attributes}>{children}</Paragraph>
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <HeadingOne {...attributes}>{children}</HeadingOne>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'heading-three':
                return <h3 {...attributes}>{children}</h3>
            case 'heading-four':
                return <h4 {...attributes}>{children}</h4>
            case 'heading-five':
                return <h5 {...attributes}>{children}</h5>
            case 'heading-six':
                return <h6 {...attributes}>{children}</h6>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            default:
                return null
        }
    }

    renderMark = (props: RenderMarkProps): any => {
        const { children, mark, attributes } = props
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            case 'document':
                return <MarkDocument {...attributes}>{children}</MarkDocument>
            default:
                return null
        }
    }

    menuRef = (menu: HTMLElement) => {
        this.menu = menu
    }

    menuUpdate = () => {
        const { value } = this.state
        let menu = this.menu as any
        if (!menu) { return }

        if (value.isBlurred || value.isEmpty) {
            menu.removeAttribute('style')
            return
        }

        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`
        menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`
        menu.style.opacity = 1
    }

    render() {
        const { value } = this.state

        return (
            <Wrapper>
                <Menu
                    menuRef={this.menuRef}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Editor
                    placeholder="Write some markdown..."
                    renderNode={this.renderNode}
                    onChange={this.onChange}
                    renderMark={this.renderMark}
                    value={value}
                />
            </Wrapper>
        )
    }
}
