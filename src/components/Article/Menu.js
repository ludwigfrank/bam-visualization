import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Map } from 'immutable'

const Wrapper = styled('div')`
    position: absolute;
    opacity: 0;
    background-color: white;
    box-shadow: ${props => props.theme.shadow[4]};
    border-radius: 4px;
    line-height: 16px;
    padding: 4px 8px;
    transition: all 0.2s;
    *:not(:first-child) {
        margin-left: 4px;
    }
`

const Link = styled('div')`
    font-size: 13px;
    text-transform: capitalize;
    display: inline-block;
    color: ${props => props.isActive ? props.theme.color.text.primary : props.theme.color.text.secondary};
    /*font-weight: ${props => props.isActive ? 900 : 500}*/
`

export default class Menu extends React.Component {
    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark(type) {
        const { value } = this.props
        return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark(event, type) {
        const { value, onChange } = this.props
        event.preventDefault()
        let change
        const randomNumber = Math.floor(Math.random() * 5000)
        if (type === 'document') {
            if (value.activeMarks.size < 1) {
                change = value.change().addMark({type, data: Map({ documentID: randomNumber })})
                this.props.handleDocumentLinkMutation(randomNumber)
            } else {
                const documentID = value.activeMarks.first().data.get('documentID')
                change = value.change().removeMark({type, data: Map({ documentID: documentID })})
                this.props.handleDocumentLinkMutation(documentID)
            }
        } else {
            change = value.change().toggleMark({type})
        }
        onChange(change)
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton(type, icon) {
        const isActive = this.hasMark(type)
        const onMouseDown = event => this.onClickMark(event, type)

        return (
            <Link onMouseDown={onMouseDown} isActive={isActive}>
                {type.split()[0]}
            </Link>
        )
    }

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        const root = window.document.getElementById('root')

        return ReactDOM.createPortal(
            <Wrapper
                innerRef={this.props.menuRef}
            >
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
{/*
                {this.renderMarkButton('underlined', 'format_underlined')}
*/}
                {this.renderMarkButton('document', 'format_document')}
            </Wrapper>,
            root
        )
    }
}